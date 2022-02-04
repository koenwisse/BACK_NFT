const { Router } = require("express");
const sequelize = require("sequelize");
const auth = require("../auth/middleware");
const Nft = require("../models").nft;
const User = require("../models").user;
const Purchase = require("../models").purchase;
// const { SALT_ROUNDS } = require("../config/constants");
// const authMiddleware = require("../auth/middleware");

const router = new Router();

//F1: GET all NFT's

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

// F4: POST NFT
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
// auth,
router.post("/:id/offers", auth, async (req, res, next) => {
  try {
    // data is coming from the body as we get it from the frontend form
    // we read the nftId from the URL (:id parameter) and store it as an integer in the nftId variable --> its the nftId that comes from the frontend
    const nftId = req.params.id;
    console.log("nftId", nftId);
    // add buyerId later as soon as auth in between, now hardcode
    const buyerId = req.user.id;

    // const buyerId = 1;
    // what are we going to create in DB:
    const {
      offer,
      // buyer id comes from auth middleware (req.user.id)
      // userId,
      // buyerId,
    } = req.body;
    // console.log("nftId", nftId);
    // console.log("buyerId", buyerId);
    // console.log("offer", offer);
    // console.log("params", req.params.id);
    // console.log("body", req.body);
    // find NFT by primary key and store in var so that we can use those values
    const updatedNft = await Nft.findByPk(nftId, {
      // add purchase array
      // include: [Purchase],
    });

    // comes from DB (Nft.findbyPk) see above const
    const sellerId = updatedNft.userId;
    const price = updatedNft.price;
    // console.log("nftId", nftId);
    // console.log("updatedNft", updatedNft);

    // console.log("Purchase", Purchase);
    // console.log("price", price);

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
        offer,
        isSold: true,
      });
      // console.log("newPurchase", newPurchase);
      // updatedNft.purchaseId = newPurchase.id;
      newPurchase.save();
      // I need to send a response to frontend
      res.send({
        // send the updated nft back to the frontend
        nft: updatedNft,
        purchase: newPurchase,
        // set success on true
        success: true,
        // we dont send an error message back so error can be null
        error: `You have purchased NFT with ID ${nftId}`,
      });
    } else {
      // TODO: change error to message and also change nw message
      const message =
        updatedNft.purchaseId === null
          ? "the offer is not high enough"
          : "this NFT is already sold";
      res.status(200).send({
        nft: updatedNft, // `updatedNft` is actually not updated in this case!
        success: false,
        error: message,
        purchase: null,
      });
    }
  } catch (e) {
    next(e);
  }
});

// GET nft by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // if input is not a number (boolean, string, object, etc.) return error
  console.log(id);
  // if (isNaN(parseInt(id))) {
  //   return res.status(400).send({ message: "Nft id is not a number" });
  // }

  const nft = await Nft.findByPk(id, {});

  // if (nft === null) {
  //   return res.status(404).send({ message: "Nft not found" });
  // }

  res.status(200).send({ message: "ok", nft });
});

router.get("/purchases/", async (req, res, next) => {
  // try and catch so that we can catch the error if something wrong with api
  try {
    // declare var nfts that hold all nfts that comes from your our nfts "Model"
    const purchases = await Purchases.findAll();
    // send the nfts (array with objects) from endpoint
    res.status(200).send({ message: "ok", purchases });
    // we log the value of the property with name users from the object to console
  } catch (e) {
    next(e);
  }
});

module.exports = router;
