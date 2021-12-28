import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test("Renders blog info", () => {
  const blogContent = {
    title: 'A blog',
    author : 'An author',
    user : {
      username: 'Username'
    },
    url: 'url.com',
    likes: 12
  }

  const component = render(<Blog blog={blogContent} />);
  const container = component.container.querySelector('.blogInfo');
  const header = component.container.querySelector('.blogHeader');
  const details = component.container.querySelector('.blogDetails')

  expect(container).toHaveTextContent(
    "A blog by An author"
  );
  expect(details).toHaveStyle(
    'display: none'
  );
})
