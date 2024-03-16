import React, { useState } from 'react';
import './App.css';

function FirstComponent() {
  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <li className="nav-item">
          <a href="/">Sorting Hat</a>
        </li>
        <div className="baan">
          <li className="nav-item">
            <a href="/">ประชาชื่น</a>
          </li>
          <li className="nav-item">
            <a href="/">อินทร</a>
          </li>
          <li className="nav-item">
            <a href="/">กนกอาชีวะ</a>
          </li>
          <li className="nav-item">
            <a href="/">บุรณพนธ์</a>
          </li>
        </div>
      </ul>
    </nav>
  );
}

function SecondComponent({ numRows, handleNumRowsChange, rowData, handleNameChange, handleSubmit }) {
  return (
    <div className="card">
      <h1>ให้หมวกคัดสรรคุณ...</h1><br />
      <label>ใส่จำนวนคนที่จะรับ : </label>
      <input
        type="number"
        style={{ padding: '3px 7px', margin: '5px 0' }}
        value={numRows}
        onChange={handleNumRowsChange}
        placeholder="ใส่จำนวนคนที่จะรับ"
      />
      {rowData.map((row, index) => (
        <div key={index} className="row">
          <label>{`คนที่ ${index + 1} `}</label>
          <input
            type="text"
            style={{ padding: '5px 10px', margin: '8px 0' }}
            value={row.name}
            onChange={(event) => handleNameChange(index, event)}
            placeholder={`ใส่ชื่อคนที่ ${index + 1}`}
          />
        </div>
      ))}<br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

function App() {
  const [numRows, setNumRows] = useState(0);
  const [rowData, setRowData] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [randomNumbers] = useState([]);

  const handleNumRowsChange = (event) => {
    const num = parseInt(event.target.value);
    setNumRows(num);
    setRowData(new Array(num).fill({ number: '', name: '' }));
  };

  const handleNameChange = (index, event) => {
    const newRows = [...rowData];
    newRows[index] = { ...newRows[index], name: event.target.value };
    setRowData(newRows);
  };

  const handleSubmit = () => {
    if (numRows <= 0) {
      alert("โปรดใส่จำนวนคนที่มากกว่า 0");
      return;
    }

    const allNamesFilled = rowData.every(row => row.name.trim() !== '');

    if (!allNamesFilled) {
      alert("กรุณาใส่ชื่อให้ครบทุกคนก่อนที่จะทำการ Submit");
      return;
    }

    const filledNames = rowData.map(row => row.name.trim()).filter(name => name !== '');

    const results = filledNames.map((name, index) => {
      let numberToAdd = index % 4 + 1; 
      if (numberToAdd === 0) {
        numberToAdd = 1;
      }
      randomNumbers.push(numberToAdd);
      return `${name}: บ้าน ${numberToAdd}`;
    });

    setShowSuccess(true);
  };

  const Success = ({ rowData, randomNumbers }) => {
    const mapNumberToName = (numberToAdd) => {
      switch (numberToAdd) {
        case 1:
          return "ประชาชื่น";
        case 2:
          return "อินทร";
        case 3:
          return "กนกอาชีวะ";
        case 4:
          return "บูรณพล";
        default:
          return "ไม่ระบุ";
      }
    };

    return (
      <div>
        <h1>คัดสรรสำเร็จ!</h1>
        <h2>นี่คือผลจากการคัดสรร</h2>
        <div>
          <div className="container">
            <div className="column">
              <p className='Head'>บ้านประชาชื่น:</p>
              <ul>
                {rowData.map((row, index) => {
                  if (randomNumbers[index] === 1) {
                    return (
                      <li key={index}>
                        {`${row.name}: ${mapNumberToName(randomNumbers[index])}`}
                      </li>
                    );
                  } else {
                    return null;
                  }
                })}
              </ul>
              <div>
                <p className='Head'>บ้านอินทร:</p>
                <ul>
                  {rowData.map((row, index) => {
                    if (randomNumbers[index] === 2) {
                      return (
                        <li key={index}>
                          {`${row.name}: ${mapNumberToName(randomNumbers[index])}`}
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>
              </div>
            </div>
            <div className="column">
              <div>
                <p className='Head'>บ้านกนกอาชีวะ:</p>
                <ul>
                  {rowData.map((row, index) => {
                    if (randomNumbers[index] === 3) {
                      return (
                        <li key={index}>
                          {`${row.name}: ${mapNumberToName(randomNumbers[index])}`}
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>
              </div>
              <div>
                <p className='Head'>บ้านบุรณพนธ์:</p>
                <ul>
                  {rowData.map((row, index) => {
                    if (randomNumbers[index] === 4) {
                      return (
                        <li key={index}>
                          {`${row.name}: ${mapNumberToName(randomNumbers[index])}`}
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <FirstComponent />

      {showSuccess && <Success rowData={rowData} randomNumbers={randomNumbers} />}

      {!showSuccess && (
        <SecondComponent
          numRows={numRows}
          handleNumRowsChange={handleNumRowsChange}
          rowData={rowData}
          handleNameChange={handleNameChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default App;
