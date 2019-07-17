import React from "react";
import Paper from "@material-ui/core/Paper";

export default props => {
  const { billsArray, housematesArray } = props;
  const billAmountsOwed = billsArray.map(bill => {
    let totalBillDays = 0;
    const housematesBillDays = [];
    for (let housemate of housematesArray) {
      let billDays = bill.billDays;
      if (housemate.movedInOrOut) {
        if (housemate.moveInDate && housemate.moveInDate > bill.billStart) {
          const daysBeforeMoveIn =
            (housemate.moveInDate - bill.billStart) / 1000 / 60 / 60 / 24;
          billDays -= daysBeforeMoveIn;
        }
        if (housemate.moveOutDate && housemate.moveOutDate < bill.billEnd) {
          const daysAfterMoveOut =
            (bill.billEnd - housemate.moveOutDate) / 1000 / 60 / 60 / 24;
          billDays -= daysAfterMoveOut;
        }
        if (billDays < 0) {
          billDays = 0;
        }
      }
      totalBillDays += billDays;
      const housemateBillDays = {
        housemate,
        billDays
      };
      housematesBillDays.push(housemateBillDays);
    }
    const housemateTotals = housematesBillDays.map(housemateBillDays => {
      const amountOwed =
        bill.billAmount * (housemateBillDays.billDays / totalBillDays);
      return {
        bill: bill,
        housemate: housemateBillDays.housemate,
        billDays: housemateBillDays.billDays,
        amount: amountOwed
      };
    });
    return housemateTotals;
  });

  const individualBillTotals = billAmountsOwed.map(housemateTotals => {
    const individualTotals = housemateTotals.map(housemateTotal => {
      return (
        <h3>{`${housemateTotal.housemate.name}: ${housemateTotal.amount.toFixed(
          2
        )} (${housemateTotal.billDays.toFixed(0)} Days)`}</h3>
      );
    });
    const bill = housemateTotals[0].bill;
    const billDescription = `${bill.billName} Total: $${bill.billAmount.toFixed(
      2
    )}, Days: ${bill.billDays.toFixed(0)}`;
    return (
      <Paper>
        <h2>{billDescription}</h2>
        {individualTotals}
      </Paper>
    );
  });

  const housemateAllBillTotals = [];
  for (let billTotal of billAmountsOwed) {
    for (let individualTotal of billTotal) {
      let housemateFound = false;
      for (let housemateTotal of housemateAllBillTotals) {
        if (housemateTotal.name === individualTotal.housemate.name) {
          housemateTotal.amount += individualTotal.amount;
          housemateFound = true;
        }
      }
      if (!housemateFound) {
        housemateAllBillTotals.push({
          name: individualTotal.housemate.name,
          housemate: individualTotal.housemate,
          amount: individualTotal.amount
        });
      }
      housemateFound = false;
    }
  }

  const allBillTotals = housemateAllBillTotals.map(housemateTotal => {
    let durationString = "";
    const housemate = housemateTotal.housemate;
    if (!housemate.movedInOrOut) {
      durationString = "There the whole time";
    } else {
      if (housemate.moveInDate) {
        durationString =
          "Moved in " + housemate.moveInDate.toLocaleDateString("en-AU");
      }
      if (housemate.moveOutDate) {
        durationString +=
          " Moved out " + housemate.moveOutDate.toLocaleDateString("en-AU");
      }
    }
    return (
      <h3>{`${housemateTotal.name}: $${housemateTotal.amount.toFixed(
        2
      )} (${durationString})`}</h3>
    );
  });

  return (
    <div style={{ margin: 40 }}>
        <h1 style={{padding: 20, color: "white"}}>The Damage</h1>
      <Paper>
        <h1>All Bills Totals</h1>
        {allBillTotals}
      </Paper>
      {individualBillTotals}
    </div>
  );
};
