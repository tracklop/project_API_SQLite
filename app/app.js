// NOTE - Imports
const express = require("express");
const app = express();
const memberRouter = require("./routes/member.routes");

// NOTE - Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/members", memberRouter);

app.use((req, res, next) => {
  res.status(404).send({ error: req.originalUrl + " not found" });
});

// NOTE - Start server
app.listen(3000, "0.0.0.0", () => {
  console.log("server started !");
});
