import React from 'react'
import ErrorPage from '../../Components/ErrorPage'

const DeniedPage = () => {
    const statusCode = 401
    const errorMessage = "Unauthorized! You are not an Admin."
  return (
    <>
      <ErrorPage statusCode={statusCode} errorMessage={errorMessage}/>
    </>
  )
}

export default DeniedPage
