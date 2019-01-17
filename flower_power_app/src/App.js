import React, { Component } from 'react';
import Header from './components/header/header';
import Content from './components/content/content';
import EditCard from './components/editCard/editCard';
import './App.css';
import { connect } from "react-redux";
import { getProducts } from './Redux/Actions/products';
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

  componentDidMount = async () => {
    this.props._getAllProducts();
  }
  componentDidUpdate(){
    console.log(this.state.setEditMode)
  }
  handleClick(id) {
    this.props._startEditProduct(id);
  }
  onNameChange(event){
    const name = event.target.name;
    const val = event.target.value;
    
    console.log(this.state.dataById[name]);
    
    this.setState(prevState => {
      prevState.dataById[name] = val;
      return prevState;
    });
  }

  onSave() {
    this.props._finishEditProduct();
  }
  
  render() {
    return (
      <div className="App">
      <Header />
      {
        this.props.ui.productEdit ? 
          <EditCard {...this.state.dataById} onNameChange={this.onNameChange} onSave={this.onSave}/> : 
          this.props.ui.showSpinner ? 
            <div className="loading-spinner"><div></div><div></div><div></div><div></div></div>
          : 
          <Content 
            name={this.state.name} 
            handleClick={this.handleClick} 
            allData={this.props.products} 
            title={this.state.title}
            handleChangeTitle={()=> {}}
          />
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  ui: state.ui
});
  
const mapDispatchToProps = (dispatch) => ({
    _getAllProducts: () => dispatch(getProducts()),
    _startEditProduct: (id) => dispatch(startEditProduct(id)),
    _finishEditProduct: () => dispatch(finishEditProduct())
  });


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
