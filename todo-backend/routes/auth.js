const express = require("express");
const TodoSchema = require("../utils/model");
const bcrypt = require("bcryptjs");
const Middleware = require("../utils/middleware");

const jwt = require("jsonwebtoken");

const router = express.Router();

//create account
router.post("/user", async (req, res) => {
  const { username, email, password, security } = req.body;
  try {
    console.log(username, email, password);

    if (
      username === undefined ||
      email === undefined ||
      password === undefined ||
      security === undefined
    ) {
      return res.status(404).json({ msg: "User Details Not found" });
    }

    var user = await TodoSchema.findOne({ email: email });

    if (user) {
      return res.status(400).json({ msg: "User Already Exists" });
    }

    var salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    user = new TodoSchema({
      username,
      email,
      password: hashed_password,
      todos: [],
      security,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "TodoAppByRajikshan-K",
      { expiresIn: 100000 },
      (err, token) => {
        if (err) throw err;

        res.status(200).json({ token, user });
      }
    );

    // console.log(user);
  } catch (error) {
    return res.status(400).send({ msg: "server error !!!" });
  }
  //res.send("authenticated");
});

//login into account
router.post("/user-login", async (req, res) => {
  const { email, password } = req.body;

  // console.log(email, password);
  try {
    if (email === undefined) {
      return res.status(400).send({ msg: "Credentials Not Found!!!" });
    }

    var user = await TodoSchema.findOne({ email: email });

    if (!user) {
      //  console.log(user);
      return res.status(400).send({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .send({ msg: "Invalid Credentials Please check!!!" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "TodoAppByRajikshan-K",
      { expiresIn: 100000 },
      (err, token) => {
        if (err) throw err;

        res.status(200).json({ token, user });
      }
    );
  } catch (error) {
    res.status(400).json({ msg: "Server error !!!" });
  }
});

//forgot password
router.put("/user", async (req, res) => {
  const { email, security, password } = req.body;
  const salt = await bcrypt.genSalt(10);

  try {
    if (email === undefined) {
      return res.status(400).send({ msg: "Credentials Not Found!!!" });
    }

    var user = await TodoSchema.findOne({ email: email });

    if (!user) {
      //  console.log(user);
      return res.status(400).send({ msg: "User not found" });
    }

    if (user.security !== security) {
      res.status(400).json({ msg: "security String Doesn't Match" });
    }
    if (user.security === security) {
      user.email = email;
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      return res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ msg: "Server error !!!" });
  }
});

//edit user account
router.put("/user-edit", Middleware, async (req, res) => {
  const { username, email, password, security } = req.body;
  const salt = await bcrypt.genSalt(10);

  try {
    if (
      email === undefined ||
      username === undefined ||
      password === undefined ||
      security === undefined
    ) {
      return res.status(400).send({ msg: "Credentials Not Found!!!" });
    }

    var user = await TodoSchema.findOne({ email: email });

    if (!user) {
      //  console.log(user);
      return res.status(400).send({ msg: "User not found" });
    }

    if (user) {
      user.email = email;
      user.password = await bcrypt.hash(password, salt);
      user.username = username;
      user.security = security;
      await user.save();
      return res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ msg: "Server error !!!" });
  }
});

//delete user account
router.delete("/user", Middleware, async (req, res) => {
  const { id } = req.user;
  const salt = await bcrypt.genSalt(10);
  console.log(id);
  try {
    var user = await TodoSchema.findById({ _id: id });

    if (!user) {
      //  console.log(user);
      return res.status(400).send({ msg: "User not found" });
    }

    if (user) {
      await TodoSchema.findByIdAndDelete({ _id: id });

      return res.status(200).json({ msg: "user Deleted" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Server error !!!" });
  }
});

module.exports = router;
