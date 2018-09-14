import React from 'react';

const ProposalHeading = ({label, heading1Style, heading2Style}) => {
    return (
        <div className="row" style={{margin: "0", fontSize:"0.95rem"}}>
            <div className="col-7" style={heading1Style}>
                <b> {label} </b>
            </div>
            <div className="col-5" style={heading2Style}>
                <b> {"`"} </b>
            </div>
        </div>
    );
};

export default ProposalHeading;