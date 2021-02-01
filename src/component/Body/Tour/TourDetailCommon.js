import KakaoMap from 'component/Map/KakaoMap';
import React, { Component } from 'react';
import { get, getTourAuthKey, isNullOrEmpty } from 'utils';
import { connect } from 'react-redux';
import * as action from 'action';
//import MainComponent from "component/MainComponent";

const uri = 'tour/detailCommon';

class TourDetailCommon extends Component {
  constructor(props){
    super(props);

    if (this.props.history != null) {
      //this.props.setHistory(this.props.history);
    }

    this.state = {
      show: false,
      type: 'scheme',
    }
  }

  onShow(show, type) {
    this.setState({
      ...this.state,
      show: show,
      type: type,
    })
  }

  componentDidUpdate(){
    var val = document.createElement('val');
    val.innerHTML = this.state.data.overview ? this.state.data.overview : '';
    document.getElementById('dv-tour-info-overview').appendChild(val); 
    val = document.createElement('val');
    val.innerHTML = this.state.data.homepage ? this.state.data.homepage : '없음';
    document.getElementById('dv-tour-info-homepage').appendChild(val);
    //{this.convertHompage(homepage, title)}


  }

  componentDidMount() {
    //console.log(this.state.data);
    this.requestData();
  }

  renderMap (){
    var title = this.state.data.title;
    var x = this.state.data.mapx;
    var y = this.state.data.mapy;
    var show = this.state.show;
    //console.log('render map => ' + show);
    return (
      <KakaoMap title={title} mapx={x} mapy={y} show={show} type={this.state.type}
        onHide={() => { this.onShow(false, this.state.type); }}/>
    );
  }

  renderBody() {
    var addr = this.state.data.addr1;
    var firstimage = this.state.data.firstimage;
    var homepage = this.state.data.homepage;
    var overview = this.state.data.overview;
    var title = this.state.data.title;
    var x = this.state.data.mapx;
    var y = this.state.data.mapy;
    var show = !this.state.show;

    if (!isNullOrEmpty(firstimage)) {
      firstimage = firstimage.replace('http://', 'https://');
    }
    return (
      <div className={show ? '' : 'nodisplay'}>
        <div id='dv-tour-info' className='inner-box'>
          <div className='title'>
            {title}
          </div>
          <img src={firstimage} />
          <li id='dv-tour-info-overview'></li>
          <li>{addr}</li>
          <li id='dv-tour-info-homepage'>홈페이지: </li>
        </div>
        <div id='kakao-map-button-group'>
          <div id='kakako-map-button' onClick={ () => { this.onShow(true, 'scheme'); }}> 
            <img src='https://t1.daumcdn.net/localimg/localimages/07/2018/mw/m640/ico_map2x.png'/>
            <span id='kakao-map-button-label'>길찾기 1</span> 
          </div>
          <div id='kakako-map-button' onClick={ () => { this.onShow(true, 'link'); }}> 
            <img src='https://t1.daumcdn.net/localimg/localimages/07/2018/mw/m640/ico_map2x.png'/>
            <span id='kakao-map-button-label'>길찾기 2</span> 
          </div>
          <div id='kakako-map-button' onClick={ () => { this.onShow(true, 'default'); }}> 
            <img src='https://t1.daumcdn.net/localimg/localimages/07/2018/mw/m640/ico_map2x.png'/>
            <span id='kakao-map-button-label'>길찾기 3</span> 
          </div>
        </div>
      </div>);
  }

  requestData(params) {
    const { id, type } = this.props.match.params;
    
    var data = {
      ServiceKey: getTourAuthKey(),
      contentTypeId: type,
      contentId: id,
      MobileOS: window.os, 
      MobileApp: window.appName,
      defaultYN: 'Y', 
      firstImageYN: 'Y', 
      areacodeYN: 'Y', 
      catcodeYN: 'Y', 
      addrinfoYN: 'Y', 
      mapinfoYN: 'Y', 
      overviewYN: 'Y', 
      transGuideYN: 'Y',
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

  convertHompage(original, title) {
    if (isNullOrEmpty(original)) {
      return (<a>없음</a>);
    }
    else if (original.startsWith('http')) {
      return (<a href={original} target='_blank' title={'새창' + title}>{original}</a>);
    }
    else {
      try {
        var buffer = original.split('>');
        var url = buffer[0].split('\"')[1];
        var text = buffer[1].split('</a')[0];
        return (<a href={url} target='_blank' title={'새창' + title}>{text}</a>);
      }
      catch (e) {
        return (<a>없음</a>);
      }
    }
  }

  render() {
    if (this.state.data) {

      return (
        <div>
          {this.renderBody()}
          {this.renderMap()}
        </div>
        );
    }

    return(
      <div>
        {'불러오는 중 입니다'}
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

export default connect(mapStateToProps, mapDispatchToProps)(TourDetailCommon);