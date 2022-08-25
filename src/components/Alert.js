import React from 'react'

export default function Alert({type,message}) {
  return (
    <div className={`col-10 col-lg-12 text-center px-auto mx-auto alert alert-${type}`} role="alert">
        {message}
    </div>
  )
}
