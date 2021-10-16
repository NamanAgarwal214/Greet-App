/* eslint-disable */
import axios from 'axios';

export const login = async (email, password) => {
    console.log(email, password)
    try{
        const res = await axios({
        method: "POST",
        url: "https://127.0.0.1:5000/api/login",
        data: {
            email,
            password
        }
    })

    if(res.data.status === 'success'){
        alert('Logged in successfully');
        Window.setTimeout(() => {
            Location.assign('/');
        }, 1500)
    }
    console.log(res.data);
}catch(err){
    console.log(err.response.data);
}
}