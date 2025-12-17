import React from 'react';
import type { PropsWithKnobState } from './types';

const pointOnCircle = (center: number, radius: number, angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
        x: center + radius * Math.cos(rad),
        y: center + radius * Math.sin(rad),
    };
};

interface Props {
    label: string;
    size: number;
    decimalPlace: number;
    className: string;
    style: Record<string, any>;
    userSelect?: 'auto' | 'text' | 'none' | 'contain' | 'all';
}

export const Label = ({
    label,
    angleRange,
    angleOffset,
    percentage,
    center,
    radius = 0,
    className,
    style = {},
    userSelect = 'none',
}: PropsWithKnobState<Props>) => {
    if (!label || percentage === null) {
        return <></>;
    }
    const angle = angleOffset + 90 + angleRange * percentage;
    const p = pointOnCircle(center, radius, angle);
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
};
