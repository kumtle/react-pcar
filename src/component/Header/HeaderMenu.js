import React, { Component } from 'react';
import "./HeaderMenu.css";
import HambergerButton from 'component/UI/HambergerButton';
import BackButton from 'component/UI/BackButton';
import { isNullOrEmpty } from 'utils';
import { connect } from 'react-redux';

class HeaderMenu extends Component {
  constructor(props){
    super(props);

    this.state = {
      current: ''
    }
  }

  renderHamberger(show){
    if (show) {
      return (
        <div className='cell'>
          <HambergerButton align='right' color={'#757575'} onClick={ (show) => { console.log(show)} }/>
        </div>
        );
    }
    else {
      return;
    }
  }

  render(){
    if (!isNullOrEmpty(this.props.state) && this.props.state.indexOf('/tour/') > -1) {
      return (
        <div id='dv-header-menu'>
          <div className='table'>
            <div className='cell'>
              <BackButton history={this.props.history} />
            </div>
          </div>
        </div>);
    }
    return (
      <div id='dv-header-menu' className='hidden'>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);