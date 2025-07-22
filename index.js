const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require('./models/url');
const app = express();
const PORT = 8001;

app.use(express.json());
app.use("/url", urlRoute);

// connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
//   console.log("MongoDB connected");
//   app.use(express.json())
//   app.listen(PORT, () => {
//     console.log(`Server Started at PORT: ${PORT}`);
//   });
// }).catch((err) => {
//   console.error("MongoDB connection failed:", err);
// });

app.get('/:shortId', async(req,res) =>{
  const shortId = req.params.shortId;
  const entry= await URL.findOneAndUpdate(
    {
    shortId
  },
  {
    $push: {
    visitHistory: {
      timestamp: Date.now(),
    },
  },
}
);
res.redirect(entry.redirectURL);
});

(async () => {
  try {
    await connectToMongoDB("mongodb://localhost:27017/short-url");
    console.log("MongoDB connected");

    app.listen(PORT, () =>
      console.log(`Server listening on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌  MongoDB connection failed:", err.message);
    process.exit(1);              
  }
})();
