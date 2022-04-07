// src/components/Debits.js
//import AccountBalance from './AccountBalance';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Debits extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      statement: '',
      statement_list: [],
      debit_value: '',
      total_debit: 0,
    };

    //BINDING THIS TO MAKE FUNCTIONS WORK
    this.update = this.update.bind(this);
    this.addDebit = this.addDebit.bind(this);
    this.numeric_update = this.numeric_update.bind(this);
  }

  componentDidMount() {
    let binData = null;
    // THIS PORTION PARSES THROUGH DEBITS API AND APPENDS IT TO OUR EMPTY STATEMENT LIST ARRAY
    fetch('https://moj-api.herokuapp.com/debits')
      .then(result => result.json())
      .then(data => {
        binData = data;
        for (let i = 0; i < 10; i++) {
          var joined = this.state.statement_list.concat('$' + binData[i].amount + ' ' + binData[i].description + ' ' + binData[i].date.slice(0, 10));
          this.setState({
            statement_list: joined
          })
          this.setState({
            total_debit: this.state.total_debit + binData[i].amount
          })
          //Updating Parent Debit Balance 
          this.props.updateDebit(binData[i].amount) 
          //Updating Parent Account Balance 
          this.props.updateAccountBalance((this.props.accountBalance - binData[i].amount))
        }
      });
  }

  update(event) {
    this.setState({
      statement: event.target.value
    });
  }

  numeric_update(event) {
    this.setState({
      debit_value: event.target.value
    });
  }

  addDebit() {
    //Adding Date Portion
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate()); //Grabbing Date YYYY-MM-DD
    this.setState(prev => {
      return {
        statement: '',
        statement_list: prev.statement_list.concat("$" + prev.debit_value + " " + prev.statement + " " + date)
      };
    });

    //Adding the debit value to the total debit balance
    let convert = parseFloat(this.state.debit_value) //Converting string input into a float number
    this.setState(prev => {
      return {
        total_debit: prev.total_debit + convert //Add the inputted value into the total debit value
      };
    });// EQUIVALENT OF THIS CODE: this.state.total_debit += convert;

    //Updating Debit value to parent
    this.props.updateDebit(parseFloat(this.state.debit_value));
    // Updating accountBalance value to parent
    this.props.updateAccountBalance(this.props.accountBalance - (parseFloat(this.state.debit_value)))
  }

  render() {
    return (
      <div>
        <h1>Debits</h1>
        <ul>
          {
            this.state.statement_list.map((statements) => {
              return <li>{statements}</li>
            })
          }
        </ul>
        <label>Amount</label>
        <input type="text" value={this.state.debit_value} onChange={this.numeric_update} />
        <label>Description</label>
        <input type="text" value={this.state.statement} onChange={this.update} />
        <button
          type="button"
          onClick={this.addDebit}>Add Statement</button>
        <h2>Total Debit Value: {this.props.debitBalance}</h2>
        <h3>Account Balance: {this.props.accountBalance}</h3>
        <Link to="/credits">Credits </Link>
      </div>
    )
  }
}
export default Debits;