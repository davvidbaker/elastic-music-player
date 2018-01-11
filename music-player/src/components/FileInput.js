import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO drag and drop files
class FileInput extends Component {
  render() {
    return (
      <label>
        File:
        <input
          type="file"
          accept="audio/*"
          ref={this.props.inputRef}
          onChange={this.props.onChange}
          required
        />
      </label>
    );
  }
}

FileInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FileInput;
