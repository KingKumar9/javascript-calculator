/* eslint-disable no-eval */
import React from 'react';
import './App.css';
import { operators, numbers } from './data.js'
import { Display, Keyboard } from './renders.js'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '0',
      output: '',
      calcData: ''
    }
    this.handleClear = this.handleClear.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNumbers = this.handleNumbers.bind(this)
    this.dotOperator = this.dotOperator.bind(this)
    this.handleOperators = this.handleOperators.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleClear = () => {
    this.setState({
      input: '0',
      calcData: ''
    })
  };

  handleSubmit = () => {
    const total = eval(this.state.calcData);
    this.setState({
      input: total,
      output: total,
      calcData: `${total}`
    })
  };


  handleNumbers = (value) => {
    if (!this.state.calcData.length) {
      this.setState({
        input: `${value}`,
        calcData: `${value}`
      })
    } else {
      if (value === 0 && (this.state.calcData === "0" || this.state.input === "0")) {
        return
      } else {
        const lastChar = this.state.calcData.charAt(this.state.calcData.length - 1);
        const isLastChatOperator = lastChar === "*" || operators.includes(lastChar);
        this.setState({
          input: isLastChatOperator ? `${value}` : `${this.state.input}${value}`,
          calcData: `${this.state.calcData}${value}`
        })
      }
    }
  };


  dotOperator = () => {
    const lastChar = this.state.calcData.charAt(this.state.calcData.length - 1);
    if (!this.state.calcData.length) {
      this.setState({
        input: "0.",
        calcData: "0."
      })
    } else {
      if (lastChar === "*" || operators.includes(lastChar)) {
        this.setState({
        input: "0.",
        calcData: `${this.state.calcData} 0.`
      })
      } else {
        this.setState({
          input: lastChar === "." || this.state.input.includes(".") ? `${this.state.input}` : `${this.state.input}.`,
          calcData: lastChar === "." || this.state.input.includes(".") ? `${this.state.calcData}` : `${this.state.calcData}.`
        })
      }
    }
  };


  handleOperators = (value) => {
    if (this.state.calcData.length) {
      this.setState({
        input: `${value}`
      })
      const beforeLastChar = this.state.calcData.charAt(this.state.calcData.length - 2);
      const beforeLastCharIsOperator = operators.includes(beforeLastChar) || beforeLastChar === "*";
      const lastChar = this.state.calcData.charAt(this.state.calcData.length - 1);    
      const lastCharIsOperator = operators.includes(lastChar) || lastChar === "*";      
      const validOp = value === "x" ? "*" : value;
      if ((lastCharIsOperator && value !== "-") || (beforeLastCharIsOperator && lastCharIsOperator)) {
        if (beforeLastCharIsOperator) {
          const updatedValue = `${this.state.calcData.substring(0, this.state.calcData.length - 2)}${value}`;
          this.setState({
            calcData: updatedValue
          })
        } else {
          this.setState({
            calcData: `${this.state.calcData.substring(0, this.state.calcData.length - 1)}${validOp}`
          })
        }
      } else {
        this.setState({
          calcData: `${this.state.calcData}${validOp}`
        })
      }
    }
  };


  handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);
    switch (value) {
      case "=":
        this.handleSubmit();
        break;
      case "AC":
        this.handleClear();
        break;
      case number:
        this.handleNumbers(value);
        break;
      case ".":
        this.dotOperator(value);
        break;
      case operator:
        this.handleOperators(value);
        break;
      default:
        break;
    }
  }


  render() {
    return (
      <div className="container">
        <div className="calculator">
          <Display input={this.state.input} output={this.state.output} />
          <Keyboard handleInput={this.handleInput} />
        </div>
    </div>
    )
  }
}


export default App;