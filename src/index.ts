import { InitContructor } from "./types";
import { getPath, getFullPath } from "./common";
const defaultOptions = {
  host: "https://dev-tracking.teko.vn",
  urlServeJsFile: "https://dev-tracking.teko.vn/track/libs/tracker.full.min.js"
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
  // @ts-ignore
  window.onerror = (msg, url, lineNo, columnNo, error) => {
    f[i]("error", { msg, error });
    return false;
  };
};

class ReactTracker {
  private previousPath: any;
  private previousFullPath: any;
  private unlistenFromHistory: any;
  private history: any;

  constructor(setupOptions: InitContructor) {
    const options = { ...defaultOptions, ...setupOptions };
    const { host, urlServeJsFile } = options;
    init(window, document, "script", urlServeJsFile, "track", host);
    if (options.appId) {
      (window as any).track("init", options.appId);
    }
  }

  public connectToHistory(history: any) {
    if (this.history) {
      return history;
    }
    (window as any).track("enableUnloadPageView");

    this.history = history;
    this.registerListener(history);

    return history;
  }

  public disconnectFromHistory() {
    if (this.unlistenFromHistory) {
      this.unlistenFromHistory();

      return true;
    }

    return false;
  }

  private registerListener = (history: any) => {
    const prevLoc =
      typeof history.getCurrentLocation === "undefined"
        ? history.location
        : history.getCurrentLocation();
    this.previousPath = getPath(prevLoc);
    this.previousFullPath = getFullPath(prevLoc);
    (window as any).track("setReferrerUrl", this.previousFullPath);
    (window as any).track("trackLoadPageView");
    this.unlistenFromHistory = history.listen((loc: any) => {
      this.track(loc);
    });
  };

  private track(loc: any) {
    if (typeof window === "undefined") {
      return;
    }
    const currentPath = getPath(loc);
    const currentFullPath = getFullPath(loc);

    if (this.previousPath === currentPath) {
      return;
    }
    (window as any).track("setCurrentUrl", this.previousFullPath);
    (window as any).track("trackUnLoadPageView");

    (window as any).track("setReferrerUrl", this.previousFullPath);
    (window as any).track("setCurrentUrl", currentFullPath);
    (window as any).track("trackLoadPageView");

    this.previousPath = currentPath;
  }
}

export * from "./hooks";
export default ReactTracker;
