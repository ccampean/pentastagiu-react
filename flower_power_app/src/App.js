import React, { Component } from 'react';
import Header from './components/header/header';
import Content from './components/content/content';
import EditCard from './components/editCard/editCard';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.state = {
      name: 'Bogdan',
      allData: [],
      title: 'Super Bogdan',
      setEditMode: false,
      dataById: {}
    }
  }

  componentDidMount = async () => {
    const response = await fetch('/products');
    const data = await response.json();
    this.setState({
      allData: data
    });
  }
  componentDidUpdate(){
    console.log(this.state.setEditMode)
  }
  handleClick(id) {
    this.setState((prevState) => {
      let data = {};
      const newData = prevState.allData.map((item) =>{
       if(item.id === id){
         data = item;
       }
       return item;
      });
      return {
        dataById: data,
        allData: newData,
        setEditMode: true,
      }
    }
    );
    console.log(id)
  }
  onNameChange(event){
    const name = event.target.value;
    this.setState(prevState => {
      prevState.dataById.name = name;
      return prevState;
    })
    console.log(event.target.value);
  }
  
  render() {
    console.log('app')
    return (
      <div className="App">
      <Header />
      {this.state.setEditMode ? 
      <EditCard {...this.state.dataById} onNameChange={this.onNameChange}/> : 
      <Content 
      name={this.state.name} 
      handleClick={this.handleClick} 
      allData={this.state.allData} 
      title={this.state.title}
      handleChangeTitle={()=> {}}
      />
      }
      </div>
    );
  }
}

export default App;
