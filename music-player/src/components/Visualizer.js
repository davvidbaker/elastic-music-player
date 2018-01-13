// Just put this in there for fun. It's something I made a while back, and is by no means the idiomatic way to do what it's doing.

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';

class Visualizer extends Component {
  componentDidMount() {
    /* ============================================================================== 
 set up audio
============================================================================== */
    let audioContext, analyser;
    let freqData = new Uint8Array(900);
    let sumBass, sumMid, sumHigh;
    (function initAudio() {
      window.AudioContext = window.webkitAudioContext || window.AudioContext;
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();

      let audioEl = document.querySelector('audio');
      audioEl.crossOrigin = 'anonymous';
      // audioEl.src = AUDIO_URL;
      audioEl.addEventListener(
        'canplay',
        () => {
          // audioEl.play();
          // console.log('can play');
          let audioSrc = audioContext.createMediaElementSource(audioEl);
          audioSrc.connect(audioContext.destination);
          audioSrc.connect(analyser);
        },
        { once: true }
      );
      console.log(audioContext);
    })();

    /* ============================================================================== 
threejs
============================================================================== */
    // set the scene size
    let { width, height } = ReactDOM.findDOMNode(
      this.container
    ).getBoundingClientRect();
    // set some camera attributes
    const VIEW_ANGLE = 45,
      NEAR = 0.1,
      FAR = 10000;
    let aspect = width / height;

    // get the DOM element
    const container = document.getElementById('container');

    // create WebGL renderer, camera, and a scene
    const renderer = new THREE.WebGLRenderer();
    let camera = new THREE.PerspectiveCamera(VIEW_ANGLE, aspect, NEAR, FAR);
    const scene = new THREE.Scene();

    // create orbit controls
    // const orbit = new THREE.OrbitControls(camera, renderer.domElement);

    // create gui
    // const gui = new dat.GUI();

    // add camera to scene
    scene.add(camera);
    scene.background = new THREE.Color(0xffffff);

    // camera starts at 0,0,0, so pull it back
    camera.position.z = 300;

    // start the renderer
    renderer.setSize(width, height);

    container.appendChild(renderer.domElement);

    // set up sphere dimensions
    let radius = 5,
      widthSegments = 32,
      heightSegments = 32;

    // create sphere materials
    let dotMaterial1 = new THREE.MeshBasicMaterial({ color: 0x2fa1d6 });
    dotMaterial1.blending = THREE.MultiplyBlending;
    dotMaterial1.transparent = true;
    let dotMaterial2 = new THREE.MeshBasicMaterial({ color: 0xe27600 });
    dotMaterial2.blending = THREE.MultiplyBlending;
    dotMaterial2.transparent = true;
    let dotMaterial3 = new THREE.MeshBasicMaterial({ color: 0xfedd31 });
    dotMaterial3.blending = THREE.MultiplyBlending;
    dotMaterial3.transparent = true;

    const numDots = 900;
    let dots = [];
    // create meshes
    for (let i = 0; i < numDots; i++) {
      let dot;
      if (i < 300) {
        dot = new THREE.Mesh(
          new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments),
          dotMaterial1
        );
      } else if (i < 600) {
        dot = new THREE.Mesh(
          new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments),
          dotMaterial2
        );
      } else {
        dot = new THREE.Mesh(
          new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments),
          dotMaterial3
        );
      }

      dots.push(dot);
      scene.add(dot);

      // dot.position.set(SPACING_RADIUS*cos(i*(360/8)*(PI/180)), SPACING_RADIUS*sin(i*(360/8)*(PI/180)), 0);
    }

    update();

    function update() {
      window.requestAnimationFrame(update);

      analyser.getByteFrequencyData(freqData);
      if (freqData) {
        let freqBass = freqData.slice(300, 900);
        let freqMid = freqData.slice(100, 300);
        let freqHigh = freqData.slice(0, 100);

        sumBass = freqBass.reduce((pre, cur) => pre + cur);
        sumMid = freqMid.reduce((pre, cur) => pre + cur);
        sumHigh = freqHigh.reduce((pre, cur) => pre + cur);
      }

      // dotMaterial.color.set(floor(0xffffff*random()))
      for (let i = 0; i < dots.length; i++) {
        if (i < 300) {
          if (sumBass && sumBass > 0) {
            dots[i].scale.x = sumBass / 10000;
            dots[i].scale.y = sumBass / 10000;
          }
        } else if (i < 600) {
          if (sumMid && sumMid > 0) {
            dots[i].scale.x = sumMid / 10000;
            dots[i].scale.y = sumMid / 10000;
          }
        } else {
          if (sumHigh && sumHigh > 0) {
            dots[i].scale.x = sumHigh / 10000;
            dots[i].scale.y = sumHigh / 10000;
          }
        }

        dots[i].position.x += 1 * (Math.random() - 0.5);
        dots[i].position.y += 1 * (Math.random() - 0.5);
        dots[i].position.z += 1 * (Math.random() - 0.5);
      }

      render();
    }

    function render() {
      renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
      const rect = ReactDOM.findDOMNode(this.container).getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      // renderer.setSize(width, height);
    });
  }
  render() {
    return (
      <div ref={container => (this.container = container)} id="container" />
    );
  }
}

export default Visualizer;
