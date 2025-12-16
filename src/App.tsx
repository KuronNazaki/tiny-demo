import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(() =>
    Number.parseInt(localStorage.getItem("count") ?? "0")
  );

  useEffect(() => {
    localStorage.setItem("count", String(count));
  }, [count]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-dvh gap-5">
      <div className="flex gap-5 justify-center">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="font-semibold">Tiny Demo 1</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
