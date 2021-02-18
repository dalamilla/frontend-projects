/* Container */

class Clock extends React.Component {
  state = {
    break: 5,
    session: 25,
    status: "stopped",
    title: "Session",
    timer: 1500,
    intervalid: null
  }

  time = () => {
    let m = Math.floor(this.state.timer / 60);
    let s = this.state.timer - m * 60;
    s = s < 10 ? '0' + s : s;
    m = m < 10 ? '0' + m : m;
    return m + ':' + s;
  }

  reset = () => {
    clearInterval(this.state.intervalid);
    this.sound.pause();
    this.sound.currentTime = 0;
    this.setState({
      break: 5,
      session: 25,
      status: "stopped",
      title: "Session",
      timer: 1500,
      intervalid: null,
    })
  }

  countDown = () => {
    if (this.state.status === "stopped") {
      let intervalid = setInterval(() => {
        if (this.state.timer === 0) {
          clearInterval(intervalid);
          this.sound.play();
          if (this.state.title === "Session") {
            this.setState({
              status: "stopped",
              title: "Break",
              timer: this.state.break * 60
            })
          } else {
            this.setState({
              status: "stopped",
              title: "Session",
              timer: this.state.session * 60
            })
          }

          this.countDown();
        } else {
          this.setState({ timer: this.state.timer - 1 })
        }
      }, 1000);

      this.setState({
        status: "started",
        intervalid: intervalid
      })
    } else {
      clearInterval(this.state.intervalid);
      this.setState({
        status: "stopped",
        intervalid: null
      })
    }

  }

  handleBreak = (e) => {
    if (this.state.status === "stopped") {
      let breakValue = this.state.break;
      if (e.target.id === "break-increment" && breakValue >= 60) {
        return
      } else if (e.target.id === "break-increment" && breakValue >= 1) {
        breakValue++;
      } else if (e.target.id === "break-decrement" && breakValue != 1) {
        breakValue--;
      }
      this.setState({
        break: breakValue
      })
    }
  }

  handleSession = (e) => {
    if (this.state.status === "stopped") {
      let sessionValue = this.state.session;
      let timerValue = this.state.timer;

      if (e.target.id === "session-increment" && sessionValue >= 60) {
        return
      } else if (e.target.id === "session-increment" && sessionValue >= 1) {
        sessionValue++;
        timerValue = sessionValue * 60
      } else if (e.target.id === "session-decrement" && sessionValue != 1) {
        sessionValue--;
        timerValue = sessionValue * 60
      }

      this.setState({
        session: sessionValue,
        timer: timerValue
      })
    }
  }

  render() {
    return (
      <div className="clock">
        <div className="panel">
          <Display time={this.time} title={this.state.title} />
          <Control
            break={this.state.break}
            session={this.state.session}
            reset={this.reset}
            hBreak={this.handleBreak}
            hSession={this.handleSession}
            start={this.countDown}
          />
        </div>
        <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ref={(audio) => {
            this.sound = audio;
          }}
        />
      </div>
    )
  }
}


/* Presentational Components */

const Display = (props) => {
  return (
    <div className="display">
      <div id="timer-label">
        <span>{props.title}</span>
      </div>
      <div id="time-left" className="screen">
        <span>{props.time()}</span>
      </div>
      <div className="brand">
        <span>FreeCodeCamp</span>
      </div>
    </div>
  );
}

const Control = (props) => {
  return (
    <div className="control">
      <div className="control-setup">
        <div id="break-label">
          <div id="break-length">
            <span>{props.break}</span>
          </div>
          <div className="button-panel">
            <button id="break-decrement" onClick={props.hBreak}>-</button>
            <button id="break-increment" onClick={props.hBreak}>+</button>
          </div>
          <span>Break Length</span>
        </div>
        <div id="session-label">
          <div id="session-length">
            <span>{props.session}</span>
          </div>
          <div className="button-panel">
            <button id="session-decrement" onClick={props.hSession}>-</button>
            <button id="session-increment" onClick={props.hSession}>+</button>
          </div>
          <span>Session Length</span>
        </div>
      </div>
      <div className="control-action">
        <button id="start_stop" onClick={props.start} >
          <i className="fas fa-play"></i>
        </button>
        <button id="reset" onClick={props.reset} >
          <i className="fas fa-reply"></i>
        </button>
      </div>
    </div>
  )
}
ReactDOM.render(<Clock />, document.querySelector("#app"));