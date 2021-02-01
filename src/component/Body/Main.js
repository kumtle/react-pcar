import React, { Component } from 'react';
import LinkButton from "component/UI/LinkButton";
import { connect } from 'react-redux';
import * as action from 'action';
import { blankDiv } from 'utils';
import "./Main.css";

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
    }

    if (this.props.history != null) {
      this.props.setHistory(this.props.history);
    }
  }

  render(){
    return (
      <div id='dv-main'>
        { blankDiv('60px') }
        <div id='dv-main-buttons'>
          <LinkButton text={"평창군 소개"} 
            link='/'/>
            
          <LinkButton text={"관광지 소개"} 
            link='/tour'/>
        </div>
        <div id='dv-main-buttons'>      
          <LinkButton text={"AR 길찾기"} 
            link='/'/>
            
          <LinkButton text={"AR 체험"} 
            link='/game'/>
        </div>
        <div style={{width: '80vw', marginLeft: '10vw'}}>
          <b>browser info: </b>
          <br/>
          { window.navigator.userAgent }
          <br/>
          <br/>          
          <b>os:</b>{` ${window.os}`}
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => {
  return {
      //user: state.auth.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHistory: (history) => { dispatch(action.setHistory(history)) }
      //setPage: (page, header, footer) => { dispatch(action.setPage(page, header, footer)) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);