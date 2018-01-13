import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SVG = styled.svg`
  fill: grey;

${props =>
  props.enabled
    ? `
cursor: pointer;
&:hover {
  fill: white;
}`
    : 'cursor: default'}
  }
`;

const PlayIcon = ({ enabled, onClick, playing }) => {
  return (
    <SVG
      onClick={enabled ? onClick : undefined}
      style={{
        // for visual weight-based centering
        transform: 'translatex(5px)',
      }}
      enabled={enabled}
      width="64"
      height="64"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      /** 💁 certain svg attributes don't play well with react, so I am just setting innerHTML */
      dangerouslySetInnerHTML={{
        __html: `
        <g id="Canvas" transform="translate(1020 388)">
        <g id="Frame 3">
        ${
          playing
            ? `<g>
          <g id="Rectangle">
            <use xlink:href="#play-path1_fill" transform="translate(-1003 -381)"/>
          </g>
          <g id="Rectangle">
            <use xlink:href="#play-path1_fill" transform="translate(-1013 -381)"/>
          </g>
        </g>`
            : `<g id="Vector">
        <use xlink:href="#play-path0_fill" transform="translate(-1013 -381)"/>
        </g>`
        }
        </g>
        </g>
        <defs>
        <path id="play-path0_fill" d="M 0 19L 0 0L 17 9.25641L 0 19Z"/>
        <path id="play-path1_fill" d="M 0 0L 4 0L 4 19L 0 19L 0 0Z"/>
        </defs>
        `,
      }}
    />
  );
};

PlayIcon.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
};

export default PlayIcon;
