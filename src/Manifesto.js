import React from "react";
import "./App.css";

const Manifesto = ({ navigation }) => {
  return (
    <div className="App">
      <div className="Content">
        <div className="Menu">
          <img
            src={process.env.PUBLIC_URL + "images/watchtime_logo.png"}
            alt="img"
            style={{ width: 125 }}
          />
          <div className="IntroSection">
            <img
              src={process.env.PUBLIC_URL + "images/Manifesto.png"}
              alt="img"
              style={{ maxWidth: 400, margin: "auto" }}
              // style={{ width: 24 }}
            />
            <p>
              Our society is addicted to digital consumption. Many of us spend a
              quarter of our days on Youtube, Twitter or Instagram. We know
              there is a problem, some of us have even tried to quit. But it all
              seems futile. We always find ourselves coming back to the same
              addictive platforms. Social platforms has progressed into a
              vicious competition for attention and the result appears to be a
              "race to the bottom of the brain cell". It is becoming
              increasingly obvious that "winning content" must tap into one of
              our basic desires (food, gossip, sex) or highlight "news" that
              reinforces our beliefs and tribal identities.With greater
              awareness comes more conscious usage of these platforms.
              Conspicuous consumption. That’s the goal. Watchtime.so aims to
              shed light on our excessive  Youtube usage, so we can make better
              decisions.We aim for a transparent world, where we use these
              platforms as tools for our benefit and not our demise. There is a
              wealth of knowledge out the at our finger tips. Let’s get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Manifesto;
