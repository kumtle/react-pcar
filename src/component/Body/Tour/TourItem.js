import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./TourItem.css";

class TourItem extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  onClick(){
    var linkData = { 
      pathname: '/tour/' + this.props.data.contentid.toString(),
      state: {
        ...this.props.location.state,
        contentId: this.props.data.contentid,
        contentTypeId: this.props.contentTypeId,
      }
    }
  }

  render(){
    //console.log(this.props.data);
    const path = `/tour/${this.props.data.contenttypeid}/${this.props.data.contentid}`
    return (
      <div>
        <Link id='dv-tour-item' to={path}>
          <div className='tour-item'>
            <img className='tour-img-small' src={this.props.data.firstimage2} />
            <p className='tour-name'>
              {this.props.data.title}
            </p>
          </div>
          <div className='tour-arrow' />
        </Link>        
      </div>);
  }
}

export default TourItem;