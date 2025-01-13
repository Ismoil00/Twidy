// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Registration from "./pages/auth/registration";
import Login from "./pages/auth/login";
// import Button from "./components/button";
// import Input from "./components/input";

function App() {
  // const [val, setVal] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
      {/* <Button text={"TEST"} onClick={() => console.log("clicked")} />
      <Input
        type="text"
        onChange={(e: any) => {
          console.log(e.target.value);
          setVal(e.target.value);
        }}
        placeholder="This is a test"
        value={val}
        name="test"
        label="this is for test"
      /> */}
    </div>
  );
}

export default App;
