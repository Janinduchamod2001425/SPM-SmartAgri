import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoutes.js";
import geneticRoutes from "./routes/geneticRoutes.js";
import pestRoutes from "./routes/pestRoutes.js";
import fertilizerRoutes from "./routes/fertilizerRoutes.js";
import warehouseRoute from "./routes/warehouseRoutes.js";
import diseaseRoute from "./routes/diseaseRoutes.js";


const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGO_URL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/api", route);
app.use("/api", geneticRoutes);
app.use("/api", pestRoutes);
app.use("/api", fertilizerRoutes);
app.use("/api", warehouseRoute);
app.use("/api", diseaseRoute);

