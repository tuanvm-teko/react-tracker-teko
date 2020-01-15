# ReactTrackerTeko

[![npm](https://img.shields.io/npm/v/vue-matomo.svg)](https://www.npmjs.com/package/vue-matomo)

## Installation

```bash
npm install --save react-tracker-teko
```

## Usage

### Bundler (Webpack, Rollup)

```js
import ReactTracker from "react-tracker-teko";

const reactTracker = new ReactTracker({
  // Configure your tracker server and site by providing
  host: "https://dev-tracking.teko.vn",
  urlServeJsFile:
    "https://dev-tracking.teko.vn/track/libs/tracker-v1.0.0.full.min.js",
  appId: "chat-tool"
});

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={reactTracker.connectToHistory(history)} />
  </Provider>,
  document.getElementById("root")
);
```

## License

[MIT](http://opensource.org/licenses/MIT)
