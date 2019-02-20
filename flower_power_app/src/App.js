import React, { Component } from "react";
import Header from "./components/header/header";
import Content from "./components/content/content";
import EditCard from "./components/editCard/editCard";
import AddCard from "./components/addCard";
import "./App.css";
import { connect } from "react-redux";
import {
  getProducts,
  setSaveProduct,
  setNameProduct,
  deleteProduct,
  setNameAddProduct,
  setDescriptionAddProduct
} from "./Redux/Actions/products";
import { startEditProduct, finishEditProduct } from "./Redux/Actions/ui";
import { Route, Switch } from "react-router-dom";

const NotFound = props => <h2>Page not found</h2>;

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.addCard = this.addCard.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.saveCard = this.saveCard.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.state = {
      dataById: {}
    };
  }

  componentDidMount() {
    this.props._getAllProducts();
  }

  handleClick(id) {
    this.props._startEditProduct(id);
    this.props.history.push(`/product/${id}`);
  }
  onNameChange(event) {
    const name = event.target.value;
    this.props._setNameProduct(name);
  }
  deleteProduct(id) {
    console.log(id);
    this.props._deleteProduct(id);
  }

  onSave() {
    this.props._setSaveProduct();
  }
  addCard() {
    this.props.history.push("/add-product");
    //this.setState({openAddCard: true});
  }
  nameChange(event) {
    console.log(event.target.value);
    this.props._setNameAddProduct(event.target.value);
  }
  descriptionChange(event) {
    this.props._setDescriptionAddProduct(event.target.value);
  }
  saveCard() {
    this.props._saveProduct();
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Header />
        <button className="button-add" onClick={this.addCard}>
          AddCard
        </button>

        <Switch>
          
          
          <Route path="/add-product" component={AddCard} />

          <Route
            path="/product/:productId"
            component={props => (
              <EditCard
                {...props}
                {...this.state.dataById}
                onNameChange={this.onNameChange}
                onSave={this.onSave}
                product={this.props.product}
              />
            )}
          />
          <Route
            exact
            path="/"
            component={() => (
              <Content
                handleClick={this.handleClick}
                allData={this.props.products}
                product={this.props.product}
                deleteProduct={this.deleteProduct}
                handleChangeTitle={() => {}}
              />
            )}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  ui: state.ui,
  product: state.products.product
});

const mapDispatchToProps = dispatch => ({
  _getAllProducts: () => dispatch(getProducts()),
  _startEditProduct: id => dispatch(startEditProduct(id)),
  _finishEditProduct: () => dispatch(finishEditProduct()),
  _setSaveProduct: () => dispatch(setSaveProduct()),
  _setNameProduct: name => dispatch(setNameProduct(name)),
  _deleteProduct: id => dispatch(deleteProduct(id)),
  _setNameAddProduct: id => dispatch(setNameAddProduct(id)),
  _setDescriptionAddProduct: description =>
    dispatch(setDescriptionAddProduct(description))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
