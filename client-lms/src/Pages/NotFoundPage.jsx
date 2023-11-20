import React from 'react'
import ErrorPage from '../Components/ErrorPage'

const NotFoundPage = () => {
    const statusCode = 404
    const errorMessage = "Page Not Found"
  return (
    <>
      <ErrorPage statusCode={statusCode} errorMessage={errorMessage}/>
    </>
  )
}

export default NotFoundPage
