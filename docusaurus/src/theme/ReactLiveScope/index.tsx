import React from 'react';
import {
    Knob,
    Pointer,
    Range,
    Label,
    Arc,
    Value,
    Scale,
    Spiral,
} from '@vallsv/rc-knob';

// Add react-live imports you need here
const ReactLiveScope: unknown = {
    React,
    ...React,
    Knob,
    Pointer,
    Range,
    Label,
    Arc,
    Value,
    Scale,
    Spiral,
};

export default ReactLiveScope;
