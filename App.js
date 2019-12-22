import React, { Component } from "react";
import FormInput from "./components/Form";
import HelloWorld from "./components/Table";
import { addNewRecord, getImage } from "./components/apiCalls";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  addProductComponent = () => {
    this.setState({
      addProduct: !this.state.addProduct,
      viewProduct: !this.state.viewProduct
    });
  };

  handleSubmit = values => {
    addNewRecord(values).then(resp =>
      this.setState({
        addProduct: !this.state.addProduct,
        viewProduct: !this.state.viewProduct
      })
    );
    console.log(this.state);
  };
  state = {
    addProduct: false,
    viewProduct: true
  };
  render() {
    return (
      <div>
        {this.state.viewProduct && (
          <HelloWorld addProductComponent={this.addProductComponent} />
        )}
        {this.state.addProduct && (
          <FormInput handleSubmit={this.handleSubmit} />
        )}
      </div>
    );
  }
}

export default App;
