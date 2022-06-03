import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders content", () => {
  const blog = {
    title: "test title",
    author: "Test Author",
    url: "/tests/urls",
    likes: 0,
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blogdiv");

  expect(div).toHaveTextContent("test title Test Author");
  expect(div).not.toHaveTextContent("/tests/urls");

  const togglediv = container.querySelector(".togglableBlogContent");
  expect(togglediv).toBeNull();
});

test("show url and likes when clicking button", async () => {
  const blog = {
    title: "test title",
    author: "Test Author",
    url: "/tests/urls",
    likes: 15,
  };

  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  const togglediv = container.querySelector(".togglableBlogContent");
  expect(togglediv).toHaveTextContent("/tests/urls");
  expect(togglediv).toHaveTextContent("likes 15");
});

test("like button called twice", async () => {
  const blog = {
    title: "test title",
    author: "Test Author",
    url: "/tests/urls",
    likes: 15,
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} handleLikesClick={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  const likebutton = screen.getByText("like");
  await user.click(likebutton);
  await user.click(likebutton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
