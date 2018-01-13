import { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * 💁 This component uses the function-as-a-child pattern.
 * https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9
 *
 */

class WithEventListeners extends Component {
  constructor(props) {
    super(props);
    props.eventListeners.forEach(([evt, func]) => {
      props.node.addEventListener(evt, func);
    });
  }

  componentWillUnmount() {
    this.props.eventListeners.forEach(([evt, func]) => {
      this.props.node.removeEventListener(evt, func);
    });
  }

  render() {
    return this.props.children();
  }
}

WithEventListeners.propTypes = {
  node: PropTypes.instanceOf(HTMLDocument).isRequired,
  // If I were using flow typing...: eventListeners: [string, () => mixed][],
  eventListeners: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  children: PropTypes.func.isRequired,
};

export default WithEventListeners;
