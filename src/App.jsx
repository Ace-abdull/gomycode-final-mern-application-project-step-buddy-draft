import { useEffect, useMemo, useState } from "react";
import "./App.css";

const dailyGoal = 8000;

function App() {
  const [steps, setSteps] = useState(6420);
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Theme persistence is a nice-to-have for the prototype.
    }
  }, [dark]);

  const progress = Math.min(Math.round((steps / dailyGoal) * 100), 100);
  const remaining = Math.max(dailyGoal - steps, 0);

  const friends = useMemo(
    () => [
      { name: "Amina", steps: 10234, color: "mint" },
      { name: "Sam", steps: 8234, color: "blue" },
      { name: "Lina", steps: 5560, color: "sun" },
    ],
    [],
  );

  return (
    <div className="landing">
      <header className="topbar">
        <div className="brand" aria-label="WalkUp">
          <span className="brand-mark" aria-hidden="true">
            W
          </span>
          <div>
            <h1>WalkUp</h1>
            <p>Daily walking circle</p>
          </div>
        </div>

        <button
          className="theme-toggle"
          type="button"
          onClick={() => setDark((current) => !current)}
        >
          {dark ? "Light" : "Dark"}
        </button>
      </header>

      <main className="home">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Prototype preview</span>
            <h2>Wake up the day with a cleaner step circle.</h2>
            <p>
              A simple landing-page concept for tracking today&apos;s pace,
              streak, and close friends without sending anyone off-page.
            </p>
          </div>

          <section className="counter-panel" aria-label="Today step progress">
            <div
              className="progress-ring"
              style={{ "--progress": `${progress}%` }}
            >
              <div className="progress-core">
                <span className="progress-kicker">Today</span>
                <strong>{steps.toLocaleString()}</strong>
                <span>steps</span>
              </div>
            </div>

            <div className="progress-meta">
              <div>
                <span>Goal</span>
                <strong>{dailyGoal.toLocaleString()}</strong>
              </div>
              <div>
                <span>Left</span>
                <strong>{remaining.toLocaleString()}</strong>
              </div>
              <div>
                <span>Done</span>
                <strong>{progress}%</strong>
              </div>
            </div>

            <div className="actions" aria-label="Prototype step controls">
              <button type="button" onClick={() => setSteps((value) => value + 500)}>
                +500 steps
              </button>
              <button type="button" onClick={() => setSteps(6420)}>
                Reset
              </button>
            </div>
          </section>
        </section>

        <section className="snapshot" aria-label="Walking snapshot">
          <article className="stat-card">
            <span className="stat-icon steps-icon" aria-hidden="true" />
            <div>
              <span>Streak</span>
              <strong>12 days</strong>
            </div>
          </article>
          <article className="stat-card">
            <span className="stat-icon pace-icon" aria-hidden="true" />
            <div>
              <span>Pace</span>
              <strong>5.2 km</strong>
            </div>
          </article>
          <article className="stat-card">
            <span className="stat-icon energy-icon" aria-hidden="true" />
            <div>
              <span>Energy</span>
              <strong>420 cal</strong>
            </div>
          </article>
        </section>

        <section className="social-strip" aria-label="Friends progress">
          <div className="section-heading">
            <span>Walking crew</span>
            <strong>Live today</strong>
          </div>

          <div className="friend-list">
            {friends.map((friend) => (
              <article className="friend" key={friend.name}>
                <span className={`avatar ${friend.color}`} aria-hidden="true">
                  {friend.name[0]}
                </span>
                <div>
                  <strong>{friend.name}</strong>
                  <span>{friend.steps.toLocaleString()} steps</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
