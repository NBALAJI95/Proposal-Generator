import React from 'react';

const currency = (val, defaultVal="") => {
    val = `${parseFloat(val).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}`;
    return (val !== 'NaN') ? val : defaultVal;
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
        return (
            <div style={{fontWeight: "bold"}}>
                <span style={{float: "left"}}>{' $'}</span>
                <span style={{float: "right"}}> {currency(fee, "0.00")} </span>
            </div>);
    }
    else {
        return (
            <div>
                <span style={{float: "left"}}>{currency(fee, "")?' $':""}</span>
                <span style={{float: "right"}}> {currency(fee, "")} </span>
            </div>
        );
    }
};

const FormRow = ({label, partA, partB, bold = false}) => {

  let { Volume: VolumeA = "", Number: NumberA = "", Percentage: PercentageA = "", Item: ItemA = "", Fee: FeeA = "" } = partA;
  let { Percentage: PercentageB, Item: ItemB, Fee: FeeB } = partB;

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
                  <div> <span style={{float: "left"}}>{(currency(VolumeA)) ? '$' : ''}</span> <span style={{float: "right"}}> {currency(VolumeA)} </span> </div>
                  <div style={{textAlign: "center"}}> {NumberA} </div>
                  <div style={{textAlign: "center"}}> {`${(PercentageA) || ''}${(PercentageA)? "%":""}`} </div>
                  <div> <span style={{float: "left"}}>{(currency(ItemA)) ? '$' : ''}</span> <span style={{float: "right"}}> {currency(ItemA)} </span> </div>
                  {renderBoldFee(FeeA, bold)}
              </div>
          </div>
          <div className="col-5">
              <div className="grid-container2">
                  <div> <span style={{float: "left"}}>{(currency(VolumeA)) ? '$' : ''}</span> <span style={{float: "right"}}> {currency(VolumeA)} </span> </div>
                  <div style={{textAlign: "center"}}> {NumberA} </div>
                  <div style={{textAlign: "center"}}> {`${(PercentageB) || ''}${(PercentageB)? "%":""}`} </div>
                  <div> <span style={{float: "left"}}>{(currency(ItemB)) ? '$' : ''}</span> <span style={{float: "right"}}> {currency(ItemB)} </span> </div>
                  {renderBoldFee(FeeB, bold)}
              </div>
          </div>
      </div>
  );
};

export default FormRow;
