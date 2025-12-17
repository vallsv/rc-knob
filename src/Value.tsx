import React from 'react';
import type { PropsWithKnobState } from './types';

interface Props {
    decimalPlace?: number;
    className: string;
    marginBottom?: number;
}

export const Value = ({
    value,
    size,
    decimalPlace = 0,
    className,
    marginBottom = 0,
}: PropsWithKnobState<Props>) => {
    if (value === null || value === undefined) {
        return <></>;
    }
    let label = value.toFixed(decimalPlace);
    // make sure no negative zero is displayed
    if (label.startsWith('-') && Number.parseFloat(label) === 0) {
        label = label.slice(1);
    }
    return (
        <text
            style={{ userSelect: 'none' }}
            x="50%"
            textAnchor="middle"
            className={className}
            y={(size ?? 0) - marginBottom}
        >
            {label}
        </text>
    );
};
