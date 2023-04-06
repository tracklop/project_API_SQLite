// NOTE - Imports
const express = require("express");
const app = express();
// const router = require("./routes/routes");
// const hotelRouter = require("./routes/hotel.routes");
// const clientsRouter = require("./routes/clients.routes");

// NOTE - Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/", router);
// app.use("/hotel", hotelRouter);
// app.use("/clients", clientsRouter);

app.use((req, res, next) => {
  res.status(404).send({ error: req.originalUrl + " not found" });
});

// NOTE - Start server
app.listen(3000, "0.0.0.0", () => {
  console.log("server started !");
});
