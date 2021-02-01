import React, { Component } from 'react';
import Button from 'component/UI/Button';
import { connect } from 'react-redux';
import * as action from 'action';
import { blankDiv } from 'utils';
import "./Game.css";

class Game extends Component {
  constructor(props){
    super(props);

    if (this.props.history != null) {
      this.props.setHistory(this.props.history);
    }

    this.state = {
    }
  }

  onClick(obj) {
    try {
      switch(window.os) {
        case 'AND':
          if (window.Android) {
            window.Android.startUnity(obj);
          }
          break;
        case 'IOS':
          var message = {
              'function': 'startUnity',
              'sceneName': obj
          };
          window.webkit.messageHandlers.jsHandler.postMessage(message);
          break;
        default:
          break;
      }
    }
    catch(e){
      console.log(e);
    }
  }

  render(){
    return (
      <div id='dv-game'>
      { blankDiv('60px') }
        <Button text={"START ARTEST"} value={"Artest"} 
          onClick={ (obj) => { this.onClick(obj); } }/>
        <Button text={"START AVO"} value={"Avo"}
          onClick={ (obj) => { this.onClick(obj); } }/>
        <Button text={"START MOLE GAME"} value={"Mole"}
          onClick={ (obj) => { this.onClick(obj); } }/>
        <Button text={"POI TEST"} value={"POI"}
          onClick={ (obj) => { this.onClick(obj); } }/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Game);