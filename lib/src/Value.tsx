import { useKnobContext } from './context';
import React from 'react';

interface Props {
    decimalPlace?: number;
    className: string;
    marginBottom?: number;
    /**
     * Override the `value` from the knob
     */
    value?: number | null;
}

export function Value(props: Props) {
    const state = useKnobContext('Value');
    const { size } = state;
    const {
        decimalPlace = 0,
        className,
        marginBottom = 0,
        value = state.value,
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
