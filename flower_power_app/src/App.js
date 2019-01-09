import React, { Component } from 'react';
import Header from './components/header/header';
import Content from './components/content/content';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'Bogdan',
      allData: [],
      title: 'Super Bogdan'
    }
  }

  componentDidMount = async () => {
    const response = await fetch('/products');
    const data = await response.json();
    this.setState({
      allData: data
    });
  }
  
  render() {
    console.log('app')
    return (
      <div className="App">
      <Header />
      <Content 
      name={this.state.name} 
      handleClick={()=>{}} 
      allData={this.state.allData} 
      title={this.state.title}
      handleChangeTitle={()=> {}}
      />
      </div>
    );
  }
}

export default App;
