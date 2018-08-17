import React, { Component } from 'react';

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
    focus() {
        console.log("Focused");
    }

    render() {
        return (
            <div>
                <strong>
                    <label htmlFor={this.props.id} style={{marginTop: '0.5rem'}}>
                        {this.props.label}
                        <span style={{color: 'red'}}> *</span>
                    </label>
                </strong>

                <div>
                    <input onFocus={this.focus.bind(this)} type={this.props.type || "number"} value={this.props.value} className="form-control"
                       id={this.props.id} name={this.props.id} title={this.props.title}
                       placeholder={this.props.placeholder} required={this.props.required}
                       onChange={this.props.onChange} min={this.props.min} />
                </div>
            </div>
        );
    }
}

export default InputWithLabel;