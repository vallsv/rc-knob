/// <reference types="react" />
import type { Callbacks } from 'types';
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
declare const _default: ({ min, max, multiRotation, initialValue, angleOffset, angleRange, size, steps, onChange, onInteractiveChange, interactiveHook, onStart, onEnd, readOnly, tracking, useMouseWheel, }: KnobConfiguration) => {
    svg: import("react").RefObject<SVGSVGElement>;
    container: import("react").RefObject<HTMLDivElement>;
    percentage: number | null;
    value: number | null;
    onKeyDown: (e: import("react").KeyboardEvent<HTMLDivElement>) => void;
};
export default _default;
