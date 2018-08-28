import React from 'react';

const Total = ({label, value}) => (
    <div style={{margin: "1rem", fontSize: "1.3rem"}}>
        <strong> Total {label}: </strong>
        <span> {value} </span>
    </div>
);

export default Total;