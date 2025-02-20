import * as chromeLauncher from "chrome-launcher";

/**
 * Get the Chrome WebSocket endpoint for local development
 * @returns {string} The Chrome WebSocket endpoint
 */
export async function getChromeWsEndpoint() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless", "--disable-gpu"],
    // chromeFlags: ["--disable-gpu"],
    port: 9222,
    logLevel: "info",
  });
  const port = chrome.port;

  console.log("=> [local] version", `http://127.0.0.1:${port}/json/version`);
  const chromeInfo = (await fetch(`http://127.0.0.1:${port}/json/version`).then(
    (res) => res.json()
  )) as { webSocketDebuggerUrl: string };
  const browserWsEndpoint = chromeInfo.webSocketDebuggerUrl;
  console.log("=> [local] browserWsEndpoint", browserWsEndpoint);
  return browserWsEndpoint;
}

