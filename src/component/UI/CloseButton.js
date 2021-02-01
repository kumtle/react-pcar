import React, { Component } from 'react';
import "./CloseButton.css";

class CloseButton extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  renderIcon() {
    var style = {
    }
    
    var spanStyle = {
        background: 'rgb(117, 117, 117)',
    }

    return (
      <div id='dv-close-button'>
        <label style={style} onClick={()=> { this.props.onClick(); }}>
          <div id='button-close-icon'>
            <span style={spanStyle}></span>
            <span style={spanStyle}></span>
          </div>
        </label>
      </div>
    );
  }

  render(){
    return (
      <div>
        { this.renderIcon() }
      </div>);
  }
}

export default CloseButton;