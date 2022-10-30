import { margin } from '@mui/system'
import React from 'react'
import './homepage.css'
export default function HomePage() {
  return (
    <div className='homepage d-flex-column' >
        
        <a href='/login'>Login</a> <br />
        <a href='/signup'>Signup</a><br />
        <a href='/my-learnings'>My Learnings</a><br />
        <a href='/profile'> profile</a><br />

        </div>
  )
}
