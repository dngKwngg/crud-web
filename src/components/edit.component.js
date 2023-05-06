import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './edit.css'

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeRatings = this.onChangeRatings.bind(this);
        this.onChangeNumOfReviews = this.onChangeNumOfReviews.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeCountInStock = this.onChangeCountInStock.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            image: '',
            description: '',
            ratings: 0,
            numOfReviews: 0,
            price: 0,
            countInStock: 0,
            redirect: false
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/products/edit/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    image: response.data.image,
                    description: response.data.description,
                    ratings: response.data.ratings,
                    numOfReviews: response.data.numOfReviews,
                    price: response.data.price,
                    countInStock: response.data.countInStock
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeImage(e) {
        this.setState({
            image: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeRatings(e) {
        this.setState({
            ratings: e.target.value
        });
    }

    onChangeNumOfReviews(e) {
        this.setState({
            numOfReviews: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeCountInStock(e) {
        this.setState({
            countInStock: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            name: this.state.name,
            image: this.state.image,
            description: this.state.description,
            ratings: this.state.ratings,
            numOfReviews: this.state.numOfReviews,
            price: this.state.price,
            countInStock: this.state.countInStock
        };

        axios.post('http://localhost:5000/products/update/' + this.props.match.params.id, obj)
            .then(res => {
                console.log(res.data);
                // Update the state of the component with the new data
                this.setState({
                    name: res.data.name,
                    image: res.data.image,
                    description: res.data.description,
                    ratings: res.data.ratings,
                    numOfReviews: res.data.numOfReviews,
                    price: res.data.price,
                    countInStock: res.data.countInStock
                });
                // Display a confirmation popup and redirect to / if the user clicks "OK"
                if (window.confirm("Product updated. Go back to product list?")) {
                    this.setState({
                        redirect: true
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div style={{ marginTop: 10 }}>
                <h3 style={{ margin: '0 auto', width: '25%' }}>Update Product</h3>
                <form onSubmit={this.onSubmit} style={{ margin: '0 auto', width: '25%' }}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            required
                            style={{ width: '300px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.image}
                            onChange={this.onChangeImage}
                            required
                            style={{ width: '300px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <textarea
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            required
                            style={{ width: '300px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Ratings: </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.ratings}
                            onChange={this.onChangeRatings}
                            min={0}
                            step={0.1}
                            required
                            style={{ width: '300px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Number of Reviews: </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.numOfReviews}
                            onChange={this.onChangeNumOfReviews}
                            min={0}
                            required
                            style={{ width: '300px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                            min={0}
                            step={0.01}
                            required
                            style={{ width: '300px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Count in Stock: </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.countInStock}
                            onChange={this.onChangeCountInStock}
                            min={0}
                            required
                            style={{ width: '300px' }}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Update Product"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}


