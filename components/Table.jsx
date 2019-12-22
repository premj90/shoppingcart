import React, { Component } from "react";
import ReactDataGrid from "react-data-grid";
import { ButtonToolbar, Button } from "react-bootstrap";
import FormInput from "./Form";
import "./styles.css";
import Form from "react-bootstrap/Form";
import { FormGroup, FormControl, InputGroup } from "react-bootstrap";
import { getAllData, getImage, deleteRow } from "./apiCalls";
import { Toolbar, Data } from "react-data-grid-addons";
const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />;

class HelloWorld extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getAllData()
      .then(response => {
        response.map(row => {
          getImage(row.name).then(resp => {
            row["image"] = resp;
            return row;
          });
        });
        return response;
      })
      .then(response => this.setState({ rows: response }));
  }

  handleEdit(values) {
    console.log(values);
  }
  handleImage = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
    let temp = this.state.rows;
    let data = event.target.files[0];
    let example = <img src={`data:image/jpeg;base64,${data}`} />;

    const trow = [
      {
        image: example,
        id: 0,
        title: "row111",
        count: 20,
        unit: "grams",
        buttons: ""
      }
    ];
    this.setState({ rows: [...temp, ...trow] });
    console.log([...temp, ...trow]);
  };

  deleteRow = rowId => {
    let r = [...this.state.rows];

    deleteRow(r[rowId].name).then(resp => console.log(resp));
    r.splice(rowId, 1);

    this.setState({ rows: r });
  };

  getCellActions(column, row) {
    let firstNameActions = [
      {
        icon: (
          <div className="centeredb1">
            <Button variant="primary" size="sm">
              Delete
            </Button>
          </div>
        ),
        callback: () => {
          const temp = this.state.rows;
          alert(temp.indexOf(row));
          this.deleteRow(temp.indexOf(row));
        }
      },
      {
        icon: (
          <div className="centeredb2">
            <Button variant="primary" size="sm" className="float-left">
              Edit
            </Button>
          </div>
        ),
        callback: () => {
          alert("Editing");
        }
      }
    ];
    if (column.key === "buttons") {
      return firstNameActions;
    }
    return null;
  }

  state = {
    selectedFile: null,

    rows: [
      { id: 0, title: "row1", count: 20 },
      { id: 1, title: "row2", count: 40 },
      { id: 2, title: "row3", count: 60 }
    ],
    columns: [
      { key: "image", name: "Image", editable: true },
      { key: "name", name: "Product Name" },
      { key: "description", name: "Description" },
      { key: "price", name: "Price" },
      { key: "unit_of_measurement", name: "Unit of Measurement" },
      { key: "buttons", name: " ", width: 130 }
    ]
  };
  render() {
    return (
      <div className="mt-5  ml-2 mr-2">
        <InputGroup size="lg" className="mb-3">
          <div className="form1">
            <label>View Products</label>
          </div>

          <InputGroup.Append>
            <Button
              variant="primary"
              className="pull-right"
              onClick={this.props.addProductComponent}
            >
              Add Product
            </Button>
          </InputGroup.Append>
        </InputGroup>

        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={this.state.rows.length}
          getCellActions={(column, row) => this.getCellActions(column, row)}
          onGridRowsUpdated={this.onGridRowsUpdated}
          minHeight={this.state.rows.length * 200}
          rowHeight={80}
        />
      </div>
    );
  }
}

export default HelloWorld;
