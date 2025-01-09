import React from 'react'
import { Link } from 'react-router-dom'


function Error() {
  return (
    <div>
      <div className="error-page">
        <h2>Oops! Page not found.</h2>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="back-link">Go back to Login</Link>
      </div>
    </div>
  )
}

export default Error