const { Router } = require("express");
const sequelize = require("sequelize");
const auth = require("../auth/middleware");
const Nft = require("../models").nft;
const User = require("../models").user;
// const { SALT_ROUNDS } = require("../config/constants");
// const authMiddleware = require("../auth/middleware");

const router = new Router();

//F1 Endpoint

router.get("/", async (req, res, next) => {
  // try and catch so that we can catch the error if something wrong with api
  try {
    // declare var nfts that hold all nfts that comes from your our nfts "Model"
    const nfts = await Nft.findAll();
    // send the nfts (array with objects) from endpoint
    res.status(200).send({ message: "ok", nfts });
    // we log the value of the property with name users from the object to console
  } catch (e) {
    next(e);
  }
});

// ENDPOINT FOR F4
// We need to create a new entry in our DB --> post
// User to POST a new nft to purchase with corresponding seller/user `id`
// await/async because we do a DB call and answer can come later
// auth we need because we want to put the auth middleware in between BE and FE to be able to
// control that the useer needs to be signed and we also want to get tthe userid from the auth middleware
router.post("/", auth, async (req, res, next) => {
  try {
    // clg to check which user is logged in, put first to check if try works (debugging)
    console.log(req.user);
    // data is coming from the body as we get it from the frontend form
    // we read the user id from the auth middleware and store it as an integer in the userId const:
    const userId = req.user.id;

    // we are going create a user in the DB. "User" is referring to model (see requiree model on line 5).
    // "user" is our new constant that holds

    // Destructure the object, with this we get the values (1, www.go.com, etc) from the keys (specialAbility, imageUrl etc.) of the properties in the object and make them constants
    const {
      specialAbility,
      youthTrainingSkill,
      seniorTrainingSkill,
      imageUrl,
      price,
    } = req.body;
    // we need those constants in this step to map the values that come from the frontend in the variables to the DB
    const nft = await Nft.create({
      specialAbility,
      youthTrainingSkill,
      seniorTrainingSkill,
      imageUrl,
      price,
      userId,
    });
    // we also want to send a message to the frontend and show what is posted in the frontend
    return res.status(201).send({ message: "nft created", nft: nft });
  } catch (e) {
    next(e);
  }
});

// see more button -->

module.exports = router;
