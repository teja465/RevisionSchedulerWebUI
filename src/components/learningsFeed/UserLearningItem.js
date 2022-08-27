import React from 'react'
import './userlearningitem.css'
export default function UserLearningItem({item}) {
  const {title , description ,revisions} = item;
  console.log(item,"item")
  return (
    <div className="user_learning_item">
        <hr />
    <span className='user_learning_item_title'>{title}</span> <br />
    <span className='user_learning_item_description'>{description}</span><br />
    <span>Revisions</span> :{revisions}<br />

    </div>
  )
}
