import { useKnobContext } from './context';
import React, { useMemo } from 'react';

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

    const label = useMemo(() => {
        if (value === null || value === undefined) {
            return null;
        }
        let label = value.toFixed(decimalPlace);
        // make sure no negative zero is displayed
        if (label.startsWith('-') && Number.parseFloat(label) === 0) {
            label = label.slice(1);
        }
        return label;
    }, [value, decimalPlace]);

    if (label === null) {
        return <></>;
    }
    return (
        <text
            style={{ userSelect: 'none' }}
            x="50%"
            textAnchor="middle"
            className={className}
            y={size - marginBottom}
        >
            {label}
        </text>
    );
}
