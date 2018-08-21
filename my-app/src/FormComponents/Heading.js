import React from 'react';

const checkRequired = (cond) => {
    if(cond)
        return (<span style={{color: 'red'}}> *</span>);
};

const Heading = (props) => (
    <h2 style={styleHeading}> {props.headingText} {checkRequired(props.required)} </h2>
);

const styleHeading = {
    textAlign: 'left',
    fontSize: '1.5rem',
    color: '#4169e1',
    paddingTop: '0.3rem'
};

export default Heading;