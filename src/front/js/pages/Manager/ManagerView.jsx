import React, { useState, useEffect, useContext} from 'react'
import { Context } from "../../store/appContext.js"

import { ManagerNavbar } from '../../component/Manager/ManagerNavbar.jsx'
import { ManagerDashboard } from '../../component/Manager/ManagerDashboard.jsx'

export const ManagerView = () => {
  const { store, actions } = useContext(Context)
    
    useEffect(()=>{
        actions.getUser()
    },[])

  return (
    <div>
      <ManagerNavbar />
      <ManagerDashboard />
    </div>
  )
}

