import React from 'react';
import type { PropsWithKnobState } from './types';
interface Props {
    width: number;
    height?: number;
    useRotation?: boolean;
    type?: string;
    color: string;
    className: string;
}
export declare const Pointer: ({ children, width, height, angleOffset, angleRange, percentage, useRotation, radius, center, type, color, className, }: React.PropsWithChildren<PropsWithKnobState<Props>>) => JSX.Element;
export {};
