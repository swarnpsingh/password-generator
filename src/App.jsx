import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {

  //Initializing the variables using useState, so that we don't have to keep updating it everytime, we can just update it once and it'll update everywhere.
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("") //we'll later set the password using this

  //we use useRef hook to take reference of a particular element
  const passRef = useRef(null);
  let isCopy = false;

  //Function to generate a new password everytime when it is called
  const generatePassword = useCallback(() => {
    let pass = "" //generated password will be appended here
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyz"
    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "~!@#$%^&*()-_{}|:<>?/.,';[]"

    //Loop for retrieving the str, num, char length times
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length) //generate a random number b/w 1 to length of str 
      pass += str.charAt(char) //appending the password to the pass string
    }
    setPassword(pass)
  }, [length,numberAllowed,charAllowed, setPassword])

  //copy the text in the input field
  const copyToClipboard = useCallback(() => {
    isCopy = true;
    passRef.current?.select() //highlights the selected text
    window.navigator.clipboard.writeText(password) //copies the text inside password
    alert("text has been copied")
  }, [password])

  //For calling our password generator function
  //To prevent re-rendering we use another React Hook useEffect
  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed, setPassword]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 bg-white"
          placeholder="Password"
          readOnly
          ref={passRef}
        />
        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyToClipboard}>
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label htmlFor="">Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;

//ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyz   0123456789  `~!@#$%^&*()-_{}|:<>?/.,';[]
