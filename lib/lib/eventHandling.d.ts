import type { KeyboardEvent } from 'react';
import type { InteractiveHook } from 'types';
type Dispatch = (props: {
    type: string;
    direction?: number;
}) => void;
export declare const onKeyDown: (dispatch: Dispatch) => (e: KeyboardEvent<HTMLDivElement>) => void;
export declare const onScroll: (dispatch: Dispatch) => (e: WheelEvent) => void;
export declare const handleEventListener: ({ container, dispatch, readOnly, useMouseWheel, interactiveHook, }: {
    container: React.RefObject<HTMLDivElement>;
    dispatch: Dispatch;
    readOnly: boolean;
    useMouseWheel: boolean;
    interactiveHook?: InteractiveHook | undefined;
}) => () => (() => void) | undefined;
export {};
