import React, { Component } from 'react';
import List from './components/list/List';
import Search from './components/search/Search';
import './App.css'
import Sticky from './components/sticky/Sticky';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Employee from './components/employee/Employee.jsx';
import AddEmployee from './components/addemployee/AddEmployee.jsx';

const apiUrl = 'http://localhost:5000/'

class App extends Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      isLoading: false,
      search: '',
      searchBy: '',
      sortBy: '',
      toggleOrder: false
    }
  }
  getData = () => {
    this.setState({ isLoading: true })
    fetch(`${apiUrl}api/employees`)
      .then(response => response.json())
      .then(employees => this.setState({ employees, isLoading: false }))
  }
  componentDidMount() {
    this.getData();
  }

  getSearch = e => this.setState({ search: e.target.value });

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
    const { employees, search, searchBy } = this.state;
    return employees.filter(employee => {
      if (searchBy === '') {
        return employee["first_name"] && employee["first_name"].toLowerCase().includes(search.toLowerCase())
      } else {
        return employee[searchBy] && searchBy.length ? employee[searchBy].toLowerCase().includes(search.toLowerCase()) : true;
      }
    })
  }

  // add
  addEmployee = employee => {
    fetch(`${apiUrl}api/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee)
    })
      .then(res => res.json())
      .then(response => {
        const { employees } = this.state;
        employees.unshift(response);
        this.setState({ employees })
      })

  }

  // edit
  onSave = employee => {
    fetch(`${apiUrl}api/employee/${employee._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee)
    })
      .then(response => {
        const employees = this.state.employees.map(el => {
          if (el.id === employee.id) {
            return employee
          }
          return el
        });
        this.setState({ employees });
      })
  }

  // delete
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

  render() {
    const { isLoading, sortBy, search, searchBy, toggleOrder } = this.state;
    // filter
    const filteredEmployees = this.filter();
    // sort
    let sortedEmployees = this.handleSortvalue(filteredEmployees);
    // spinner
    const loader = <div className="lds-dual-ring"></div>;
    // if loaded render List
    let content = isLoading ? loader : <List employees={sortedEmployees} delete={this.delete} sortByFn={this.sortByFn} sortBy={sortBy} toggleOrder={toggleOrder} onSave={this.onSave} />;
    // need timing for spinner to trigger this option
    if (!isLoading && !sortedEmployees.length) {
      content = <div className="not-found">Data Not Found</div>
    }

    return (
      <React.Fragment>
        <Sticky />
        <div className='app'>
          <Router>
            <Switch>
              <Route path='/' exact>
                <Redirect to="/page/1"/>
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
                {!isLoading && sortedEmployees.length > 0 && <Employee employees={sortedEmployees} />}
              </Route>
              <Route path='/new-employee/'>
                <AddEmployee addEmployee={this.addEmployee} />
              </Route>
            </Switch>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
