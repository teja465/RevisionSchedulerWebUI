import React from 'react'

export default function Alert({type,message}) {
  return (
    <div class={`col-10 col-lg-12 text-center px-auto mx-auto alert alert-${type}`} role="alert">
        {message}
    </div>
  )
}
