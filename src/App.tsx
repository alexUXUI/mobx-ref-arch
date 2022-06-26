import { autorun, makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import "./App.css";

interface ITimer {
  secondsPassed: number;
  increase: () => void;
  reset: () => void;
}

// Model the application state.
class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);

    autorun(() => {
      console.log(`Seconds passed: ${this.secondsPassed}`);
    });
  }

  increase() {
    this.secondsPassed += 1;
  }

  reset() {
    this.secondsPassed = 0;
  }
}

const myTimer = new Timer();

// UI that uses the observable state.
const TimerView = observer(({ timer }: { timer: ITimer }) => (
  <button onClick={() => timer.reset()}>
    Seconds passed: {timer.secondsPassed}
  </button>
));

// Update the 'Seconds passed: X' text every second.
setInterval(() => {
  myTimer.increase();
}, 1000);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TimerView timer={myTimer} />
      </header>
    </div>
  );
}

export default App;
