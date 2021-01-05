import React from "react";
import "./App.css";
import Menu from "./components/menu";

const Manifesto = ({ navigation }) => {
  return (
    <div className="App">
      <div className="Content">
        <Menu />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "images/Manifesto.png"}
            alt="img"
            style={{
              maxWidth: 400,
              margin: "auto",
              alignSelf: "center",
              marginBottom: 50,
            }}
            // style={{ width: 24 }}
          />
          <p style={{ color: "#9d9d9d", fontSize: 32 }}>
            Our society is{" "}
            <span style={{ color: "white" }}>
              addicted to digital consumption.
            </span>{" "}
            Many of us spend a quarter of our days on Youtube, Twitter or
            Instagram. We know there is a problem, some of us have even tried to
            quit. But{" "}
            <span style={{ color: "white" }}>it all seems futile.</span> We
            always find ourselves coming back to the same addictive platforms.
            <p />
            Social platforms has progressed into a vicious competition for
            attention and the result appears to be a "race to the bottom of the
            brain cell". It is becoming increasingly obvious that winning
            content must tap into our basic desires (food, gossip, sex) or
            highlight news that reinforce our current beliefs.
            <p />
            With greater awareness comes more conscious usage of these
            platforms.{" "}
            <span style={{ color: "white" }}>
              Conspicuous consumption. That’s the goal.
            </span>{" "}
            Watchtime aims to shed light on our excessive Youtube usage, so we
            can make better decisions.
            <p />
            We aim for a transparent world, where we{" "}
            <span style={{ color: "white" }}>
              use these platforms as tools for our benefit and not our demise.
            </span>
            There is a wealth of knowledge out the at our finger tips.{" "}
            <span style={{ color: "white" }}>Let’s get started.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Manifesto;
