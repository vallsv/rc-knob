import React from 'react';
import { assertKnobState, type PropsWithKnobState } from './types';
import { Range } from './Range';

interface Props {
    percentage: number;
    color: string;
    background: string;
    arcWidth: number;
}

export function Arc(props: PropsWithKnobState<Props>) {
    assertKnobState(props);
    const { percentage, color, background, ...others } = props;
    return (
        <g>
            {background && (
                <Range
                    percentage={percentage}
                    percentageFrom={percentage}
                    percentageTo={1}
                    color={background}
                    {...others}
                />
            )}
            <Range
                percentage={percentage}
                percentageFrom={0}
                percentageTo={percentage}
                color={color}
                {...others}
            />
        </g>
    );
}
