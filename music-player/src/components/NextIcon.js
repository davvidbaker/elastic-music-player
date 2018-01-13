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

const NextIcon = ({ reversed, onClick, enabled }) => {
  return (
    <SVG
      onClick={enabled ? onClick : undefined}
      style={{
        transform: reversed ? 'rotate(0.5turn)' : '',
      }}
      enabled={enabled}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      /** 💁 certain svg attributes don't play well with react, so I am just setting innerHTML */
      dangerouslySetInnerHTML={{
        __html: `
        <g id="Canvas" transform="translate(1020 388)">
        <g id="Frame 3">
        <g id="Vector">
        <use xlink:href="#path0_fill" transform="translate(-1013 -381)"/>
        </g>
        <g id="Rectangle">
        <use xlink:href="#path1_fill" transform="translate(-998 -381)"/>
        </g>
        </g>
        </g>
        <defs>
        <path id="path0_fill" d="M 0 19L 0 0L 17 9.25641L 0 19Z"/>
        <path id="path1_fill" d="M 0 0L 4 0L 4 19L 0 19L 0 0Z"/>
        </defs>
        `,
      }}
    />
  );
};

NextIcon.propTypes = {
  reversed: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
};

export default NextIcon;
