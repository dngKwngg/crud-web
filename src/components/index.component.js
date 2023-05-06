import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/products')
      .then(response => {
        console.log(response.data);
        this.setState({ products: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  tabRow() {
    return this.state.products.map(function (object, i) {
      if (object) {
        return (
          <TableRow
            key={i}
            obj={object}
          />
        );
      } else {
        return null;
      }
    });
  }

  render() {
    return (
      <div style={{ padding: "40px", marginTop: "20px" }}>
        <h3 align="center">Products List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Ratings</th>
              <th>Number of Reviews</th>
              <th>Price</th>
              <th>Count in Stock</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );

  }
}
