import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

export default (props) => {
  const {billArray, setBillArray, deleteBill} = props;
  const [billStart, setBillStart] = useState(null);
  const [billEnd, setBillEnd] = useState(null);
  const [billAmount, setBillAmount] = useState(0);
  const [billName, setBillName] = useState("");
  const [addingBill, setAddingBill] = useState(false);

  const billsList = billArray.map((bill, index) => {
    return (
        <div style={{display: "flex", padding: 40}}>
            <h3>{`${bill.billName}: $${bill.billAmount}, From: ${bill.billStart.toLocaleDateString("en-AU")}, To: ${bill.billEnd.toLocaleDateString("en-AU")}, Bill Days: ${bill.billDays}`} </h3>
            <div style={{paddingLeft: 20}}><Button onClick={() => deleteBill(index)}>Delete</Button></div>            
        </div>
    );
  });

  function updateBillAmount(event) {
    const numbers = /^[0-9]{1,}(\.[0-9]+)?$/;
    let value = event.target.value;
    if (value.match(numbers)) {
      if(value.length > 1 && value[0] === "0"){
          value = value.slice(1);
      }
      setBillAmount(value);
    }
  }

  function addBill(){
      if(billStart === null || billEnd === null || billAmount <= 0){
          return;
      }
      const billDays = parseInt((billEnd - billStart) / 1000 / 60 / 60 / 24 + 1);
      
      if(billDays <= 0){
          setBillStart(null);
          setBillEnd(null);
          return;
      }

      const newBill = {
          billName: billName ? billName : `Untitled Bill ${billArray.length + 1}`,
          billAmount: parseFloat(billAmount),
          billStart,
          billEnd,
          billDays
      }
      setBillArray(billArray.concat([newBill]));
      setBillAmount(0);
      setBillName("");
      setBillStart(null);
      setBillEnd(null);
      setAddingBill(false);
  }

  function updateBillName(event){
      setBillName(event.target.value);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={{ marginTop: 40 }}>
          
        <Paper>
          <h1 style={{padding: 20}}>Please Enter Your Bills</h1>
          {billsList}
          {addingBill && (
            <div style={{ padding: 40, display: "flex" }}>
                <TextField
                id="bill-name"
                value={billName}
                onChange={updateBillName}
                label="Bill Name"
              />
              <TextField
                type="number"
                id="bill-amount"
                error={billAmount <= 0}
                value={billAmount.toString()}
                onChange={updateBillAmount}
                label="Bill Amount"
              />
              <DatePicker
                disableFuture
                label="Bill Start Date"
                value={billStart}
                onChange={setBillStart}
                error={billStart === null}
              />
              <DatePicker
                label="Bill End Date"
                value={billEnd}
                onChange={setBillEnd}
                error={billEnd === null}
              />
              <Button onClick={()=> addBill()}>Done</Button>
            </div>
          )}
          {!addingBill && (
            <div style={{ display: "flex", padding: 40 }}>
              <Button onClick={() => setAddingBill(!addingBill)}>
                {billArray.length === 0 ? "Add" : "Add another"}
              </Button>
              {billArray.length !== 0 && (
                <Button onClick={() => setAddingBill(!addingBill)}>Done</Button>
              )}
            </div>
          )}
        </Paper>
      </div>
    </MuiPickersUtilsProvider>
  );
};
