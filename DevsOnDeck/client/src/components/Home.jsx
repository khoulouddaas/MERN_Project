import { useNavigate } from "react-router-dom";
import "../App.css";

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to DevsOn Deck!</h1>
            <p className="home-subtitle">
                Developers: Land your next dream job. <br />
                Companies: Discover top talent ready to work.
            </p>

            <div className="home-buttons">
                <button
                    className="btn btn-developer"
                    onClick={() => navigate('/devs/register')}
                >
                    Join as Developer
                </button>
                <button
                    className="btn btn-company"
                    onClick={() => navigate('/org/register')}
                >
                    Register as Company
                </button>
            </div>
        </div>
    );
};

export default Home;
