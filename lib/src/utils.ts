interface Position {
    updated: boolean;
    mouseAngle: number;
    percentage: number;
}

export const clamp = (min: number, max: number, value: number) =>
    Math.max(min, Math.min(max, value));

export const calculatePercentageFromMouseAngle = ({
    mouseAngle,
    angleOffset,
    angleRange,
}: {
    mouseAngle: number;
    angleOffset: number;
    angleRange: number;
}) => {
    const rangle =
        ((mouseAngle - (angleOffset + angleRange * 0.5) + 900) % 360) - 180;
    const percentage = 0.5 + rangle / angleRange;
    return clamp(0, 1, percentage);
};

export const calculatePositionFromMouseAngle = ({
    mouseAngle,
    multiRotation,
    angleOffset,
    angleRange,
    percentage,
    previousPercentage,
    previousMouseAngle,
}: {
    mouseAngle: number;
    multiRotation?: boolean;
    angleOffset: number;
    angleRange: number;
    percentage: number;
    previousPercentage: number | null;
    previousMouseAngle: number | null;
}): Position => {
    const mouseAngle2 = mouseAngle as number;
    if (previousMouseAngle !== null) {
        // normalize and cancel the interaction if the delta angle is too big
        const deltaAngle = (mouseAngle - previousMouseAngle) % 360;
        const validDeltaAngle =
            deltaAngle > 180
                ? -(360 - deltaAngle)
                : deltaAngle < -180
                ? 360 + deltaAngle
                : deltaAngle;
        if (validDeltaAngle >= 120 || validDeltaAngle <= -120) {
            return {
                updated: false,
                mouseAngle: previousMouseAngle,
                // @ts-expect-error
                percentage: previousPercentage,
            };
        }

        // clamp the percentage
        // @ts-expect-error
        const newPercentage = previousPercentage + validDeltaAngle / angleRange;
        if (!multiRotation && (newPercentage < 0 || newPercentage > 1)) {
            const clampedPercentage = newPercentage < 0 ? 0 : 1;
            const theoricalMouseAngle =
                newPercentage < 0
                    ? angleOffset
                    : (angleOffset + angleRange + 720) % 360;
            return {
                updated: true,
                mouseAngle: theoricalMouseAngle,
                percentage: clampedPercentage,
            };
        }
        return {
            updated: true,
            mouseAngle,
            percentage: newPercentage,
        };
    } else {
        if (multiRotation) {
            const rawPercentage = calculatePercentageFromMouseAngle({
                angleOffset,
                angleRange,
                mouseAngle,
            });
            const deltaPercent = (rawPercentage + 1 - (percentage % 1)) % 1;
            const validDeltaPercent =
                deltaPercent > 0.5 ? deltaPercent - 1 : deltaPercent;
            return {
                updated: true,
                mouseAngle,
                percentage: percentage + validDeltaPercent,
            };
        } else {
            const newPercentage = calculatePercentageFromMouseAngle({
                angleOffset,
                angleRange,
                mouseAngle,
            });
            return {
                updated: true,
                mouseAngle,
                percentage: newPercentage,
            };
        }
    }
};

export const snapPosition = (
    position: Position,
    state: { angleOffset: number; angleRange: number },
    steps?: number,
): Position => {
    if (!position.updated || !steps) {
        return position;
    }
    const percentage = snapPercentage(position.percentage, steps);
    const mouseAngle =
        (state.angleOffset + state.angleRange * percentage) % 360;
    return {
        ...position,
        percentage,
        mouseAngle: mouseAngle < 0 ? mouseAngle + 360 : mouseAngle,
    };
};

export const snapPercentage = (percentage: number, nbIntervals: number) => {
    if (percentage === 0) return 0;
    const sign = Math.sign(percentage);
    const p = Math.abs(percentage);
    const stepSize = 1 / nbIntervals;
    const extra = (p + stepSize * 0.5) % stepSize;
    return sign * (p - stepSize * 0.5) + sign * (stepSize - extra);
};

export const getValueFromPercentage = ({
    min,
    max,
    percentage,
}: {
    min: number;
    max: number;
    percentage: number;
}) => min + (max - min) * percentage;

export const getPercentageFromValue = ({
    min,
    max,
    value,
}: {
    min: number;
    max: number;
    value: number;
}) => (value - min) / (max - min);
