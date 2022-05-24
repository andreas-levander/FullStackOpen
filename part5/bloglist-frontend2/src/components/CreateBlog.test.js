import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import CreateBlog from './CreateBlog'
import userEvent from '@testing-library/user-event'

test('create blog form sends correct data', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<CreateBlog handleCreateBlog={createBlog}/>)

  const title_input = screen.getByPlaceholderText('title')
  const url_input = screen.getByPlaceholderText('url')
  const author_input = screen.getByPlaceholderText('author')

  const sendButton = screen.getByText('create')

  await user.type(title_input, 'test title' )
  await user.type(url_input, 'test url' )
  await user.type(author_input, 'test author' )

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test title')
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].url).toBe('test url')
})