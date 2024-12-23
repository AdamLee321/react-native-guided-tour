<h1 align="center">React Native Guided Tour</h1>

<div align="center">
  <p align="center">
    <a href="https://www.npmjs.com/package/react-native-guided-tour">
      <img src="https://img.shields.io/npm/v/react-native-guided-tour.svg?style=flat-square" alt="NPM Version" />
    </a>
  </p>
</div>

<p align="center">
  A step-by-step walkthrough for enhancing user onboarding in your React Native app!
</p>

## Installation

```
yarn add react-native-guided-tour

# or with npm:

npm install --save react-native-guided-tour
```

**Optional**: If you want to have the smooth SVG animation, you should install and link [`react-native-svg`](https://github.com/software-mansion/react-native-svg).

## Usage

Wrap the part of your app that you want to guide with `<TourGuideProvider>`:

```js
import { TourGuideProvider } from 'react-native-guided-tour';

const AppWithTourGuide = () => {
  return (
    <TourGuideProvider>
      <HomeScreen />
    </TourGuideProvider>
  );
};
```

To define steps for your tour, wrap each target component with TourGuideStep and make it “walkthroughable”:

```jsx
import {
  TourGuideProvider,
  TourGuideStep,
  walkthroughable,
} from 'react-native-guided-tour';

const TourGuideText = walkthroughable(Text);

const HomeScreen = () => {
  return (
    <View>
      <TourGuideStep
        text="This is a hello world example!"
        order={1}
        name="hello"
      >
        <TourGuideText>Hello world!</TourGuideText>
      </TourGuideStep>
    </View>
  );
};
```

Every `TourGuideStep` must have these props:

1. **name**: A unique name for the walkthrough step.
2. **order**: A positive number indicating the order of the step in the entire walkthrough.
3. **text**: The text shown as the description for the step.

Additionally, a step may set the **active** prop, a boolean that controls whether the step is used or skipped.

In order to start the tutorial, you can call the `start` function from the `useTourGuide` hook:

```js
const HomeScreen = () => {
  return (
    <View>
      <Button title="Start tutorial" onPress={() => start()} />
    </View>
  );
};
```

If you are looking for a working example, please check out [this link](https://github.com/AdamLee321/react-native-guided-tour/blob/main/example/App.jsx).

### Overlays and animation

The overlay in react-native-guided-tour is the component that draws the dark transparent over the screen. react-native-guided-tour comes with two overlay options: `view` and `svg`.

The `view` overlay uses 4 rectangles drawn around the target element using the `<View />` component. We don't recommend using animation with this overlay since it's sluggish on some devices specially on Android.

The `svg` overlay uses an SVG path component for drawing the overlay. It offers a nice and smooth animation but it depends on `react-native-svg`. If you are using expo, you can install it using:

```
expo install react-native-svg
```

Or if you are using react-native-cli:

```
yarn add react-native-svg

# or with npm

npm install --save react-native-svg

cd ios && pod install
```

You can specify the overlay by passing the `overlay` prop to the `<TourGuideProvider />` component:

```js
<TourGuideProvider overlay="svg" {/* or "view" */}>
  <App />
</TourGuideProvider>
```

By default, if overlay is not explicitly specified, the `svg` overlay will be used if `react-native-svg` is installed, otherwise the `view` overlay will be used.

### Custom tooltip and step number UI components

You can customize the tooltip and the step number components by passing a component to the `TourGuideProvider` component. If you are looking for an example tooltip component, take a look at [the default ui implementations](https://github.com/mohebifar/react-native-guided-tour/blob/master/src/components/default-ui).

```js
const TooltipComponent = () => {
  const {
    isFirstStep,
    isLastStep,
    handleNext,
    handleNth,
    handlePrev,
    handleStop,
    currentStep,
  } = useTourGuide();

  return (
    // ...
  )
};


<TourGuideProvider tooltipComponent={TooltipComponent} stepNumberComponent={StepComponent}>
  <App />
</TourGuideProvider>
```

### Navigating through the tour

The above code snippet shows the functions passed to the tooltip. These are your primary navigation functions. Some notes on navigation:

- `handleNext` and `handlePrev` will move the mask from the current wrapped component immediately to the next.

- You can use `handleStop` in conjunction with `handleNth` to effectively "pause" a tour, allowing for user input, animations or any other interaction that shouldn't have the mask applied. Once you want to pick the tour back up, call `handleNth` on the next tour step.

Note that `handleNth` is 1-indexed, which is in line with what your step orders should look like.

### Custom tooltip styling

You can customize tooltip's wrapper style:

```js
const style = {
  backgroundColor: '#9FA8DA',
  borderRadius: 10,
  paddingTop: 5,
};

<TourGuideProvider tooltipStyle={style}>
  <App />
</TourGuideProvider>;
```

#### Manage tooltip width

By default, the tooltip width is calculated dynamically. You can make it fixed-size by overriding both `width` and `maxWidth`, check the example bellow:

```js
const MARGIN = 8;
const WIDTH = Dimensions.get('window').width - 2 * MARGIN;

<TourGuideProvider
  tooltipStyle={{ width: WIDTH, maxWidth: WIDTH, left: MARGIN }}
>
  <App />
</TourGuideProvider>;
```

### Custom tooltip arrow color

You can customize the tooltip's arrow color:

```js
<TourGuideProvider arrowColor="#9FA8DA">
  <App />
</TourGuideProvider>
```

### Custom overlay color

You can customize the mask color - default is `rgba(0, 0, 0, 0.4)`, by passing a color string to the `TourGuideProvider` component.

```js
<TourGuideProvider backdropColor="rgba(50, 50, 100, 0.9)">
  <App />
</TourGuideProvider>
```

### Custom svg mask Path

You can customize the mask svg path by passing a function to the `TourGuideProvider` component.

```ts
function SvgMaskPathFn(args: {
  size: Animated.valueXY;
  position: Animated.valueXY;
  canvasSize: {
    x: number;
    y: number;
  };
  step: Step;
}): string;
```

Example with circle:

```js
const circleSvgPath = ({ position, canvasSize }) =>
  `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;

<TourGuideProvider svgMaskPath={circleSvgPath}>
  <App />
</TourGuideProvider>;
```

Example with different overlay for specific step:

Give name prop for the step

```js
<TourGuideStep text="This is a hello world example!" order={1} name="hello">
  <TourGuideText>Hello world!</TourGuideText>
</TourGuideStep>
```

Now you can return different svg path depending on step name

```js
const customSvgPath = (args) => {
  if (args.step?.name === 'hello') {
    return `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;
  } else {
    return `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${
      position.y._value
    }H${position.x._value + size.x._value}V${
      position.y._value + size.y._value
    }H${position.x._value}V${position.y._value}Z`;
  }
};

<TourGuideProvider svgMaskPath={customSvgPath}>
  <App />
</TourGuideProvider>;
```

### Custom components as steps

The components wrapped inside `TourGuideStep`, will receive a `TourGuide` prop with a mutable `ref` and `onLayou` which the outermost rendered element of the component or the element that you want the tooltip be shown around, must extend.

```js
import { TourGuideStep } from 'react-native-guided-tour';

const CustomComponent = ({ TourGuide }) => (
  <View {...TourGuide}>
    <Text>Hello world!</Text>
  </View>
);

const HomeScreen = () => {
  return (
    <View>
      <TourGuideStep
        text="This is a hello world example!"
        order={1}
        name="hello"
      >
        <CustomComponent />
      </TourGuideStep>
    </View>
  );
};
```

### Custom labels (for i18n)

You can localize labels:

```js
<TourGuideProvider
  labels={{
    previous: "Vorheriger",
    next: "Nächster",
    skip: "Überspringen",
    finish: "Beenden"
  }}
>
```

### Adjust vertical position

In order to adjust vertical position pass `verticalOffset` to the `TourGuideProvider` component.

```js
<TourGuideProvider verticalOffset={36}>
```

### Triggering the tutorial

Use `const {start} = useTourGuide()` to trigger the tutorial. You can either invoke it with a touch event or in `useEffect` to start after the component mounts. Note that the component and all its descendants must be mounted before starting the tutorial since the `TourGuideStep`s need to be registered first. In some cases, you might want to start the tour as soon as key components are laid out rather than waiting for all components to fully mount. Using the onLayout prop on a container View is a great way to ensure that the tour starts as soon as the layout for that specific section is complete.

### Triggering the Tutorial on Layout Completion

```js
import React, { useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import {
  TourGuideProvider,
  useTourGuide,
  TourGuideStep,
} from 'react-native-guided-tour';

const HomeScreen = () => {
  const { start } = useTourGuide();
  const hasStartedTour = useRef(false);

  const handleLayout = () => {
    if (!hasStartedTour.current) {
      start();
      hasStartedTour.current = true;
    }
  };

  return (
    <View onLayout={handleLayout}>
      <TourGuideStep text="Welcome to the app!" order={1} name="welcome">
        <Text>Home Screen Content</Text>
      </TourGuideStep>
    </View>
  );
};

const App = () => (
  <TourGuideProvider>
    <HomeScreen />
  </TourGuideProvider>
);

export default App;
```

### Usage inside a ScrollView

Pass the ScrollView reference as the second argument to the `start()` function.
eg `start(undefined, scrollViewRef)`

```js
import { ScrollView } from 'react-native';

class HomeScreen {
  componentDidMount() {
    // Starting the tutorial and passing the scrollview reference.
    this.props.start(false, this.scrollView);
  }

  componentWillUnmount() {
    // Don't forget to disable event handlers to prevent errors
    this.props.TourGuideEvents.off('stop');
  }

  render() {
    <ScrollView ref={(ref) => (this.scrollView = ref)}>// ...</ScrollView>;
  }
}
```

### Listening to the events

`useTourGuide` provides a `TourGuideEvents` function prop to allow you to track the progress of the tutorial. It utilizes [mitt](https://github.com/developit/mitt) under the hood.

List of available events is:

- `start` — TourGuide tutorial has started.
- `stop` — TourGuide tutorial has ended or skipped.
- `stepChange` — Next step is triggered. Passes [`Step`](https://github.com/AdamLee321/react-native-guided-tour/blob/main/src/types.ts) instance as event handler argument.

**Example:**

```js
import { useTourGuide } from 'react-native-guided-tour';

const HomeScreen = () => {
  const { TourGuideEvents } = useTourGuide();

  useEffect(() => {
    const onStop = () => console.log('Tour ended');

    TourGuideEvents.on('stop', onStop);

    return () => {
      TourGuideEvents.off('stop', onStop);
    };
  }, []);
};
```

## Contributing

We welcome issues and pull requests. If you’re interested in becoming a maintainer, please reach out by email or by opening an issue. Regular contributors are encouraged to get involved!

This version refines language for clarity, groups related sections logically, and ensures consistent formatting. Let me know if there’s anything else specific you’d like to improve!
