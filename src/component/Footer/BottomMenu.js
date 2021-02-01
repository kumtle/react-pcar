import React, { Component } from 'react';
import "./BottomMenu.css";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isNullOrEmpty } from 'utils';
import $ from 'jquery';

class BottomMenu extends Component {
  constructor(props){
    super(props);

    this.currentPageNum = 0;
    this.pageInfo = [
      '/main',
      '/game',
      '/tour',
    ]
    this.state = { 
      width: 0, 
      height: 0,
      page: 'main',
      oldPage: '',
      left: '0px'
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  movePage(index) {
    if (index > -1 && index < this.pageInfo.length) {
      this.currentPageNum = index;
      var linkData = {
        pathname: this.pageInfo[index]
      }
      this.props.history.replace(linkData);
    }
  }

  toLeft(distance) {
    //console.log(this.currentPageNum + ' to left => ' +  distance);
    if (distance > 150) {
    }
    this.movePage(this.currentPageNum + 1);
  }

  toRight(distance){
    //console.log(this.currentPageNum + ' to right => ' +  distance);
    if (distance > 150) {
    }
    this.movePage(this.currentPageNum - 1);      
  }

  componentDidMount() {
    window.setSwipeCallBack(this.toLeft.bind(this), this.toRight.bind(this));
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ 
      width: window.innerWidth, 
      height: window.innerHeight 
    });
  }

  renderSelector () {
    if (this.currentPageNum > -1 && this.state.oldPage != this.state.page) {
      var width = (this.state.width - 80) * 0.25;
      var offset = this.currentPageNum > 1 ? 80 : 0;
      var left = this.currentPageNum * width + offset + 'px';
      //$('.selector').css('left', left);

      this.setState({
        ...this.state,
        oldPage: this.state.page,
        left: left,
      })
    }
    return (<div className='selector' style={{left: this.state.left}}/>);
  }

  renderButton (link, text){
    var className = "material-icons bottom-button";
    if (isNullOrEmpty(this.props.state)) {
      if (link == '/main') {
        //className += ' on';
        this.currentPageNum = 0;
        $('.selector').attr('class', 'selector main');
      }
    }
    else if (this.props.state.startsWith(link)){
      //className += ' on';
      this.currentPageNum = this.pageInfo.indexOf(link);

      if (this.currentPageNum != -1) {
        var page = link.slice(1);
        if (this.state.page != page)
        this.setState({
          ...this.state,
          page: page,
        });
        //$('.selector').attr('class', 'selector ' + link.slice(1));
      }
    }
    return (<Link className={className} to={link}>
      {text}
    </Link>);
  }

  render(){
    return (
      <div id='dv-footer'>
        <div className='frame left'>
          {this.renderButton('/main', 'home')}
          {this.renderButton('/game', 'games')}
        </div>        
        <div className='frame center'>
          <div className='button'> <a>?</a> </div>
        </div>
        <div className='frame right'>
          {this.renderButton('/tour', 'tour')}
          {this.renderButton(undefined, 'location_on')}
        </div>
        {this.renderSelector()}
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
      //setPage: (page, header, footer) => { dispatch(action.setPage(page, header, footer)) }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(BottomMenu);