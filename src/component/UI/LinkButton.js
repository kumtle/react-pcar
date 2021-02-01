import React, { PropTypes, Component } from 'react';
import "./Button.css";
import { Link } from 'react-router-dom';

const propTypes = {
};

const defaultProps = {
  text: '',
  value: '',
  link: '/',
  onClick: undefined,
};

class LinkButton extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  render(){
    return (
      <div className='dv-button'>
        <Link to={this.props.link}>
          {this.props.text}
        </Link>
      </div>);
  }
}

LinkButton.propTypes = propTypes;
LinkButton.defaultProps = defaultProps;

export default LinkButton;