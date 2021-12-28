import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';


describe('Testing Blog component...', () => {

  let component;
  const updateHandler = jest.fn();
  const blogContent = {
    title: 'A blog',
    author : 'An author',
    user : {
      username: 'Username'
    },
    url: 'url.com',
    likes: 12
  };

  beforeEach(() => {
    component = render(<Blog
      blog={blogContent}
      updateHandler={updateHandler} />);
  });

  test("Renders blog info (only header)", () => {
    const header = component.container.querySelector('.blogHeader');
    expect(header).toHaveTextContent(
      "A blog by An author"
    );
    const button = component.container.querySelector('button');
    expect(button).toHaveTextContent(
      "Details"
    );
    const details = component.container.querySelector('.blogDetails');
    expect(details).toHaveStyle(
      'display: none'
    );
  });

  test("Renders blog details when 'details' is clicked.", () => {
    const button = component.container.querySelector('button');
    fireEvent.click(button);
    expect(button).toHaveTextContent(
      "Hide"
    );
    const details = component.container.querySelector('.blogDetails');
    expect(details).not.toHaveStyle(
      'display: hide'
    );
  });

  test("Clicking 'like' button calls the like handler", () => {
    const likeButton = component.getByText('Like it!');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(updateHandler.mock.calls).toHaveLength(2);
    expect(updateHandler.mock.calls[0][0]).toBe(blogContent);
  })
})
