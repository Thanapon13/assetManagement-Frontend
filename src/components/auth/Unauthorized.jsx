import React from 'react'
import { useNavigate } from 'react-router-dom'
const Unauthorized = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  return (
    <div>
      <h1>Unauthorized</h1>
      <br />
      <p>you can't access to this page</p>
      <button type="button" className="bg-red-200" onClick={goBack}>
        Go Back
      </button>
    </div>
  )
}

export default Unauthorized
