import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false // Trạng thái xóa sách
        };
        this.delete = this.delete.bind(this);
    }

    // Gọi khi đã xóa sách thành công
    onDeleteSuccess() {
        this.setState({
            isDeleted: true // Cập nhật trạng thái là đã xóa sách
        });
    }

    delete() {
        if (window.confirm("Are you sure you want to delete this book?")) {
            axios.get('http://localhost:4000/books/delete/'+this.props.obj._id)
                .then(() => {
                    console.log('Deleted');
                    this.onDeleteSuccess(); // Gọi khi đã xóa sách thành công
                })
                .catch(err => console.log(err))
        }
    }

    render() {
        // Nếu sách đã bị xóa thành công khỏi CSDL, không hiển thị nó trên trang web
        if (this.state.isDeleted) {
            return null;
        }

        return (
            <tr>
                <td>
                    {this.props.obj.bookName}
                </td>
                <td>
                    {this.props.obj.authorName}
                </td>
                <td>
                    {this.props.obj.quantity}
                </td>
                <td>
                    <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
                </td>
                <td>
                    <button onClick={this.delete} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
}

export default TableRow;
