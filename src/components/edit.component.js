import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
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

    componentDidMount() {
        axios.get('http://localhost:4000/books/edit/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    bookName: response.data.bookName,
                    authorName: response.data.authorName,
                    quantity: response.data.quantity 
                });
            })
            .catch(function (error) {
                console.log(error);
            })
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

    axios.post('http://localhost:4000/books/update/'+this.props.match.params.id, obj)
        .then(res => {
            console.log(res.data);
            // Update the state of the component with the new data
            this.setState({
                bookName: res.data.bookName,
                authorName: res.data.authorName,
                quantity: res.data.quantity 
            });
            // Reload the component to update the view
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
}



    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3 align="center">Update Product</h3>
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
                        <input type="submit"
                                value="Update Book"
                                className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}