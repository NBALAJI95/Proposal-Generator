import React from 'react';

const Total = (props) => (
    <div style={{margin: "1rem", fontSize: "1.3rem"}}>
        <strong> Total {props.label}: </strong>
        <span>{props.value}</span>
    </div>
);

export default Total;