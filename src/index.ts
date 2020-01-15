const defaultOptions = {
  host: "https://dev-tracking.teko.vn",
  urlServeJsFile:
    "https://dev-tracking.teko.vn/track/libs/tracker-v1.0.0.full.min.js"
};

const init = (
  f: any,
  b: any,
  e: any,
  v: any,
  i: any,
  r: any,
  t?: any,
  s?: any
) => {
  // Stop if tracker already exists
  if (f[i]) return;

  // Initialise the 'GlobalTrackerNamespace' array
  f["GlobalTrackerNamespace"] = f["GlobalTrackerNamespace"] || [];

  // Add the new Tracker namespace to the global array so tracker.js can find it
  f["GlobalTrackerNamespace"].push(i);

  // Add endpoint
  f["GlobalTrackerNamespace"].push(r);

  // Create the Snowplow function
  f[i] = function() {
    (f[i].q = f[i].q || []).push(arguments);
  };

  // Initialise the asynchronous queue
  f[i].q = f[i].q || [];

  // Create a new script element
  t = b.createElement(e);

  // The new script should load asynchronously
  t.async = !0;

  // Load Tracker-js
  t.src = v;

  // Get the first script on the page
  s = b.getElementsByTagName(e)[0];

  // Insert the Snowplow script before every other script so it executes as soon as possible
  s.parentNode.insertBefore(t, s);

  // add listener error
  window.onerror = (msg, url, lineNo, columnNo, error) => {
    f[i]("error", { msg, error });
    return false;
  };
};

interface InitContructor {
  appId: string;
  host: string;
  urlServeJsFile: string;
}

class ReactTracker {
  private previousPath: any;
  private unlistenFromHistory: any;
  private protocol: string = "";

  constructor(setupOptions: InitContructor) {
    const options = { ...defaultOptions, ...setupOptions };
    const { host, urlServeJsFile } = options;
    init(window, document, "script", urlServeJsFile, "track", host);
    if (options.appId) {
      (window as any).track("init", options.appId);
    }

    (window as any).track("enableUnloadPageView");
    this.initProtocal();
  }

  public connectToHistory(history: any) {
    const prevLoc =
      typeof history.getCurrentLocation === "undefined"
        ? history.location
        : history.getCurrentLocation();
    this.previousPath = this.getPath(prevLoc);
    (window as any).track("setReferrerUrl", this.previousPath);
    (window as any).track("trackLoadPageView");
    this.unlistenFromHistory = history.listen((loc: any) => {
      this.track(loc);
    });

    return history;
  }

  public disconnectFromHistory() {
    if (this.unlistenFromHistory) {
      this.unlistenFromHistory();

      return true;
    }

    return false;
  }

  public track(loc: any) {
    if (typeof window === "undefined") {
      return;
    }
    const currentPath = this.getPath(loc);

    if (this.previousPath === currentPath) {
      return;
    }
    (window as any).track("setCurrentUrl", this.previousPath);
    (window as any).track("trackUnLoadPageView");

    (window as any).track("setReferrerUrl", this.previousPath);
    (window as any).track("setCurrentUrl", currentPath);
    (window as any).track("trackLoadPageView");

    this.previousPath = currentPath;
  }

  private initProtocal = () => {
    const loc = window.location;

    // Protocol may or may not contain a colon
    let protocol = loc.protocol;
    if (protocol.slice(-1) !== ":") {
      protocol += ":";
    }
    this.protocol = protocol;
  };

  private getPath = (loc: any) => {
    const _loc = window.location;
    return this.protocol + "//" + _loc.host + loc.pathname;
  };
}

export default ReactTracker;
