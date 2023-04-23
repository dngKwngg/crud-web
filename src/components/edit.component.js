import React, { Component } from 'react';

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
    // Dieu huong ve trang index sau khi edit xong
        this.props.history.push('/index');
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