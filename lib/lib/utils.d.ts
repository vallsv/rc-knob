interface Position {
    updated: boolean;
    mouseAngle: number;
    percentage: number;
}
export declare const clamp: (min: number, max: number, value: number) => number;
export declare const calculatePercentageFromMouseAngle: ({ mouseAngle, angleOffset, angleRange, }: {
    mouseAngle: number;
    angleOffset: number;
    angleRange: number;
}) => number;
export declare const calculatePositionFromMouseAngle: ({ mouseAngle, multiRotation, angleOffset, angleRange, percentage, previousPercentage, previousMouseAngle, }: {
    mouseAngle: number;
    multiRotation?: boolean | undefined;
    angleOffset: number;
    angleRange: number;
    percentage: number;
    previousPercentage: number | null;
    previousMouseAngle: number | null;
}) => Position;
export declare const snapPosition: (position: Position, state: {
    angleOffset: number;
    angleRange: number;
}, steps?: number) => Position;
export declare const snapPercentage: (percentage: number, nbIntervals: number) => number;
export declare const getValueFromPercentage: ({ min, max, percentage, }: {
    min: number;
    max: number;
    percentage: number;
}) => number;
export declare const getPercentageFromValue: ({ min, max, value, }: {
    min: number;
    max: number;
    value: number;
}) => number;
export {};
