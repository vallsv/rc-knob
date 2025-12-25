import React, { useMemo } from 'react';
import { useKnobContext } from './context';

function pointOnCircle(center: number, radius: number, angle: number) {
    const rad = (angle * Math.PI) / 180;
    return {
        x: center + radius * Math.cos(rad),
        y: center + radius * Math.sin(rad),
    };
}

interface Props {
    percentage: number;
    label: string;
    size?: number;
    className?: string;
    style?: Record<string, unknown>;
    userSelect?: 'auto' | 'text' | 'none' | 'contain' | 'all';
    /**
     * Override the `radius` from the knob
     */
    radius?: number;
}

export function Label(props: Props) {
    const state = useKnobContext('Label');
    const { angleRange, angleOffset, center } = state;
    const {
        label,
        percentage,
        radius = state.radius,
        className,
        style = {},
        userSelect = 'none',
    } = props;

    const p = useMemo(() => {
        if (!label || percentage === null) {
            return null;
        }
        const angle = angleOffset + 90 + angleRange * percentage;
        return pointOnCircle(center, radius, angle);
    }, [center, radius, angleOffset, angleRange, percentage, label]);

    if (p === null) {
        return <></>;
    }
    return (
        <g transform={`translate( ${center - p.x} ${center - p.y})`}>
            <text
                // @ts-expect-error
                style={{ userSelect, ...style }}
                x="50%"
                y="50%"
                textAnchor="middle"
                className={className}
                dominantBaseline="middle"
            >
                {label}
            </text>
        </g>
    );
}
