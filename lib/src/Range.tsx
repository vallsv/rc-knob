import React from 'react';
import { useKnobContext } from './context';

const pointOnCircle = (center: number, radius: number, angle: number) => ({
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
});
const degTorad = (deg: number) => (Math.PI * deg) / 180;

const clampDeg = (deg: number) =>
    deg >= 360 ? 359.999 : deg <= -360 ? -359.999 : deg;

const calcPath = ({
    percentageFrom,
    percentageTo,
    angleOffset,
    angleRange,
    arcWidth,
    radius: outerRadius,
    center,
}: {
    percentageFrom: number;
    percentageTo: number;
    angleOffset: number;
    angleRange: number;
    arcWidth: number;
    radius: number;
    center: number;
}) => {
    const angle = angleRange * (percentageTo - percentageFrom);
    const clampedAngle = clampDeg(angle);
    const angleFrom = angleOffset - 90 + angleRange * percentageFrom;
    const innerRadius = outerRadius - arcWidth;
    const angleFromRad = degTorad(angleFrom);
    const angleToRad = degTorad(angleFrom + clampedAngle);
    const largeArcFlag = Math.abs(clampedAngle) < 180 ? 0 : 1;
    const direction = clampedAngle >= 0 ? 1 : 0;

    const p1 = pointOnCircle(center, outerRadius, angleFromRad);
    const p2 = pointOnCircle(center, outerRadius, angleToRad);
    const p3 = pointOnCircle(center, innerRadius, angleToRad);
    const p4 = pointOnCircle(center, innerRadius, angleFromRad);

    return `M${p1.x},${
        p1.y
    } A${outerRadius},${outerRadius} 0 ${largeArcFlag} ${direction} ${p2.x},${
        p2.y
    }L${p3.x},${p3.y} A${innerRadius},${innerRadius} 0 ${largeArcFlag} ${
        1 - direction
    } ${p4.x},${p4.y} L${p1.x},${p1.y}`;
};

interface Props {
    color: string;
    arcWidth: number;
    percentageFrom: number | null;
    percentageTo: number | null;
    outerRadius?: number;
    /**
     * Override the `radius` from the knob
     */
    radius?: number;
}

export function Range(props: Props) {
    const state = useKnobContext('Range');
    const { percentage } = state;
    const {
        color,
        percentageFrom = null,
        percentageTo = null,
        radius = state.radius,
        outerRadius,
        arcWidth,
    } = props;
    let pfrom: number | null;
    let pto: number | null;
    if (percentageFrom !== null && percentageTo !== null) {
        pfrom = percentageFrom;
        pto = percentageTo;
    } else if (percentageFrom !== null) {
        pfrom = percentageFrom;
        pto = percentage;
    } else if (percentageTo !== null) {
        pfrom = percentage;
        pto = percentageTo;
    } else {
        pfrom = 0;
        pto = percentage;
    }
    if (pfrom === null || pto === null) {
        return <></>;
    }
    const d = calcPath({
        arcWidth,
        ...state,
        radius: outerRadius ?? radius ?? state.radius,
        percentageFrom: pfrom,
        percentageTo: pto,
    });
    return (
        <g>
            <path d={d} style={{ fill: color }} />
        </g>
    );
}
