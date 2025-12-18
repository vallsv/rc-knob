import { useReducer, useEffect, useRef } from 'react';
import {
    calculatePositionFromMouseAngle,
    getValueFromPercentage,
    clamp,
    getPercentageFromValue,
    snapPosition,
} from './utils';
import { onKeyDown, handleEventListener } from './eventHandling';
import type { Action, Callbacks } from 'types';

interface InternalState {
    min: number;
    max: number;
    value: number | null;
    isActive: boolean;
    startPercentage?: number;
    startValue?: number;
    tracking: boolean;
    angleOffset: number;
    angleRange: number;
    updated?: boolean;
    mouseAngle: number | null;
    percentage: number | null;
    multiRotation: boolean;
    size: number;
    steps?: number;
    svg: any;
    container: any;
}

interface KnobConfiguration extends Callbacks {
    min: number;
    max: number;
    multiRotation: boolean;
    initialValue?: number | null;
    angleOffset: number;
    angleRange: number;
    size: number;
    steps?: number;
    readOnly: boolean;
    tracking: boolean;
    useMouseWheel: boolean;
}

const reduceOnStart = (
    state: InternalState,
    action: Action,
    callbacks: Callbacks,
): InternalState => {
    const mouseAngle = state.mouseAngle as number;
    const percentage = state.percentage as number;
    const position = calculatePositionFromMouseAngle({
        previousMouseAngle: null,
        previousPercentage: null,
        ...state,
        mouseAngle: mouseAngle,
        percentage: percentage,
        ...action,
    });
    const steps = action.steps || state.steps;
    const position2 = snapPosition(position, state, steps);
    const value = getValueFromPercentage({ ...state, ...position2 });
    callbacks.onStart();
    callbacks.onInteractiveChange(value);
    if (state.tracking) {
        callbacks.onChange(value);
    }
    return {
        ...state,
        isActive: true,
        ...position2,
        startPercentage: state.percentage as number,
        startValue: state.value as number,
        value,
    };
};

const reduceOnMove = (
    state: InternalState,
    action: Action,
    callbacks: Callbacks,
): InternalState => {
    const mouseAngle = state.mouseAngle as number;
    const percentage = state.percentage as number;
    const position = calculatePositionFromMouseAngle({
        previousMouseAngle: state.mouseAngle,
        previousPercentage: state.percentage,
        ...state,
        mouseAngle: mouseAngle,
        percentage: percentage,
        ...action,
    });
    const steps = action.steps || state.steps;
    const position2 = snapPosition(position, state, steps);
    const value = getValueFromPercentage({ ...state, ...position2 });
    callbacks.onInteractiveChange(value);
    if (state.tracking) {
        callbacks.onChange(value);
    }
    return {
        ...state,
        ...position2,
        value,
    };
};

const reduceOnStop = (
    state: InternalState,
    action: Action,
    callbacks: Callbacks,
): InternalState => {
    if (state.value !== null) {
        if (!state.tracking) {
            callbacks.onChange(state.value);
        }
    }
    callbacks.onEnd();
    return {
        ...state,
        isActive: false,
        value: state.value,
        percentage: state.percentage,
        startPercentage: undefined,
        startValue: undefined,
    };
};

const reduceOnCancel = (
    state: InternalState,
    action: Action,
    callbacks: Callbacks,
): InternalState => {
    const percentage = state.startPercentage as number;
    const value = state.startValue as number;
    callbacks.onEnd();
    if (state.tracking) {
        callbacks.onChange(value);
    }
    return {
        ...state,
        isActive: false,
        value,
        percentage,
        startPercentage: undefined,
        startValue: undefined,
    };
};

const reduceOnSteps = (
    state: InternalState,
    action: Action,
    callbacks: Callbacks,
): InternalState => {
    if (action.direction === undefined) {
        throw Error('Missing direction from Steps action');
    }
    if (state.value === null) {
        return state;
    }
    const value = clamp(
        state.min,
        state.max,
        state.value + 1 * action.direction,
    );
    callbacks.onChange(value);
    return {
        ...state,
        value,
        percentage: getPercentageFromValue({ ...state, value }),
    };
};

const reducer =
    (callbacks: Callbacks) =>
    (state: InternalState, action: Action): InternalState => {
        switch (action.type) {
            case 'START':
                return reduceOnStart(state, action, callbacks);
            case 'MOVE':
                return reduceOnMove(state, action, callbacks);
            case 'STOP':
                return reduceOnStop(state, action, callbacks);
            case 'CANCEL':
                return reduceOnCancel(state, action, callbacks);
            case 'STEPS':
                return reduceOnSteps(state, action, callbacks);
            default:
                return { ...state, isActive: false, value: state.value };
        }
    };

export default ({
    min,
    max,
    multiRotation,
    initialValue,
    angleOffset = 0,
    angleRange = 360,
    size,
    steps,
    onChange,
    onInteractiveChange,
    interactiveHook,
    onStart,
    onEnd,
    readOnly,
    tracking,
    useMouseWheel,
}: KnobConfiguration) => {
    const svg = useRef<SVGSVGElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const callbacks = {
        onChange,
        onInteractiveChange,
        onStart,
        onEnd,
    };
    const [{ percentage, value }, dispatch] = useReducer(reducer(callbacks), {
        isActive: false,
        min,
        max,
        multiRotation,
        angleOffset,
        angleRange,
        mouseAngle: null,
        percentage: initialValue ? (initialValue - min) / (max - min) : 0,
        value: initialValue || 0,
        svg,
        tracking,
        container,
        size,
        steps,
    });

    useEffect(
        handleEventListener({
            container,
            dispatch,
            readOnly,
            useMouseWheel,
            interactiveHook,
        }),
        [useMouseWheel, readOnly],
    );

    return {
        svg,
        container,
        percentage: percentage,
        value: value,
        onKeyDown: onKeyDown(dispatch),
    };
};
