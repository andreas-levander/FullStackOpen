interface ContentProps {
  courseParts: CourseParts[];
}

export interface CourseParts {
  name: string;
  exerciseCount: number;
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount} exercises
        </p>
      ))}
    </div>
  );
};

export default Content;
