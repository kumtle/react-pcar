import React, { Component } from 'react';
import "./HambergerButton.css";
import $ from 'jquery';
import { isNullOrEmpty } from 'utils';

const defaultProps = {
  color: 'black'
}

class HambergerButton extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  onToggle() {

    var result = $('#dv-sidebar').toggleClass('show');
    $('#nav-icon3').toggleClass('open');

    if (this.props.onClick != null) {
      var show = $('#nav-icon3').hasClass('open');
      this.props.onClick(show);
    }
  }

  renderIcon() {
    var style = {
      marginTop: '20px',
      marginLeft: '20px',
      marginRight: '20px',
    }
    
    var spanStyle = {
        background: this.props.color,
    }
    //console.log(spanStyle);

    var className = 'headerLabel';
    if (!isNullOrEmpty(this.props.align)) {
      className += ' ' + this.props.align;
    }

    return (
      <div>
        <input type='checkbox' id='headerMenu'/>
        <label style={style} 
          className={className}
          htmlFor='headerMenu' 
          id='nav-icon3'
          onClick={()=> { this.onToggle(); }}>
          <div id='nav-icon3'>
            <span style={spanStyle}></span>
            <span style={spanStyle}></span>
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

HambergerButton.defaultProps = defaultProps;

export default HambergerButton;