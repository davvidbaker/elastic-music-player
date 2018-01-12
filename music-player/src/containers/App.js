import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import { connect } from 'react-redux';

import Button from '../components/Button';
import FileUpload from '../components/FileUpload';
import Header from '../components/Header';
import Library from '../components/Library';
import MusicForm from '../components/MusicForm';
import Player from '../components/Player';
import Queue from '../components/Queue';
import initiateDB from '../utilities/indexedDB';

import * as actions from '../actions';

// basic css reset
injectGlobal`
html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

ul {
  list-style: none;
  padding: 0;
}
`;

class App extends Component {
  state = {
    formOpen: false,
  };

  files = {};

  async componentDidMount() {
    this.db = await initiateDB();
  }

  openMusicForm = () => {
    this.setState({ formOpen: true });
  };

  closeMusicForm = () => {
    this.setState({ formOpen: false });
  };

  submitNewMusic = ({ title, artist, album, file }) => {
    console.log('formdata', title, artist, album, file);

    const objectURL = URL.createObjectURL(file);
    this.props.addSong({ title, artist, album, objectURL });
    this.closeMusicForm();

    this.files = { [title]: file, ...this.files };
    this.props.beginUpload(title);
  };

  render() {
    return (
      <div className="App">
        <Header>
          <Player currentSong={this.props.currentSong} />
        </Header>
        <Library
          songList={this.props.songList}
          openMusicForm={this.openMusicForm}
        />
        <Queue queue={this.props.queue} />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button onClick={this.openMusicForm}>Add Music</Button>
        {this.props.filesUploading.map(filename => (
          <FileUpload
            file={this.files[filename]}
            title={filename}
            key={filename}
            db={this.db}
          />
        ))}
        <MusicForm
          isOpen={this.state.formOpen}
          closeForm={this.closeMusicForm}
          submit={this.submitNewMusic}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    filesUploading: state.filesUploading,
    songList: state.songList,
    queue: state.queue,
    currentSong: state.currentSong,
  }),
  dispatch => ({
    addSong: ({ title, artist, album, objectURL }) =>
      dispatch(actions.addSong({ title, artist, album, objectURL })),
    beginUpload: title => dispatch(actions.beginUpload(title)),
  })
)(App);
