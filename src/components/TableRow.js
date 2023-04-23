import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {
    // constructor(props) {
    //     super(props);
    //     this.delete = this.delete.bind(this);
    // }
    // delete() {
    //     axios.get('http://localhost:4000/books/delete/'+this.props.obj._id)
    //         .then(console.log('Deleted'))
    //         .catch(err => console.log(err))
    // }

    render() {
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
                    <button className="btn btn-primary">Edit</button>
                </td>
                <td>
                    <button className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
}

export default TableRow;