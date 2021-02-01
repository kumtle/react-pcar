import React, { Component } from 'react';
import BottomMenu from "component/Footer/BottomMenu";

class Footer extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  render(){
    return (
      <div>
        <BottomMenu/>
      </div>);
  }
}

export default Footer;