import express from "express";
import bodyParser from "body-parser";
import db from "./models";
import handleMembers from "./controllers/member";

const env = process.env.NODE_ENV || "development";
const app = express();

app.use(bodyParser.json());

handleMembers(app, db);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ environment: env, description: "ADMV Rest API" });
});

app.listen(3000);
console.log("Listening port ", 3000); // eslint-disable-line no-console

export default app;
