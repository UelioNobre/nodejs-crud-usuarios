const users = [];

// Create
module.exports.doPost = (req, res) => {
  const _id = Date.now();
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
};

//Read
module.exports.doGet = (req, res) => {
  let { userId } = req.params;
  userId = parseInt(userId);
  const user = users.find((user) => user._id === userId);

  if (!user) return res.status(404).send({ message: "User not found" });

  return res.send(user);
};

// Update
module.exports.doUpdate = (req, res) => {
  let { userId } = req.params;
  userId = parseInt(userId);
  const user = users.find((user) => user._id === userId);

  if (!user) return res.status(404).send({ message: "User not found" });

  // Updating user data.
  const { name, pass } = req.body;
  user.name = name;
  user.pass = pass;

  res.send().end();
};

// Delete
module.exports.doDelete = (req, res) => {
  let { userId } = req.params;
  userId = parseInt(userId);

  const user = users.find((user) => user._id === userId);
  if (!user) return res.status(404).send({ message: "User not found" });

  users.splice(users.indexOf(user), 1);
  res.send(users);
};
