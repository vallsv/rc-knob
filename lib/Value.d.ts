/// <reference types="react" />
import type { PropsWithKnobState } from './types';
interface Props {
    decimalPlace?: number;
    className: string;
    marginBottom?: number;
}
export declare const Value: ({ value, size, decimalPlace, className, marginBottom, }: PropsWithKnobState<Props>) => JSX.Element;
export {};
