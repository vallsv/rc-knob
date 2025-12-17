/// <reference types="react" />
import type { PropsWithKnobState } from './types';
interface Props {
    label: string;
    size: number;
    decimalPlace: number;
    className: string;
    style: Record<string, any>;
    userSelect?: 'auto' | 'text' | 'none' | 'contain' | 'all';
}
export declare const Label: ({ label, angleRange, angleOffset, percentage, center, radius, className, style, userSelect, }: PropsWithKnobState<Props>) => JSX.Element;
export {};
