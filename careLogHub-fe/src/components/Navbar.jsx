import {Link} from "react-router-dom";

const Navbar = () =>{
    return (
        <header>
            <div className="container">
                <Link to= "/"><h1>Daily Log Hub</h1></Link>
                <Link to ="/register">Register</Link>
                <Link to = "/login">Sign In</Link>
            </div>
        </header>
    )
}

export default Navbar