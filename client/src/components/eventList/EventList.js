import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";

export default function EventList() {
  const [occasions, setOccasions] = useState([])
  // let occasions;
  const getFriend = async () => {
    const token = localStorage.getItem('GreetToken')
    try {
      const res = await axios.get('/api/friend', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
        console.log(res.data.friends);
setOccasions(res.data.friends)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() =>  getFriend(), [])
  return (
    <Fragment>
      <div className="user-view">
        <div className="user-view__content">
          <section className="feature">
         <div className="container">
          <div className="col-md-12">
                  <div className="heading text-center wow  slideInUp animated">
                     <h3>Sooper is pretty big thing to explore</h3>
                     <h3>Checkout features:</h3>
                  </div>
               </div>
               <div className="row">
          {occasions.map(occasion => {
            return (
            <div className="col-md-4 col-sm-6">
                  <div className="feature-text text-center  wow  slideInLeft animated">
                     <div className="img-hover1"></div>
                     <h4>{occasion.name}</h4>
                     <Moment format="YYYY/MM/DD">{occasion.dateOfEvent}</Moment>
                     <p>{occasion.event}</p>
                  </div>
               </div>
            )
          })}
          </div>  
         </div>
      </section>
        </div>
      </div>
    </Fragment>
  )
};