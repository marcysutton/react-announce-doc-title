# React Announceable Document Title

Forked from Jason Blanchard and updated for React 16.

Provides a declarative way to specify `document.title` in a single-page app that will be announced to screen readers when it changes. This component can be used on server side as well.

Built with [React Side Effect](https://github.com/gaearon/react-side-effect), built off of [React Document Title](https://github.com/gaearon/react-document-title) and inspired by [a11y-announcer](https://github.com/Robdel12/a11y-announcer) for Ember.js


## Installation

```
npm install --save marcysutton/react-announce-doc-title
```

Dependencies: React >= 0.16.3

## Features

* Like a normal React compoment, can use its parent's `props` and `state`;
* Can be defined in many places throughout the application;
* Supports arbitrary levels of nesting, so you can define app-wide and page-specific titles;
* Announces page title changes to screen readers

## Usage

### 1. Set the title
Wrap page containers in the `<AnnounceDocTitle>` component:

```javascript
import React from 'react';
import { AnnounceDocTitle } from 'react-announce-doc-title';

export default class AboutPage extends React.Component {
  render() {
    return(
      <AnnounceDocTitle title="About - React App">
        <div>
          All about this sweet, sweet single page app.
        </div>
      </AnnounceDocTitle>

    );
  }
```

If you have `<AnnounceDocTitle>` components nested inside other `<AnnounceDocTitle>` components, the inner-most `title` will win.

### 2. Add an announcer component
In your root container or main page layout, add an ARIA Live Region to hold the announce messages:

```javascript
import React from 'react';

class LiveRegion extends React.Component {
  render() {
    return(
      <div id="a11y-toolkit-announcer" 
          aria-live= 'polite'
          style={{
            position: 'absolute',
            left: '-10000px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden'
          }}>
      </div>
    )
  }
}
export default class RootContainer extends React.Component {
  render() {
    return (
      <div>
        <LiveRegion />
        
        <h1>Single Page React App</h1>
        {this.props.children}
      </div>
    );
  }
```

This will add a visibly hidden (but reachable by screen readers) element on the page that has an `aria-live` tag that will automatically announce when the content changes. Each time the page title updates, it will populate here and trigger an announcement.
