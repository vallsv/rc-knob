/// <reference types="react" />
import type { PropsWithKnobState } from './types';
interface Props {
    percentage: number;
    color: string;
    background: string;
    arcWidth: number;
}
export declare const Arc: ({ percentage, color, background, ...props }: PropsWithKnobState<Props>) => JSX.Element;
export {};
