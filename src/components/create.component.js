// create.component.js
// Tao form dien thong tin add item vao server

import React, { Component } from 'react';
import axios from 'axios'

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeBookName = this.onChangeBookName.bind(this);
        this.onChangeAuthorName = this.onChangeAuthorName.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            bookName: '',
            authorName: '',
            quantity:''
        }
    }

    onChangeBookName(e) {
        this.setState({
            bookName: e.target.value
        });
    }

    onChangeAuthorName(e) {
        this.setState({
            authorName: e.target.value
        });
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            bookName: this.state.bookName,
            authorName: this.state.authorName,
            quantity: this.state.quantity
        };
        axios.post('http://localhost:4000/books/add', obj)
            .then(res => console.log(res.data));

        this.setState({
            bookName: '',
            authorName: '',
            quantity: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Book Name:  </label>
                        <input 
                            type="text"
                            className="form-control" 
                            required="required" 
                            value={this.state.bookName} 
                            onChange={this.onChangeBookName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Author Name: </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            required="required" 
                            value={this.state.authorName} 
                            onChange={this.onChangeAuthorName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input 
                            type="number" 
                            min={0} 
                            className="form-control" 
                            required="required" 
                            value={this.state.quantity} 
                            onChange={this.onChangeQuantity}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Click to add product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}