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

/* PR COMMENTS for the junior


------------------Line 3: function App() {

    This is working fine, but I think it would be nice to use new format of declaring functions in javascript.
    
    const App = () =>  { } 
    
    You can also check this link, it’s explaing pretty good: https://www.freecodecamp.org/news/arrow-function-javascript-tutorial-how-to-declare-a-js-function-with-the-new-es6-syntax/

------------------Line 8:  fetch("https://new.world.com/fleet/121")

    We can also catch the error case when this is failing:

    So having an extra parameters at the end(fetch, err) => that we can set the error in state. 

    Did you align with the PO if he mentioned anything about a loading indicator ? If this is the case we'd need to also add a loading state and display
    a loading indicator.

    Also, isn't this api url base already used somewhere ? Maybe we can reuse that const value that we consume in the other parts of the app for consistency.
    Would be nice to have one source of truth for the const values usually.
 

------------------Line 11-13: setFeul(json); console.log(json);
   
    Why do we need the whole json ? I don’t see we use the id anywhere, maybe we can just setFuel with the litres number.

    Also, I think you forgot to remove the console log.

    I will align with the team if we want to add an eslint-rule to not allow console logs. If that's the case, I will create a small backlog ticket for it.

------------------Line 16-20: useEffect(() => { if (!fuel) setAlertTxt("Processing..."); else if (fuel.litres > 0) setAlertTxt("Need to buy more fuel");  else setAlertTxt("All is fine");}, [fuel]);


    This useEffect is not needed, we could have a function that takes the fuel as prop and then return the needed alert.
    
    const alertText = getAlertText(fuel)
    
    Reason: the component re-renders after the fuel changes and we don’t make any mutation to the alert afterwards.

    I also see we instantiate the fuel with a number and then we use it as object.  That is not needed, we can use the just the number.

    Also, it would be good to have these values (Need to buy more fuel, Processing, ...) into consts to have one source of truth. Imagine we
    use it everywhere, then if they change, we'd need to change it everywhere. Also, this way we avoid typos and we can also import them
    into test cases directly.

------------------Line 24: <h1 style={alertText == "Need to buy more fuel" ? { color: "red" } : {}}>

    Is this how we use css in other parts of the project ? We should try to be consistent. If we don't use inline-styles, then we should try
    to use styled-components/tailwind/or other pattern we use in the project css wise.

    Instead of have the ? operator that returns nothing on the right side {}, generally doing it like condition && {color: "red"} would be more readable imo

    But I would recommend putting the logic outside in a const, for better readability, sth like:

    const shouldApplyRedColor = alert === MORE_FUEL_ALERT

    <h1 style={shouldApplyRedColor && {color: "red"}}

    You should also use '===' instead of '==' you can check this link explanation: https://www.guru99.com/difference-equality-strict-operator-javascript.html

 ------------------General comment: Good progress, let me know if you need guidance or further explanations, happy to help!
}

*/
