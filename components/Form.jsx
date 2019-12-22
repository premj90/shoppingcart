import React, { Component } from "react";
import { ButtonToolbar, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FormGroup, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import ContainedButtons from "./button";
class FormInput extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    product_name: "",
    unit_of_measurement: "",
    product_price: "",
    description: "",
    uploaded_image: null
  };
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(target.name);

    this.setState({
      [name]: value
    });
  }

  handleChangeImage(value) {
    console.log(value.target.files[0]);
    this.setState({ uploaded_image: value.target.files[0] });
  }

  componentDidMount() {
    //getAllData();
    console.log("heyy");
  }
  render() {
    return (
      <div className="addForm">
        <Form>
          <Form.Group controlId="product_name">
            <Form.Label>PRODUCT NAME</Form.Label>
            <Form.Control
              type="text"
              placeholder=" "
              name="product_name"
              onChange={event => this.handleInputChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="unitMeasure">
            <Form.Label>UNIT OF MEASUREMENT</Form.Label>
            <Form.Control
              type="text"
              placeholder=" "
              name="unit_of_measurement"
              onChange={event => this.handleInputChange(event)}
            />
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>PRICE</Form.Label>
            <Form.Control
              type="text"
              placeholder=" "
              name="product_price"
              onChange={event => this.handleInputChange(event)}
            />
          </Form.Group>
          <Form.Group controlId="productDescription">
            <Form.Label>PRODUCT DESCRIPTION</Form.Label>
            <Form.Control
              as="textarea"
              rows="4"
              name="description"
              onChange={event => this.handleInputChange(event)}
            />
          </Form.Group>
          <FormGroup>
            <Form.Label>PRODUCT IMAGE</Form.Label>
            <ContainedButtons
              handleChangeImage={event => this.handleChangeImage(event)}
            />
          </FormGroup>

          <ButtonToolbar>
            <Button variant="primary" type="reset" className="btn-space">
              Reset
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={event => {
                this.props.handleSubmit(this.state);
              }}
            >
              Submit
            </Button>
          </ButtonToolbar>
        </Form>
      </div>
    );
  }
}

export default FormInput;
