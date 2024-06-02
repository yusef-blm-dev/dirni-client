import "./home.css";

import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import productiveImage from "../../assets/productive_1.svg";

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <div className="container-general">
          <div className="home-body">
            <div className="body-right">
              <h1>
                Welcome to <span>DoMe</span>
                <br />
                Your Productivity Partner
              </h1>
              <p>
                DoMe is designed to help you manage your tasks efficiently.
                Enjoy features like task prioritization, reminders, and seamless
                collaboration.
              </p>
              <Link to={"/profile"} className="home-right-link">
                Start your journey now
              </Link>
            </div>
            <div className="body-left">
              <img
                src={productiveImage}
                alt="home image"
                className="home-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
