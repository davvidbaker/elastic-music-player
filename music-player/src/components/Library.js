import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import shortid from 'shortid';

import Artist from './Artist';
import Album from './Album';
import Title from './Title';
import Container from './StyledContainer';
import customPropTypes from '../utilities/propTypes';
import * as colors from '../utilities/colors';

const LI = styled.li`
  &:hover {
    button {
      visibility: visible;
    }
  }

  div {
    display: inline-block;
  }

  button {
    cursor: pointer;
    visibility: hidden;
    transition: transform 0.2s;
    transform: scale(0.9);
    margin: 0 10px;
    width: 2em;
    height: 2em;
    background: white;
    &:focus {
      border-color: steelblue;
      outline: none;
    }
  }

  button.queue {
    border-radius: 50%;
    border: solid black 1px;

    &:hover {
      background: ${colors.spotifyGreen};
      transform: scale(1);
    }
  }

  button.play {
    /* position: relative; */
    border-width: 1em 0 1em 1.5em;
    padding: 0;
    vertical-align: bottom;

    /* border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 0px solid blue;
    border-left: 15px solid green; */
    border-color: transparent transparent transparent black;

    &:hover {
      border-color: transparent transparent transparent ${colors.spotifyGreen};
      transform: scale(1);
    }
  }
`;

const Library = ({ songList, openMusicForm, play, queueUp }) => (
  <Container>
    <h1>Library</h1>
    {songList.length > 0 ? (
      <ul>
        {songList.map(song => (
          <LI key={shortid.generate()}>
            <Title>{song.title}</Title>
            {song.artist && <Artist>{song.artist}</Artist>}
            {song.album && <Album>{song.album}</Album>}
            <button className="play" title="Play" onClick={() => play(song)} />
            <button
              className="queue"
              title="Add to Queue"
              onClick={() => queueUp(song.title)}
            >
              +
            </button>
          </LI>
        ))}
      </ul>
    ) : (
      <p>
        Your library is empty.{' '}
        <button onClick={openMusicForm}>Add some music!</button>
      </p>
    )}
  </Container>
);

Library.propTypes = {
  songList: PropTypes.arrayOf(customPropTypes.song).isRequired,
  openMusicForm: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  queueUp: PropTypes.func.isRequired,
};

export default Library;
