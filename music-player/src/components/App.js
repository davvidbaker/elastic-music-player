import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';

import logo from '../logo.svg';
import './App.css';
import Button from './Button';
import MusicForm from './MusicForm';
import Queue from './Queue';

// basic css reset
injectGlobal`
html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
`;

class App extends Component {
  state = {
    formOpen: false,
  };

  openMusicForm = () => {
    this.setState({ formOpen: true });
  };

  closeMusicForm = () => {
    this.setState({ formOpen: false });
  };

  submitNewMusic = data => {
    console.log('formdata', data);
    this.closeMusicForm();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Queue />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button onClick={this.openMusicForm}>Add Music</Button>
        <MusicForm
          isOpen={this.state.formOpen}
          closeForm={this.closeMusicForm}
          submit={this.submitNewMusic}
        />
      </div>
    );
  }
}

export default App;
