import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, BrowserRouter } from 'react-router-dom';
import './create.css';

class Create extends Component {
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
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeImage(e) {
    this.setState({
      image: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeRatings(e) {
    this.setState({
      ratings: e.target.value,
    });
  }

  onChangeNumOfReviews(e) {
    this.setState({
      numOfReviews: e.target.value,
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeCountInStock(e) {
    this.setState({
      countInStock: e.target.value,
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
      countInStock: this.state.countInStock,
    };

    axios
      .post('http://localhost:5000/products/add', obj)
      .then((res) => {
        console.log(res.data);
        alert('Product added successfully!');
        this.props.history.push('/create');
      })
      .catch((err) => console.log(err));

    this.setState({
      name: '',
      image: '',
      description: '',
      ratings: 0,
      numOfReviews: 0,
      price: 0,
      countInStock: 0,
    });
  }

    render() {
        return (
            <div className="create-form">
                <h3>Add New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            required
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image (URL):</label>
                        <input
                            type="text"
                            id="image"
                            className="form-control"
                            required
                            value={this.state.image}
                            onChange={this.onChangeImage}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            className="form-control"
                            required
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ratings">Ratings:</label>
                        <input
                            type="number"
                            id="ratings"
                            className="form-control"
                            required
                            min={0}
                            max={5}
                            step={0.1}
                            value={this.state.ratings}
                            onChange={this.onChangeRatings}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            className="form-control"
                            required
                            min={0}
                            step={1}
                            value={this.state.price}
                            onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="countInStock">Count in Stock:</label>
                        <input
                            type="number"
                            id="countInStock"
                            className="form-control"
                            required
                            min={0}
                            step={1}
                            value={this.state.countInStock}
                            onChange={this.onChangeCountInStock}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
            </div>
        );
    }
}
export default withRouter(Create);


