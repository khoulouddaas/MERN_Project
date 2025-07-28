import { Link } from 'react-router-dom'; 
import '../App.css'; 

export const NavBar = () => {
    return (
        <nav className="navbar">
            <h1>
                <span>
                    <Link to="/">DevsOnDeck</Link> 
                </span>
            </h1>
            <h5></h5> 
            <div className="links">
                <h5>
                    <span>
                        <Link to="/devs/register">Register</Link>
                    </span>
                </h5>
                <h5>
                    <span>
                        <Link to="/devs/login">Dev Login</Link> 
                    </span>
                    
                </h5>
            </div>
        </nav>
    );
}