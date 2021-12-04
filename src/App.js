import React from 'react';
import buttons from './buttons.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 0
    }
    this.numToDisplay = this.numToDisplay.bind(this)
    this.clear = this.clear.bind(this)
  }

  clear() {
    this.setState({
      display: 0
    })
  }

  numToDisplay(e) {
    const value = e.target.innerText
    if (this.state.display === 0 && parseInt(value) === 0) {
      this.setState({
        display: 0
      })
    } else if (this.state.display === 0) {
      this.setState({
        display: [value]
      })
    } else {
      this.setState({
        display: [...this.state.display, value]
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
            { buttons.map(i => { return <button onClick={ this.numToDisplay } id={ i.id }>{ i.value }</button> }) }
            <button onClick={ this.clear } id="clear">AC</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
