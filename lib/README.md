# rc-knob

Renders a react knob component that can be widely customised.

![Few knobs](./lib/preview.png)

## Installation

```
npm install @vallsv/rc-knob
pnpm install @vallsv/rc-knob
yarn add @vallsv/rc-knob
```

## Basic example

```
import { Knob, Pointer, Arc } from '@vallsv/rc-knob';

export default function Example() {
    return <Knob
        size={100}
        angleOffset={225}
        angleRange={270}
        value={33}
        min={0}
        max={100}
    >
        <Arc arcWidth={5} color="#FC5A96" background="#CCCCCC" />
        <Pointer width={5} height={40} radius={10} type="rect" color="#FC5A96" />
    </Knob>
}
```

## Documentation and examples

- https://vallsv.github.io/rc-knob/
- https://eskimoblood.github.io/rc-knob/ (older version)
