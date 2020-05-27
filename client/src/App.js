import React, { Component } from 'react';
import List from './components/list/List';
import Search from './components/search/Search';
import './App.css'
import Sticky from './components/sticky/Sticky';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Employee from './components/employee/Employee.jsx';
import AddEmployee from './components/addemployee/AddEmployee.jsx';
<<<<<<< HEAD
=======
import { getData, addEmployee, editEmployee, deleteEmployee } from './actions';
import { connect } from 'react-redux';
>>>>>>> with-redux

const apiUrl = 'http://localhost:5000/'

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      searchBy: '',
      sortBy: '',
      toggleOrder: false
    }
  }
  componentDidMount() {
    this.props.getData();
  }

  getSearch = e => this.setState({ search: e.target.value });

  getSearchBy = e => this.setState({ searchBy: e.target.value });

  sortByFn = (value) => {
    this.setState({ sortBy: value, toggleOrder: !this.state.toggleOrder })
  }
  handleSortvalue = (filteredEmployees) => {
    const { toggleOrder, sortBy } = this.state;
    filteredEmployees.sort((a, b) => {

      if (a[sortBy] > b[sortBy]) {
        return 1
      } else if (a[sortBy] < b[sortBy] || b[sortBy] === null) {
        return -1
      } else {
        return 0
      }
    });
    if (toggleOrder) {
      filteredEmployees.reverse();
    }
    return filteredEmployees;
  }

  filter = () => {
    const { search, searchBy } = this.state;
    const { employees } = this.props;

    return employees.filter(employee => {
      if (searchBy === '') {
        return employee["first_name"] && employee["first_name"].toLowerCase().includes(search.toLowerCase())
      } else {
        return employee[searchBy] && searchBy.length ? employee[searchBy].toLowerCase().includes(search.toLowerCase()) : true;
      }
    })
  }

  // add
  // we don't need this anymore
  // addEmployee = employee => {
  //   this.props.addEmployee(employee);
  // }

  // edit
  // we don't need this anymore
  // onSave = employee => {
  //   this.props.editEmployee(employee);
  // }

  // delete
<<<<<<< HEAD
  delete = (e, _id) => {
    e.preventDefault(); 

    fetch(`${apiUrl}api/employee/${_id}`, {
      method: 'DELETE',
    })
      .then(response => {
        const { employees } = this.state;
        let allEmployees = employees.filter(el => el._id !== _id)
        this.setState({ employees: allEmployees });

      })
  }
=======
  // we don't need this anymore
  // delete = (e, _id) => {
  //   e.preventDefault();
  //   this.props.deleteEmployee(e, _id);
  // }
>>>>>>> with-redux

  render() {
    const { sortBy, search, searchBy, toggleOrder } = this.state;
    let { isLoading, employees } = this.props;

    // filter
    employees = this.filter();

    // sort
    employees = this.handleSortvalue(employees);

    console.log("filteredEm", employees )
    // spinner
    const loader = <div className="lds-dual-ring"></div>;
    // if loaded render List
<<<<<<< HEAD
    let content = isLoading ? loader : <List employees={sortedEmployees} delete={this.delete} sortByFn={this.sortByFn} sortBy={sortBy} toggleOrder={toggleOrder} onSave={this.onSave} />;
    // no search found
    if (!isLoading && !sortedEmployees.length) {
      content = <div className="not-found">Employee Not Found</div>
=======
    // get rid employees after setting sorting and filtering on redux
    let content = isLoading ? loader : <List employees={employees} sortByFn={this.sortByFn} sortBy={sortBy} toggleOrder={toggleOrder} />;
    // if employees undefined
    if (!isLoading && !employees.length) {
      content = <div className="not-found">Data Not Found</div>
>>>>>>> with-redux
    }

    return (
      <React.Fragment>
        <Sticky />
        <div className='app'>
          <Router>
            <Switch>
              <Route path='/' exact>
<<<<<<< HEAD
                <Redirect to="/page/1"/>
=======
                <Redirect to="/page/1" /> 
>>>>>>> with-redux
              </Route>
              <Route path='/page/:page'>
                <Search
                  value={search}
                  getSearch={this.getSearch}
                  getSearchBy={this.getSearchBy}
                  searchBy={searchBy}
                />
                {content}
              </Route>
              <Route path='/employee/:id'>
<<<<<<< HEAD
                {!isLoading && sortedEmployees.length > 0 && <Employee employees={sortedEmployees} />}
              </Route>
              <Route path='/new-employee/'>
                <AddEmployee addEmployee={this.addEmployee} />
=======
                {!isLoading && employees.length > 0 && <Employee />}
              </Route>
              <Route path='/new-employee/'>
                <AddEmployee /> 
>>>>>>> with-redux
              </Route>
            </Switch>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.app.employees,
    isLoading: state.app.isLoading
  }
}
export default connect(mapStateToProps, { getData, addEmployee, editEmployee, deleteEmployee })(App);
