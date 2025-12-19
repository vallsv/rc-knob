import React from 'react';
import { MockMotor } from '../../helpers/MockMotor';
import { Knob, Value, Pointer, Spiral } from '@vallsv/rc-knob';

function MotorKnob(props: {
    size: number;
    value: number;
    target?: number;
    onChange: (position: number) => void;
}) {
    const { size, value, target = null, onChange = () => {} } = props;
    const [editedValue, setEditedValue] = React.useState(null);

    function onKnobInteractiveChange(value) {
        setEditedValue(value);
    }

    function onKnobMouseUp() {
        setEditedValue(null);
    }

    const outerKnobRadius = size * 0.5;
    const pointerSize = 10;
    const pointerPosRadius = outerKnobRadius - pointerSize * 2;

    const localTarget = editedValue !== null ? editedValue : target;
    let targetRadius =
        (Math.abs(localTarget - value) / 360) * pointerSize * 1.5;
    if (targetRadius > pointerPosRadius) {
        targetRadius = pointerPosRadius;
    }

    return (
        <Knob
            size={size}
            value={value}
            angleOffset={0}
            angleRange={360}
            min={0}
            max={360}
            onChange={onChange}
            onInteractiveChange={onKnobInteractiveChange}
            onEnd={onKnobMouseUp}
            tracking={false}
            multiRotation={true}
        >
            <circle
                r={pointerPosRadius + pointerSize}
                cx={size / 2}
                cy={size / 2}
                fill="transparent"
                stroke="#ced4da"
                strokeWidth={pointerSize}
            />
            {localTarget !== null ? (
                <Spiral
                    percentageFrom={value / 360}
                    percentageTo={localTarget / 360}
                    radiusFrom={pointerPosRadius + pointerSize * 1.5}
                    radiusTo={
                        pointerPosRadius + pointerSize * 1.5 - targetRadius
                    }
                    color="#ff9800"
                    arcWidth={pointerSize}
                />
            ) : (
                ''
            )}
            {localTarget !== null ? (
                <Pointer
                    percentage={localTarget / 360}
                    width={pointerSize}
                    height={pointerSize}
                    radius={pointerPosRadius - targetRadius}
                    type="circle"
                    color="#ff9800"
                />
            ) : (
                ''
            )}
            <Pointer
                percentage={value / 360}
                width={pointerSize}
                height={pointerSize}
                radius={pointerPosRadius}
                type="circle"
                color="#000"
            />
            <Value
                value={editedValue !== null ? editedValue : value}
                decimalPlace={2}
                marginBottom={size / 2}
                className="knob-text"
            />
        </Knob>
    );
}

export default function Example() {
    const initialPosition = 45;
    const [position, setPosition] = React.useState(initialPosition);
    const [target, setTarget] = React.useState(null);

    function onKnobChange(position: number) {
        setTarget(position);
    }

    function onMotorChange(position: number) {
        setPosition(position);
    }

    return (
        <div>
            <MotorKnob
                size={120}
                target={target}
                value={position}
                onChange={onKnobChange}
            />
            <MockMotor
                initialPosition={initialPosition}
                onChange={onMotorChange}
                velocity={30}
                target={target}
            />
        </div>
    );
}
