/* Container */

class App extends React.Component {
  state = {
    currValue: '0',
    prevValue: '0',
    formula: '',
    currentSign: 'pos',
    lastClicked: '',
    evaluated: false
  }

  allClear = () => {
    this.setState({
      currValue: '0',
      prevValue: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: '',
      evaluated: false
    });
  }

  handleNumber = (e) => {

    if (!this.state.currValue.includes('Limit')) {
      const isOperator = /[x/+‑]/;
      const { currValue, formula, evaluated } = this.state;
      const value = e.target.value;
      this.setState({ evaluated: false });
      if (currValue.length > 18) {
        this.maxDigitWarning();
      } else if (evaluated) {
        this.setState({
          currValue: value,
          formula: value !== '0' ? value : ''
        });
      } else {
        this.setState({
          currValue:
            currValue === '0' || isOperator.test(currValue) ? value : currValue + value,
          formula:
            currValue === '0' && value === '0' ? (formula === ''
              ? value
              : formula)
              : (/([^.0-9]0|^0)$/.test(formula)
                ? formula.slice(0, -1) + value
                : formula + value)
        });
      }
    }

  }

  handleOperator = (e) => {

    if (!this.state.currValue.includes('Limit')) {
      const endsWithNegativeSign = /\d[x/+‑]{1}‑$/;
      const endsWithOperator = /[x+‑/]$/;
      const value = e.target.value;
      const { formula, prevValue, evaluated } = this.state;
      this.setState({ currValue: value, evaluated: false });
      if (evaluated) {
        this.setState({ formula: prevValue + value });
      } else if (!endsWithOperator.test(formula)) {
        this.setState({
          prevValue: formula,
          formula: formula + value
        });
      } else if (!endsWithNegativeSign.test(formula)) {
        this.setState({
          formula:
            (endsWithNegativeSign.test(formula + value) ? formula : prevValue) + value
        });
      } else if (value !== '‑') {
        this.setState({
          formula: prevValue + value
        });
      }
    }

  }

  handleDecimal = (e) => {
    let endsWithOperator = /[x+‑/]$/;

    if (this.state.evaluated === true) {
      this.setState({
        currValue: '0.',
        formula: '0.',
        evaluated: false
      });
    } else if (
      !this.state.currValue.includes('.') &&
      !this.state.currValue.includes('Limit')
    ) {
      this.setState({ evaluated: false });
      if (this.state.currValue.length > 21) {
        this.maxDigitWarning();
      } else if (
        endsWithOperator.test(this.state.formula) ||
        (this.state.currValue === '0' && this.state.formula === '')
      ) {
        this.setState({
          currValue: '0.',
          formula: this.state.formula + '0.'
        });
      } else {
        this.setState({
          currValue: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
          formula: this.state.formula + '.'
        });
      }
    }

  }

  handleEvaluate = () => {

    if (!this.state.currValue.includes('Limit')) {
      const endsWithOperator = /[x+‑/]$/;
      let expression = this.state.formula;
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression
        .replace(/x/g, '*')
        .replace(/‑/g, '-')
        .replace('--', '+0+0+0+0+0+0+');
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      expression = expression
        .replace(/\*/g, 'x')
        .replace(/-/g, '‑')
        .replace('+0+0+0+0+0+0+', '‑-')
        .replace(/(x|\/|\+)‑/, '$1-')
        .replace(/^‑/, '-');
      this.setState({
        currValue: answer.toString(),
        formula: expression,
        prevValue: answer,
        evaluated: true
      });
    }
  }

  maxDigitWarning = () => {
    const preValue = this.state.currValue;
    this.setState({
      currValue: 'Digital Limit',
      prevValue: preValue
    });
    setTimeout(() => this.setState({ currValue: this.state.prevValue }), 2000);
  }

  render() {
    return (
      <div className="calculator">
        <div className="head">
          <Brand />
          <Display expression={this.state.formula} currValue={this.state.currValue} />
        </div>
        <Panel
          allClear={this.allClear}
          number={this.handleNumber}
          operator={this.handleOperator}
          decimal={this.handleDecimal}
          evaluate={this.handleEvaluate}
        />
      </div>
    )
  }
}


/* Presentational Components */

const Brand = () => {
  return (
    <div className="brand">
      <div className="logo">
        <span className="line">FreeCodeCamp</span>
        <span className="model">fel-04</span>
      </div>
      <div className="solar">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

const Display = (props) => {
  return (
    <div id="screen">
      <div id="formula">
        <span>{props.expression}</span>
      </div>
      <div id="display">
        <span>{props.currValue}</span>
      </div>
    </div>
  );
}

const Panel = (props) => {
  return (
    <div id="panel">
      <button id="clear" onClick={props.allClear} value="AC">AC</button>
      <button id="seven" onClick={props.number} value="7">7</button>
      <button id="eight" onClick={props.number} value="8">8</button>
      <button id="nine" onClick={props.number} value="9">9</button>
      <button id="divide" onClick={props.operator} value="/">/</button>
      <button id="four" onClick={props.number} value="4">4</button>
      <button id="five" onClick={props.number} value="5">5</button>
      <button id="six" onClick={props.number} value="6">6</button>
      <button id="multiply" onClick={props.operator} value="x">x</button>
      <button id="one" onClick={props.number} value="1">1</button>
      <button id="two" onClick={props.number} value="2">2</button>
      <button id="three" onClick={props.number} value="3">3</button>
      <button id="subtract" onClick={props.operator} value="‑">‑</button>
      <button id="zero" onClick={props.number} value="0">0</button>
      <button id="decimal" onClick={props.decimal} value=".">.</button>
      <button id="equals" onClick={props.evaluate} value="=">=</button>
      <button id="add" onClick={props.operator} value="+">+</button>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
