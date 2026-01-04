import React from 'react';
import { Knob, Pointer, Scale } from '@vallsv/rc-knob';
import styles from './styles.module.css';

const NB_LED = 10;

function customScaleTick({
    tickWidth,
    tickHeight,
    translateX,
    translateY,
    angleOffset,
    stepSize,
    center,
    active,
    i,
    percentage,
    steps,
}) {
    const className =
        i < percentage * (steps + 1) ? styles.ledon : styles.ledoff;
    return (
        <circle
            cx={0}
            cy={0}
            r={NB_LED / 2}
            className={className}
            key={i}
            transform={`
        rotate(${angleOffset + stepSize * i} ${center[0]} ${center[1]})
        translate( ${translateX} ${translateY})
    `}
        />
    );
}

export default function KnobExample(props: { size: number }) {
    const { size } = props;
    const margin = 10;
    const knobOuterSize = size - (NB_LED + margin) * 2;
    const knobInnerSize = (46.7 / 50) * knobOuterSize;
    const ptSize = (10 / 50) * knobOuterSize;

    return (
        <Knob
            size={size}
            angleOffset={220}
            angleRange={280}
            min={0}
            max={100}
            className={styles.myknob}
            onChange={(value) => console.log(value)}
        >
            <defs>
                <linearGradient
                    id="k3bg1"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                    gradientUnits="objectBoundingBox"
                >
                    <stop className={styles.grandient1} offset="0" />
                    <stop className={styles.grandient2} offset="1" />
                </linearGradient>
                <radialGradient
                    id="k3bg2"
                    cx="1"
                    cy="1"
                    r="1"
                    gradientTransform="scale(.5 1)"
                    gradientUnits="objectBoundingBox"
                >
                    <stop className={styles.grandient3} offset="0" />
                    <stop className={styles.grandient4} offset="1" />
                </radialGradient>
                <radialGradient
                    id="k3bg3"
                    cx="0.5"
                    cy="0.7"
                    r="1"
                    gradientUnits="objectBoundingBox"
                >
                    <stop className={styles.grandient5} offset="0" />
                    <stop className={styles.grandient6} offset="1" />
                </radialGradient>
                <linearGradient
                    id="k3sk3"
                    x1="0.2"
                    x2="0.8"
                    y1="0.2"
                    y2="0.8"
                    gradientUnits="objectBoundingBox"
                >
                    <stop className={styles.grandient7} offset="0" />
                    <stop className={styles.grandient8} offset="1" />
                </linearGradient>
            </defs>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={knobOuterSize / 2}
                fill="url(#k3bg1)"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={knobInnerSize / 2}
                className={styles.background}
                fill="url(#k3bg2)"
                strokeWidth="1"
            />
            <Scale
                steps={20}
                tickWidth={1}
                tickHeight={5}
                radius={(size - NB_LED) / 2}
                fn={customScaleTick}
            />
            <Pointer
                width={0}
                height={0}
                useRotation={false}
                radius={0.3 * knobOuterSize}
            >
                <circle
                    cx={0}
                    cy={0}
                    r={ptSize / 2}
                    fill="url(#k3bg3)"
                    stroke="url(#k3sk3)"
                    strokeWidth="1"
                />
            </Pointer>
        </Knob>
    );
}
