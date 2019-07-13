import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormGroup } from "@material-ui/core";
import BillList from "./BillList";
import HousemateList from "./HousemateList";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

function App() {
  const [housemateArray, setHousemateArray] = useState([]);
  const [billsArray, setBillsArray] = useState([]);
  

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div
        className="App"
        style={{ backgroundColor: "purple", height: window.screen.height }}
      >
        <div style={{ padding: "10%", width: "80%" }}>
          <HousemateList housemateArray={housemateArray} setHousemateArray={setHousemateArray} />
          <BillList billArray={billsArray} setBillArray={setBillsArray}/>
          {housemateArray.length !== 0 && billsArray.length !== 0 && (
            <div style={{margin: 40}}>
                <Button color="secondary" variant="contained" onClick={() => console.log("Calculate!")}>
                    Calculate
                  </Button>
              </div>
                  
                )}
        </div>
      </div>
    </MuiPickersUtilsProvider>
    
  );
}

export default App;
