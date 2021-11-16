import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {removeAlert} from '../../redux/actions/flashMessage'

export default function FlashMessage() {
  const alert = useSelector(state => state.Alert)
  const dispatch = useDispatch()
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(removeAlert())
    }, 3000)

    return () => clearTimeout(timeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert])
  // console.log(alert);
  return (
    <div className="floating-alerts">
     {alert.message && <div className={"alert text-center floating-alert shadow-sm " + (alert.success ? "alert--success" : "alert--error")}>{alert.message}</div>}
     
    </div>
  )
}
