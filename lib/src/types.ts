/**
 * Knob state as exposed to the sub components
 */
export interface KnobState {
    value: number | null;
    percentage: number | null;
    size: number;
    angleOffset: number;
    angleRange: number;
    radius: number;
    center: number;
    steps?: number;
}

export type PropsWithKnobState<P> = P & KnobState;

export interface Action {
    type: string;
    direction?: number;
    steps?: number;
}

export interface Callbacks {
    onChange: (value: number) => void;
    onInteractiveChange: (value: number) => void;
    onStart: () => void;
    onEnd: () => void;
    interactiveHook?: InteractiveHook;
}

export interface InteractiveHookResult {
    readOnly?: boolean;
    steps?: number;
}

export interface InteractiveHookEvent {
    ctrlKey: boolean;
    altKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
    mouseX: number;
    mouseY: number;
    mouseRadius: number;
    mouseAngle: number;
}

export type InteractiveHook = (
    event: InteractiveHookEvent,
) => InteractiveHookResult;
