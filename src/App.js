/* eslint-disable no-eval */
import React from 'react';
import './App.css';
import { operators, numbers } from './data.js'
import { Display, Keyboard } from './renders.js'


const App = () => {
  const [input, setInput] = React.useState("0");
  const [output, setOutput] = React.useState("");
  const [calculatorData, setCalculatorData] = React.useState("");

  const handleSubmit = () => {
    const total = eval(calculatorData);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setCalculatorData(`${total}`);
  };

  const handleClear = () => {
    setInput("0");
    setCalculatorData("");
  };

  
  const handleNumbers = (value) => {
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        return
      } else {
        const lastChat = calculatorData.charAt(calculatorData.length - 1);
        const isLastChatOperator = lastChat === "*" || operators.includes(lastChat);
        setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  };


  const dotOperator = () => {
    const lastChat = calculatorData.charAt(calculatorData.length - 1);

    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (lastChat === "*" || operators.includes(lastChat)) {
        setInput("0.");
        setCalculatorData(`${calculatorData} 0.`);
      } else {
        setInput(lastChat === "." || input.includes(".") ? `${input}` : `${input}.`);
        setCalculatorData(lastChat === "." || input.includes(".") ? `${calculatorData}` : `${calculatorData}.`)}
    }
  };


  const handleOperators = (value) => {
    if (calculatorData.length) {
      setInput(`${value}`);
      const beforeLastChat = calculatorData.charAt(calculatorData.length - 2);
      const beforeLastChatIsOperator = operators.includes(beforeLastChat) || beforeLastChat === "*";
      const lastChat = calculatorData.charAt(calculatorData.length - 1);    
      const lastChatIsOperator = operators.includes(lastChat) || lastChat === "*";      
      const validOp = value === "x" ? "*" : value;

      if ((lastChatIsOperator && value !== "-") || (beforeLastChatIsOperator && lastChatIsOperator)) {
        if (beforeLastChatIsOperator) {
          const updatedValue = `${calculatorData.substring(0, calculatorData.length - 2)}${value}`;
          setCalculatorData(updatedValue);
        } else {
          setCalculatorData(`${calculatorData.substring(0, calculatorData.length - 1)}${validOp}`);
        }
      } else {
        setCalculatorData(`${calculatorData}${validOp}`);
      }
    }
  };


  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };


  const handleOutput = () => {
    setOutput(calculatorData);
  };

  React.useEffect(() => {
    handleOutput();
  });


  return (
    <div className="container">
      <div className="calculator">
        <Display input={input} output={output} />
        <Keyboard handleInput={handleInput} />
      </div>
    </div>
  );
}


export default App;