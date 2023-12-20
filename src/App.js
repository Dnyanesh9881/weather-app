import React, { useState } from "react";
import summer from "./images/summer.jpg";
import winter from "./images/winter.jpg";

const App = () => {
  const [latitude, setlatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [hemisphere, setHemisphere] = useState("");
  const [month, setMonth] = useState(() => {
    return new Date().getMonth() + 1;
  });

  function fetchLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.latitude);
        // console.log(position.coords.longitude);
        setlatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        if (position.coords.latitude > 0) {
          setHemisphere("Northen Hemisphere");
        } else if (position.coords.latitude < 0) {
          setHemisphere("Southern Hemisphere");
        } else {
          setHemisphere("Equator");
        }
      });
    } else {
      alert(
        "this browser does not support this app please kindly try in another browser"
      );
    }
  }

  return (
    <div>
      <button onClick={fetchLocation}>Fetch Location</button>
      <h1>Latitude: {latitude}</h1>
      <h1>Longitude: {longitude}</h1>
      <h1>Hemisphere: {hemisphere}</h1>
      <h1>Month: {month}</h1>

      {hemisphere &&
        ((hemisphere == "Northen Hemisphere" &&
        month >= 4 &&
        month <= 10) || (hemisphere == "Southern Hemisphere" &&
       (month < 4 ||
        month > 10))) && (
          <div>
            <h1>Summer Season</h1>
            <img src={summer} alt="Summer" />
          </div>
        )}
      {hemisphere &&
       ((hemisphere == "Northen Hemisphere" &&
        (month < 4 ||
        month > 10 )) || (hemisphere == "Southern Hemisphere" &&
        month >=5 &&
        month <=9 ))&& (
          <div>
            <h1>Winter Season</h1>
            <img src={winter} alt="winter" />
          </div>
        )}
    </div>
  );
};

export default App;
