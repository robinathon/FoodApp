// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51OY3KISHb1znTX3lJyOIOOM2FBrccJz90mTTiW5ithEszjiPUYAXRnSA2jVNwSn9LQ2CBgK2BFJCLdebxsHV9uNN002oatgpNP",
);
const express = require("express");
const app = express();
app.use(express.static("public"));

module.exports.createSession = async function createSession(req, res) {
  try {
    let userId = req.id;
    let planId = req.parans.id;
    console.log('post called');
    const user = await userModel.findById(userId);
    const plan = await planModel.findById(planId);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email,
      client_reference_id: plan.id,
      line_items: [
        {
          name: plan.name,
          description: plan.description,
          amount: plan.price * 100,
          currency: "inr",
          quantity: 1,
        },
      ],
      
      success_url: `${req.protocol}://${req.get("host")}/profile`,
      cancel_url: `${req.protocol}://${req.get("host")}/profile`,
    });
    res.status(200).json({
        status: "success",

    })
  } catch (err) {
    res.json({ error: err.message });
  }
};

app.listen(4242, () => console.log("Running on port 4242"));
