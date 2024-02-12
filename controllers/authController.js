const User = require("../models/users"); // Assuming you have a User model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (request, response) => {
  // hash the password
  await bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      try {
        const user = User.createUser(request.body.email, hashedPassword);
        if (user != null) {
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          response.status(201).send({
            authToken: token,
            message: "User Created Successfully.",
          });
        }
      } catch (error) {
        response.status(500).send({
          message: "Error creating user.",
        });
      }
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
};

exports.login = async (request, response) => {
  // check if email exists
  try {
    const user = User.getUser(request.body.email);
    await bcrypt
      .compare(request.body.password, user.password)
      // if the passwords match
      .then((passwordCheck) => {
        // check if password matches
        if (!passwordCheck) {
          console.log("incorrect pass");
          return response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        }
        //   create JWT token
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );
        //   return success response
        response.status(200).send({
          message: "Login Successful",
          email: user.email,
          token,
        });
      })
      // catch error if password do not match
      .catch((error) => {
        response.status(400).send({
          message: "Passwords does not match",
          error,
        });
      });
  } catch (e) {
    response.status(500).send({
      message: "Email not found",
      e,
    });
  }
};
