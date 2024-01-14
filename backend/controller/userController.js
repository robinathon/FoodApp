const userModel = require("../models/userModel");

module.exports.getUser = async function getUser(req, res) {
  let userId = req.id;

  let user = await userModel.findById(userId);
  if (user) {
    return res.json({
      message: "user fetched",
      data: user,
    });
  } else {
    return res.json({
      message: "user not found",
    });
  }
};

module.exports.getAllUser = async function getAllUser(req, res) {
  try {
    let users = await userModel.find();
    if (users) {
      res.json({
        message: "Users retrieved",
        data: users,
      });
    } else {
      res.json({ message: "No users" });
    }
  } catch {
    res.json({ message: err.message });
  }
};

module.exports.updateUser = async function updateUser(req, res) {
    try {
      const id = req.params.id;
      const user = await userModel.findById(id);
        
      if (user) {
        const dataToBeUpdated = req.body;
        
        // Update user properties based on req.body
        for (const key in dataToBeUpdated) {
          user[key] = dataToBeUpdated[key];
        }
        user['confirmPassword']=user['password'];
        
        // Save the updated user data
        const updatedUser = await user.save();
        res.json({
          message: "Data updated successfully",
          data: updatedUser,
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      // Handle errors properly, send a 500 Internal Server Error response
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    console.log(id);
    let user = await userModel.findByIdAndDelete(id);
    if (user) {
      res.json({ message: "Data deleted successfully", data: user });
    } else {
      res.json({ message: "user not found" });
    }
  } catch {
    return res.json({ message: err.message });
  }
};

module.exports.updateProfileImage = function updateProfileImage(req, res){
  res.json({ message: "Profile image updated successfully"})
}
