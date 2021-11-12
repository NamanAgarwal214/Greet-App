import React from 'react'
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav class="navbar bg-dark">
            <h1>
                <Link to ='/'><i class="fa fa-google"></i><span className = "title"> Greetings</span></Link>
            </h1>
            <div class="buttons">
                    <Link to = "/register" class="btn btn-primary">Sign Up</Link>
                    <Link to = "/login" class="btn btn-light">Login</Link>
                </div>
        </nav>
    )
}

export default Navbar
