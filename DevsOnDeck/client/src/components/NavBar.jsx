//import { CompanyLogout } from "./LogOutCompany";

export const NavBar = () => {
    return (
        <nav className="navbar">
            <h1>
                <span>
                    <a href="/">DevsOnDeck</a>
                </span>
            </h1>
            <h5>
               
            </h5>
            <div className="links">
                <h5>
                    <span>
                        <a href="/devs/register">Register</a>
                    </span>
                </h5>
                <h5>
                    <span>
                        <a href="/devs/login">Sign In</a>
                    </span>
                    <span>
                        <a className="navCompany" href="/company/register">Company</a>
                    </span>
                </h5>
            </div>
        </nav>
    );
}