import React, { Component } from 'react';
import { get, getRequest, getTourAuthKey, isNullOrEmpty } from "utils";
import TourItem from "./TourItem";
import { connect } from 'react-redux';
import * as action from 'action';
import { blankDiv } from 'utils';

const uri = 'tour/areaBasedList';

class Tour extends Component {
    constructor(props){
    super(props);

    if (this.props.history != null) {
      this.props.setHistory(this.props.history);
    }

    this.state = {
    }

  }

  componentDidMount(){
    this.requestList();

  }

  requestList(params) {
    var data = {
      ServiceKey: getTourAuthKey(),
      //contentTypeId: 12,
      areaCode: 32,
      sigunguCode: 15,
      listYN: 'Y',
      MobileOS: window.os,
      MobileApp: window.appName,
      arrange: 'A',
      numOfRows: 9999,
      pageNo: 1,
      _type: 'json',
    }
    
    console.log('requestList');
    get(uri, data, 
      (res) => {
        console.log(res);
        this.props.setTourData(res.response.body.items.item);
      }, 
      (res) => {
        console.log(res);
      });
  }

  renderList() {
    if (this.props.tourData && this.props.tourData.length > 0) {
      var list = [];
      this.props.tourData.forEach(item => {
        if (!isNullOrEmpty(item.firstimage))
          item.firstimage = item.firstimage.replace('http://', 'https://');
        if (!isNullOrEmpty(item.firstimage2))
          item.firstimage2 = item.firstimage2.replace('http://', 'https://');

        if(!isNullOrEmpty(item.firstimage) && !isNullOrEmpty(item.addr1))
          list.push(<TourItem data={item} />);
      })
      return(<div>
        {list}
      </div>);
    }
    return(<div>
    </div>);
  }

  render(){
    return (
      <div>
        { blankDiv('60px') }
        {this.renderList()}
      </div>);
  }
  /**
   * 
   * navigator.geolocation.getCurrentPosition((position)=>{alert('Lat: ' + position.coords.latitude + ' ' + 'Lon: ' + position.coords.latitude);});
  */
}


const mapStateToProps = (state) => {
  return {
    tourData: state.tourData
      //user: state.auth.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHistory: (history) => { dispatch(action.setHistory(history)) },
    setTourData: (tourData) => { dispatch(action.setTourData(tourData)) }
      //setPage: (page, header, footer) => { dispatch(action.setPage(page, header, footer)) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tour);