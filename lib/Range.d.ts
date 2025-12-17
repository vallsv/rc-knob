/// <reference types="react" />
import type { PropsWithKnobState } from './types';
interface Props {
    color: string;
    arcWidth: number;
    percentageFrom: number | null;
    percentageTo: number | null;
    radius?: number;
    outerRadius?: number;
}
export declare const Range: ({ color, percentage, percentageFrom, percentageTo, ...props }: PropsWithKnobState<Props>) => JSX.Element;
export {};
