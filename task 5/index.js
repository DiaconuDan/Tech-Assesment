import React, { useEffect, useState } from "react";

function App() {
  var [fuel, setFeul] = useState(0);
  var [alertText, setAlertTxt] = useState("Processing...");

  useEffect(() => {
    fetch("https://new.world.com/fleet/121")
      .then((response) => response.json())
      .then((json) => {
        setFeul(json);
        console.log(json);
      });
  });

  useEffect(() => {
    if (!fuel) setAlertTxt("Processing...");
    else if (fuel.litres > 0) setAlertTxt("Need to buy more fuel");
    else setAlertTxt("All is fine");
  }, [fuel]);

  return (
    <div>
      <h1 style={alertText == "Need to buy more fuel" ? { color: "red" } : {}}>
        {alertText}
      </h1>
    </div>
  );
}

export default App;


