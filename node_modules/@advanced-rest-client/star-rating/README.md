[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/star-rating.svg)](https://www.npmjs.com/package/@advanced-rest-client/star-rating)

[![Build Status](https://travis-ci.com/advanced-rest-client/star-rating.svg)](https://travis-ci.com/advanced-rest-client/star-rating)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/star-rating)

## &lt;star-rating&gt;

A component that renders stars for rating.

```html
<star-rating value="3"></star-rating>
<star-rating value="4" readonly></star-rating>
```

Element can be styled using CSS variables

```html
<star-rating class="theme-blue" value="3"></star-rating>
<style>
.theme-blue {
  --star-rating-unselected-color: #BBDEFB;
  --star-rating-selected-color: #1565C0;
  --star-rating-active-color: #2196F3;
}
</style>
```

## Usage

### Installation
```
npm install --save @advanced-rest-client/star-rating
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import './node_odules/@advanced-rest-client/star-rating/star-rating.js';
    </script>
  </head>
  <body>
    <label id="ratingLabel">My rating</label>
    <star-rating value="2" arial-labelledby="ratingLabel"></star-rating>
    <script>
    {
      document.querySelector('star-rating').onchange = (e) => {
        console.log(`New rating is ${e.target.value}`);
      };
    }
    </script>
  </body>
</html>
```

### In a LitElement

```js
import { LitElement, html } from 'lit-element';
import '@advanced-rest-client/star-rating/star-rating.js';

class SampleElement extends LitElement {
  static get properties() {
    return {
      rating: { type: Number }
    }
  }

  _ratingChanged(e) {
    this.rating = e.target.value;
  }

  render() {
    return html`
    <star-rating .value="${this.rating}" @value-changed="${this._ratingChanged}"></star-rating>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### In a Polymer 3 element

```js
import { PolymerElement, html } from '@polymer/polymer';
import '@advanced-rest-client/star-rating/star-rating.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <star-rating value="{{rating}}"></star-rating>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

## Development

```sh
git clone https://github.com/advanced-rest-client/star-rating
cd star-rating
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```
