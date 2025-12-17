import React from 'react';
import type { InteractiveHook } from 'types';
interface Props {
    min: number;
    max: number;
    initialValue?: number | null;
    value?: number | null;
    multiRotation?: boolean;
    angleOffset?: number;
    angleRange?: number;
    size: number;
    onChange?: (value: number) => void;
    onInteractiveChange?: (value: number) => void;
    interactiveHook?: InteractiveHook;
    onStart?: () => void;
    onEnd?: () => void;
    steps?: number;
    snap?: boolean;
    tracking?: boolean;
    readOnly?: boolean;
    useMouseWheel?: boolean;
    ariaValueText?: string;
    ariaLabelledBy?: string;
    className?: string;
}
export declare const Knob: ({ min, max, value: initialValue, multiRotation, angleOffset, angleRange, size, onChange, onInteractiveChange, interactiveHook, onStart, onEnd, children, steps, snap, tracking, readOnly, useMouseWheel, ariaValueText, ariaLabelledBy, className, }: React.PropsWithChildren<Props>) => JSX.Element;
export {};
