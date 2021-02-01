import React, { Component } from 'react';
import HeaderMenu from 'component/Header/HeaderMenu';

class Header extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <HeaderMenu />
      </div>);
  }
}

export default Header;