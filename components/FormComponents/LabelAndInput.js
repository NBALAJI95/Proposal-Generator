import React from 'react';
import { Label, InputGroup, InputGroupAddon } from 'reactstrap';

const LabelAndInput = ({ label, type, symbol, placeholder, required, id, value, onChange, min, onBlur, percentage }) => (
    <div style={{ marginTop: "1rem" }}>
        <strong> <Label for={id}> {label} </Label> </strong>{' '}
        {(required) ? <b> <span style={{ color: 'red' }}> {'*'} </span> </b> : <div />}
        <div>
            <InputGroup>
                {(symbol) ? <InputGroupAddon addonType="prepend">$</InputGroupAddon> : <div />}

                <input type={'text'} className="form-control" id={id} value={value} onChange={onChange} min={min}
                   required={required} onBlur={onBlur} autoComplete={'off'}
                />

                {(percentage)? <InputGroupAddon addonType="append">%</InputGroupAddon> : <div />}
            </InputGroup>
        </div>
    </div>
);

export default LabelAndInput;