const express = require("express");
const router = express.Router();

const stripe = require("stripe")("sk_test_EO8zl6KiktFv1mygvxCLOeHX00iTGhjQZ4");
router.use(require("body-parser").text());

router.post("/", async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});
module.exports = router;
