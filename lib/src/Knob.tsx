import React, { isValidElement, KeyboardEventHandler } from 'react';
import useUpdate from './useUpdate';
import { Arc } from './Arc';
import { Pointer } from './Pointer';
import { Scale } from './Scale';
import { Value } from './Value';
import { Range } from './Range';
import { Spiral } from './Spiral';
import { Label } from './Label';
import type { InteractiveHook } from 'types';

const isInternalComponent = ({ type }: { type: any }) =>
    type === Arc ||
    type === Pointer ||
    type === Scale ||
    type === Value ||
    type === Range ||
    type === Spiral ||
    type === Label;

interface Props {
    min: number;
    max: number;
    initialValue?: number | null;
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

export const Knob = ({
    min,
    max,
    value: initialValue,
    multiRotation = false,
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
}: React.PropsWithChildren<Props>) => {
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

    return (
        <div
            ref={container}
            // @ts-expect-error
            tabIndex="0"
            style={{ outline: 'none', width: size, height: size }}
            aria-valuemax={max}
            aria-valuemin={min}
            aria-valuenow={value}
            aria-valuetext={ariaValueText}
            aria-labelledby={ariaLabelledBy}
            onKeyDown={readOnly ? undefined : onKeyDown}
            className={className}
        >
            <svg width={size} height={size} ref={svg}>
                {React.Children.map(children, (child) => {
                    if (!isValidElement(child)) {
                        return child;
                    }
                    return isInternalComponent(child)
                        ? React.cloneElement(child, {
                              percentage,
                              size,
                              value,
                              angleOffset,
                              angleRange,
                              radius: size / 2,
                              center: size / 2,
                              steps,
                              ...child.props,
                          })
                        : child;
                })}
            </svg>
        </div>
    );
};
