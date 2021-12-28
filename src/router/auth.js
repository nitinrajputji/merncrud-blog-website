const express = require("express");

const router = express.Router();
const userData = require("../models/schema");
const blogData = require("../models/data");
const bcrypt = require("bcrypt");
const Authanticate = require("../middleware/authanticate");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;
    if (!name || !email || !password || !cpassword) {
      res.status(422).json({ error: "please filled properly" });
    }
    if (!(password == cpassword)) {
      res.status(422).json({ error: "please filled properly" });
    } else {
      const document = await userData.findOne({ email: email });
      if (document) {
        res.status(422).json({ error: "email already exist" });
      } else {
        const userdata = new userData({
          name,
          email,
          password,
          cpassword,
        });

        const result = await userdata.save();
        if (result) {
          res.status(201).json({ message: "registered successfully" });
        } else {
          res.status(500).json({ message: "registration failed" });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password && !email) {
      res.status(422).json({ error: "please fill properly" });
    }

    const document = await userData.findOne({ email: email });

    if (document) {
      const isMatch = await bcrypt.compare(password, document.password);

      const token = await document.genreateToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 10000000),
      });

      if (!isMatch) {
        res.status(400).json({ message: "user error" });
      } else {
        res.status(200).json({ message: "user login successfully" });
      }
    } else {
      res.status(400).json({ message: "user error" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/home", Authanticate, (req, res) => {
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send(req.user);
});

router.post("/insert", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ message: " please enter properly" });
    } else if (title && content) {
      const blog1 = new blogData({
        title,
        content,
      });

      const data = await blog1.save();

      res.status(201).json({ message: "data send sucessfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/read", async (req, res) => {
  try {
    blogData.find({}, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } catch (error) {}
});

router.get("/find/:id", async (req, res) => {
  try {
    {
      blogData.find({}, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
    }
  } catch (error) {}
});

router.put("/update/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedItem = {
      title,
      content,
    };

    blogData.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updatedItem },
      (req, res, err) => {
        if (!err) {
          console.log(updatedItem);
        } else {
          console.log(err);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await blogData.findByIdAndRemove(id).exec();
  res.send("deleted");
});

module.exports = router;
