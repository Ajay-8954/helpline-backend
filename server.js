const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;

// Import routes
const routes = require("./routes/index");

// Use CORS middleware to allow requests from any origin
app.use(cors());

app.use(bodyParser.json());

// Use routes
app.use("/api", routes);

// to keep app alive in f1 plan
const keepAlive = () => {
  const options = {
    host: "https://helpline-backend.onrender.com", // Replace with your Azure app URL
    path: "/",
  };

  https
    .get(options, (res) => {
      console.log(`Keep-alive ping responded with: ${res.statusCode}`);
    })
    .on("error", (err) => {
      console.log(`Error in keep-alive request: ${err.message}`);
    });
};

// Send a request every 15 minutes to keep the app active
setInterval(keepAlive, 900000); // 900000 ms = 15 minutes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
