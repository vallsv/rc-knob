import React from 'react';
import { Knob, Pointer, Scale } from '@vallsv/rc-knob';

export default function KnobExample(props: { size: number }) {
    const { size } = props;
    const margin = 10;
    const bgWeight = 3;
    const pointerSize = size * 0.3;
    const knobSize = size - margin - margin - bgWeight;
    return (
        <Knob
            size={size}
            angleOffset={220}
            angleRange={280}
            min={0}
            max={100}
            onChange={(value) => console.log(value)}
        >
            <defs>
                <radialGradient
                    id="shadow"
                    cx={0.5}
                    cy={0.5}
                    r={0.5}
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset={0.0} style={{ stopColor: '#000' }} />
                    <stop
                        offset={0.9}
                        style={{ stopColor: '#000', stopOpacity: 0.3 }}
                    />
                    <stop
                        offset={1.0}
                        style={{ stopColor: '#000', stopOpacity: 0 }}
                    />
                </radialGradient>
                <radialGradient
                    id="bg"
                    cx={0.7}
                    cy={0.9}
                    r={0.7}
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset={0.0} style={{ stopColor: '#656870' }} />
                    <stop offset={1.0} style={{ stopColor: '#51555e' }} />
                </radialGradient>
                <radialGradient
                    id="bgStroke"
                    cx={0.9}
                    cy={0.9}
                    r={0.3}
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset={0.0} style={{ stopColor: '#71767c' }} />
                    <stop offset={1.0} style={{ stopColor: '#393e44' }} />
                </radialGradient>
                <radialGradient
                    id="pt"
                    cx={0.5}
                    cy={0.25}
                    r={0.5}
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset={0.0} style={{ stopColor: '#6c6f76' }} />
                    <stop offset={1.0} style={{ stopColor: '#4f545a' }} />
                </radialGradient>
                <linearGradient
                    id="ptStroke"
                    x1={0.5}
                    x2={0.5}
                    y1={0.0}
                    y2={1.0}
                    gradientUnits="objectBoundingBox"
                >
                    <stop offset={0.0} style={{ stopColor: '#71767c' }} />
                    <stop offset={1.0} style={{ stopColor: '#4f545a' }} />
                </linearGradient>
            </defs>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={size / 2}
                style={{ fill: 'url(#shadow)' }}
            />
            <Scale
                steps={20}
                tickWidth={2}
                tickHeight={5}
                radius={size / 2}
                color="#505050"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={knobSize / 2}
                style={{
                    fill: 'url(#bg)',
                    stroke: 'url(#bgStroke)',
                    strokeWidth: bgWeight * 2,
                }}
            />
            <Pointer useRotation={false} radius={knobSize * 0.2}>
                <circle
                    cx={0}
                    cy={0}
                    r={pointerSize / 2}
                    style={{
                        fill: 'url(#pt)',
                        stroke: 'url(#ptStroke)',
                        strokeWidth: bgWeight,
                    }}
                />
            </Pointer>
        </Knob>
    );
}
