interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (period: Array<number>, target: number): Result => {
  const periodLength = period.length;
  const trainingDays = period.filter((n) => n !== 0).length;
  const average = period.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  let rating = 2;
  let ratingDescription = "not too bad but could be better";
  if (success) {
    rating = 3;
    ratingDescription = "great job";
  } else if (average / target < 0.5) {
    rating = 1;
    ratingDescription = "do better next time";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

interface ExerciseArgs {
  period: Array<number>;
  target: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const period: Array<number> = [];
  for (let i = 2; i < args.length - 1; i++) {
    let current = Number(args[i]);
    if (!isNaN(current)) {
      period.push(current);
    } else {
      throw new Error("Provided values were not numbers!");
    }
  }
  const target = Number(args[args.length - 1]);

  if (isNaN(target)) throw new Error("Provided values were not numbers!");

  return { period, target };
};

try {
  const { period, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(period, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
