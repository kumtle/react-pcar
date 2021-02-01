import React, { PropTypes, Component } from 'react';
import "./Button.css";

const propTypes = {
};

const defaultProps = {
  text: '',
  value: '',
  onClick: undefined,
};

class Button extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  render(){
    return (
      <div className='dv-button'>
        <div onClick={() => { this.props.onClick(this.props.value); }}>
          {this.props.text}
        </div>
      </div>);
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;