/// <reference types="react" />
import type { PropsWithKnobState } from './types';
interface RenderProps {
    translateX: number;
    translateY: number;
    angleOffset: number;
    stepSize: number;
    center: number;
    color: string;
    className: string;
    active: number;
    activeColor: string;
    activeClassName: string;
}
export interface RenderCustomProps extends RenderProps {
    i: number;
    tickWidth: number;
    tickHeight: number;
    steps: number;
    percentage: number;
}
interface Props {
    angleRange: number;
    steps: number;
    type?: string;
    radius: number;
    tickWidth: number;
    tickHeight: number;
    color: string;
    activeColor?: string;
    className: string;
    activeClassName?: string;
    fn?: (props: RenderCustomProps) => void;
}
export declare const Scale: ({ angleRange, steps, type, radius, tickWidth, tickHeight, angleOffset, center, color, activeColor, className, activeClassName, fn, percentage, }: PropsWithKnobState<Props>) => JSX.Element;
export {};
