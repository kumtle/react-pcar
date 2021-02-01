import React, { Component } from 'react';
import { get, getTourAuthKey, isNullOrEmpty } from 'utils';
import { connect } from 'react-redux';
import * as action from 'action';
import $ from 'jquery';

const uri = 'tour/detailIntro';
const ignoreKeys = [
  'contentid', 
  'contenttypeid', 
  'contentTypeId', 
  'contentTypeId', 
  'contentTypeId', 
  'contentTypeId', 
];

const titles = {
  'packing' : '포장 가능',
  'parkingfood' : '주차 시설',
  'reservationfood' : '예약 안내',
  'infocenterfood' : '문의 및 안내',

  'chkcreditcardfood' : '신용 카드 정보',
  'smoking' : '금연/흡연',
  'treatmenu' : '취급 메뉴',
  'firstmenu' : '대표 메뉴',
  'opentimefood' : '영업 시간',
  'lcnsno' : '인허가 번호',
  'restdatefood': '쉬는 날',
}
class TourDetailInfo extends Component {
  constructor(props){
    super(props);

    if (this.props.history != null) {
      //this.props.setHistory(this.props.history);
    }

    this.state = {

    }
    this.insertItems = [];
  }
  

  componentDidUpdate(){
    if (this.insertItems) {
      console.log(this.insertItems);
      this.insertItems.forEach(element => {
        try {
          /*console.log($(`#${element.key}`));
          $(`#${element.key}`).insert(element.val);*/
          var val = document.createElement('val');
          val.innerHTML = element.val;
          //console.log(document.getElementById(element.key));
          document.getElementById(element.key).appendChild(val);
        }
        catch(e){
          console.log(e);
        }        
      });
      this.insertItems = [];
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
      introYN: 'Y', 
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
    var inserts = [];
    if (this.state.data) {
      //console.log(this.state.data.entries())
      for (let key in this.state.data) {
        var val = `${this.state.data[key]}`;
        var title = titles[key];
        if (!title) {
          title = key;
        }
        
        if (val && val != 0 && ignoreKeys.indexOf(key) == -1) {
          if (val.indexOf('<') > -1) {
            var id = `tour-detail-info-${key}`;
            result.push(<li id={id}>
              {`${title} : `}</li>)
              inserts.push({key: id, val: val});
          }
          else {
            result.push(<li>{`${title} : ${val}`}</li>)
          }
        }
      }
      /*
      this.state.data.forEach(element => {
        console.log(element);
        //result.add(<img src = {element.smallimageurl} />);
      });*/
    }
    this.insertItems = inserts;
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

export default connect(mapStateToProps, mapDispatchToProps)(TourDetailInfo);