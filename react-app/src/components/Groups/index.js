import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GroupCard from "./GroupCard";
import './Groups.css'


const Groups = () => {
  const dispatch = useDispatch();
  const groups = useSelector(state => state.chatRooms)
  const groupsArray = Object.values(groups.subscribed)

  useEffect(() => {
  }, [groups]);

  return (
    <>
      {groupsArray.map((group, idx) => {
        return <GroupCard key={idx} group={group} />
      })}
    </>
  )
}

export default Groups
