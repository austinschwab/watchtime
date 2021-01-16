import React, { useEffect } from "react";
import "./App.css";
import Menu from "./components/menu";
import { Link } from "react-router-dom";
import ScrollToTop from "./functions/scrollToTop";

const Manifesto = ({ navigation }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Content">
      <Menu />
      <div className="IntroSection full-width flex column margin-auto">
        <h1 className="ManifestoTitle white text-center">Manifesto</h1>
        <p className="grey" style={{ fontSize: 32 }}>
          Our society is{" "}
          <span className="white">addicted to digital consumption.</span> Many
          of us spend a quarter of our days on Youtube, Twitter or Instagram. We
          know there is a problem, some of us have even tried to quit. But{" "}
          <span className="white">it all seems futile.</span> We always find
          ourselves coming back to the same addictive platforms.
          <p />
          Youtube's algorithm is designed to maximize watch time at any cost,
          and the result appears to be a{" "}
          <a
            style={{ color: "white" }}
            href="https://www.theatlantic.com/magazine/archive/2016/11/the-binge-breaker/501122/"
          >
            "race to the bottom of the brain cell."
          </a>
          <p />
          With greater awareness comes more conscious usage of these platforms.{" "}
          <span className="white">
            Conspicuous consumption. That’s the goal.
          </span>{" "}
          Watchtime aims to shed light on our excessive Youtube usage, so we can
          make better decisions.
          <p />
          We aim for a transparent world, where we{" "}
          <span className="white">
            use these platforms as tools for our benefit and not our demise.
          </span>
          There is a wealth of knowledge out there at our finger tips.{" "}
          <Link to={{ pathname: "/upload" }}>
            <span className="white">Let’s get started.</span>{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Manifesto;
