import React, { Component } from 'react';
import { getQueryString, isNullOrEmpty } from "utils";
import "./KakaoMap.css";
import CloseButton from 'component/UI/CloseButton';
import $, { getJSON } from 'jquery';

class KakaoMap extends Component {
  constructor(props){
    super(props);

    this.state = {
      url: '',
      urlList: [],
      pos: 0,
    }

    this.cachedAddress = '';
  }

  componentDidUpdate(){
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.show && !this.props.show) {
      this.showMap();
      //return false;
    }
    return true;
  }

  showMap () {
    if (!isNullOrEmpty(this.props.title) 
      && !isNullOrEmpty(this.props.mapx) 
      && !isNullOrEmpty(this.props.mapy)) {
    
        //var mapurl = 'https://map.kakao.com/link/to/' + this.props.title + ',' + this.props.mapy +',' + this.props.mapx;
        var start = '';
        var dest = this.props.title;
        var x = this.props.mapx;
        var y = this.props.mapy;
        
        var lat = 37.5754957;
        var lng = 126.8897835;

        if (window.Android) {
          //start = window.Android.getMyAddress();
          var gps = window.Android.getMyCoords();
          console.log("쥐피에스 좌표");
          console.log(gps);

          var json = JSON.parse(gps);
          lat = json.lat;
          lng = json.lng;
          console.log('lat ===> ' + lat);
          console.log('lng ===> ' + lng);
          //start = window.Android.getAddress();
        }

        window.searchDetailAddrFromCoords(lat, lng, (result) => { 
          if (result != this.cachedAddress) {
            start = result;
            //this.cachedAddress = start;
            //start = result[0].address.address_name;

            var url = '';
            //url = `https://m.map.kakao.com/actions/routeView?sxEnc=&syEnc=&exEnc=XNVSPM&eyEnc=QOQRNUS&startLoc=%EB%82%B4+%EC%9C%84%EC%B9%98&endLoc=%EA%B0%90%EC%9E%90%EA%BD%83+%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4`

            if (this.props.type === 'link') {
              url = `https://map.kakao.com/link/to/${dest},${y},${x}`;
            }
            else if (this.props.type == 'scheme') {
              url = `https://m.map.kakao.com/scheme/route?sp=${lat}%2C${lng}&sn=${start}&ep=${y}%2C${x}&en=${dest}&by=car`;
            }
            else {
              var destcoor = window.getWcongnamul(this.props.mapx, this.props.mapy).split(',');
              x = destcoor[0].replace('(', '').split('.')[0];
              y = destcoor[1].replace(')', '').replace(' ', '').split('.')[0];
              url = `https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt=%2C%2C${x}%2C${y}&rt1=${start}&rt2=${dest}&rtids=%2C&rtTypes=%2C`;
            }
            //url = 'http://localhost/api/map?' + getQueryString({x: x, y: y, dest:dest});
            console.log(url);
            this.goToPage(url);
          }
        });
        /*https://m.map.kakao.com/scheme/route?
        sp=37.57572534646468 %2C 126.88997474629176
        &sn=%EC%97%90%EC%8A%A4%ED%94%8C%EB%A0%89%EC%8A%A4%EC%84%BC%ED%84%B0
        &ep=1.42785443380603085E18 %2C 3.0601226725102192E16
        &en=%EA%B0%90%EC%9E%90%EA%BD%83+%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4
        &by=car*/

/*
        var self = this;
        $('#dv-iframe').on('load', function(e) {
          console.log(e);
          var src = $('#dv-iframe').get(0).src;
          console.log('iframe reload page => ' + $('#dv-iframe').get(0).src);
          self.addPage(src);
        })*/
      }
  }

  componentDidMount(){

  }

  addPage(pageUrl){
    var list = this.state.urlList;
    list[list.length] = pageUrl;

    this.setState({
      ...this.state,
      urlList: list,
      pos: list.length - 1,
    });
  }

  goToPage(pageUrl)
  {
    this.setState({
      ...this.state,
      url: pageUrl,
    });
  }

  goBack()
  {
     /* if (pos > 0)
      {
          pos--;
          document.getElementById('iframe').src = urlList[pos];
      }*/
  }

  goForward()
  {
     /* if (pos < (urlList.length-1))
      {
          pos++;
          document.getElementById('iframe').src = urlList[pos];
      }*/
  }

  toggle(){
    this.props.onHide(false);
  }

  render() {
    //var style = { visibility: this.state.show ? 'visible' : 'hidden' };
    //var self = this;
    if (!this.props.show) {
      return (<div/>);
    }
    return (
      <div id='dv-kakaomap'>
        <div id='dv-kakaomap-header'> 
          <CloseButton onClick = { ()=> { this.props.onHide(); } }></CloseButton>
        </div>
        <iframe id='dv-iframe' allow="geolocation" src={this.state.url}/>
      </div>
    )
  }
}

export default KakaoMap;