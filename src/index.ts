import express from "express";

import sequelize from "./config/database";
import associate from "./config/associations";
import routesIndex from "./routes/routesIndex";

const app = express();
app.use(express.json());

routesIndex(app);

app.listen(5000, async () => {
  await sequelize.sync({ alter: true }).then(async (data) => {
    associate();
    console.log("success");
  });

  console.log(`Server Runing on ${5000}`);
});
