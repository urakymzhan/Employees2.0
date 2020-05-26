import React, { Component } from "react";
import { withRouter } from "react-router";
import "./list.css";
import { Link } from "react-router-dom";
import Edit from "../edit/Edit.jsx";

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
    const { employees, sortBy, sortByFn, toggleOrder } = this.props;
    const { limit, page, editMode, employee } = this.state;
    //counting total pages & pushing to an array all total pages
    const totalPages = Math.ceil(employees.length / limit);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    // condition for prev & next button/links to show right page
    const next = page < Math.ceil(employees.length / limit) ? page + 1 : page;
    const prev = page > 1 ? page - 1 : 1;

    return (
      <div className="list">
        <Edit
          editMode={editMode}
          employee={employee}
          onSave={this.props.onSave}
          onClose={this.onClose}
        />
        <div className="row header">
          <div onClick={() => sortByFn("id")} className="cell sm">
            Index{" "}
            <i
              className={
                toggleOrder && sortBy === "id"
                  ? "fa fa-sort-asc"
                  : "fa fa-sort-desc"
              }
              aria-hidden="true"
            ></i>{" "}
          </div>
          <div onClick={() => sortByFn("first_name")} className="cell lg">
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
          <div onClick={() => sortByFn("email")} className="cell">
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
          <div onClick={() => sortByFn("city")} className="cell">
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
          <div onClick={() => sortByFn("state")} className="cell">
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
                  <div className="cell sm">{ind + 1}</div>
                  <div className="cell">
                    {first_name} {last_name}
                  </div>
                  <div title={email} className="cell lg">
                    {email}
                  </div>
                  <div className="cell">{city}</div>
                  <div className="cell">{state}</div>
                  <div
                    className="edit"
                    onClick={(e) => this.toggle(e, employee)}
                  >
                    Edit
                  </div>
                  <div
                    className="trash"
                    onClick={(e) => {
                      this.props.delete(e, _id);
                    }}
                  >
                    Delete
                  </div>
                </Link>
              );
            })}
          <div className="nep">
            Showing{" "}
            {`${limit * (page - 1)} - ${
              limit * page > 200 ? 201 : limit * page
            }`}
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
      </div>
    );
  }
}

export default withRouter(List);
