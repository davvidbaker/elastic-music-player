import PropTypes from 'prop-types';

const customPropTypes = {
  song: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string,
    album: PropTypes.string,
    objectURL: PropTypes.string.isRequired,
  }),
};

export default customPropTypes;
