import { CourseParts } from "./Content";

const Total = ({ courseParts }: { courseParts: CourseParts[] }) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

export default Total;
