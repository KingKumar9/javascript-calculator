import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="calculator">
          <div id="display">
            <h2 className="equation">0</h2>
          </div>
          <div className="buttons">
            <div className="numsNops">
              <div className="nums">
                <button id="1"></button>
                <button id="2"></button>
                <button id="3"></button>
                <button id="4"></button>
                <button id="5"></button>
                <button id="6"></button>
                <button id="7"></button>
                <button id="8"></button>
                <button id="9"></button>
                <button id="0"></button>
              </div>
              <div className="ops">

              </div>
            </div>
            <button id="clear" onClick=""></button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
