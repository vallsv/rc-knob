/// <reference types="react" />
import type { PropsWithKnobState } from './types';
interface Props {
    color: string;
    percentageFrom?: number | null;
    radiusFrom?: number | null;
    percentageTo?: number | null;
    radiusTo?: number | null;
    arcWidth: number;
}
export declare const Spiral: ({ color, percentage, percentageFrom, radiusFrom, percentageTo, radiusTo, ...props }: PropsWithKnobState<Props>) => JSX.Element;
export {};
