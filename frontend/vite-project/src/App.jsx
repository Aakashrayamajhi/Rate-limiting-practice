import React, { useState } from "react";
import "./App.css";

function App() {

  const [data, setdata] = useState({
    username: "",
    password: ""
  });


  const [result, setresult] = useState(null);

  const handlesubmit = async (e) => {
  e.preventDefault()
  console.log(data)

    const res = await fetch("http://localhost:3000/api/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    setresult(result);
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
      <input
        type="text"
        placeholder="username"
        value={data.username}
        onChange={(e) => setdata({ ...data, username: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="password"
        value={data.password}
        onChange={(e) => setdata({ ...data, password: e.target.value })}
        required
      />

      <button type="submit">signup</button>
      </form>



      {result && <h2>{result.message}</h2>}

    </div>
  );
}

export default App;