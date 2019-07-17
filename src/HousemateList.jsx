import React, { useState } from "react";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  textField: {
    margin: 20,
    width: 200
  }
});

export default props => {
  const { housemateArray, setHousemateArray, deleteHousemate } = props;
  const [addingHousemate, setAddingHousemate] = useState(false);
  const [newHousemateName, setNewHousemateName] = useState("");
  const [moveInDate, setMoveInDate] = useState(null);
  const [moveOutDate, setMoveOutDate] = useState(null);
  const [movedInOrOut, setMovedInOrOut] = useState(false);

  const classes = useStyles();

  const housemateList = housemateArray.map((housemate, index) => {
    console.log(housemate.moveInDate);
    return (
      <div style={{ display: "flex", paddingLeft: 40, paddingTop: 20 }}>
        <h3 style={{ padding: 20 }} key={housemate.name}>
          {housemate.name}
        </h3>
        {housemate.movedInOrOut ? (
          <div style={{ display: "flex", padding: 20 }}>
            {housemate.moveInDate && (
              <h3 style={{ paddingRight: 20 }}>
                Moved In: {housemate.moveInDate.toLocaleDateString("en-AU")}
              </h3>
            )}
            {housemate.moveOutDate && (
              <h3>Moved Out: {housemate.moveOutDate.toLocaleDateString("en-AU")}</h3>
            )}
          </div>
        ) : (
          <h3 style={{ padding: 20 }}>There the whole time</h3>
        )}
        <div style={{ paddingLeft: 20, paddingTop: 20 }}>
          <Button onClick={() => deleteHousemate(index)}>Delete</Button>
        </div>
      </div>
    );
  });

  function addHousemate() {
    const newHousemate = {
      name: newHousemateName,
      movedInOrOut,
      moveInDate,
      moveOutDate
    };
    setHousemateArray(housemateArray.concat([newHousemate]));
    setAddingHousemate(false);
    setNewHousemateName("");
    setMoveInDate(null);
    setMoveOutDate(null);
    setMovedInOrOut(false);
  }

  function updateHousemateName(event) {
    setNewHousemateName(event.target.value);
  }

  return (
    <Paper>
      <h1 style={{ padding: 20 }}>Please Enter Your Housemates</h1>
      {housemateList}
      {addingHousemate && (
        <div>
          <div style={{ display: "flex" }}>
            <TextField
              id="new-housemate-name"
              label="Name"
              value={newHousemateName}
              onChange={updateHousemateName}
              className={classes.textField}
            />
            <FormControlLabel
              control={
                <Switch
                  value={movedInOrOut}
                  onChange={() => setMovedInOrOut(!movedInOrOut)}
                />
              }
              label="Moved In/Out"
            />
            {movedInOrOut && (
              <div>
                {" "}
                <DatePicker
                  disableFuture
                  label="Move In Date"
                  value={moveInDate}
                  onChange={setMoveInDate}
                />
                <DatePicker
                  disableFuture
                  label="Move Out Date"
                  value={moveOutDate}
                  onChange={setMoveOutDate}
                />
              </div>
            )}

            <Button onClick={() => addHousemate()}>Add</Button>
          </div>
        </div>
      )}

      {!addingHousemate && (
        <div style={{ display: "flex", padding: 40 }}>
          <Button onClick={() => setAddingHousemate(!addingHousemate)}>
            {housemateArray.length === 0 ? "Add" : "Add another"}
          </Button>
        </div>
      )}
    </Paper>
  );
};
