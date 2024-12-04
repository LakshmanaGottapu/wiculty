import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CharmingPartners from '../common/charmingPartners/charmingPartners';

class Partners extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <React.Fragment>
        <CharmingPartners />
      </React.Fragment>
    );
  }
}

export default withRouter(Partners);
