import React from 'react'
import './userlearningitem.css'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
  } from 'mdb-react-ui-kit';
import RevisionSchedule from './revisions/RevisionSchedule';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactTimeAgo from 'react-time-ago'

export default function UserLearningItem({item}) {
  const {title , description ,revisions} = item;
  const getFormattedDate =(date)=>{
    const numOfHours = -30 * 60 * 60 * 1000;
    return date.setTime(date.getTime()+numOfHours);
  }
  const revisionsList=[]
  item.revisionSchedules.map((ele,index)=>{
    revisionsList.push({
        id:index+1,
        date:ele.revisionScheduleDate
    })
  })
  return (
    <div className="user_learning_item">

    <MDBCard>
      <MDBCardBody>
        <div className='user_learning_item_title_holder'>
            <MDBCardTitle className='user_learning_item_title'>{title}</MDBCardTitle>
            <div className='user_learning_item_actions'>
                {item.createdOn != null && <ReactTimeAgo date={getFormattedDate(new Date(item.createdOn))} timeStyle="round-minute" />} &nbsp;
                <DeleteIcon  className='delete_icon'/>
            </div>

        </div>
        <MDBCardText className='user_learning_item_description'>
          {description}
        </MDBCardText>
        <RevisionSchedule revisionsList={revisionsList} />
      </MDBCardBody>
    </MDBCard>

    </div>
  )
}
