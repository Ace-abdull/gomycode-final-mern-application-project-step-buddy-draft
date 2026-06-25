import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [steps, setSteps] = useState(() => 3245);
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light",
    );
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {}
  }, [dark]);

  const friends = [
    { name: "Amina", steps: 10234 },
    { name: "Sam", steps: 8234 },
    { name: "Lina", steps: 5560 },
    { name: "Omar", steps: 4123 },
  ];

  function addSteps(n = 200) {
    setSteps((s) => s + n);
  }

  return (
    <div className="landing">
      <header className="topbar">
        <div className="brand">
          <h1>StepBuddy</h1>
          <p className="tag">Walking prototype</p>
        </div>
        <div className="controls">
          <button
            className="theme-toggle"
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </div>
      </header>

      <main className="home">
        <section className="hero-card">
          <div className="steps">
            <h2>Today</h2>
            <div className="circle">
              <div className="steps-count">{steps.toLocaleString()}</div>
              <div className="steps-label">steps</div>
            </div>
            <div className="actions">
              <button className="primary" onClick={() => addSteps(500)}>
                +500
              </button>
              <button className="secondary" onClick={() => setSteps(0)}>
                Reset
              </button>
            </div>
          </div>

          <div className="friends">
            <h3>Friends</h3>
            <ul>
              {friends.map((f) => (
                <li key={f.name} className="friend">
                  <div className="avatar" aria-hidden>
                    {f.name[0]}
                  </div>
                  <div className="meta">
                    <div className="name">{f.name}</div>
                    <div className="fsteps">
                      {f.steps.toLocaleString()} steps
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="info">
          <p>Polished UI prototype. No navigation — just a landing page.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
