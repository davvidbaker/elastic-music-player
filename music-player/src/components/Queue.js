import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import customPropTypes from '../utilities/propTypes';

class Queue extends Component {
  render() {
    return (
      <Fragment>
        <h1>Queue</h1>
        <ul>
          {this.props.queue.map(song => <li key={song.title}>{song.title}</li>)}
        </ul>
      </Fragment>
    );
  }
}

Queue.propTypes = {
  queue: PropTypes.arrayOf(customPropTypes.song).isRequired,
};

export default Queue;
