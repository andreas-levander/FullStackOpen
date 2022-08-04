import { render, screen } from "@testing-library/react";
import Todo from "./Todo";
import userEvent from "@testing-library/user-event";

let todo = {};

describe("Todo component works", () => {
  beforeEach(() => {
    todo = {
      text: "todo for testing",
      done: false,
    };
  });
  it("Todo is visible", () => {
    const { container } = render(<Todo todo={todo} />);

    const span = container.querySelector(".todoTextSpan");

    expect(span).toHaveTextContent("todo for testing");

    const div = container.querySelector(".notDoneInfo");

    expect(div).toHaveTextContent("This todo is not done");
  });

  it("Todo done is togglable", async () => {
    const todo = {
      text: "todo for testing",
      done: false,
    };
    const mockHandler = jest.fn();

    render(<Todo todo={todo} completeTodo={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText("Set as done");
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
