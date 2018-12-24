import React from 'react';

const checkRequired = (cond) => {
    if(cond)
        return (<span style={{color: 'red'}}> *</span>);
};

const Heading = ({headingText, required}) => (
    <h2 style={styleHeading}> {headingText} {checkRequired(required)} </h2>
);

const styleHeading = {
    textAlign: 'left',
    fontSize: '1.5rem',
    color: '#4169e1',
    paddingTop: '0.3rem'
};

export default Heading;