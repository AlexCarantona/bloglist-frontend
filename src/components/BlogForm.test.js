import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';


describe('Testing BlogForm component...', () => {

  let component;
  const saveFn = jest.fn();
  const blogContent = {
    title: 'A blog',
    author : 'An author',
    url: 'url.com'
  };

  beforeEach(() => {
    component = render(<BlogForm
      newBlogHandler={saveFn}
      />);
  });

  test("BlogForm handler is called with right arguments", () => {
    fireEvent.change(
      component.container.querySelector('#newTitle'),
      {target: { value: blogContent.title} }
    );
    fireEvent.change(
      component.container.querySelector('#newAuthor'),
      {target: { value: blogContent.author} }
    );
    fireEvent.change(
      component.container.querySelector('#newUrl'),
      {target: { value: blogContent.url} }
    );
    fireEvent.submit(
      component.container.querySelector('#newBlogForm')
    );

    expect(saveFn.mock.calls).toHaveLength(1);
    expect(saveFn.mock.calls[0][0]).toEqual({
      title: 'A blog',
      author: 'An author',
      url: 'url.com'
    })
  });

})
