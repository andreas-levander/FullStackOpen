import { ContentProps } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((course) => (
        <Part key={course.name} part={course} />
      ))}
    </div>
  );
};

export default Content;
