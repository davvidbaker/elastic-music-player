import React from 'react';
import PropTypes from 'prop-types';

import * as colors from '../utilities/colors';

const LoopIcon = ({ state, toggle }) => {
  let fill;
  switch (state) {
    case 0:
      fill = 'grey';
      break;
    case 1:
    case 2:
      fill = colors.spotifyGreen;
      break;
    default:
      fill = 'grey';
      break;
  }
  return (
    <svg
      onClick={toggle}
      style={{ fill, cursor: 'pointer' }}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      /** 💁 certain svg attributes don't play well with react, so I am just setting innerHTML */
      dangerouslySetInnerHTML={{
        __html: `
      <g id="Canvas" transform="translate(1020 344)">
        <g id="Frame 2">
          <g id="Vector">
            <use xlink:href="#path0_stroke" transform="translate(-1015 -338)" />
          </g>
          <g id="Vector">
            <use
              xlink:href="#path0_stroke"
              transform="matrix(-1 -8.74228e-08 8.74228e-08 -1 -993.686 -317.5)"
            />
          </g>
          <g id="Vector 2">
            <use
              xlink:href="#path1_stroke"
              transform="translate(-1010.77 -334.5)"
            />
          </g>
          ${
            state === 2
              ? `<g id="Ellipse">
            <use
              xlink:href="#path2_fill"
              transform="translate(-1017 -339)"
              fill="${colors.spotifyGreen}"
            />
          </g>
          <g id="Rectangle">
            <use xlink:href="#path3_fill" transform="translate(-1014 -337)" />
          </g>`
              : ''
          }
        </g>
      </g>
      <defs>
        <path
          id="path0_stroke"
          d="M 17.7309 3.5L 17.4442 3.90962L 17.5733 4L 17.7309 4L 17.7309 3.5ZM 9.23086 4C 14.9808 4 17.1059 4 17.7934 4C 17.9652 4 18.0473 4 18.0736 4C 18.0802 4 18.0834 4 18.0835 4C 18.0835 3.5 18.0835 3 18.0835 3C 18.0835 3 18.0835 3 18.0834 3C 18.0834 3 18.0833 3 18.0831 3C 18.0828 3 18.0823 3 18.0816 3C 18.0803 3 18.0783 3 18.0757 3C 18.0653 3 18.0453 3 18.0199 3C 17.9692 3 17.8969 3 17.8373 3C 17.8075 3 17.7809 3 17.7618 3C 17.7522 3 17.7445 3 17.7391 3C 17.7365 3 17.7344 3 17.733 3C 17.7323 3 17.7318 3 17.7314 3C 17.7312 3 17.7311 3 17.731 3C 17.731 3 17.7309 3 17.7309 3C 17.7309 3 17.7309 3 17.7309 3.5C 17.7309 4 17.7309 4 17.7309 4C 17.7309 4 17.731 4 17.731 4C 17.7311 4 17.7312 4 17.7314 4C 17.7318 4 17.7323 4 17.733 4C 17.7344 4 17.7365 4 17.7391 4C 17.7445 4 17.7522 4 17.7618 4C 17.7809 4 17.8075 4 17.8373 4C 17.8969 4 17.9692 4 18.0199 4C 18.0453 4 18.0653 4 18.0757 4C 18.0783 4 18.0803 4 18.0816 4C 18.0823 4 18.0828 4 18.0831 4C 18.0833 4 18.0834 4 18.0834 4C 18.0835 4 18.0835 4 18.0835 4C 18.0835 4 18.0835 3.5 18.0835 3C 18.0834 3 18.0802 3 18.0736 3C 18.0473 3 17.9652 3 17.7934 3C 17.1059 3 14.9808 3 9.23086 3L 9.23086 4ZM 18.0176 3.09038L 13.0176 -0.409616L 12.4442 0.409616L 17.4442 3.90962L 18.0176 3.09038ZM 9.23086 3C 6.26683 3 4.0776 3.77461 2.52845 4.98044C 1.00904 6.17648 0.107684 7.82124 -0.268079 9.38446C -0.645056 10.9717 -0.540101 12.5693 -0.114679 13.7896C 0.292779 14.9584 1.08961 16 2.23089 16L 2.23089 15C 1.77217 15 1.2065 14.5416 0.829588 13.4604C 0.470634 12.4307 0.369339 11.0283 0.704858 9.61554C 1.04159 8.17876 1.77149 6.82352 3.14269 5.76956C 4.48415 4.72539 6.44491 4 9.23086 4L 9.23086 3Z"
        />
        <path
          id="path1_stroke"
          d="M 0.3 13.4L 4.3 10.4L 3.7 9.6L -0.3 12.6L 0.3 13.4ZM 12.6464 -0.353553L 9.14645 3.14645L 9.85355 3.85355L 13.3536 0.353553L 12.6464 -0.353553Z"
        />
        <path
          id="path2_fill"
          d="M 7 3.5C 7 5.433 5.433 7 3.5 7C 1.567 7 0 5.433 0 3.5C 0 1.567 1.567 0 3.5 0C 5.433 0 7 1.567 7 3.5Z"
        />
        <path id="path3_fill" d="M 0 0L 1 0L 1 3L 0 3L 0 0Z" />
      </defs>`,
      }}
    />
  );
};

LoopIcon.propTypes = {
  state: PropTypes.oneOf([0, 1, 2]).isRequired,
  toggle: PropTypes.func.isRequired,
};

export default LoopIcon;
