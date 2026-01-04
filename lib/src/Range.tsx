import React, { useMemo } from 'react';
import { useKnobContext } from './context';
import { KnobGeometry } from 'types';

const pointOnCircle = (center: number, radius: number, angle: number) => ({
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
});
const degTorad = (deg: number) => (Math.PI * deg) / 180;

const clampDeg = (deg: number) =>
    deg >= 360 ? 359.999 : deg <= -360 ? -359.999 : deg;

function calcPath(
    geometry: KnobGeometry,
    arcWidth: number,
    outerRadius: number,
    percentageFrom: number,
    percentageTo: number,
) {
    const { angleRange, angleOffset, center } = geometry;
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
}

interface Props {
    color?: string;
    arcWidth: number;
    percentageFrom: number | null;
    percentageTo: number | null;
    outerRadius?: number;
    className?: string;
    /**
     * Override the `radius` from the knob
     */
    radius?: number;
}

export function Range(props: Props) {
    const state = useKnobContext('Range');
    const { percentage, geometry } = state;
    const {
        color,
        percentageFrom = null,
        percentageTo = null,
        radius = geometry.radius,
        outerRadius,
        arcWidth,
        className,
    } = props;

    const [pFrom, pTo] = useMemo(() => {
        if (percentageFrom !== null && percentageTo !== null) {
            return [percentageFrom, percentageTo];
        }
        if (percentageFrom !== null) {
            return [percentageFrom, percentage];
        }
        if (percentageTo !== null) {
            return [percentage, percentageTo];
        }
        // We could argue it's a problem instead or returning a value content
        return [0, percentage];
    }, [percentage, percentageFrom, percentageTo]);

    const d = useMemo(() => {
        if (pFrom === null || pTo === null) {
            return null;
        }
        return calcPath(
            geometry,
            arcWidth,
            outerRadius ?? radius ?? geometry.radius,
            pFrom,
            pTo,
        );
    }, [pFrom, pTo, outerRadius, radius, state]);

    if (d === null) {
        return <></>;
    }
    return (
        <g>
            <path className={className} d={d} style={{ fill: color }} />
        </g>
    );
}
