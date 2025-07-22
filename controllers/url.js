// const {nanoid} = require("nanoid"); 
// const URL=require('../models/url');
// async function handleGenerateNewShortURL(req,res){
//     const body=req.body;
//     if(!body.url) return res.status(400).json({error:'url is required'})
//     const shortID =nanoid(8);
//     await URL.create({
//         shortID: shortID,
//         redirectURL: body.url,
//         visitHistory:[],
//     });
//     return res.json({id: shortID});
// }
// module.exports={
//     handleGenerateNewShortURL,
// };


const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "url is required" });

  const shortId = nanoid(8);           // 🔑 keep the variable lowercase‑d

  try {
    await URL.create({
      shortId,                         // 🔑 match the schema field exactly
      redirectURL: url,
      visitHistory: [],
    });

    return res.status(201).json({ id: shortId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics
};

