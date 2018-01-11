import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FileInput from './FileInput';

/*
From [react-modal docs](https://github.com/reactjs/react-modal)
  > The app element allows you to specify the portion of your app that should be hidden (via aria-hidden) to prevent assistive technologies such as screenreaders from reading content outside of the content of your modal.
 */
Modal.setAppElement('#root');

const Form = styled.form``;

const fields = [
  {
    label: 'Title',
    type: 'text',
    required: true,
  },
  {
    label: 'Artist',
    type: 'text',
    required: false,
  },
  {
    label: 'Album',
    type: 'text',
    required: false,
  },
];

class MusicForm extends Component {
  state = {
    title: '',
    artist: '',
    album: '',
  };

  handleChange = e => {
    console.log('e', e, e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChooseFile = e => {
    console.log('e', e);
    console.log('this.fileInput.files', this.fileInput.files);
  };

  clear = () => {
    this.setState({
      title: '',
      artist: '',
      album: '',
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log('this.fileInput.files', this.fileInput.files);

    const data = { ...this.state, file: this.fileInput.files[0] };

    this.props.submit(data);
    this.clear();

    // TODO
    if (!this.fileInput.files[0].type.match(/audio\/.*/)) {
      alert('wrong file type');
    }
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} onRequestClose={this.props.closeForm}>
        <Form action="" onSubmit={this.handleSubmit}>
          {fields.map(field => (
            <label key={field.label}>
              {field.label}:
              <input
                type={field.type}
                name={field.label.toLowerCase()}
                value={this.state[field.label.toLowerCase()]}
                onChange={this.handleChange}
                required={field.required}
              />
            </label>
          ))}
          <FileInput
            onChange={this.handleChooseFile}
            inputRef={el => (this.fileInput = el)}
          />
          <button type="submit">Submit</button>
        </Form>
      </Modal>
    );
  }
}

MusicForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default MusicForm;
