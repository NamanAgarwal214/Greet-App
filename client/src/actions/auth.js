import axios from 'axios'

export const login = ({ email, password}) => async dispatch => {
    const config = {
       headers: {
           'Content-Type': 'application/json'  
          }
    }
     const body = JSON.stringify({ email, password});

     try {
         //post url update krdena
         const res = await axios.post('/api/auth', body, config);
         dispatch({
             type: 'LOGIN_SUCCESS',
             payload: res.data
         })
     } catch (err) {
    
         dispatch({
             type: 'LOGIN_FAIL'
         })
     }
};