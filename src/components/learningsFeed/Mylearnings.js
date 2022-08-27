import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import store from '../../store'
import UserLearningItem from './UserLearningItem'
export default function Mylearnings() {
    const [userState, setUserState] = useState(store.getState().user)
    const items =[
        {
            "id": 220,
            "username": "foo@ooo.opo9",
            "title": "learn redux",
            "description": "revise from docs",
            "createdOn": null,
            "updatedOn": null,
            "version": 0,
            "revisionSchedules": [
                {
                    "id": 221,
                    "userLearningId": 220,
                    "revisionCount": 1,
                    "revisionScheduleDate": "2022-09-06",
                    "createDate": "2022-08-27",
                    "user": null
                },
                {
                    "id": 222,
                    "userLearningId": 220,
                    "revisionCount": 2,
                    "revisionScheduleDate": "2022-09-21",
                    "createDate": "2022-08-27",
                    "user": null
                },
                {
                    "id": 223,
                    "userLearningId": 220,
                    "revisionCount": 3,
                    "revisionScheduleDate": "2022-10-11",
                    "createDate": "2022-08-27",
                    "user": null
                }
            ]
        },
        {
            "id": 224,
            "username": "foo@ooo.opo9",
            "title": "Revise js concepts",
            "description": "revise from docs",
            "createdOn": null,
            "updatedOn": null,
            "version": 0,
            "revisionSchedules": [
                {
                    "id": 225,
                    "userLearningId": 224,
                    "revisionCount": 1,
                    "revisionScheduleDate": "2022-09-06",
                    "createDate": "2022-08-27",
                    "user": null
                },
                {
                    "id": 226,
                    "userLearningId": 224,
                    "revisionCount": 2,
                    "revisionScheduleDate": "2022-09-21",
                    "createDate": "2022-08-27",
                    "user": null
                },
                {
                    "id": 227,
                    "userLearningId": 224,
                    "revisionCount": 3,
                    "revisionScheduleDate": "2022-10-11",
                    "createDate": "2022-08-27",
                    "user": null
                }
            ]
        },
        {
            "id": 228,
            "username": "foo@ooo.opo9",
            "title": "Eat chicken",
            "description": "revise from docs",
            "createdOn": null,
            "updatedOn": null,
            "version": 0,
            "revisionSchedules": [
                {
                    "id": 229,
                    "userLearningId": 228,
                    "revisionCount": 1,
                    "revisionScheduleDate": "2022-09-06",
                    "createDate": "2022-08-27",
                    "user": null
                },
                {
                    "id": 230,
                    "userLearningId": 228,
                    "revisionCount": 2,
                    "revisionScheduleDate": "2022-09-21",
                    "createDate": "2022-08-27",
                    "user": null
                },
                {
                    "id": 231,
                    "userLearningId": 228,
                    "revisionCount": 3,
                    "revisionScheduleDate": "2022-10-11",
                    "createDate": "2022-08-27",
                    "user": null
                }
            ]
        }
    ]

    useEffect(() => {
      console.log("page reloaded fetching users learning items")
      return () => {
      }
    }, [])

    const handleUnauthenticatedUserVisit = (userState)=>{
        if ( !userState.isLoggedIn){
            console.log("user dont have access to page , redirecting to login page")
            alert("Please login to acces this page")
            window.location.replace("/login")
        }
    }
    store.subscribe(()=>{
        console.log("My learnings subscribe",store.getState().user)
        setUserState(store.getState().user)
        if ( !store.getState().user.isLoggedIn) {
            handleUnauthenticatedUserVisit()
        }
    })

    useEffect(() => {
        console.log("Some state changed ",userState)

        // if (userState  == null){
        //     console.log("User state not updated yet")
        //     return ;
        // }
        handleUnauthenticatedUserVisit(userState)

       
        return () => {
        }
      },)
    
  return (
    <div>
        {/* {userState!=null && userState.isLoggedIn?"Logged in ":"Not logged in "}<br /> */}
        Mylearnings feed 
        <UserLearningItem item={items[1]}  />
        {items.map((ele)=><  UserLearningItem  item={ele}/>)}
        </div>
  )
}
