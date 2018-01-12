import React, { Component } from 'react';
import PropTypes from 'prop-types';

import customPropTypes from '../utilities/propTypes';

class Player extends Component {
  state = {
    songExists: false,
  };

  async componentDidMount() {
    // The current song is stored in localStorage, but the objectURL may no longer be valid. If that is the case, we don't want to render the audio element.
    try {
      const res = await fetch(this.props.currentSong.objectURL);
      if (res.ok) {
        this.setState({ songExists: true });
      }
    } catch (e) {
      this.setState({ songExists: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    if (
      nextProps.currentSong &&
      nextProps.currentSong.objectURL !== this.props.currentSong.objectURL
    ) {
      this.setState({ songExists: true });
    }
  }

  render() {
    const renderPlayer = this.props.currentSong && this.state.songExists;

    return (
      <div>
        <div>{renderPlayer ? 'Now Playing' : 'Nothing is Playing'}</div>
        {renderPlayer && (
          <div>
            <div>{this.props.currentSong.title}</div>
            <audio src={this.props.currentSong.objectURL} controls />
          </div>
        )}
      </div>
    );
  }
}

Player.propTypes = {
  currentSong: customPropTypes.song,
};

export default Player;
