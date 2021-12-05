/* eslint-disable no-eval */
import React from 'react';
import { numbers, operators } from './buttons.js';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 0,
      decimal: false
    }
    this.numToDisplay = this.numToDisplay.bind(this)
    this.opToDisplay = this.opToDisplay.bind(this)
    this.clear = this.clear.bind(this)
    this.calculate = this.calculate.bind(this)
    this.decimal = this.decimal.bind(this)
  }

  clear() {
    this.setState({
      display: 0,
      decimal: false
    })
  }

  calculate() {
    const expression = this.state.display
    const answer = eval(expression)
    this.setState({
      display: answer
    })
  }

  decimal(e) {
    if (!this.state.decimal) {
      this.setState({
        display: this.state.display + e.target.innerText,
        decimal: true
      })
    }
  }

  numToDisplay(e) {
    const currValue = this.state.display
    const value = e.target.innerText
    if (currValue === 0 && parseInt(value) === 0) {
      this.setState({
        display: 0
      })
    } else if (currValue === 0) {
      this.setState({
        display: value
      })
    } else {
      this.setState({
        display: currValue + value
      })
    }
  }

  opToDisplay(e) {
    const currValue = this.state.display
    const currValueStr = currValue.toString()
    const value = e.target.innerText
    if (currValueStr[currValueStr.length - 1] === '+') {
      let newCurrValue = currValueStr.slice(0, -1)
      this.setState({
        display: newCurrValue + value,
        decimal: false
      })
    } else if (currValueStr[currValueStr.length - 1] === '*') {
      let newCurrValue = currValueStr.slice(0, -1)
      this.setState({
        display: newCurrValue + value,
        decimal: false
      })
    } else if (currValueStr[currValueStr.length - 1] === '/') {
      let newCurrValue = currValueStr.slice(0, -1)
      this.setState({
        display: newCurrValue + value,
        decimal: false
      })
    } else {
      this.setState({
        display: currValue + value,
        decimal: false
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="calculator">
          <div id="display">
            <h2 className="equation">{ this.state.display }</h2>
          </div>
          <div className="buttons">
            { numbers.map(i => { return <button onClick={ this.numToDisplay } id={ i.id }>{ i.value }</button> }) }
            { operators.map(i => { return <button onClick={ this.opToDisplay } id={ i.id }>{ i.value }</button> }) }
            <button onClick={ this.decimal } id="decimal">.</button>
            <button onClick={ this.calculate } id="equals">=</button>
            <button onClick={ this.clear } id="clear">AC</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
