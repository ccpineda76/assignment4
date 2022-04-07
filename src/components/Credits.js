// src/components/Credits.js
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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
        //BINDING THIS TO MAKE FUNCTIONS WORK
        this.update = this.update.bind(this);
        this.addCredit = this.addCredit.bind(this);
        this.numeric_update = this.numeric_update.bind(this);
    }
    componentDidMount() {
        let binData = null;
        // THIS PORTION PARSES THROUGH DEBITS API AND APPENDS IT TO OUR EMPTY STATEMENT LIST ARRAY
        fetch('https://moj-api.herokuapp.com/credits')
            .then(result => result.json())
            .then(data => {
                binData = data;
                for (let i = 0; i < 10; i++) {
                    var joined = this.state.statement_list.concat('$' + binData[i].amount + ' ' + binData[i].description + ' ' + binData[i].date.slice(0, 10));
                    this.setState({
                        statement_list: joined
                    })
                    this.setState({
                        total_credit: this.state.total_credit + binData[i].amount
                    })
                    //Updating Parent Credit Balance 
                    this.props.updateCredit(binData[i].amount)
                    //Updating Parent Account Balance
                    this.props.updateAccountBalance((this.props.accountBalance + binData[i].amount))
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
        
        //Updating Credit value to parent
    this.props.updateCredit(parseFloat(this.state.credit_value));
    // Updating accountBalance value to parent
    this.props.updateAccountBalance(this.props.accountBalance + (parseFloat(this.state.credit_value)))
    }

    render() {
        let balance = this.props.accountBalance + this.state.total_credit;
        return (
            <div>
                <h1>Credits</h1>
                <ul>
                    {
                        this.state.statement_list.map((statements) => {
                            return <li>{statements}</li>
                        })
                    }
                </ul>
                <label>Amount</label>
                <input type="text" value={this.state.credit_value} onChange={this.numeric_update} />
                <label>Description</label>
                <input type="text" value={this.state.statement} onChange={this.update} />
                <button
                    type="button"
                    onClick={this.addCredit}>Add Statement</button>
                <h2>Total Credit Value: {this.props.creditBalance}</h2>
                <h3>Account Balance: {this.props.accountBalance}</h3>
                <Link to="/Debits">Debits </Link>
            </div>
        )
    }
}
export default Credits;