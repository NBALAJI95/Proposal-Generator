import React from 'react';

const Heading = (props) => (
    <h2 style={styleHeading}> {props.headingText} </h2>
);

const styleHeading = {
    textAlign: 'left',
    fontSize: '1.5rem',
    color: '#4169e1',
    paddingTop: '0.3rem'
};

export default Heading;