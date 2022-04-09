// src/App.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';

class App extends Component {
  constructor(props) {  // Create and initialize state
    super(props);
    this.state = {
      accountBalance: 0.0,
      debitBalance: 0.0,
      creditBalance: 0.0,
      // DEBIT PORTION //
      debit_statement: '',
      debit_value: '',
      debit_array: [],
      // CREDIT PORTION //
      credit_statement: '',
      credit_array: [],
      credit_value: '',
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '07/23/96',
      }
    }
  }

  componentDidMount() {
    //PROMISE ALL FETCHES AT THE SAME TIME SO ONE FETCH DOES NOT OPERATE OVER THE OTHER, IN OTHER WORDS, DO THIS SO THE CODE ACTUALLY WORKS IN ORDER
    Promise.all([
      fetch('https://moj-api.herokuapp.com/debits').then(value => value.json()),
      fetch('https://moj-api.herokuapp.com/credits').then(value => value.json())
    ])
      .then((value => {
        //SPLITTING VALUE ARRAY TO TWO NEW ARRAYS
        let debit_promise = value[0] //Getting Debit API
        let credit_promise = value[1] //Getting Credit API
        for (let i = 0; i < 10; i++) {
          //Setting array for Debit API
          var joined = this.state.debit_array.concat('$' + debit_promise[i].amount + ' ' + debit_promise[i].description + ' ' + debit_promise[i].date.slice(0, 10));
          //Setting array for Credit API
          var joined_2 = this.state.credit_array.concat('$' + credit_promise[i].amount + ' ' + credit_promise[i].description + ' ' + credit_promise[i].date.slice(0, 10));
          this.setState({
            debit_array: joined,
            credit_array: joined_2,
            debitBalance: this.state.debitBalance + debit_promise[i].amount,
            creditBalance: this.state.creditBalance + credit_promise[i].amount
          })
        }
        let round = this.state.creditBalance - this.state.debitBalance;
        round = round.toFixed(2);
        round = parseFloat(round);
        this.setState({
          accountBalance: round
        })
      }))
  }

  //////////////////////////////////////////////////////////////////////////////ADD CREDIT IMPLEMENTATION///////////////////////////////////////////////////////////////////////
  //Event Handler for Description  
  credit_update = (event) => {
    this.setState({
      credit_statement: event.target.value
    });
  }
  //Event handler for Amount
  credit_numeric_update = (event) => {
    this.setState({
      credit_value: event.target.value
    });
  }
  //When Add Statement is pressed, do the following function:
  addCredit = () => {
    //Adding Date Portion
    var today = new Date(); //Accessing Date constructor
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate()); //Grabbing Date YYYY-MM-DD
    this.setState(prev => {
      return {
        credit_statement: '',
        credit_array: prev.credit_array.concat("$" + prev.credit_value + " " + prev.credit_statement + " " + date)
      };
    });
    //Adding the credit value to the total credit balance
    let conversion = parseFloat(this.state.credit_value) //Converting string input into a float number
    this.setState(prev => {
      return {
        creditBalance: parseFloat((prev.creditBalance + conversion).toFixed(2)), //Add the inputted value into the total credit value
        accountBalance: parseFloat((prev.accountBalance + conversion).toFixed(2)) // Add money to account balance when adding more credit
      };
    });// EQUIVALENT OF THIS CODE: this.state.creditBalance += conversion;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////////////////////////////////////////////ADD DEBIT IMPLEMENTATION/////////////////////////////////////////////////////////////////////////////////////////
  //Event Handler for Description  
  debit_update = (event) => {
    this.setState({
      debit_statement: event.target.value
    });
  }
  //Event handler for Amount
  debit_numeric_update = (event) => {
    this.setState({
      debit_value: event.target.value
    });
  }
  //When Add Statement is pressed, do the following function:
  addDebit = () => {
    //Adding Date Portion
    var today = new Date(); //Accessing Date constructor
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate()); //Grabbing Date YYYY-MM-DD
    this.setState(prev => {
      return {
        debit_statement: '',
        debit_array: prev.debit_array.concat("$" + prev.debit_value + " " + prev.debit_statement + " " + date)
      };
    });
    //Adding the debit value to the total debit balance
    let conversion = parseFloat(this.state.debit_value) //Converting string input into a float number
    this.setState(prev => {
      return {
        debitBalance: parseFloat((prev.debitBalance + conversion).toFixed(2)), //Add the inputted value into the total debit value
        accountBalance: parseFloat((prev.accountBalance - conversion).toFixed(2)) // Remove money from account when adding debit
      };
    });// EQUIVALENT OF THIS CODE: this.state.debitBalance += conversion;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser }
    newUser.userName = logInInfo.userName
    this.setState({ currentUser: newUser })
  }

  updateAccountBalance = balance => {
    this.setState({
      accountBalance: balance
    })
  }
  //Adding implementation of updating debitBalance
  updateDebit = debit => {
    this.setState({
      debitBalance: this.state.debitBalance + debit
    })
  }

  //Adding implementation of updating creditBalance
  updateCredit = credit => {
    this.setState(
      {
        creditBalance: this.state.creditBalance + credit
      }
    )
  }

  // Create Routes and React elements to be rendered using React components
  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />);  // Pass props to "LogIn" component
    //Creating Credits Implementation
    const CreditsComponent = () =>
    (<Credits
      accountBalance={this.state.accountBalance}
      updateAccountBalance={this.updateAccountBalance}
      updateCredit={this.updateCredit}
      creditBalance={this.state.creditBalance}
      credit_array={this.state.credit_array}
      credit_value={this.state.credit_value}
      credit_statement={this.state.credit_statement}
      credit_update={this.credit_update}
      credit_numeric_update={this.credit_numeric_update}
      debitBalance={this.state.debitBalance}
      addCredit={this.addCredit}
    />);
    //Creating Debit Implementation
    const DebitsComponent = () =>
    (
      <Debits
        accountBalance={this.state.accountBalance}
        updateAccountBalance={this.updateAccountBalance}
        updateDebit={this.updateDebit}
        debitBalance={this.state.debitBalance}
        debit_array={this.state.debit_array}
        debit_update={this.debit_update}
        debit_numeric_update={this.debit_numeric_update}
        addDebit={this.addDebit}
        debit_value={this.state.debit_value}
        debit_statement={this.state.debit_statement}
        creditBalance={this.state.creditBalance}
      />
    );

    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/Debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;