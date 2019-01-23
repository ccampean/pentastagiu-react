import React, { Component } from 'react';
import Header from './components/header/header';
import Content from './components/content/content';
import EditCard from './components/editCard/editCard';
import './App.css';
import { connect } from "react-redux";
import { getProducts, setSaveProduct, setNameProduct } from './Redux/Actions/products';
import { startEditProduct, finishEditProduct } from './Redux/Actions/ui';

class App extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.state = {
      name: 'Bogdan',
      title: 'Super Bogdan',
      setEditMode: false,
      dataById: {}
    }
  }

  componentDidMount(){
    this.props._getAllProducts();
  }
  componentDidUpdate(){
    console.log(this.state.setEditMode)
  }
  handleClick(id) {
    this.props._startEditProduct(id);
  }
  onNameChange(event){
    const name = event.target.value;
    this.props._setNameProduct(name);
  }
  deleteProduct(id) {
    console.log(id)
  }

  onSave() {
    this.props._setSaveProduct();
  }
  
  render() {
    console.log(this.props)
    return (
      <div className="App">
      <Header />
      {
        this.props.ui.productEdit ? 
          <EditCard {...this.state.dataById} onNameChange={this.onNameChange} onSave={this.onSave} product={this.props.product}/> : 
          this.props.ui.showSpinner ? 
            <div className="loading-spinner"><div></div><div></div><div></div><div></div></div>
          : 
          <Content 
            name={this.state.name} 
            handleClick={this.handleClick} 
            allData={this.props.products}
            product={this.props.product} 
            title={this.state.title}
            deleteProduct={this.deleteProduct}
            handleChangeTitle={()=> {}}
          />
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  ui: state.ui,
  product: state.products.product,
});
  
const mapDispatchToProps = (dispatch) => ({
    _getAllProducts: () => dispatch(getProducts()),
    _startEditProduct: (id) => dispatch(startEditProduct(id)),
    _finishEditProduct: () => dispatch(finishEditProduct()),
    _setSaveProduct: () => dispatch(setSaveProduct()),
    _setNameProduct: (name) => dispatch(setNameProduct(name))
  });


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
