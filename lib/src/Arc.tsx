import React from 'react';
import { Range } from './Range';
import { useKnobContext } from './context';

interface Props {
    color?: string;
    background?: string;
    className?: string;
    backgroundClassName?: string;
    arcWidth: number;
    /**
     * Override the `radius` from the knob
     */
    radius?: number;
}

export function Arc(props: Props) {
    const state = useKnobContext('Arc');
    const { percentage } = state;
    const {
        className,
        backgroundClassName,
        arcWidth,
        color,
        background,
        radius = state.radius,
    } = props;
    return (
        <g>
            {(background || backgroundClassName) && (
                <Range
                    className={backgroundClassName}
                    percentageFrom={percentage}
                    percentageTo={1}
                    color={background}
                    arcWidth={arcWidth}
                    radius={radius}
                />
            )}
            <Range
                className={className}
                percentageFrom={0}
                percentageTo={percentage}
                color={color}
                arcWidth={arcWidth}
                radius={radius}
            />
        </g>
    );
}
