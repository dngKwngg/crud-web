import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleted: false // Trạng thái xóa sản phẩm
    };
    this.delete = this.delete.bind(this);
  }

  // Gọi khi đã xóa sản phẩm thành công
  onDeleteSuccess() {
    this.setState({
      isDeleted: true // Cập nhật trạng thái là đã xóa sản phẩm
    });
  }

  delete() {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios
        .delete('http://localhost:5000/products/delete/' + this.props.obj._id)
        .then(() => {
          console.log('Deleted');
          this.onDeleteSuccess(); // Gọi khi đã xóa sản phẩm thành công
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    // Nếu sản phẩm đã bị xóa thành công khỏi CSDL, không hiển thị nó trên trang web
    if (this.state.isDeleted) {
      return null;
    }

    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.image}</td>
        <td>{this.props.obj.description}</td>
        <td>{this.props.obj.ratings}</td>
        <td>{this.props.obj.numOfReviews}</td>
        <td>{this.props.obj.price}</td>
        <td>{this.props.obj.countInStock}</td>
        <td>
          <Link to={'/edit/' + this.props.obj._id} className="btn btn-primary">
            Edit
          </Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default TableRow;