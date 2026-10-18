import "../App.css";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Meetora</h2>
        </div>
        <div className="navList">
          <p>Join as Guest</p>
          <p>Regitster</p>
          <div role="button">
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="landingMainContainerText">
          <h1>
            <span style={{ color: "#ff0026" }}>Connect</span> with you loved one
          </h1>
          <p>Cover a distance by Meetora</p>

          <div className="getStatedBtn">
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div className="landingMainContainerImage">
          <img src="/mobile.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
