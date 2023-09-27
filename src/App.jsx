
import React, { useState } from 'react';
import './App.css';
import { buttonValues } from './value';

const App = () => {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');

  const handleButtonClick = (value) => {
    switch (value) {
      case 'C':
        setDisplay('0');
        setFormula('');
        break;
      case 'DEC':
        if (/[\d.+\-*/]$/.test(formula)) {
          const newFormula = formula.slice(0, -1);
          setFormula(newFormula);
          setDisplay(newFormula || '0');
        }
        break;
        case '.':
          const lastCha = formula.charAt(formula.length - 1);
          if (lastCha === '.' || /[+\-*/]/.test(lastCha)) {
            return;
          }
          const parts = formula.split(/[+\-*/]/);
          const lastPart = parts[parts.length - 1];
          if (lastPart.includes('.')) {
            return;
          }
          const newFormula = formula + '.';
          setFormula(newFormula);
          setDisplay(newFormula);
          break;
      case '=':
      try {
        const result = eval(formula);
        const formattedResult = Number(result).toFixed(4);
        setDisplay(formattedResult);
        setFormula(formattedResult);
      } catch {
        setDisplay('Error');
      }
      break;
      default:
        const lastChar = formula.charAt(formula.length - 1);
        if (/[+\-*/]/.test(lastChar) && /[+\-*/]/.test(value)) {
          if (value === '-') {
            const newFormula = formula + value;
            const newDisplay = display === '0' ? value : display + value;
            setFormula(newFormula);
            setDisplay(newDisplay);
          } else {
            const newFormula = formula.slice(0, -1) + value;
            setFormula(newFormula);
            setDisplay(newFormula);
          }
        } else {
          const newFormula = formula + value;
          const newDisplay = display === '0' ? value : display + value;
          setFormula(newFormula);
          setDisplay(newDisplay);
        }
    }
  };
  return (
    <div className='main'>
      <div className="calculator">
        <div id="display">{display}</div>
        <div className="buttons">
          {buttonValues.map((item) => (
            <button key={item.id} id={item.id}
              onClick={() => handleButtonClick(item.name)}>
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
