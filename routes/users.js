var express = require("express");
var router = express.Router();

const users = [];

// Create a user.
router.post("/", (req, res) => {
  const _id = getNow();
  const { email } = req.body;
  const alreadyExists = users.some((user) => user.email === email);

  if (alreadyExists)
    return res.status(400).send({ message: "Email already exists." }).end();

  const { name, pass } = req.body;
  const user = {
    _id,
    name,
    email,
    pass,
  };

  users.push(user);
  return res.status(201).send(user).end();
});

// Read a user by ID.
router.get("/:userId", (req, res) => {
  let { userId } = req.params;
  userId = parseInt(userId);
  const user = users.find((user) => user._id === userId);

  if (!user) return res.status(404).send({ message: "User not found" });

  return res.send(user);
});

// Update a user by ID.
router.put("/:userId", (req, res) => {
  let { userId } = req.params;
  userId = parseInt(userId);
  const user = users.find((user) => user._id === userId);

  if (!user) return res.status(404).send({ message: "User not found" });

  // Updating user data.
  const { name, pass } = req.body;
  user.name = name;
  user.pass = pass;

  res.send().end();
});

// Delete a user by ID
router.delete("/:userId", (req, res) => {
  let { userId } = req.params;
  userId = parseInt(userId);

  const user = users.find((user) => user._id === userId);
  if (!user) return res.status(404).send({ message: "User not found" });

  users.splice(users.indexOf(user), 1);
  res.send(users);
});

function getNow() {
  return Date.now();
}

/* GET all users. */
router.get("/*", (req, res) => {
  return res.send(users).end();
});

module.exports = router;
