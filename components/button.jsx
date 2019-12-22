import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

class ContainedButtons extends Component {
  state = {};
  render() {
    return (
      <div>
        <input
          accept="image/*"
          id="contained-button-file"
          type="file"
          onChange={event => this.props.handleChangeImage(event)}
        />
        <label htmlFor="contained-button-file">
          <Button variant="outlined" component="span" className={"asd"}>
            Upload
          </Button>
        </label>
      </div>
    );
  }
}

export default ContainedButtons;
