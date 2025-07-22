// const express = require('express');
// const{handleGenerateNewShortURL}=require('../controllers/url');

// const router = express.Router();
// router.post("/", handleGenerateNewShortURL);


// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const URL = require("../models/url");

// router.get("/:shortId", async (req, res) => {
//   const { shortId } = req.params;
//   const entry = await URL.findOne({ shortId });

//   if (!entry) {
//     return res.status(404).send("Short URL not found");
//   }

//   entry.visitHistory.push({ timestamp: Date.now() });
//   await entry.save();

//   res.redirect(entry.redirectURL);  // 🔁 perform the actual redirect
// });

// module.exports = router;




const express = require("express");
const { handleGenerateNewShortURL, handleGetAnalytics} = require("../controllers/url");
const URL = require("../models/url");

const router = express.Router();

// This creates the short URL
router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);
// This redirects to the original long URL
router.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const entry = await URL.findOne({ shortId });

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  entry.visitHistory.push({ timestamp: Date.now() });
  await entry.save();

  res.redirect(entry.redirectURL);
});

router.get('/analytics/:shortId', handleGetAnalytics)
module.exports = router;
