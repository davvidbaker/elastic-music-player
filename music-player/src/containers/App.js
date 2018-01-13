import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { connect } from 'react-redux';

import BigButton from '../components/BigButton';
import FileUpload from '../components/FileUpload';
import Header from '../components/Header';
import Library from '../components/Library';
import MusicForm from '../components/MusicForm';
import Player from '../components/Player';
import Playlist from '../components/Playlist';
import Visualizer from '../components/Visualizer';
import WithEventListeners from '../components/WithEventListeners';
import initiateDB from '../utilities/indexedDB';

import * as actions from '../actions';

// basic css reset
injectGlobal`
html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
  user-select: none;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 0;
}
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  h1 {
    margin-bottom: 0.25em;
  }
`;

class App extends Component {
  state = {
    formOpen: false,
  };

  files = {};

  async componentDidMount() {
    this.db = await initiateDB();
    const transaction = this.db.transaction('songs');
    const songObjectStore = transaction.objectStore('songs');
    const all = songObjectStore.getAll();

    transaction.oncomplete = evt => {
      if (all.readyState === 'done') {
        console.log('all.result', all.result);
        all.result.forEach(entry => {
          const typedArray = new Uint8Array(entry.value);
          const blob = new Blob([typedArray], { type: 'audio/mp3' });
          const url = URL.createObjectURL(blob);
          this.props.recoverSong(entry.title, url);
        });
      }
    };
  }

  openMusicForm = () => {
    this.setState({ formOpen: true });
  };

  closeMusicForm = () => {
    this.setState({ formOpen: false });
  };

  submitNewMusic = ({ title, artist, album, file }) => {
    const objectURL = URL.createObjectURL(file);
    this.props.addSong({ title, artist, album, objectURL });
    this.closeMusicForm();

    this.files = { [title]: file, ...this.files };
    this.props.beginUpload(title);
  };

  render() {
    const nextEnabled = Boolean(
      this.props.queue.length > 0 || this.props.currentSong
    );

    const eventListeners = [
      [
        'keydown',
        e => {
          if (e.code === 'Space' && e.target.nodeName !== 'INPUT') {
            if (this.props.queue.length > 0 || this.props.currentSong) {
              this.props.togglePlaying(this.props.playing);
            }
          }
        },
      ],
    ];

    return (
      <WithEventListeners node={document} eventListeners={eventListeners}>
        {() => (
          <div>
            <Header>
              <Player
                currentSong={this.props.currentSong}
                looping={this.props.looping}
                next={this.props.playerNext}
                nextEnabled={nextEnabled}
                pause={this.props.pause}
                playing={this.props.playing}
                prev={this.props.playerPrev}
                prevEnabled={Boolean(
                  this.props.history.length > 0 || this.props.currentSong
                )}
                resume={this.props.playerResume}
                toggleLooping={this.props.toggleLooping}
              />
            </Header>
            <Main>
              <div style={{ marginLeft: '20px' }}>
                <Library
                  songList={this.props.songList}
                  openMusicForm={this.openMusicForm}
                  play={this.props.play}
                  queueUp={this.props.queueUp}
                />
                <div style={{ textAlign: 'right' }}>
                  <BigButton onClick={this.openMusicForm}>Add Music</BigButton>
                </div>
                <hr />
                <Playlist
                  queue={this.props.queue}
                  history={this.props.history}
                  songList={this.props.songList}
                  playSongFromHistory={this.props.playSongFromHistory}
                  playSongFromQueue={this.props.playSongFromQueue}
                />
                <BigButton onClick={this.props.clearHistory}>
                  Clear History
                </BigButton>
                <BigButton onClick={this.props.clearQueue}>
                  Clear Queue
                </BigButton>
                {this.props.filesUploading.map(filename => (
                  <FileUpload
                    file={this.files[filename]}
                    title={filename}
                    key={filename}
                    db={this.db}
                  />
                ))}
              </div>
              <Visualizer />
            </Main>
            <MusicForm
              isOpen={this.state.formOpen}
              closeForm={this.closeMusicForm}
              submit={this.submitNewMusic}
            />
          </div>
        )}
      </WithEventListeners>
    );
  }
}

export default connect(
  state => ({
    currentSong: state.currentSong,
    filesUploading: state.filesUploading,
    history: state.history,
    looping: state.looping,
    playing: state.playing,
    queue: state.queue,
    songList: state.songList,
  }),
  dispatch => ({
    addSong: ({ title, artist, album, objectURL }) =>
      dispatch(actions.addSong({ title, artist, album, objectURL })),
    beginUpload: title => dispatch(actions.beginUpload(title)),
    clearHistory: () => dispatch(actions.clearHistory()),
    clearQueue: () => dispatch(actions.clearQueue()),
    pause: () => dispatch(actions.pause()),
    play: song => dispatch(actions.play(song)),
    playSongFromHistory: index => dispatch(actions.playSongFromHistory(index)),
    playSongFromQueue: index => dispatch(actions.playSongFromQueue(index)),
    playerNext: () => dispatch(actions.playerNext()),
    playerPrev: sec => dispatch(actions.playerPrev(sec)),
    playerResume: () => dispatch(actions.playerResume()),
    togglePlaying: playing =>
      dispatch(playing ? actions.pause() : actions.playerResume()),
    recoverSong: (title, objectURL) =>
      dispatch(actions.recoverSong(title, objectURL)),
    stop: () => dispatch(actions.stop()),
    toggleLooping: () => dispatch(actions.toggleLooping()),
    queueUp: title => dispatch(actions.addToQueue(title)),
  })
)(App);
