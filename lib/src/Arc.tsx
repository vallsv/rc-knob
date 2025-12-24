import React from 'react';
import { Range } from './Range';
import { useKnobContext } from './context';

interface Props {
    color?: string;
    background?: string;
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
        arcWidth,
        color = 'black',
        background,
        radius = state.radius,
    } = props;
    return (
        <g>
            {background && (
                <Range
                    percentageFrom={percentage}
                    percentageTo={1}
                    color={background}
                    arcWidth={arcWidth}
                    radius={radius}
                />
            )}
            <Range
                percentageFrom={0}
                percentageTo={percentage}
                color={color}
                arcWidth={arcWidth}
                radius={radius}
            />
        </g>
    );
}
