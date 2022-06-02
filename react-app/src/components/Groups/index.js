import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import GroupCard from "./GroupCard";
import GroupForm from "./GroupForm";
import Chat from "../Chat";
import './Groups.css'


const Groups = ({ all, single, form }) => {
  const dispatch = useDispatch();
  const { groupId } = useParams()
  const groups = useSelector(state => state.chatRooms)
  const groupsArray = Object.values(groups.subscribed)
  const singleGroup = groupsArray[groupId]


  useEffect(() => {
  }, [groups]);

  return (
    <>
      {/* {groupsArray.map((group, idx) => {
        return <GroupCard key={idx} group={group} />
      })} */}
      {all && <div className="group-container">
        {groupsArray.map((group, idx) => {
          return <GroupCard key={idx} group={group} nav={true} />
        })}
      </div>}

      {all && <div className="group-container">
        {groupsArray.map((group, idx) => {
          return <GroupCard key={idx} group={group} all={true} />
        })}
      </div>}

      {single && <GroupCard group={singleGroup} single={true} />}
      {single && <Chat group={true} subscribed={true} />}

      {!single && form && <GroupForm />}
    </>
  )
}

export default Groups
