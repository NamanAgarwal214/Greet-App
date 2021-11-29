import React, { Fragment, useContext, useEffect } from "react";
import EventItem from "./EventItem";
import DispatchContext from "../../context/DispatchContext";
import axios from "axios";

export default function EventList() {
  const appDispatch = useContext(DispatchContext);
  let occasions = [];
  const getFriend = async (occasions) => {
    const token = localStorage.getItem('GreetToken')
    try {
      const res = await axios.get('/api/friend', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
        console.log(res.data.friends);
         occasions.push(res.data.friends);
    } catch (err) {
      console.log(err)
    }
  }
  useEffect( getFriend(occasions), [])
  return (
    <Fragment>
      <div className="user-view">
        <div className="user-view__content">
          {occasions.map((occasion) => (
            // <EventItem key={occasion._id} occasion={occasion} />
            <h1>{occasion}</h1>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
