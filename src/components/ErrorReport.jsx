import React from 'react'
import { isRouteErrorResponse, useRouteError, Link } from 'react-router'
import URLError from './URLError';

const ErrorReport = () => {
  let error = useRouteError(); 
  if (isRouteErrorResponse(error)){
    return <URLError />
  }
}

export default ErrorReport