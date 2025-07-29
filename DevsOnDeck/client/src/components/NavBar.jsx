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
            <div className="links">
               
                <h5>
                    <span>
                        <Link to="/devs/login">Dev Login</Link>
                    </span>
                    <span>
                        <Link to="/org/login">Org Login</Link> 
                    </span>
                </h5>
            </div>
        </nav>
    );
}