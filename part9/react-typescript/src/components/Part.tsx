import { CoursePart } from "../types";
import { useCallback } from "react";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  const renderContent = useCallback(() => {
    switch (part.type) {
      case "normal":
        return <p>{part.description}</p>;
      case "groupProject":
        return <p>project exercises {part.groupProjectCount}</p>;
      case "submission":
        return (
          <div>
            <p>{part.description}</p>
            <p>submit to {part.exerciseSubmissionLink}</p>
          </div>
        );
      case "special":
        return (
          <div>
            <p>{part.description}</p>
            <p>required skills: {part.requirements.join(", ")}</p>
          </div>
        );
      default:
        return assertNever(part);
    }
  }, [part.type]);

  return (
    <div>
      <p>
        <b>
          {part.name} {part.exerciseCount}
        </b>
      </p>
      {renderContent()}
    </div>
  );
};

export default Part;
