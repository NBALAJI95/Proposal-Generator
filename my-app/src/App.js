import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputWithLabel from './FormComponents/InputWithLabel.js';
import CardInput from './FormComponents/InputWithoutLabel';
import Heading from './FormComponents/Heading.js';
import Total from './FormComponents/Total.js';
import Excel from './FormComponents/Excel.js';

const cardDetails = () => ({
    Volume: '', Number: '', Percentage: '', Item: '', Fee: ''
});

const STATE = {
    businessName: '', currentProvider: '',
    volume: '', ticket: '', transactions: '',
    assoFee: '', authFee: '',
    monthlyFee: '', regulatoryFee: '', pciFee: '',
    techFee: '', pos: '', misc: '',
    VISA: {
        Volume: '', Number: '', Percentage: '', Item: '', Fee: ''
    },
    Mastercard: {
        Volume: '', Number: '', Percentage: '', Item: '', Fee: ''
    },
    Discover: {
        Volume: '', Number: '', Percentage: '', Item: '', Fee: ''
    },
    AMEX: {
        Volume: '', Number: '', Percentage: '', Item: '', Fee: ''
    },
    amexCheck: false,
    amexFee: ''
};

class App extends Component {
  constructor(props) {
      super(props);
      this.state = STATE;
  }

  reset() {
      this.setState(STATE);
      this.setState({amexCheck: false});

      this.setState({VISA: cardDetails()});
      this.setState({Mastercard: cardDetails()});
      this.setState({Discover: cardDetails()});
      this.setState({AMEX: cardDetails()});

      document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  handleChange(event) {
      if(event.target.name.indexOf("_") >= 0) {
          let key = event.target.name.split('_');
          let getV = this.state[`${key[0]}`];
          getV[`${key[1]}`] = event.target.value;

          const newV = {};

          let fee = ((parseFloat(getV['Volume']) || 0) * (parseFloat(getV['Percentage']) || 0)/100) +
              ((parseFloat(getV['Number']) || 0) * (parseFloat(getV['Item']) || 0));

          fee = parseFloat(fee.toFixed(2));

          getV['Fee'] = fee;

          newV[`${key[0]}`] = getV;

          this.setState(newV);
      }
      else {
          const newV = {};
          newV[`${event.target.name}`] = event.target.value;
          this.setState(newV);
      }
  }

  checkChange(event) {
      this.setState({ amexCheck: event.target.checked});
      if(!this.stateamexCheck)
          this.setState({amexFee: ''});
  }

  calculateFee() {
      let fee = (parseFloat(this.state.techFee) || 0)
      + (parseFloat(this.state.pos) || 0) + (parseFloat(this.state.misc) || 0)
      + (parseFloat(this.state.monthlyFee) || 0) + (parseFloat(this.state.regulatoryFee) || 0)
      + (parseFloat(this.state.pciFee) || 0) + ((parseFloat(this.state.assoFee) || 0)
          + (parseFloat(this.state.authFee) || 0)) + ((parseFloat(this.state.VISA.Fee) || 0)
          + (parseFloat(this.state.Mastercard.Fee) || 0) + (parseFloat(this.state.Discover.Fee) || 0)
          + (parseFloat(this.state.AMEX.Fee) || 0));
      fee = parseFloat(fee.toFixed(2));
      return fee;
  }

    handleSubmit(event) {
        this.reset();
        event.preventDefault();
    }

  renderCheck() {
      const check = this.state.amexCheck;

      if(check) {
          return (
              <div>
                  <InputWithLabel id="amexFee" value={this.state.amexFee} label="AMEX Fees"
                      placeholder="Amount (USD)" title="AMEX Fees" onChange={this.handleChange.bind(this)}
                      min="0" required />
              </div>
          );
      }

      return;
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> Proposal Generator </h1>
        </header>

        <div className="container-fluid">
            <form onSubmit={this.handleSubmit.bind(this)} className="Form-Container">

                <Heading headingText={"Business Info."} />

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6">
                            <InputWithLabel id="businessName" type="text" value={this.state.businessName}
                                label="Business Name" placeholder="eg. John Smith" title="Type your Business Name here"
                                onChange={this.handleChange.bind(this)} required />
                        </div>

                        <div className="col-sm-6">
                            <InputWithLabel id="currentProvider" type="text" value={this.state.currentProvider}
                                label="Current Provider" placeholder="eg. Clover" title="Type your Current Provider"
                                onChange={this.handleChange.bind(this)} required />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-4">
                            <InputWithLabel id="volume" value={this.state.volume} label="Volume" title="Total Volume"
                                placeholder="Amount (USD)" onChange={this.handleChange.bind(this)} min="0" required />
                        </div>

                        <div className="col-sm-4">
                            <InputWithLabel id="ticket" value={this.state.ticket} label="Average Ticket" title="Total Volume"
                                placeholder="Amount (USD)" onChange={this.handleChange.bind(this)} min="0" required />
                        </div>

                        <div className="col-sm-4">
                            <InputWithLabel id="transactions" value={this.state.transactions} label="Total Transactions"
                                placeholder="eg. 75" title="Total Transactions" onChange={this.handleChange.bind(this)}
                                min="0" required />
                        </div>
                    </div>
                </div>

                <Heading headingText={"Processing Fees"} />

                <div className="row" style={{ fontSize: "1.1rem" }}>
                    <div className="col-sm-2">
                        <strong> Card </strong>
                    </div>

                    <div className="col-sm-2">
                        <strong> Volume </strong>
                    </div>

                    <div className="col-sm-2">
                        <strong> # </strong>
                    </div>

                    <div className="col-sm-2">
                        <strong> % </strong>
                    </div>

                    <div className="col-sm-2">
                        <strong> Item </strong>
                    </div>

                    <div className="col-sm-2">
                        <strong> Fee </strong>
                    </div>
                </div>

                <hr/>

                <div className="form-group">
                    <CardInput id="VISA" value={this.state.VISA} label={"VISA"}
                       onChange={this.handleChange.bind(this)} />
                </div>

                <div className="form-group">
                    <CardInput id="Mastercard" value={this.state.Mastercard} label={"Mastercard"}
                        onChange={this.handleChange.bind(this)} />
                </div>

                <div className="form-group">
                    <CardInput id="Discover" value={this.state.Discover} label={"Discover"}
                        onChange={this.handleChange.bind(this)} />
                </div>

                <div className="form-group">
                    <CardInput id="AMEX" value={this.state.AMEX} label={"AMEX"}
                        onChange={this.handleChange.bind(this)} />
                </div>

                <Total label="processing fees" value={`$ ${(parseFloat(this.state.VISA.Fee) || 0) +
                    (parseFloat(this.state.Mastercard.Fee) || 0) + (parseFloat(this.state.Discover.Fee) || 0)
                    + (parseFloat(this.state.AMEX.Fee) || 0)}`} />

                <Heading headingText={"Association & Auth"} />

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6">
                            <InputWithLabel id="assoFee" value={this.state.assoFee} label="Association Fees"
                                placeholder="Amount (USD)" title="Association Fees" onChange={this.handleChange.bind(this)}
                                min="0" required />

                            <div style={{paddingTop: "0.5rem"}} className="form-group">
                                <input id="amex" checked={this.state.amexCheck} onChange={this.checkChange.bind(this)}
                                   type="checkbox" aria-label="Checkbox for AMEX" />

                                <label style={{paddingLeft: "7px"}} htmlFor="amex">
                                    Specify Amex Value
                                </label>

                                {this.renderCheck()}

                                {((parseFloat(this.state.assoFee) || 0) < (parseFloat(this.state.amexFee) || 0))?
                                    <b style={{color: 'red'}}> AMEX fee should be less than Association fee </b>: ""}

                            </div>

                        </div>

                        <div className="col-sm-6">
                            <InputWithLabel id="authFee" value={this.state.authFee} label="Other Auth fees"
                                placeholder="Amount (USD)" title="Other Auth fees" onChange={this.handleChange.bind(this)}
                                min="0" required />
                        </div>
                    </div>
                </div>

                <Heading headingText={"Additional Fees"} />

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-4">
                            <InputWithLabel id="monthlyFee" value={this.state.monthlyFee}
                                label="Monthly Fees" placeholder="Amount (USD)" title="Monthly Fees"
                                onChange={this.handleChange.bind(this)} min="0" required />
                        </div>

                        <div className="col-sm-4">
                            <InputWithLabel id="regulatoryFee" value={this.state.regulatoryFee}
                                label="Regulatory Fees" placeholder="Amount (USD)" title="Regulatory Fees"
                                onChange={this.handleChange.bind(this)} min="0" required />
                        </div>

                        <div className="col-sm-4">
                            <InputWithLabel id="pciFee" value={this.state.pciFee}
                                label="PCI Compliance Fees" placeholder="Amount (USD)" title="PCI Compliance Fees"
                                onChange={this.handleChange.bind(this)} min="0" required />
                        </div>
                    </div>

                    <br />

                        <div className="row">
                            <div className="col-sm-4">
                                <InputWithLabel id="techFee" value={this.state.techFee}
                                    label="Tech Fees" placeholder="Amount (USD)" title="Tech Fees"
                                    onChange={this.handleChange.bind(this)} min="0" required />
                            </div>

                            <div className="col-sm-4">
                                <InputWithLabel id="pos" value={this.state.pos}
                                    label="POS Fees" placeholder="Amount (USD)" title="POS Fees"
                                    onChange={this.handleChange.bind(this)} min="0" required />
                            </div>

                            <div className="col-sm-4">
                                <InputWithLabel id="misc" value={this.state.misc}
                                    label="Misc Fees" placeholder="Amount (USD)" title="Misc Fees"
                                    onChange={this.handleChange.bind(this)} min="0" required />
                            </div>
                        </div>

                        <Total label="additional fees" value={`$ ${(parseFloat(this.state.techFee) || 0)
                            + (parseFloat(this.state.pos) || 0) + (parseFloat(this.state.misc) || 0)
                            + (parseFloat(this.state.monthlyFee) || 0) + (parseFloat(this.state.regulatoryFee) || 0)
                            + (parseFloat(this.state.pciFee) || 0)}`} />

                        <hr/>

                    <Total label="Fees" value={`$ ${this.calculateFee()}`} />

                    <Total label="Effective Rate" value={(parseFloat((this.calculateFee()/(parseFloat(this.state.volume) || 0)*100).toFixed(2))
                        || "N/A" )+ "%"} />

                    <hr/>

                    <div style={{float: "right"}} className="form-group">
                        <Excel fee={`${this.calculateFee()}`} value={this.state} />
                        <button type="button" onClick={this.reset.bind(this)} style={{marginLeft: "10px"}} className="btn btn-secondary"> Reset </button>
                    </div>

                    <br/>

                </div>

            </form>
        </div>
      </div>
    );
  }
}

export default App;
