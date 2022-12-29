import { defaultMaxListeners } from "events";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Memories", "postgres", "5432", {
  host: "localhost",
  dialect: "postgres",
});
sequelize
  .authenticate()
  .then(() => console.log("DB"))
  .catch((err) => console.log(err));
export default sequelize;
  