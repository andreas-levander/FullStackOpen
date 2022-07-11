import express from "express";
import cors from "cors";
import apiRouter from "./routes/api";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
