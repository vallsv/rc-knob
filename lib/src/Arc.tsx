import React from 'react';
import type { PropsWithKnobState } from './types';
import { Range } from './Range';

interface Props {
    percentage: number;
    color: string;
    background: string;
    arcWidth: number;
}

export const Arc = ({
    percentage,
    color,
    background,
    ...props
}: PropsWithKnobState<Props>) => (
    <g>
        {background && (
            <Range
                percentage={percentage}
                percentageFrom={percentage}
                percentageTo={1}
                color={background}
                {...props}
            />
        )}
        <Range
            percentage={percentage}
            percentageFrom={0}
            percentageTo={percentage}
            color={color}
            {...props}
        />
    </g>
);
