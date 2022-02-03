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
// middleware puts full user Object from frontend to backend in req.user
router.post("/:id/offers", async (req, res, next) => {
  try {
    // data is coming from the body as we get it from the frontend form
    // we read the nftId from the URL (:id parameter) and store it as an integer in the nftId variable --> its the nftId that comes from the frontend
    const nftId = req.params.id;
    // what are we going to create in DB:
    const {
      offer,
      // buyer id comes from auth middleware (req.user.id)
      userId,
      buyerId,
    } = req.body;
    console.log("userId", userId);
    console.log("buyerId", buyerId);
    console.log("offer", offer);
    console.log("params", req.params);
    console.log("body", req.body);
    // find NFT by primary key and stre in var so that we can use those values
    const updatedNft = await Nft.findByPk(nftId, {
      // include: [Purchase],
    });
    const newPurchase = await Purchase.findByPk(nftId, {
      // include: [Purchase],
    });
    // comes from DB (findbyPk) see above const decla
    const price = updatedNft.price;
    console.log("nftId", nftId);
    console.log("updatedNft", updatedNft);

    console.log("Purchase", Purchase);
    console.log("price", price);
    console.log("newPurchase", newPurchase);

    // write if statements to decide when to create
    // AND because we need to check if offer >= price and we need to have a as a condition purchaseId is null which ensures that nft not sold yet
    if (offer >= price && updatedNft.purchaseId === null) {
      // We need to validate first but under the right circumstances create an offer in DB
      // and under the right circumstances create a purchase

      const newPurchase = await Purchase.create({
        // comes from url
        nftId,
        // declare those above
        sellerId,
        buyerId,
        isSold: true,
        offer,
      });
      updatedNft.purchaseId = newPurchase.id;
      updatedNft.save();
      // I need to send a response to frontend
      res.send({
        // send the updated nft back to the frontend
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
