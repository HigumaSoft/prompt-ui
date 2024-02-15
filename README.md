# prompt-ui

<p align="center">
 TODO badges
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#props">Props</a> •
  <a href="#report-a-bug">Report a bug</a>
</p>

## Features

TODO

## Installation

Install package with NPM or YARN and add it to your development dependencies:

```
npm install prompt-ui
```

OR

```
yarn add prompt-ui
```

## Usage

```
import { PromptShell } from "prompt-ui";

function App(props) {
  // Define commands here
  const commands = {
    TODO
  };

  return (
    <PromptShell
      commands={commands}
    />
  );
}
```

Also make sure to wrap the main mount point around the `PromptContextProvider`. This retains the state even when the component is unmounted and then mounted back:

```
import { PromptContextProvider } from "prompt-ui";

ReactDOM.render(
  <PromptContextProvider>
    <App/>
  </PromptContextProvider>,
  rootElement
);
```

### Add an HTML element to the page

Create an HTML page, or edit an existing one, and add the following within the body tags:

```html
    <prompt TODO></prompt>
    <script src="https://unpkg.com/prompt-ui> </script>
```

Open the HTML file in your browser, and your prompt interface will be displayed on page.


## Creating custom themes

The component comes with few in-built themes: `light`, `dark`. You can also create custom themes by passing `themes` parameter in props, as follows:

```
<PromptShell
  commands={commands}
  settings={settings}
/>
```

## Props

| name           | description                                                                                                      | default                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `commands`     | List of commands to be provided as a key value pair where value can be either a string, JSX/HTML tag or callback | null                                     |
| `errorMessage` | Message to show when unidentified command executed, can be either a string, JSX/HTML tag or callback             | "not found!"                             |
| `settings`     | Prompt settings defining the appearance and behavior of the Prompt. This includes properties such as the prompt displayed at the beginning of input and the theme applied to the PromptShell interface. See [Default Settings](#settings) for default values and configurations.                                                                                                | null |

### Settings

```typescript
interface Settings {
  prompt: "$"
  theme: Theme;
  // TODO
}
```

### Theme

```typescript
interface Theme {
  // TODO
}
```

## In-built commands

| command | description                             |
| ------- | --------------------------------------- |
| clear   | clears the console                      |
| history | show last {property.historySize} inputs |

## Report a bug

If you found a bug in this library, please file an GitHub issue [here](https://github.com/charopevez/prompt-ui/issues).
