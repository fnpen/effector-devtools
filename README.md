# @fnpen/effector-devtools - Effector DevTools

![Demo](https://user-images.githubusercontent.com/31767378/211662670-8ebd091b-1773-4b16-946a-0284c0a875ea.png)

## How to use

Install devtools dependency:

```bash
npm add --dev @fnpen/effector-devtools
```

Choose the way of using:

### Option #0 – Open UI right in the page

```js
import { setupLogger } from "@fnpen/effector-devtools";
setupLogger({ inPage: true });
```

### Option #1 – Using with browser's devtools

1. Install Rempl extension [for Chromium](https://chrome.google.com/webstore/detail/rempl/hcikjlholajopgbgfmmlbmifdfbkijdj) based browser or [for Firefox](https://addons.mozilla.org/en-US/firefox/addon/rempl/)

2. Open location of your React app, then open browser's devtools and find Rempl tab here. Click it. That's it.

> NOTE: If your Effector application and browser's devtools were opened before Rempl extension is installed, you need to close and open browser's devtools as well as reload the page with React application.

## Usage

## Attach some units to devtools manually

```js
import { attachLogger } from "@fnpen/effector-devtools";
attachLogger(domain);
attachLogger($store);
attachLogger(event);
attachLogger(effectFx);
```

## Attach all available units using Babel plugin

Add plugin `"@fnpen/effector-devtools/babel-plugin"` to your .babelrc file:

```json
{
  "plugins": [
    ["effector/babel-plugin", { "addLoc": true, "addNames": true }]
    "@fnpen/effector-devtools/babel-plugin"
  ]
}
```

## Log any data using special methods

```js
import { logDiff, logName, log } from "@fnpen/effector-devtools";

log(["1", "2"]); // Simple logging.

logName("Name of Message", ["1", "2"]); // Send message with name.

logDiff("Name", ["2"]);
logDiff("Name", ["22", "3"]); // Outputs diff with previous call with same name.
```
