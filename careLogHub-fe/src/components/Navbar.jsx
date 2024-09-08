import {Link} from "react-router-dom";

const Navbar = () =>{
    return (
        <header>
            <div  className="container">
                <Link to = "/"><h1>Care Log Hub</h1></Link>
                <Link to = "/login">Login</Link>
                <Link to = "/register">Register</Link>

            </div>
        </header>
    )
}
export default Navbar