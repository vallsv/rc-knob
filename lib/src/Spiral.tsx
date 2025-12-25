import { useKnobContext } from './context';
import React, { useMemo } from 'react';

function pointOnCircle(center: number, radius: number, angle: number) {
    return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
    };
}

function degTorad(deg: number) {
    return (Math.PI * deg) / 180;
}

function ordered(v1: number, p1: number, v2: number, p2: number) {
    if (v1 <= v2) {
        return [v1, p1, v2, p2];
    } else {
        return [v2, p2, v1, p1];
    }
}

function calcPath(props: {
    percentageFrom: number;
    percentageTo: number;
    angleOffset: number;
    angleRange: number;
    arcWidth: number;
    outerRadiusFrom: number;
    outerRadiusTo: number;
    center: number;
}) {
    const {
        percentageFrom,
        percentageTo,
        angleOffset,
        angleRange,
        arcWidth,
        outerRadiusFrom,
        outerRadiusTo,
        center,
    } = props;
    const [percentageMin, outerRadiusMin, percentageMax, outerRadiusMax] =
        ordered(percentageFrom, outerRadiusFrom, percentageTo, outerRadiusTo);
    const angle = angleRange * (percentageMax - percentageMin);
    const startAngle = angleOffset - 90 + angleRange * percentageMin;
    const startAngleRad = degTorad(startAngle);
    const endAngleRad = degTorad(startAngle + angle);

    const nb = Math.ceil(percentageMax - percentageMin) * 4;
    let forth = '';
    let start = '';
    let back = '';
    let link = '';
    for (let i = 0; i <= nb; i++) {
        const coef = i / nb;
        const outerRadius =
            outerRadiusMin + (outerRadiusMax - outerRadiusMin) * coef;
        const innerRadius = outerRadius - arcWidth;
        const angleRad = startAngleRad + (endAngleRad - startAngleRad) * coef;
        const angleDeg = ((angleRad * 180) / Math.PI) * coef;
        const po = pointOnCircle(center, outerRadius, angleRad);
        const pi = pointOnCircle(center, innerRadius, angleRad);
        if (i === 0) {
            start = `${po.x},${po.y} `;
        } else {
            forth += `${outerRadius},${outerRadius} ${angleDeg} 0 1 ${po.x},${po.y} `;
        }
        if (i === nb) {
            link = `${pi.x},${pi.y} `;
        } else {
            back =
                `${innerRadius},${innerRadius} ${angleDeg} 0 0 ${pi.x},${pi.y} ` +
                back;
        }
    }
    return `M ${start}A ${forth}L ${link}A ${back}z`;
}

interface Props {
    color: string;
    percentageFrom?: number | null;
    radiusFrom?: number | null;
    percentageTo?: number | null;
    radiusTo?: number | null;
    arcWidth: number;
}

export function Spiral(props: Props) {
    const state = useKnobContext('Spiral');
    const { percentage, angleOffset, angleRange, center } = state;
    const {
        color,
        percentageFrom = null,
        radiusFrom = null,
        percentageTo = null,
        radiusTo = null,
        arcWidth,
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
        if (radiusFrom === null || radiusTo === null) {
            return null;
        }
        if (pFrom === null || pTo === null) {
            return null;
        }
        return calcPath({
            percentageFrom: pFrom,
            percentageTo: pTo,
            outerRadiusFrom: radiusFrom,
            outerRadiusTo: radiusTo,
            angleOffset,
            angleRange,
            arcWidth,
            center,
        });
    }, [
        pFrom,
        pTo,
        radiusFrom,
        radiusTo,
        angleOffset,
        angleRange,
        arcWidth,
        center,
    ]);

    if (d === null) {
        return <></>;
    }
    return (
        <g>
            <path d={d} style={{ fill: color }} />
        </g>
    );
}
