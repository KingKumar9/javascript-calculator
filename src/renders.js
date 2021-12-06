import { calcData } from './data.js'

const Display = ({ input, output }) => (
    <div className="output">
        <span className="result">{output}</span>
        <span id="display" className="input">{input}</span>
    </div>
);
  
const Key = ({ keyData: { id, value }, handleInput }) => (
    <button id={id} onClick={() => handleInput(value)}>
      {value}
    </button>
);
  
const Keyboard = ({ handleInput }) => (
    <div className="keys">
      {calcData.map((key) => (
        <Key key={key.id} keyData={key} handleInput={handleInput} />
      ))}
    </div>
);


export { Display, Key, Keyboard }