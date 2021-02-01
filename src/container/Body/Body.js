import React, { Component } from 'react';
import { Main, Game, Tour, TourDetail } from 'component/Body';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

class Body extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  render(){
    return (
      <div id='dv-body'>
        <Switch>
          <Route path='/main' component={Main} />
          <Route path='/game' component={Game} />
          <Route exact path='/tour' component={Tour} />
          <Route path='/tour/:type/:id/' component={TourDetail} />
          <Redirect to='/main' />
        </Switch>
      </div>);
  }
}

export default Body;