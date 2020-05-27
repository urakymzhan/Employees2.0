import React, { Component } from "react";
import { withRouter } from "react-router";
import "./list.css";
import { Link } from "react-router-dom";
import Edit from "../edit/Edit.jsx";
import { connect } from "react-redux";
import { deleteEmployee, editEmployee, setSortBy } from "../../actions";
class List extends Component {
  constructor(props) {
    super(props);
    const currentPage = Number(this.props.match.params.page);
    const page = !isNaN(currentPage) ? currentPage : 1;
    this.state = {
      limit: 10,
      page,
      editMode: false,
      employee: {},
    };
  }
  next = () => {
    const { employees } = this.props;
    const { page, limit } = this.state;
    if (page < Math.ceil(employees.length / limit))
      this.setState({ page: page + 1 });
  };
  prev = () => {
    const { page } = this.state;
    if (page > 1) {
      this.setState({ page: page - 1 });
    }
  };
  // get current page
  setPage = (page) => {
    this.setState({ page });
  };
  onClose = () => {
    this.setState({ editMode: !this.state.editMode });
  };
  // open/close modal
  toggle = (e, employee) => {
    e.preventDefault();
    this.setState({ editMode: !this.state.editMode, employee });
  };

  render() {
    console.log("redux props from list.jsx", this.props);
    let {
      employees,
      setSortBy,
      sortBy,
      toggleOrder,
      search,
      searchBy,
      deleteEmployee,
    } = this.props;
    const { limit, page, editMode, employee } = this.state;
    // count total pages & push total pages
    const totalPages = Math.ceil(employees.length / limit);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    // condition for prev & next button/links to show right page
    const next = page < Math.ceil(employees.length / limit) ? page + 1 : page;
    const prev = page > 1 ? page - 1 : 1;

    // sort testing out right now
    employees.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) {
        return 1;
      } else if (a[sortBy] < b[sortBy] || b[sortBy] === null) {
        return -1;
      } else {
        return 0;
      }
    });
    if (toggleOrder) {
      employees.reverse();
    }
    // filter testing out right now
    employees = employees.filter((employee) => {
      if (searchBy === "") {
        return (
          employee["first_name"] &&
          employee["first_name"].toLowerCase().includes(search.toLowerCase())
        );
      } else {
        return employee[searchBy] && searchBy.length
          ? employee[searchBy].toLowerCase().includes(search.toLowerCase())
          : true;
      }
    });

    // if search is not found 
    let tableContent = (
      <div className="content">
        {employees
          .slice(limit * (page - 1), limit * page)
          .map((employee, ind) => {
            const {
              _id,
              id,
              first_name,
              last_name,
              email,
              city,
              state,
            } = employee;
            return (
              <Link key={_id} className="row" to={`/employee/${_id}`}>
                <div className="cell sm">{id}</div>
                <div className="cell">
                  {first_name} {last_name}
                </div>
                <div title={email} className="cell lg">
                  {email}
                </div>
                <div className="cell">{city}</div>
                <div className="cell">{state}</div>
                <div className="edit" onClick={(e) => this.toggle(e, employee)}>
                  Edit
                </div>
                <div
                  className="trash"
                  onClick={(e) => {
                    deleteEmployee(e, _id);
                  }}
                >
                  Delete
                </div>
              </Link>
            );
          })}
        <div className="nep">
          Showing{" "}
          {`${limit * (page - 1)} - ${limit * page > 200 ? 201 : limit * page}`}
        </div>
        <div className="pagination">
          <Link to={`/page/${prev}`} className="left" onClick={this.prev}>
            Prev
          </Link>
          <div>
            {pages.map((el, ind) => {
              return (
                <Link
                  key={ind}
                  className={el === page ? "page active" : "page"}
                  to={`/page/${ind + 1}`}
                  onClick={() => this.setPage(el)}
                >
                  {el}
                </Link>
              );
            })}
          </div>
          <Link to={`/page/${next}`} className="right" onClick={this.next}>
            Next
          </Link>
        </div>
      </div>
    );

    if (employees.length === 0) {
      tableContent = <div className="not-found">Employee Not Found</div>;
    }

    return (
      <div className="list">
        <Edit editMode={editMode} employee={employee} onClose={this.onClose} />
        <div className="row header">
          <div onClick={() => setSortBy("id")} className="cell sm">
            ID{" "}
            <i
              className={
                toggleOrder && sortBy === "id"
                  ? "fa fa-sort-asc"
                  : "fa fa-sort-desc"
              }
              aria-hidden="true"
            ></i>{" "}
          </div>
          <div onClick={() => setSortBy("first_name")} className="cell lg">
            FullName{" "}
            <i
              className={
                toggleOrder && sortBy === "first_name"
                  ? "fa fa-sort-asc"
                  : "fa fa-sort-desc"
              }
              aria-hidden="true"
            ></i>
          </div>
          <div onClick={() => setSortBy("email")} className="cell">
            Email
            <i
              className={
                toggleOrder && sortBy === "email"
                  ? "fa fa-sort-asc"
                  : "fa fa-sort-desc"
              }
              aria-hidden="true"
            ></i>
          </div>
          <div onClick={() => setSortBy("city")} className="cell">
            City
            <i
              className={
                toggleOrder && sortBy === "city"
                  ? "fa fa-sort-asc"
                  : "fa fa-sort-desc"
              }
              aria-hidden="true"
            ></i>
          </div>
          <div onClick={() => setSortBy("state")} className="cell">
            State
            <i
              className={
                toggleOrder && sortBy === "state"
                  ? "fa fa-sort-asc"
                  : "fa fa-sort-desc"
              }
              aria-hidden="true"
            ></i>
          </div>
          <div className="cell sm">Actions</div>
        </div>
        {
          tableContent
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    employees: state.crudReducers.employees,
    sortBy: state.crudReducers.sortBy,
    toggleOrder: state.crudReducers.toggleOrder,
    search: state.crudReducers.search,
    searchBy: state.crudReducers.searchBy,
  };
};
export default connect(mapStateToProps, {
  deleteEmployee,
  editEmployee,
  setSortBy,
})(withRouter(List));
