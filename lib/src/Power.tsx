import { KnobGeometry } from 'types';
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

interface Position {
    percentage: number;
    radius: number;
    width: number;
}

function calcPath(
    geometry: KnobGeometry,
    positionFrom: Position,
    positionTo: Position | null,
): string | null {
    if (positionTo === null) {
        return null;
    }

    if (positionTo.percentage < positionFrom.percentage) {
        return calcPath(geometry, positionTo, positionFrom);
    }

    const { angleOffset, angleRange, center } = geometry;

    const angleFrom = angleOffset - 90 + angleRange * positionFrom.percentage;
    const angleTo = angleOffset - 90 + angleRange * positionTo.percentage;
    const radFrom = degTorad(angleFrom);
    const radTo = degTorad(angleTo);

    const nb =
        Math.ceil(Math.abs(positionFrom.percentage - positionTo.percentage)) *
        4;
    let forth = '';
    let start = '';
    let back = '';
    let link = '';
    for (let i = 0; i <= nb; i++) {
        const coef = i / nb;
        const ncoef = 1 - coef;
        const radius = positionFrom.radius * ncoef + positionTo.radius * coef;
        const halfWidth =
            (positionFrom.width * ncoef + positionTo.width * coef) * 0.5;
        const outerRadius = radius + halfWidth;
        const innerRadius = radius - halfWidth;
        const rad = radFrom * ncoef + radTo * coef;
        const deg = (rad * 180) / Math.PI;
        const po = pointOnCircle(center, outerRadius, rad);
        const pi = pointOnCircle(center, innerRadius, rad);
        if (i === 0) {
            start = `${po.x},${po.y} `;
        } else {
            forth += `${outerRadius},${outerRadius} ${deg} 0 1 ${po.x},${po.y} `;
        }
        if (i === nb) {
            link = `${pi.x},${pi.y} `;
        } else {
            back =
                `${innerRadius},${innerRadius} ${deg} 0 0 ${pi.x},${pi.y} ` +
                back;
        }
    }
    return `M ${start}A ${forth}L ${link}A ${back}z`;
}

interface Props {
    color?: string;
    percentageFrom: number;
    radiusFrom?: number;
    widthFrom: number;
    percentageTo: number;
    radiusTo?: number;
    widthTo: number;
    className?: string;
    /**
     * If true, Recompute the "to" with the actual knob position and the
     * interpolation between "from" and "to".
     */
    interpolateTo?: boolean;
}

export function Power(props: Props) {
    const state = useKnobContext('Power');
    const { percentage, geometry } = state;
    const {
        interpolateTo,
        color,
        percentageFrom,
        radiusFrom = geometry.radius,
        percentageTo,
        radiusTo = geometry.radius,
        widthFrom,
        widthTo,
        className,
    } = props;

    const positionFrom: Position = useMemo(
        () => ({
            percentage: percentageFrom,
            radius: radiusFrom,
            width: widthFrom,
        }),
        [percentageFrom, radiusFrom, widthFrom],
    );

    const positionTo: Position = useMemo(
        () => ({
            percentage: percentageTo,
            radius: radiusTo,
            width: widthTo,
        }),
        [percentageTo, radiusTo, widthTo],
    );

    const position = useMemo(() => {
        if (!interpolateTo) {
            return null;
        }
        if (percentage === null) {
            return null;
        }
        const pp =
            (percentage - positionFrom.percentage) /
            (positionTo.percentage - positionFrom.percentage);
        const p = Math.min(1, Math.max(pp, 0));
        if (!Number.isFinite(p)) {
            return null;
        }
        const p0 = 1 - p;
        const p1 = p;
        return {
            percentage:
                positionFrom.percentage * p0 + positionTo.percentage * p1,
            radius: positionFrom.radius * p0 + positionTo.radius * p1,
            width: positionFrom.width * p0 + positionTo.width * p1,
        };
    }, [positionFrom, positionTo, interpolateTo, percentage]);

    const d = useMemo(() => {
        return calcPath(
            geometry,
            positionFrom,
            interpolateTo ? position : positionTo,
        );
    }, [geometry, positionFrom, interpolateTo ? position : positionTo]);

    if (d === null) {
        return <></>;
    }
    return (
        <g>
            <path d={d} style={{ fill: color }} className={className} />
        </g>
    );
}
