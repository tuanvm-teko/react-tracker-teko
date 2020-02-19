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
  appId: "chat-tool"
});

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
  useAutoPageView
} from "react-tracker-teko";

const reactTracker = new ReactTracker({
  // Configure your tracker server and site by providing
  host: "https://dev-tracking.teko.vn",
  urlServeJsFile: "https://dev-tracking.teko.vn/track/libs/tracker.full.min.js",
  appId: "chat-tool"
});

// Auto detect pageView
const ScreenA = (props) => {
  useAutoPageView({ pageCode: "ScreenA" });
  return <>ScreenA</>;
};

// Custom detect pageView
const ScreenB = (props) => {
  const { callTrackLoadPage, callTrackUnLoadPage } = useTrackPageView();

  useEffect(() => {
    // some logic ....
    callTrackLoadPage({ pageCode: "ScreenB" });
    return () => {
      // some logic ....
      callTrackUnLoadPage({ pageCode: "ScreenB" });
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
