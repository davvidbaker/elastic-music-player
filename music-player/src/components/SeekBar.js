import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../utilities/colors';

const Bar = styled.div`
  width: 80%;
  height: 20px;
  background: ${colors.spotifyGreen};
  opacity: ${props => (props.enabled ? 1 : 0.2)};
  display: inline-block;
  position: relative;
  border-radius: 5px;
`;

const PlayHead = styled.div`
  position: absolute;
  cursor: ${props => (props.enabled ? 'pointer' : 'default')};
  height: 100%;
  width: 20px;
  background: lightgrey;
  border: solid grey 5px;
  transform: translatex(-10px);
  border-radius: 50%;
`;

// 💁 Percent is both a prop and part of state. We use the state percent when dragging the playhead, otherwise we use the prop.
class SeekBar extends Component {
  state = { mousedown: false, x: null, width: null };

  componentDidMount() {
    const rect = ReactDOM.findDOMNode(this.bar).getBoundingClientRect();

    this.setState({ x: rect.x, width: rect.width });
    // I am doing this like so because the mouse doesn't need to remain over the seekbar to control seeking.
    window.addEventListener('mouseup', e => {
      // seek if mouse was down
      if (this.state.mousedown) {
        // from 0 to 1
        let seekTo = Math.max(
          Math.min((e.clientX - rect.x) / rect.width, 1),
          0
        );

        this.props.seekTo(seekTo);
      }

      this.setState({ mousedown: false });

      // actually do seeking on mouseup
    });
    window.addEventListener('mousemove', e => {
      if (this.state.mousedown) {
        // from 0 to 1
        let seekTo = Math.max(
          Math.min((e.clientX - rect.x) / rect.width, 1),
          0
        );
        this.setState({ percent: seekTo });
      }
      // this.setState({ mousedown: false });
    });
    window.addEventListener('resize', () => {
      const rectangle = ReactDOM.findDOMNode(this.bar).getBoundingClientRect();

      this.setState({ x: rectangle.x, width: rectangle.width });
    });
  }

  render() {
    const { percent, enabled } = this.props;

    return (
      <Bar
        ref={bar => (this.bar = bar)}
        onMouseDown={e => {
          if (enabled) {
            this.setState({ mousedown: true });
            console.log('mousedown true');
          }
        }}
        enabled={enabled}
      >
        <PlayHead
          enabled={enabled}
          style={{
            left: `${(this.state.mousedown ? this.state.percent : percent) *
              100}%`,
          }}
        />
      </Bar>
    );
  }
}

SeekBar.propTypes = {
  // goes from 0 to 1
  percent: PropTypes.number.isRequired,
  enabled: PropTypes.bool.isRequired,
  seekTo: PropTypes.func.isRequired,
};

export default SeekBar;
