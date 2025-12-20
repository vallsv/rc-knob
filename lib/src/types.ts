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

export type PropsWithKnobState<P> = P & Partial<KnobState>;

/**
 * Check that the knob state is provided.
 *
 * Actually this properties are not mandatory to describe the
 * components, but are injected by the Know, so are anyway
 * provided. It's a typing limitation with the way it is
 * implemented.
 *
 * This is why the knob state should be shared with useContext
 * instead.
 */
export function assertKnobState<T>(props: T): asserts props is T & KnobState {
    // Assume it's valid, this have to be reworked
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
