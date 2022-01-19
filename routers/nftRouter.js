const { Router } = require("express");
const sequelize = require("sequelize");
// const auth = require("../auth/middleware");
const { nft, user } = require("../models");
// const { SALT_ROUNDS } = require("../config/constants");
// const authMiddleware = require("../auth/middleware");

const router = new Router();

//F1 and F2 Get all nfts

router.get("/", async (req, res, next) => {
  // try and catch so that we can catch the error if something wrong with api
  try {
    // declare var nfts that hold all nfts that comes from your our nfts "Model"
    const nfts = await nft.findAll();
    // send the artworks (array with objects) from endpoint
    res.status(200).send({ message: "ok", nfts });
    // we log the value of the property with name users from the object to console
  } catch (e) {
    next(e);
  }
});

// ENDPOINT FOR F4
// We need to create a new entry in our DB --> post
// later for auth: router.post("/:id/new", authMiddleware, async (req, res, next) => {
router.post("/:id/new", authMiddleware, async (req, res, next) => {
  try {
    // data is coming from the body as we get it from the frontend form
    // we read the artworkId from the URL (:id parameter) and store it as an integer in the artworkId variable:
    const artworkId = req.params.id;
    // what are we going to create in DB:
    const { email, amount } = req.body;
    console.log("params", req.params);
    console.log("body", req.body);

    // sequelize loads an array "bits" for us automatically, because `artwork` and `bid` models have a one-to-many relationship
    const updatedArtwork = await artwork.findByPk(artworkId, {
      include: [bid],
    });
    console.log({ artworkId, updatedArtwork });
    // if there are already any bids (updatedArtwork.bids.length > 0), then we take the maximum amount of the existing bids (Math.max(...updatedArtwork.bids.map(bid => bid.amount)))
    // otherwise, we read the `minimumBid` from the artwork itself.
    // spread operator
    const minimumBid =
      updatedArtwork.bids.length > 0
        ? Math.max(...updatedArtwork.bids.map((bid) => bid.amount)) // math.max returns highest value, if empty array returns infinity
        : updatedArtwork.minimumBid;

    if (amount > minimumBid) {
      // We need to validate first but under the right circumstances create a new amount (so a new bid)
      const newBid = await bid.create({ email, amount, artworkId, minimumBid });
      updatedArtwork.bids.push(newBid);
      // I need to send a response
      // write if statements to decide when to update
      res.send({
        // send the updated artwork back to the frontend
        artwork: updatedArtwork,
        // set success on true
        success: true,
        // we dont send an error message back so error can be null
        error: null,
      });
    } else {
      res.status(400).send({
        artwork: updatedArtwork, // `updatedArtwork` is actually not updated in this case!
        success: false,
        error: "the bid is not high enough",
      });
    }
  } catch (e) {
    next(e);
  }
});

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;

//   console.log(id);
//   if (isNaN(parseInt(id))) {
//     return res.status(400).send({ message: "Nft id is not a number" });
//   }

//   const nft = await nft.findByPk(id, {
//     include: [Story],
//     order: [[Story, "createdAt", "DESC"]],
//   });

//   if (space === null) {
//     return res.status(404).send({ message: "Space not found" });
//   }

//   res.status(200).send({ message: "ok", space });
// });

module.exports = router;
