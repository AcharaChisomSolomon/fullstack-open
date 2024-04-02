import { useState } from "react";

const StatisticLine = ({ text, value }) => { 
  return (
    <p>{text} {value}</p>
  );

}

const Statistics = ({ good, neutral, bad }) => { 
  let total = good + neutral + bad;

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>

      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={(good - bad) / total} />
        <StatisticLine text="positive" value={(good / total) * 100 + " %"} />
      </div>
    </div>
  );
}

const Button = ({ onClick, text }) => { 
  return (
    <button onClick={onClick}>{text}</button>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>

      <div>
        <Button
          onClick={() => setGood(good + 1)}
          text="good"
        />
        <Button
          onClick={() => setNeutral(neutral + 1)}
          text="neutral"
        />
        <Button
          onClick={() => setBad(bad + 1)}
          text="bad"
        />
      </div>

      <h1>statistics</h1>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>);
};

export default App;
