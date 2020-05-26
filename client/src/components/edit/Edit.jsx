import React, { Component } from "react";
import "./edit.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Col,
  Input,
} from "reactstrap";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: {},
    };
  }

  componentWillReceiveProps(props) {
    if (props.employee) {
      const { employee } = props;
      this.setState({ employee });
    }
  }

  onChange = (e) => {
    const employee = { ...this.state.employee };
    employee[e.target.name] = e.target.value;
    this.setState({ employee });
  };

  // send to App to update 
  onSave = () => {
    const { employee } = this.state;
    this.props.onSave(employee);
    this.props.onClose();
  };

  render() {
    const { first_name, last_name, email, city, state } = this.state.employee;
    return (
      <div>
        <Modal isOpen={this.props.editMode} toggle={this.props.onClose}>
          <ModalHeader toggle={this.props.onClose}>
            Edit{" "}
            <span style={{ color: "red" }}>
              {" "}
              {first_name} {last_name}{" "}
            </span>
          </ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Label sm={2}>First</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="first_name"
                  value={first_name}
                  onChange={(e) => this.onChange(e)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Last</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="last_name"
                  value={last_name}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Email</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>City</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="city"
                  value={city}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>State</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="state"
                  value={state}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
          </ModalBody>
          <div className="sc-btn">
            <Button onClick={this.onSave}>Save</Button>{" "}
            <Button onClick={this.props.onClose}>Cancel</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Edit;
