import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import styled from 'styled-components';

import Artist from './Artist';
import Album from './Album';
import Title from './Title';
import Container from './StyledContainer';
import customPropTypes from '../utilities/propTypes';
import songByTitle from '../utilities/songByTitle';

const History = styled.ul`
  color: grey;

  &::before {
    content: 'History';
    font-size: 0.5em;
  }

  li div {
    display: inline-block;
  }
`;

const Upcoming = styled.ul`
  &::before {
    content: 'Upcoming';
    font-size: 0.5em;
  }

  li div {
    display: inline-block;
  }
`;

class Playlist extends Component {
  render() {
    return (
      <Container>
        <h1>Playlist</h1>
        <History>
          {this.props.history
            .map(title => songByTitle(title, this.props.songList))
            .map((song, index) => (
              <li
                key={shortid.generate()}
                onDoubleClick={() => this.props.playSongFromHistory(index)}
              >
                <Title>{song.title}</Title>
                {song.artist && (
                  <Artist beforeAlbum={Boolean(song.album)}>
                    {song.artist}
                  </Artist>
                )}
                {song.album && <Album>{song.album}</Album>}
              </li>
            ))}
        </History>
        <Upcoming>
          {this.props.queue
            .map(title => songByTitle(title, this.props.songList))
            .map((song, index) => (
              <li
                key={shortid.generate()}
                onDoubleClick={() => this.props.playSongFromQueue(index)}
              >
                <Title>{song.title}</Title>
                {song.artist && (
                  <Artist beforeAlbum={Boolean(song.album)}>
                    {song.artist}
                  </Artist>
                )}
                {song.album && <Album>{song.album}</Album>}
              </li>
            ))}
        </Upcoming>
      </Container>
    );
  }
}

Playlist.propTypes = {
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
  queue: PropTypes.arrayOf(PropTypes.string).isRequired,
  songList: PropTypes.arrayOf(customPropTypes.song).isRequired,
  playSongFromHistory: PropTypes.func.isRequired,
  playSongFromQueue: PropTypes.func.isRequired,
};

export default Playlist;
