import React from 'react'
import { MockMotor } from '../../assets/MockMotor'
import { Knob, Value, Pointer, Range } from '@vallsv/rc-knob';

function MotorKnob({
  size,
  value,
  target=null,
  onChange = () => { },
}) {
  const [editedValue, setEditedValue] = React.useState(null)

  function onKnobInteractiveChange(value) {
    setEditedValue(value)
  }

  function onKnobMouseUp(e) {
    setEditedValue(null)
  }

  const outerKnobRadius = size * 0.5;
  const pointerSize = 10;
  const pointerPosRadius = outerKnobRadius - pointerSize * 2;

  const localTarget = (editedValue !== null) ? editedValue : target

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
    >
      <circle
        r={pointerPosRadius + pointerSize}
        cx={size / 2}
        cy={size / 2}
        fill="transparent"
        stroke="#ced4da"
        strokeWidth={pointerSize}
      />
      { localTarget !== null ? (<Range
        percentageFrom={value / 360}
        percentageTo={localTarget / 360}
        radius={pointerPosRadius + pointerSize * 1.5}
        color="#ff9800"
        arcWidth={pointerSize}
      />) : ""}
      { localTarget !== null ? (<Pointer
        percentage={localTarget / 360}
        width={pointerSize}
        height={pointerSize}
        radius={pointerPosRadius}
        type="circle"
        color="#ff9800"
      />) : ""}
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
  )
}

export default function Example() {
    const initialPosition = 45
    const [position, setPosition] = React.useState(initialPosition)
    const [target, setTarget] = React.useState(null)

    function onKnobChange(position) {
        setTarget(position)
    }

    function onMotorChange(position) {
        setPosition(position)
    }

    return (
	    <div>
            <MotorKnob
                size={120}
                target={target}
                origin="up"
                min={-9999}
                max={9999}
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
    )
}