const express = require("express");
const TodoSchema = require("../utils/model");
const bcrypt = require("bcryptjs");
const Middleware = require("../utils/middleware");
const { body, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

const router = express.Router();

// route for create account
//@api {post} /api/user Create a new user
router.post(
  "/user",
  [
    // username must be an email
    body("email").notEmpty().isEmail(),

    // password must be at least 4 chars long
    body("password").isLength({ min: 4 }),

    body("username").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req); // validating the user input on server using express validator
      if (!errors.isEmpty()) {
        return res.status(400).json({ msg: "Invalid Registration Data" });
      }

      const { username, email, password, security } = req.body;

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
  }
);

//route for login into account
//@api {post} /api/user/login login as a user
router.post(
  "/user/login",
  [
    // username must be an email
    body("email").notEmpty().isEmail(),

    // password must be at least 4 chars long
    body("password").isLength({ min: 4 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req); // validating the user input on server using express validator
      if (!errors.isEmpty()) {
        return res.status(400).json({ msg: "invalid Credentials" });
      }

      const { email, password } = req.body;

      // console.log(email, password);

      var user = await TodoSchema.findOne({ email: email });

      if (!user) {
        //  console.log(user);
        return res.status(400).send({ msg: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .send({ msg: "Invalid Password/Email Please check!!!" });
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
  }
);

//forgot password
//@api {put} /api/user Reset Password
router.put(
  "/user",
  [
    // username must be an email
    body("email").notEmpty().isEmail(),

    // password must be at least 4 chars long
    body("password").isLength({ min: 4 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req); // validating the user input on server using express validator
      if (!errors.isEmpty()) {
        return res.status(400).json({ msg: "Invalid Credentials" }); //sending a custom validation error msg
      }

      const { email, security, password } = req.body;
      const salt = await bcrypt.genSalt(10);
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
  }
);

//route for edit user account
//@api {put} /api/user/edit Edit user details
router.put("/user/edit", Middleware, async (req, res) => {
  try {
    const { username, email, password, security } = req.body;
    const salt = await bcrypt.genSalt(10);

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
//@api {delete} /api/user delete existing user
router.delete("/user", Middleware, async (req, res) => {
  try {
    const { id } = req.user;
    const salt = await bcrypt.genSalt(10);
    console.log(id);

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

//get user account
//@api {get} /api/user get user data
router.get("/user", Middleware, async (req, res) => {
  try {
    const { id } = req.user;

    console.log(id);

    var user = await TodoSchema.findById({ _id: id });

    if (!user) {
      //  console.log(user);
      return res.status(400).send({ msg: "User not found" });
    }

    if (user) {
      return res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ msg: "Server error !!!" });
  }
});

module.exports = router;
