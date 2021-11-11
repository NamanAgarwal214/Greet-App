/* eslint-disable */
import { login } from './login';

const loginForm = document.querySelector('.form');

if(loginForm){
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('floatingInput').value;
        const password = document.getElementById('floatingPass').value;    
        login(email, password);
})
}
