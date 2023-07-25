import express from "express";
import router from "./router.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use("/api", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error occurs!");
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on port ${port}`));
