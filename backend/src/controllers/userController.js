const User = require("../models/User");

exports.getUsers = async (req, res) => {
  const { role } = req.query;

  const query = role ? { role } : {};
  const users = await User.find(query).select("name role");

  res.json(users);
};
