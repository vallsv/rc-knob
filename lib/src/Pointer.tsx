import React, { isValidElement } from 'react';
import { assertKnobState, type PropsWithKnobState } from './types';

type SupportedTypes = 'rect' | 'circle' | 'triangle';

const PointerShape = ({
    type,
    width,
    height,
    color,
    className,
}: {
    type: SupportedTypes;
    width: number;
    height: number;
    color: string;
    className: string;
}) => {
    switch (type) {
        case 'rect':
            return (
                <rect
                    x={-width * 0.5}
                    width={width}
                    height={height}
                    fill={color}
                    className={className}
                />
            );
        case 'circle':
            return <circle r={width} fill={color} className={className} />;
        case 'triangle':
            const d = `M 0,0 L ${width / 2},${height} L ${
                -width / 2
            },${height} z`;
            return <path d={d} fill={color} className={className} />;
    }
    return <></>;
};

interface Props {
    width: number;
    height?: number;
    useRotation?: boolean;
    type?: SupportedTypes;
    color: string;
    className: string;
}

export function Pointer(
    props: React.PropsWithChildren<PropsWithKnobState<Props>>,
) {
    assertKnobState(props);
    const {
        children,
        width,
        height = width,
        angleOffset,
        angleRange,
        percentage,
        useRotation = true,
        radius,
        center,
        type,
        color,
        className,
    } = props;
    if (percentage === null) {
        return <></>;
    }
    let transform;
    if (useRotation) {
        transform = `rotate(${
            angleOffset + angleRange * percentage
        } ${center} ${center})
					translate( ${center} ${center - radius - height})`;
    } else {
        const angle =
            ((angleOffset + angleRange * percentage - 90) * Math.PI) / 180;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        transform = `translate(${x} ${y})`;
    }
    return (
        <g transform={transform}>
            {children &&
                React.Children.map(children, (child) => {
                    if (!isValidElement(child)) {
                        return child;
                    }
                    return React.cloneElement(child, {
                        // @ts-expect-error
                        width: width ?? 0,
                        height: height ?? 0,
                        percentage,
                    });
                })}
            {type && (
                <PointerShape
                    type={type}
                    width={width}
                    height={height}
                    color={color}
                    className={className}
                />
            )}
        </g>
    );
}
