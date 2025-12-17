import React from "react";

export const MockMotor = ({
  initialPosition,
  target = null,
  velocity = 1,
  onChange = () => {}
}) => {
  const now = Date.now();
  const [internalPosition, setInternalPosition] = React.useState(
    initialPosition
  );
  const [internalTime, setInternalTime] = React.useState(now);

  const validTarget = (target, position) => {
    return target !== null && target !== position;
  };

  const updatePosition = () => {
    const now = Date.now();
    const deltaTime = (now - internalTime) / 1000;
    let position = internalPosition;
    setInternalTime(now);
    if (validTarget(target, position)) {
      const deltaPosition = deltaTime * velocity;
      if (deltaPosition > Math.abs(position - target)) {
        position = target;
      } else {
        const direction = target > position ? 1 : -1;
        position = position + direction * deltaPosition;
      }
      setInternalPosition(position);
      onChange(position);
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      updatePosition();
    }, 1000);
    return () => clearInterval(timer);
  }, [target, internalTime, internalPosition]);

  return (
    <div>
        Position: {internalPosition.toFixed(2)} <br />
        Target: {validTarget(target, internalPosition) ? target.toFixed(2) : "----"}
    </div>
  );
};
