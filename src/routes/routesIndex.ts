import userRoutes from "../routes/userRoutes";
import postRoutes from "../routes/postRoutes";

const routesIndex = (app) => {
  app.use("/user", userRoutes);
  app.use("/post", postRoutes);
};
export default routesIndex;
