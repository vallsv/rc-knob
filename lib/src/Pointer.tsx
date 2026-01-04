import React, { isValidElement, useMemo } from 'react';
import { useKnobContext } from './context';

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
    className?: string;
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
    width?: number;
    height?: number;
    useRotation?: boolean;
    type?: SupportedTypes;
    color?: string;
    className?: string;
    /**
     * Override the `percentage` from the knob
     */
    percentage?: number | null;
    /**
     * Override the `radius` from the knob
     */
    radius?: number;
}

export function Pointer(props: React.PropsWithChildren<Props>) {
    const state = useKnobContext('Pointer');
    const { geometry } = state;
    const { angleRange, angleOffset, center } = geometry;
    const {
        children,
        width,
        height = width,
        useRotation = true,
        type,
        percentage = state.percentage,
        radius = geometry.radius,
        color = 'black',
        className,
    } = props;

    const transform = useMemo(() => {
        if (percentage === null) {
            return null;
        }
        if (useRotation) {
            return `rotate(${
                angleOffset + angleRange * percentage
            } ${center} ${center})
					translate( ${center} ${center - radius - (height ?? 0)})`;
        } else {
            const angle =
                ((angleOffset + angleRange * percentage - 90) * Math.PI) / 180;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return `translate(${x} ${y})`;
        }
    }, [percentage, angleOffset, angleRange, center, radius, height]);

    if (transform === null) {
        return '<></>';
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
                    width={width ?? 1}
                    height={height ?? 1}
                    color={color}
                    className={className}
                />
            )}
        </g>
    );
}
