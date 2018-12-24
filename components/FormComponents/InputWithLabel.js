import React, { Component } from 'react';
import {connect} from "react-redux";
import {updateStateValue} from "../../redux/actions";
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { IoIosHelpCircle, IoIosHelpCircleOutline } from 'react-icons/io';
import { UncontrolledTooltip } from 'reactstrap';

/*const commaFeature = (id) => {
    const tmp = parseFloat($(id).val()).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2});
    $(id).attr("type", "text");
    $(id).val(tmp);
};

const resetVal = (id) => {
    $(id).attr("type", "text");
    $(id).val("");
};

const numberInput = (id) => {
    const tmp = $(id).val();
    let op = "";
    for(let i = 0; i < tmp.length; i++) {
        if(tmp[i] !== ",") {
            op += tmp[i];
        }
    }
    op = parseFloat(op);
    $(id).attr("type", "number");
    $(id).val(op);
};*/

class InputWithLabel extends Component {

    static requiredLabel(req) {
        if(req)
            return (<span style={{color: 'red'}}> *</span>);
    }

    blur(event) {
    }

    handleChange(event) {
        let val, name = event.target.name;
        const type = this.props.type || 'number';

        val = event.target.value;

        if(type === 'number') {
            if(event.target.value !== "." && isNaN(event.target.value)) {
                val = "";
            }
            else {
                if(event.target.name === "transactions" || (event.target.name.indexOf("Number")) > -1) {
                    val = isNaN(parseInt(event.target.value)) ? "": parseInt(event.target.value);
                }
            }
        }

        if(event.target.name.indexOf("_") >= 0) {
            name = event.target.name.split('_');

            if(name[0] === "AdditionalFees") {
                val = Object.assign({}, this.StateV[`${name[0]}`], {[name[1]]: val});
                name = "AdditionalFees";
            }
            else if (name[0] === "Processing") {
                const pf = Object.assign({}, this.StateV[`ProcessingFees`][name[1]], { [name[2]]: (val) });
                val = Object.assign({}, this.StateV[`ProcessingFees`], {[name[1]]: pf});
                name = 'ProcessingFees';
            }
        }
        this.props.updateStateValue('InputWithLabel', name, val, (this.props.partB || 'partA'));
    }

    renderInput() {
        let name = '';
        const { id, partB, title, placeholder, required, min, noDollar, readonly } = this.props;
        let Value;

        if(id.indexOf("_") >= 0) {
            name = id.split('_');
            if(name[0] === 'AdditionalFees') {
                Value = this.StateV.AdditionalFees[name[1]];
            }
            else if (name[0] === 'Processing') {
                Value = this.StateV.ProcessingFees[name[1]][name[2]];
            }
        }
        else {
            Value = this.StateV[id];
        }

        return (
            <InputGroup>
                {(!noDollar) ? <InputGroupAddon addonType="prepend">$</InputGroupAddon> : null}
                <Input type={"text"} className="form-control" autoComplete = "off" onBlur={this.props.onBlur}
                   value={Value} id={`${id}_${(partB || 'partA')}`} name={id} title={title} placeholder={placeholder}
                   required={required} onChange={this.handleChange.bind(this)} min={min} readOnly={readonly} />
            </InputGroup>
        );
    }

    renderIcon(i) {
        if(i && i==="IoIosHelpCircle") {
            return (
                <span id={`dark_${(this.props.partB || 'partA')}`}>
                    <IoIosHelpCircle />
                    <UncontrolledTooltip placement="top" target={`dark_${(this.props.partB || 'partA')}`}>
                        {"These are the base interchange fees, also called processing fees. Essentially, all other interchange pass through fees added up."}
                    </UncontrolledTooltip>
                </span>);
        }
        else if(i){
            return (
                <span id={`light_${(this.props.partB || 'partA')}`}>
                    <IoIosHelpCircleOutline />
                    <UncontrolledTooltip placement="top" target={`light_${(this.props.partB || 'partA')}`}>
                        {"This could be excessive Auths or other Auth/transaction fees incurred."}
                    </UncontrolledTooltip>
                </span>);
        }
    }

    renderLabel(label) {
        if(label) {
            return (
                <strong>
                    <Label for={`${this.props.id}_${(this.props.partB || 'partA')}`} style={{marginTop: '0.5rem'}}>
                        {this.props.label}
                        {InputWithLabel.requiredLabel(this.props.required)}
                        {"\t"}{this.renderIcon(this.props.icon)}
                    </Label>
                </strong>
            );
        }
    }

    render() {
        const { partA, partB } = this.props.State;
        this.StateV = (this.props.partB) ? partB : partA;

        return (
            <div>
                {this.renderLabel(this.props.label)}

                <div>
                    {this.renderInput()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (stateV) => (stateV);

export default connect(mapStateToProps, {updateStateValue})(InputWithLabel);
