import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import customPropTypes from '../utilities/propTypes';
import LoopIcon from './LoopIcon';
import NextIcon from './NextIcon';
import PlayIcon from './PlayIcon';
import Artist from './Artist';
import Album from './Album';
import Title from './Title';
import SeekBar from './SeekBar';

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  justify-content: space-around;
  align-items: center;
`;

const Controls = styled.div`
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    * {
      margin: 0 10px;
    }
  }
`;

const SongInfo = styled.div`
  margin-bottom: 1em;

  div {
    display: inline-block;
  }
`;

const Details = styled.div``;

const Time = styled.div`
  color: grey;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`;

class Player extends Component {
  state = {
    songExists: false,
    duration: 0,
    currentTime: 0,
    canPlay: false,
  };

  async componentDidMount() {
    /**
     * 💁 The current song is stored in localStorage, but the objectURL may no longer be valid. If that is the case, we don't want to render the audio element.
     */
    try {
      const res = await fetch(this.props.currentSong.objectURL);
      if (res.ok) {
        this.setState({ songExists: true });
      }
    } catch (e) {
      this.setState({ songExists: false });
    }

    /** 💁 React does not have built-in events for media elements. */
    if (this.audioEl) {
      this.audioEl.addEventListener('durationchange', evt => {
        this.setState({ duration: this.audioEl.duration });
      });
      this.audioEl.addEventListener('timeupdate', () => {
        this.setState({ currentTime: this.audioEl.currentTime });
      });
      this.audioEl.addEventListener('ended', () => {
        if (this.props.looping !== 2) {
          this.props.next();
        }
      });
      this.audioEl.addEventListener('canplay', () => {
        this.setState({ canPlay: true });

        if (this.props.playing) {
          this.audioEl.play().catch(e => {
            console.log('caught playing exception 1', e);
          });
        }
      });
      this.audioEl.addEventListener('loadstart', () => {
        this.setState({ canPlay: false });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.currentSong) {
      this.audioEl.pause();
      return;
    }

    if (nextProps.currentSong && !this.props.currentSong) {
      this.setState({ songExists: true });
      return;
    }

    if (
      nextProps.currentSong &&
      nextProps.currentSong.objectURL !== this.props.currentSong.objectURL
    ) {
      this.setState({ songExists: true });
    }

    if (nextProps.playing) {
      if (this.state.canPlay) {
        this.audioEl.play().catch(e => {
          console.log('caught playing exception 2', e);
        });
      }
    } else {
      this.audioEl.pause();
    }
  }

  // percent from 0 to 1
  seekTo = percent => {
    this.audioEl.currentTime = percent * this.state.duration;
  };

  // seconds to min:sec with zero-padding of seconds
  formatTime = seconds => {
    const s = Math.floor(seconds % 60);
    return `${Math.floor(seconds / 60)}:${s < 10 ? `0${s}` : s}`;
  };

  render() {
    const song = this.props.currentSong;
    const renderPlayer = song && this.state.songExists;

    return (
      <Container>
        <div style={{ textAlign: 'center' }}>
          <audio
            src={renderPlayer ? song.objectURL : null}
            // controls
            ref={audioEl => (this.audioEl = audioEl)}
            loop={this.props.looping === 2}
          />
          <SeekBar
            enabled={Boolean(song)}
            percent={this.state.currentTime / this.state.duration}
            seekTo={this.seekTo}
          />
          <Time visible={Boolean(song)}>
            {this.formatTime(this.state.currentTime)}/
            {this.formatTime(this.state.duration)}
          </Time>
        </div>
        <Details>
          <div
            style={{ color: 'grey', marginBottom: renderPlayer ? '1em' : 0 }}
          >
            {renderPlayer ? 'Now Playing' : 'Nothing is Playing'}
          </div>
          {renderPlayer && (
            <div>
              <SongInfo>
                <Title>{song.title}</Title>
                {song.artist && <Artist>{song.artist}</Artist>}
                {song.album && <Album>{song.album}</Album>}
              </SongInfo>
            </div>
          )}
        </Details>
        <Controls>
          <div>
            <NextIcon
              enabled={this.props.prevEnabled}
              reversed
              onClick={() => {
                this.props.prev(this.state.currentTime);
                this.audioEl.currentTime = 0;
              }}
            />
            <PlayIcon
              enabled={Boolean(song || this.props.nextEnabled)}
              playing={this.props.playing}
              onClick={
                this.props.playing ? this.props.pause : this.props.resume
              }
            />
            <NextIcon
              enabled={this.props.nextEnabled}
              onClick={() => {
                this.audioEl.currentTime = 0;
                this.props.next();
              }}
            />
          </div>
          {/* // was going to do a loop/repeat option but ran out of time
           <LoopIcon
            state={this.props.looping}
            toggle={this.props.toggleLooping}
          /> */}
        </Controls>
      </Container>
    );
  }
}

Player.propTypes = {
  currentSong: customPropTypes.song,
  looping: PropTypes.oneOf([0, 1, 2]).isRequired,
  next: PropTypes.func.isRequired,
  nextEnabled: PropTypes.bool.isRequired,
  pause: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  prev: PropTypes.func.isRequired,
  prevEnabled: PropTypes.bool.isRequired,
  resume: PropTypes.func.isRequired,
  toggleLooping: PropTypes.func.isRequired,
};

export default Player;
