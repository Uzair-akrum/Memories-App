import express from "express";

import sequelize from "./config/database";
import associate from "./utils/associations";
import routesIndex from "./routes/routesIndex";
const app = express();
app.use(express.json());

routesIndex(app);
app.listen(process.env.dev, async () => {
  await sequelize.sync({ alter: true }).then(async () => {
    associate();
    console.log("success");
  });

  console.log(`Server Runing on ${process.env.dev}`);
});
