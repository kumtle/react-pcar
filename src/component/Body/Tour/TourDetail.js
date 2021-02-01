import React, { Component } from 'react';
import TourDetailCommon from './TourDetailCommon';
import TourDetailInfo from "./TourDetailInfo";
import TourDetailGallery from "./TourDetailGallery";
import { BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import "./TourDetail.css";
import { connect } from 'react-redux';
import * as action from 'action';

class TourDetail extends Component {
  constructor(props){
    super(props);

    if (this.props.history != null) {
      this.props.setHistory(this.props.history);
    }

  }

  onClick (url, path) {
    var linkData = {
        pathname: `${url}/${path}`,
        state: {
          ...this.props.location.state,
          path: path,
        }
    }
    this.props.history.replace(linkData);
  }

  renderTab(url, currentPath, path, name){
    return (<span className={currentPath == path ? 'on' : ''} onClick={ () => { this.onClick(url, path); }}>
        <div>
          {name}
        </div>
      </span>);
  }
  
  render() {
    const currentPath = this.props.location.state && this.props.location.state.path ? this.props.location.state.path : 'common';
    var { url } = this.props.match;
    if (url[url.length - 1] === '/') {
      url = url.substr(0, url.length - 1);
    }

    return (
      <div id='dv-tour-detail'>
        <div id='dv-tour-detail-tab'>
          {this.renderTab(url, currentPath, 'common', '공통정보')}
          <div className='line'/>
          {this.renderTab(url, currentPath, 'info', '소개정보')}
          <div className='line'/>
          {this.renderTab(url, currentPath, 'gallery', '추가이미지')}
        </div>
        <div id='dv-tour-detail-body'>
          <Switch>
            <Route path='/tour/:type/:id/common' component={TourDetailCommon} />
            <Route path='/tour/:type/:id/info' component={TourDetailInfo} />
            <Route path='/tour/:type/:id/gallery' component={TourDetailGallery} />
            <Route path ='/'>
              <Redirect to={`${url}/common`} />
            </Route>
          </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps)(TourDetail);