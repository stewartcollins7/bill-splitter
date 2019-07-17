import React, { useState } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import BillList from "./BillList";
import HousemateList from "./HousemateList";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import BillSplitResults from "./BillSplitResults";

function App() {
  const [housemateArray, setHousemateArray] = useState([]);
  const [billsArray, setBillsArray] = useState([]);
  const [showResults, setShowResults] = useState(false);

  function deleteBill(index) {
    let newBillsArray = [];
    if (index === 0) {
      if (billsArray.length > 1) {
        newBillsArray = billsArray.slice(1);
      }
    } else {
      newBillsArray = billsArray
        .slice(0, index)
        .concat(billsArray.slice(index + 1));
    }
    setBillsArray(newBillsArray);
  }

  function deleteHousemate(index) {
    let newHousemateArray = [];
    if (index === 0) {
      if (housemateArray.length > 1) {
        newHousemateArray = housemateArray.slice(1);
      }
    } else {
      newHousemateArray = housemateArray
        .slice(0, index)
        .concat(housemateArray.slice(index + 1));
    }
    setHousemateArray(newHousemateArray);
  }

  const divHeight =
    housemateArray.length + billsArray.length < 4
      ? window.screen.height
      : "100%";

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div
        className="App"
        style={{ backgroundColor: "purple", padding: 40, height: divHeight }}
      >
        <h1 style={{ padding: 20, color: "white" }}>Bill Calculator</h1>
        {!showResults && (
          <div style={{ padding: "0% 10% 0% 10%", width: "80%" }}>
            <HousemateList
              housemateArray={housemateArray}
              setHousemateArray={setHousemateArray}
              deleteHousemate={deleteHousemate}
            />
            <BillList
              billArray={billsArray}
              setBillArray={setBillsArray}
              deleteBill={deleteBill}
            />
            {housemateArray.length !== 0 && billsArray.length !== 0 && (
              <div style={{ margin: 40 }}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => setShowResults(true)}
                >
                  Calculate
                </Button>
              </div>
            )}
          </div>
        )}
        {showResults && (
          <>
            <BillSplitResults
              billsArray={billsArray}
              housematesArray={housemateArray}
            />
            <Button
              onClick={() => setShowResults(false)}
              color="secondary"
              variant="contained"
            >
              Back
            </Button>
          </>
        )}
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
