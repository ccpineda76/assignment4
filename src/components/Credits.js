// src/components/Credits.js
//import AccountBalance from './AccountBalance';
import React, { Component } from 'react';

class Credits extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            statement: '',
            statement_list: [],
            credit_value: '',
            total_credit: 0
        };
        this.update = this.update.bind(this);
        this.addCredit = this.addCredit.bind(this);
        this.numeric_update = this.numeric_update.bind(this);
    }

    update(event) {
        this.setState({
            statement: event.target.value
        });
    }

    numeric_update(event) {
        this.setState({
            credit_value: event.target.value
        });
    }

    addCredit() {
        //Adding Date Portion
        var today = new Date(); //Accessing Date constructor
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate()); //Grabbing Date YYYY-MM-DD
        this.setState(prev => {
            return {
                statement: '',
                statement_list: prev.statement_list.concat("$" + prev.credit_value + " " + prev.statement + " " + date)
            };
        });
        //Adding the credit value to the total credit balance
        let conversion = parseFloat(this.state.credit_value) //Converting string input into a float number
        this.setState(prev => {
            return {
                total_credit: prev.total_credit + conversion //Add the inputted value into the total credit value
            };
        });// EQUIVALENT OF THIS CODE: this.state.total_credit += conversion;
    }

    render() {
        let balance = this.props.accountBalance + this.state.total_credit;
        return (
            <div>
                <h1>Credits</h1>
                <ul>
                    {
                        this.state.statement_list.map((statements) => (
                            <li>{statements}</li>
                        ))
                    }
                </ul>
                <label>Amount</label>
                <input type="text" value={this.state.credit_value} onChange={this.numeric_update} />
                <label>Description</label>
                <input type="text" value={this.state.statement} onChange={this.update} />
                <button
                    type="button"
                    onClick={this.addCredit}>Add Statement</button>
                <h2>Total Credit Value: {this.state.total_credit}</h2>
                <h3>Account Balance: {balance}</h3>
            </div>
        )
    }
}
export default Credits;