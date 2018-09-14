import React from 'react';

const currency = (val, defaultVal="") => {
    val = `$ ${parseFloat(val).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}`;
    return (val !== '$ NaN') ? val : defaultVal;
};

const renderLabel = (label, bold) => {
  if(bold) {
      return (<div className="item1" style={{fontWeight: "bold", textAlign: "left"}}>  {label}  </div>);
  }
  else {
      return (<div className="item1" style={{textAlign: "left"}}> {label} </div>);
  }
};

const renderBoldFee = (fee, bold) => {
    if(bold) {
        return (<div style={{fontWeight: "bold", textAlign: "right"}}> {currency(fee, "$ 0.00")} </div>);
    }
    else {
        return (<div style={{textAlign: "right"}}> {currency(fee, " ")} </div>);
    }
};

const FormRow = ({label, partA, partB, bold = false}) => {

  let { Volume: VolumeA = "", Number: NumberA = "", Percentage: PercentageA = "", Item: ItemA = "", Fee: FeeA = "" } = partA;
  let { Volume: VolumeB, Number: NumberB, Percentage: PercentageB, Item: ItemB, Fee: FeeB } = partB;

    if(typeof partB === "string" && typeof partA === "string")
    {
        FeeA = partA;
        FeeB = partB;
    }

  return (
      <div className="row" style={{margin: "0"}}>
          <div className="col-7" style={{borderRight: "1.5px solid black"}}>
              <div className="grid-container">
                  {renderLabel(label, bold)}
                  <div style={{textAlign: "left"}}> {currency(VolumeA)} </div>
                  <div style={{textAlign: "left"}}> {currency(NumberA)} </div>
                  <div style={{textAlign: "left"}}> {currency(PercentageA)} </div>
                  <div style={{textAlign: "left"}}> {currency(ItemA)} </div>
                  {renderBoldFee(FeeA, bold)}
              </div>
          </div>
          <div className="col-5">
              <div className="grid-container2">
                  <div style={{textAlign: "left"}}> {currency(VolumeB)} </div>
                  <div style={{textAlign: "left"}}> {currency(NumberB)} </div>
                  <div style={{textAlign: "left"}}> {currency(PercentageB)} </div>
                  <div style={{textAlign: "left"}}> {currency(ItemB)} </div>
                  {renderBoldFee(FeeB, bold)}
              </div>
          </div>
      </div>
  );
};

export default FormRow;