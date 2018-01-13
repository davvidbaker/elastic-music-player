/** 💁 We are talking about uploading to local storage, not some remote server. */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as actions from '../actions';

const ProgressBar = styled.div`
  width: 20vw;
  height: 30px;
  border: 1px solid black;

  div {
    height: 100%;
    background: steelblue;
  }
`;

class FileUpload extends Component {
  state = {
    percent: 0,
  };

  componentDidMount() {
    this.reader = new FileReader();
    this.reader.onerror = this.errorHandler;
    this.reader.onprogress = this.updateProgress;
    this.reader.onabort = e => {
      alert('File read cancelled');
    };
    this.reader.onload = progressEvent => {
      this.setState({ percent: 100 });
      const arrayBuffer = progressEvent.target.result;
      console.log('arrayBuffer', arrayBuffer);
      console.log('db in fileupload', this.props.db);

      const transaction = this.props.db.transaction('songs', 'readwrite');
      const songObjectStore = transaction.objectStore('songs');
      songObjectStore.add({ title: this.props.title, value: arrayBuffer });

      transaction.oncomplete = () => {
        setTimeout(() => {
          this.props.completeUpload(this.props.title);
        }, 2000);
      };
    };

    this.reader.readAsArrayBuffer(this.props.file);
  }

  errorHandler(e) {
    switch (e.target.error.code) {
      case e.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case e.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case e.target.error.ABORT_ERR:
        break; // noop
      default:
        alert('An error occurred reading this file.');
    }
  }

  updateProgress = progressEvent => {
    if (progressEvent.lengthComputable) {
      this.setState({ percent: progressEvent.loaded / progressEvent.total });
    }
  };

  render() {
    return (
      <ProgressBar>
        <div style={{ width: `${this.state.percent}%` }} />
      </ProgressBar>
    );
  }
}

FileUpload.propTypes = {
  title: PropTypes.string.isRequired,
  db: PropTypes.instanceOf(IDBDatabase).isRequired,
  file: PropTypes.instanceOf(File).isRequired,
};
export default connect(null, dispatch => ({
  completeUpload: filename => dispatch(actions.completeUpload(filename)),
}))(FileUpload);
