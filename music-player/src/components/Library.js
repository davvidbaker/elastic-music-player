import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import customPropTypes from '../utilities/propTypes';

const Library = ({ songList, openMusicForm }) => (
  <div>
    <h1>Library</h1>
    {songList.length > 0 ? (
      <ul>{songList.map(song => <li key={song.title}>{song.title}</li>)}</ul>
    ) : (
      <p>
        Your library is empty.{' '}
        <Button onClick={openMusicForm}>Add some music!</Button>
      </p>
    )}
  </div>
);

Library.propTypes = {
  songList: PropTypes.arrayOf(customPropTypes.song).isRequired,
  openMusicForm: PropTypes.func.isRequired,
};

export default Library;
