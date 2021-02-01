import React, { Component } from 'react';
import { Header, Body, Footer } from 'container';
import "./App.css";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  render(){
    return (
      <div>
        <Header/>
        <Body/>
        <Footer/>
      </div>);
  }
}

export default App;