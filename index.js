'use strict';

var React = require('react'),
    withSideEffect = require('react-side-effect'),
    PropTypes = require('prop-types'),
    createClass = require('create-react-class'),
    a11yToolkit = require('a11y-toolkit');

function reducePropsToState(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.title;
  }
}

function handleStateChangeOnClient(title) {
  var currentDocTitle = document.title;

  if (title) {
    document.title = title;

    if (currentDocTitle != title) {
      a11yToolkit.announce(title + " has loaded", 'assertive');
    }
  }
}

function AnnounceDocTitle() {}
AnnounceDocTitle.prototype = Object.create(React.Component.prototype);
AnnounceDocTitle.displayName = 'AnnounceDocTitle';
AnnounceDocTitle.propTypes = {
  title: PropTypes.string.isRequired
};

AnnounceDocTitle.prototype.render = function() {
  if (this.props.children) {
    return React.Children.only(this.props.children);
  } else {
    return null;
  }
};

var wrappedAnnounceDocTitle = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(AnnounceDocTitle);

function A11yToolkitAnnouncer() {}
A11yToolkitAnnouncer.prototype.render = function() {
  return React.createElement('div', {
    id:'a11y-toolkit-announcer', 
    'aria-live': 'polite',
    style: {
      position: 'absolute',
      left: '-10000px',
      top: 'auto',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
    }
  });
};

module.exports = {
  AnnounceDocTitle: wrappedAnnounceDocTitle,
  A11yToolkitAnnouncer: A11yToolkitAnnouncer,
};
