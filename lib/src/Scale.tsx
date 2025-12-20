import React from 'react';
import { assertKnobState, type PropsWithKnobState } from './types';

interface RenderProps {
    translateX: number;
    translateY: number;
    angleOffset: number;
    stepSize: number;
    center: number;
    color: string;
    className?: string;
    active: number;
    activeColor: string;
    activeClassName?: string;
}

function renderCircle({
    tickWidth,
    translateX,
    translateY,
    angleOffset,
    stepSize,
    center,
    color,
    active,
    activeColor,
    activeClassName,
    className,
}: RenderProps & { tickWidth: number }) {
    const Cmp = (_: unknown, i: number) => (
        <circle
            r={tickWidth}
            key={i}
            className={i === active ? activeClassName : className}
            fill={i === active ? activeColor : color}
            stroke="none"
            transform={`
        rotate(${angleOffset + stepSize * i} ${center} ${center}) 
        translate(${translateX} ${translateY})
        `}
        />
    );
    Cmp.displayName = 'Cmp';
    return Cmp;
}

function renderRect({
    tickWidth,
    tickHeight,
    translateX,
    translateY,
    angleOffset,
    stepSize,
    center,
    color,
    active,
    activeColor,
    activeClassName,
    className,
}: RenderProps & { tickWidth: number; tickHeight: number }) {
    const Cmp = (_: unknown, i: number) => (
        <rect
            className={i === active ? activeClassName : className}
            fill={i === active ? activeColor : color}
            stroke="none"
            width={tickWidth}
            height={tickHeight}
            key={i}
            transform={`
        rotate(${angleOffset + stepSize * i} ${center} ${center}) 
        translate(${translateX} ${translateY})
        `}
        />
    );
    Cmp.displayName = 'Cmp';
    return Cmp;
}

export interface RenderCustomProps extends RenderProps {
    i: number;
    tickWidth: number;
    tickHeight: number;
    steps: number;
    percentage: number;
}

function renderCustom({
    fn,
    ...props
}: {
    fn: (props: RenderCustomProps) => void;
    tickWidth: number;
    tickHeight: number;
    steps: number;
    percentage: number;
} & RenderProps) {
    return (_: unknown, i: number) => fn({ ...props, i });
}

interface Props {
    steps?: number;
    type?: 'rect' | 'circle';
    radius: number;
    tickWidth: number;
    tickHeight: number;
    color?: string;
    activeColor?: string;
    className?: string;
    activeClassName?: string;
    fn?: (props: RenderCustomProps) => void;
}

export function Scale(props: PropsWithKnobState<Props>) {
    assertKnobState(props);
    const {
        angleRange,
        steps,
        type = 'rect',
        radius,
        tickWidth,
        tickHeight,
        angleOffset,
        center,
        color = 'black',
        activeColor = color,
        className,
        activeClassName = className,
        fn,
        percentage,
    } = props;
    if (steps === undefined) {
        return <></>;
    }
    const stepSize = angleRange / steps;
    const length = steps + (angleRange === 360 ? 0 : 1);
    const translateX = center - tickWidth / 2;
    const translateY = center - radius;
    if (percentage === null) {
        return <></>;
    }

    const active = Math.round((length - 1) * percentage);

    function getRenderFn() {
        if (steps === undefined) {
            return null;
        }
        if (type === 'circle') {
            return renderCircle({
                tickWidth,
                translateX,
                translateY,
                center,
                angleOffset,
                stepSize,
                color,
                active,
                activeColor,
                className,
                activeClassName,
            });
        }
        if (type === 'rect' && !fn) {
            return renderRect({
                tickWidth,
                tickHeight,
                translateX,
                translateY,
                angleOffset,
                stepSize,
                center,
                color,
                active,
                activeColor,
                className,
                activeClassName,
            });
        }
        if (fn) {
            if (percentage === null) {
                return <></>;
            }
            return renderCustom({
                fn,
                tickWidth,
                tickHeight,
                translateX,
                translateY,
                angleOffset,
                stepSize,
                center,
                color,
                active,
                activeColor,
                className,
                activeClassName,
                steps,
                percentage,
            });
        }
    }

    const renderFn = getRenderFn();

    // @ts-expect-error
    return <g>{Array.from({ length }, renderFn)}</g>;
}
