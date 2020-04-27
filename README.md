# ReactTrackerTeko

[![npm](https://img.shields.io/npm/v/vue-matomo.svg)](https://www.npmjs.com/package/vue-matomo)

## Installation

```bash
npm install --save react-tracker-teko
```

## Usage

### Simple

```js
import ReactTracker from "react-tracker-teko";

const reactTracker = new ReactTracker({
  // Configure your tracker server and site by providing
  host: "https://dev-tracking.teko.vn",
  urlServeJsFile: "https://dev-tracking.teko.vn/track/libs/tracker.full.min.js",
  appId: "chat-tool",
});

// BAD if app use IAM
const newHistory = reactTracker.connectToHistory(history);
ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={newHistory} />
  </Provider>,
  document.getElementById("root")
);

// GOOD if app use IAM
ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={reactTracker.connectToHistory(history)} />
  </Provider>,
  document.getElementById("root")
);
```

### Advance

```js
import ReactTracker, {
  TrackerProvider,
  useAutoPageView,
} from "react-tracker-teko";

const reactTracker = new ReactTracker({
  // Configure your tracker server and site by providing
  host: "https://dev-tracking.teko.vn",
  urlServeJsFile: "https://dev-tracking.teko.vn/track/libs/tracker.full.min.js",
  appId: "chat-tool",
});

// Auto detect pageView
const ScreenA = (props) => {
  track("setUserId", "random-user-id");
  useAutoPageView({ screenName: "ScreenA" });
  return <>ScreenA</>;
};

// Custom detect pageView
const ScreenB = (props) => {
  const { callTrackLoadPage, callTrackUnLoadPage } = useTrackPageView();

  useEffect(() => {
    track("setUserId", "random-user-id");
    // some logic ....
    callTrackLoadPage({ screenName: "ScreenB" });
    return () => {
      // some logic ....
      callTrackUnLoadPage({ screenName: "ScreenB" });
    };
  });
  return <>ScreenA</>;
};

ReactDOM.render(
  <Provider store={store}>
    <TrackerProvider history={browserHistory}>
      <Router routes={routes} history={history} />
    </TrackerProvider>
  </Provider>,
  document.getElementById("root")
);
```

## License

[MIT](http://opensource.org/licenses/MIT)
