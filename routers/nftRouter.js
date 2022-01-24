const { Router } = require("express");
const sequelize = require("sequelize");
const auth = require("../auth/middleware");
const Nft = require("../models").nft;
const User = require("../models").user;
const Purchase = require("../models").purchase;
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
    return res.status(201).send({ message: "nft created", Nft: Nft });
  } catch (e) {
    next(e);
  }
});

router.post("/:id/offers", async (req, res, next) => {
  try {
    // data is coming from the body as we get it from the frontend form
    // we read the nftId from the URL (:id parameter) and store it as an integer in the nftId variable:
    const nftId = req.params.id;
    // what are we going to create in DB:
    const { offer, buyerId, isSold } = req.body;
    console.log("params", req.params);
    console.log("body", req.body);

    const updatedNft = await Nft.findByPk(nftId, {
      // include: [purchase],
    });
    const price = Nft.price;
    console.log({ nftId, updatedNft, Purchase, price });

    // write if statements to decide when to create
    if (true) {
      // We need to validate first but under the right circumstances create an offer in DB
      const newOffer = await Nft.offer.create({
        offer,
      });
      // console.log(newOffer);
      updatedNft.offer.push(newOffer);

      // and under the right circumstances create a purchase

      const newPurchase = await Purchase.create({
        // comes from url
        nftId,
        // declare those above
        sellerId,
        buyerId,
        isSold: true,
      });
      // console.log("newPurchase", newPurchase);
      updatedOffer.purchase.push(newPurchase);
      // I need to send a response to frontend
      res.send({
        // send the updated artwork back to the frontend
        nft: updatedNft,
        // set success on true
        success: true,
        // we dont send an error message back so error can be null
        error: null,
      });
    } else {
      res.status(400).send({
        nft: updatedNft, // `updatedNft` is actually not updated in this case!
        success: false,
        error: "the offer is not high enough",
      });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
