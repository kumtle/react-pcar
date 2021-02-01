import React, { Component } from 'react';
import { get, getTourAuthKey, isNullOrEmpty } from 'utils';
import { connect } from 'react-redux';
import * as action from 'action';

const uri = 'tour/detailImage';

class TourDetailGallery extends Component {
  constructor(props){
    super(props);

    if (this.props.history != null) {
      //this.props.setHistory(this.props.history);
    }

    this.state = {
    }
  }
  
  componentDidMount() {
    //console.log(this.state.data);
    this.requestData();
  }

  requestData(params) {
    const { id, type } = this.props.match.params;
    
    var data = {
      ServiceKey: getTourAuthKey(),
      contentTypeId: type,
      contentId: id,
      MobileOS: window.os, 
      MobileApp: window.appName,
      imageYN: 'Y', 
      _type: 'json',
    }

    get(uri, data, 
      (res) => {
        console.log(res);
        this.setState({
          data: res.response.body.items.item
        });
      },
      (res) => {
        console.log(res);
      });
  }

  renderItems(){
    var result = [];
    if (this.state.data) {
      this.state.data.forEach(element => {
        if (!isNullOrEmpty(element.smallimageurl)) {
          result.push(<img src = {element.smallimageurl} />);
        }
      });
    }
    return (result);
  }

  render(){
    return (
      <div className='inner-box'>
        {this.renderItems()}
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

export default connect(mapStateToProps, mapDispatchToProps)(TourDetailGallery);