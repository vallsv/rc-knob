import React from 'react';
import { assertKnobState, type PropsWithKnobState } from './types';

interface Props {
    decimalPlace?: number;
    className: string;
    marginBottom?: number;
}

export function Value(props: PropsWithKnobState<Props>) {
    assertKnobState(props);
    const {
        value,
        size,
        decimalPlace = 0,
        className,
        marginBottom = 0,
    } = props;
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
}
