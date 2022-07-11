import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./calculateExercises";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;

  if (!weight || !height || isNaN(Number(weight)) || isNaN(Number(height))) {
    return res.send({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(Number(height), Number(weight));
  return res.send({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target || !Array.isArray(daily_exercises))
    return res.status(400).send({
      error: "parameters missing",
    });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  for (const num of [...daily_exercises, target]) {
    if (isNaN(Number(num)))
      return res.status(400).send({
        error: "malformatted parameters",
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
