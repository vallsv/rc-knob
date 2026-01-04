/**
 * Part of the Knob state which is usually unchanged.
 */
export interface KnobGeometry {
    size: number;
    angleOffset: number;
    angleRange: number;
    radius: number;
    center: number;
}

/**
 * Knob state as exposed to the sub components
 */
export interface KnobState {
    /**
     * Actual position of the knob, between min and max.
     */
    value: number | null;

    /**
     * Actual position of the knob, between 0.0 and 1.0.
     */
    percentage: number | null;

    /**
     * Part of the state which is usually unchanged.
     */
    geometry: KnobGeometry;

    steps?: number;
}

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
