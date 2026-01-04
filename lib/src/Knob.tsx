import React, { PropsWithChildren, useMemo } from 'react';
import useUpdate from './useUpdate';
import type { InteractiveHook, KnobState } from 'types';
import { KnobContext } from './context';

interface Props {
    min: number;
    max: number;
    /**
     * Initial value of the knob.
     *
     * If `undefined`, the value is set to `min`.
     *
     * If `null` the value is unknown and will not
     * be displayed.
     */
    initialValue?: number | null;
    /** Actually an alias to `initialValue` */
    value?: number | null;
    multiRotation?: boolean;
    angleOffset?: number;
    angleRange?: number;
    size: number;
    onChange?: (value: number) => void;
    onInteractiveChange?: (value: number) => void;
    interactiveHook?: InteractiveHook;
    onStart?: () => void;
    onEnd?: () => void;
    steps?: number;
    snap?: boolean;
    tracking?: boolean;
    readOnly?: boolean;
    useMouseWheel?: boolean;
    ariaValueText?: string;
    ariaLabelledBy?: string;
    className?: string;
}

export function Knob(props: PropsWithChildren<Props>) {
    const {
        min,
        max,
        multiRotation = false,
        value: initialValue = min ?? 0,
        angleOffset = 0,
        angleRange = 360,
        size,
        onChange = () => {},
        onInteractiveChange = () => {},
        interactiveHook = undefined,
        onStart = () => {},
        onEnd = () => {},
        children,
        steps,
        snap = false,
        tracking = true,
        readOnly = false,
        useMouseWheel = true,
        ariaValueText,
        ariaLabelledBy,
        className,
    } = props;

    const { percentage, value, svg, container, onKeyDown } = useUpdate({
        min,
        max,
        multiRotation,
        initialValue,
        angleOffset,
        angleRange,
        size,
        steps: snap ? steps : undefined,
        onChange,
        onInteractiveChange,
        interactiveHook,
        useMouseWheel,
        readOnly,
        tracking,
        onStart,
        onEnd,
    });

    const geometry = useMemo(() => {
        const radius = size / 2;
        const center = size / 2;
        return {
            size,
            angleOffset,
            angleRange,
            radius,
            center,
        };
    }, [size, angleOffset, angleRange]);

    const knobState = useMemo<KnobState>(() => {
        return {
            value,
            percentage,
            geometry,
            steps,
        };
    }, [value, percentage, geometry, steps]);

    return (
        <div
            ref={container}
            tabIndex={0}
            style={{ outline: 'none', width: size, height: size }}
            aria-valuemax={max}
            aria-valuemin={min}
            aria-valuenow={value ?? undefined}
            aria-valuetext={ariaValueText}
            aria-labelledby={ariaLabelledBy}
            onKeyDown={readOnly ? undefined : onKeyDown}
            className={className}
        >
            <KnobContext.Provider value={knobState}>
                <svg width={size} height={size} ref={svg}>
                    {children}
                </svg>
            </KnobContext.Provider>
        </div>
    );
}
