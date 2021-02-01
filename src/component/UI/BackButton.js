import React, { Component } from 'react';
import "./BackButton.css";
import { connect } from 'react-redux';
import { isNullOrEmpty } from 'utils';
import * as action from 'action';

class BackButton extends Component {
  constructor(props){
    super(props);

    this.state = {
      current: ''
    }
  }
  
  onClick(){
    if (this.props.history) {
      this.props.history.goBack();
    }
  }

  renderIcon() {
    if (isNullOrEmpty(this.props.state) 
    || this.props.state == '/'
    || this.props.state == '/main') {
      return;
    }
    var style = {
      marginTop: '3px',
      marginLeft: '3px',
    }
    
    var spanStyle = {
        background: 'rgb(117, 117, 117)',
    }

    return (
      <div id='dv-back-button'>
        <label style={style} onClick={()=> { this.onClick(); }}>
          <div id='button-back-icon'>
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

const mapStateToProps = (state) => {
  return {
    history: state.history,
    state: state.history ? state.history.location.pathname : '',
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BackButton);