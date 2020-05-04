import express from "express";
import validator from "express-validator";

// src
import models from "../models/index.mjs";
import checkAuth from "../middleware/check-auth.mjs";
import grantAccess from "../middleware/grant-access.mjs";

const router = express.Router();

router.get("/user/refresh-access-token/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId || !userId.length) throw new Error("Unauthorized");

    const authUser = await models.User.refreshAccessToken(userId);
    res.json({ user: authUser });
  } catch (err) {
    res.status(401).json({
      error: {
        message: "Unauthorized",
      },
    });
  }
});

router.get("/user/verify-authenticated", checkAuth, async (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

router.post(
  "/user/login",
  [
    validator.check("username").exists().isLength({ min: 8, max: 42 }),
    validator.check("email").exists().isEmail().isLength({ max: 42 }),
    validator.check("password").isLength({ min: 8, max: 42 }),
  ],
  async (req, res) => {
    const validationErrors = validator.validationResult(req);

    const usernameHasError = validationErrors.errors.find(
      (error) => error.param === "username"
    );
    const emailHasError = validationErrors.errors.find(
      (error) => error.param === "email"
    );
    const passHasError = validationErrors.errors.find(
      (error) => error.param === "password"
    );

    if ((usernameHasError && emailHasError) || passHasError) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

    // normalize username / email
    const login = usernameHasError ? req.body.email : req.body.username;
    const { password } = req.body;

    try {
      const user = await models.User.findByLogin(login);
      const authUser = await models.User.authenticate(login, password);

      // wait 3 sec to avoid emails / usernames being probed
      res.json({ user: authUser });
    } catch (err) {
      res.status(400).json({
        error: {
          message: "Invalid Login Credentials",
        },
      });
    }
  }
);

router.post(
  "/user/sign-up",
  [
    validator.check("username").exists().isLength({ min: 8, max: 42 }),
    validator.check("email").exists().isEmail().isLength({ max: 42 }),
    validator.check("password").isLength({ min: 8, max: 42 }),
  ],
  async (req, res) => {
    const validationErrors = validator.validationResult(req);
    console.log("validationErrors: ", validationErrors);

    const usernameHasError = validationErrors.errors.find(
      (error) => error.param === "username"
    );
    const emailHasError = validationErrors.errors.find(
      (error) => error.param === "email"
    );
    const passHasError = validationErrors.errors.find(
      (error) => error.param === "password"
    );

    if ((usernameHasError && emailHasError) || passHasError) {
      return res.status(422).json({ errors: validationErrors.array() });
    }

    // normalize username / email
    const login = usernameHasError ? req.body.email : req.body.username;

    const { password } = req.body;
    try {
      const user = await models.User.create({
        username: login,
        email: login,
        password,
      });

      const authUser = await models.User.authenticate(login, password);

      // wait 3 sec to avoid emails / usernames being probed
      res.json({ user: authUser });
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.get(
  "/users",
  checkAuth,
  grantAccess("readAny", "User"),
  async (req, res) => {
    try {
      const users = await models.User.find().exec();
      res.json({ users });
    } catch (err) {
      res.status(401).send(err);
    }
  }
);

router.get(
  "/user/:userId",
  checkAuth,
  grantAccess("readAny", "User"),
  async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await models.User.findById(userId);
      res.json({ user });
    } catch (err) {
      res.status(401).send(err);
    }
  }
);

router.get(
  "/user/:userId/restaurants",
  checkAuth,
  grantAccess("readAny", "User"),
  async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await models.User.findById(userId).populate("restaurants");
      res.json({ user });
    } catch (err) {
      res.status(401).send(err);
    }
  }
);

router.post(
  "/user/:userId/restaurant",
  checkAuth,
  grantAccess("createAny", "Restaurant"),
  async (req, res) => {
    const { authorization } = req.headers;
    const { name, street, city, provState, postalZip, country } = req.body;

    try {
      const user = await models.User.findById(userId).populate("restaurants");
      res.json({ user });
    } catch (err) {
      res.status(401).send(err);
    }
  }
);

router.post(
  "/user",
  checkAuth,
  grantAccess("createAny", "User"),
  async (req, res, next) => {
    const { username, email, password, role } = req.body;
    try {
      const user = await models.User.create({
        username: username,
        email: email,
        password: password,
        role: role,
      });

      res.json(user);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.delete(
  "/user/:userId",
  checkAuth,
  grantAccess("deleteAny", "User"),
  async (req, res) => {
    res.send("Ok!");
  }
);

export default router;
