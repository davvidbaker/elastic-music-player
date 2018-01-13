import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BigButton from './BigButton';

import FileInput from './FileInput';

/** 💁
 * From [react-modal docs](https://github.com/reactjs/react-modal):
 * > The app element allows you to specify the portion of your app that should be hidden (via aria-hidden) to prevent assistive technologies such as screenreaders from reading content outside of the content of your modal.
 */
Modal.setAppElement('#root');

const Form = styled.form`
  & > * {
    display: block;
  }

  label {
    margin-bottom: 5px;
  }
`;

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
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChooseFile = e => {
    this.submitBtn.focus();
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

    // TODO maybe
    if (!this.fileInput.files[0].type.match(/audio\/mp3/)) {
      alert('Sorry! We only accept mp3 files right now!');
    } else {
      const data = { ...this.state, file: this.fileInput.files[0] };
      this.props.submit(data);
      this.clear();
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeForm}
        style={{
          content: {
            margin: '20% auto',
            position: 'unset',
            right: 'unset',
            bottom: 'unset',
            maxWidth: '400px',
          },
        }}
      >
        <Form action="" onSubmit={this.handleSubmit}>
          {fields.map(field => (
            <label key={field.label}>
              {field.label}:{' '}
              <input
                autoFocus={field.label === 'Title'}
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
          <BigButton type="submit" innerRef={btn => (this.submitBtn = btn)}>
            Submit
          </BigButton>
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
