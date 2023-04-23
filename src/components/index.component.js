import React, {Component} from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {books: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/books')
            .then(response => {
                console.log(response.data);
                this.setState({books: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRow() {
        return this.state.books.map(function (object, i) {
            return <TableRow obj={object} key={i}/>;
        });
    }

    render() {
        return (
            <div>
                <h3 align="center">Books List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Quantity</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}