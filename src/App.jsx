import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // Initializing state variables using useState to manage their values.
  const [length, setLength] = useState(8); // Tracks the length of the password.
  const [numberAllowed, setNumberAllowed] = useState(false); // Tracks whether numbers are allowed in the password.
  const [charAllowed, setCharAllowed] = useState(false); // Tracks whether special characters are allowed in the password.
  const [password, setPassword] = useState(""); // Holds the generated password.

  // useRef is used to reference a DOM element.
  const passRef = useRef(null); // Reference to the password input field.
  let isCopy = false; // Flag to track if the password has been copied.

  // Function to generate a new password based on current settings.
  const generatePassword = useCallback(() => {
    let pass = ""; // Generated password will be assembled here.
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // String containing alphabets.
    if (numberAllowed) str += "0123456789"; // Include numbers if allowed.
    if (charAllowed) str += "~!@#$%^&*()-_{}|:<>?/.,';[]"; // Include special characters if allowed.

    // Loop to construct the password.
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length); // Generate a random index.
      pass += str.charAt(char); // Append a character from 'str' to the password.
    }
    setPassword(pass); // Update the password state.
  }, [length, numberAllowed, charAllowed, setPassword]);

  // Function to copy the password to the clipboard.
  const copyToClipboard = useCallback(() => {
    isCopy = true; // Set copy flag to true.
    passRef.current?.select(); // Highlight the password text.
    window.navigator.clipboard.writeText(password); // Copy the text to clipboard.
    alert("Password has been copied!"); // Alert user that password has been copied.
  }, [password]);

  // Call generatePassword function when component mounts or dependencies change.
  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, setPassword]);

  return (
    <div
      className="body w-screen h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`
      }}
    >
      <div 
      className="w-full mx-auto max-w-md  border-gray-50 rounded-lg p-5 backdrop-blur-sm font-medium bg-white/30 text-orange-500"
      >
        <h1 className="text-white text-center my-3 text-4xl pt-4">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 mt-8">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white"
            placeholder="Password"
            readOnly
            ref={passRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 select-none"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 mt-8 mb-8">
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
                setNumberAllowed((prev) => !prev);
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
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

//ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz   0123456789  `~!@#$%^&*()-_{}|:<>?/.,';[]
