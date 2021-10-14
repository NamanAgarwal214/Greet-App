const login = async (email, password) => {
    
    try{
        const res = await axios({
        method: "POST",
        url: "https://127.0.0.1:5000/api/login",
        data: {
            email,
            password
        }
    })
    console.log(res.response);
}catch(err){
    console.log(err);
}
}

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('floatingInput');
    const password = document.getElementById('floatingPass');
    login(email, password);
})