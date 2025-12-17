'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const clamp = (min, max, value) => Math.max(min, Math.min(max, value));
const calculatePercentageFromMouseAngle = ({ mouseAngle, angleOffset, angleRange, }) => {
    const rangle = ((mouseAngle - (angleOffset + angleRange * 0.5) + 900) % 360) - 180;
    const percentage = 0.5 + rangle / angleRange;
    return clamp(0, 1, percentage);
};
const calculatePositionFromMouseAngle = ({ mouseAngle, multiRotation, angleOffset, angleRange, percentage, previousPercentage, previousMouseAngle, }) => {
    if (previousMouseAngle !== null) {
        // normalize and cancel the interaction if the delta angle is too big
        const deltaAngle = (mouseAngle - previousMouseAngle) % 360;
        const validDeltaAngle = deltaAngle > 180
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
            const theoricalMouseAngle = newPercentage < 0
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
    }
    else {
        if (multiRotation) {
            const rawPercentage = calculatePercentageFromMouseAngle({
                angleOffset,
                angleRange,
                mouseAngle,
            });
            const deltaPercent = (rawPercentage + 1 - (percentage % 1)) % 1;
            const validDeltaPercent = deltaPercent > 0.5 ? deltaPercent - 1 : deltaPercent;
            return {
                updated: true,
                mouseAngle,
                percentage: percentage + validDeltaPercent,
            };
        }
        else {
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
const snapPosition = (position, state, steps) => {
    if (!position.updated || !steps) {
        return position;
    }
    const percentage = snapPercentage(position.percentage, steps);
    const mouseAngle = (state.angleOffset + state.angleRange * percentage) % 360;
    return Object.assign(Object.assign({}, position), { percentage, mouseAngle: mouseAngle < 0 ? mouseAngle + 360 : mouseAngle });
};
const snapPercentage = (percentage, nbIntervals) => {
    if (percentage === 0)
        return 0;
    const sign = Math.sign(percentage);
    const p = Math.abs(percentage);
    const stepSize = 1 / nbIntervals;
    const extra = (p + stepSize * 0.5) % stepSize;
    return sign * (p - stepSize * 0.5) + sign * (stepSize - extra);
};
const getValueFromPercentage = ({ min, max, percentage, }) => min + (max - min) * percentage;
const getPercentageFromValue = ({ min, max, value, }) => (value - min) / (max - min);

const DIRECTIONS = {
    37: -1,
    38: 1,
    39: 1,
    40: -1,
};
const onKeyDown = (dispatch) => (e) => {
    var _a;
    const direction = (_a = DIRECTIONS[e.keyCode]) !== null && _a !== void 0 ? _a : 0;
    if (!direction) {
        return;
    }
    else {
        e.preventDefault();
        dispatch({
            type: 'STEPS',
            direction,
        });
    }
};
const onScroll = (dispatch) => (e) => {
    const direction = e.deltaX < 0 || e.deltaY > 0
        ? 1
        : e.deltaX > 0 || e.deltaY < 0
            ? -1
            : 0;
    e.preventDefault();
    dispatch({
        type: 'STEPS',
        direction,
    });
};
const getClientCenter = (elem) => {
    const rect = elem.getBoundingClientRect();
    return {
        centerX: rect.x + elem.clientWidth / 2,
        centerY: rect.y + elem.clientHeight / 2,
    };
};
/**
 * Compute mouse position relative to the elem center
 * and a polar position with angle in degree and radius
 */
const getMousePosition = (elem, e) => {
    const { centerX, centerY } = getClientCenter(elem);
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const degree = (Math.atan2(mouseY, mouseX) * 180) / Math.PI + 90;
    const mouseAngle = degree < 0 ? degree + 360 : degree;
    const mouseRadius = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    return {
        mouseX: mouseX,
        mouseY: mouseY,
        mouseRadius: mouseRadius,
        mouseAngle: mouseAngle,
    };
};
const handleEventListener = ({ container, dispatch, readOnly, useMouseWheel, interactiveHook, }) => () => {
    if (readOnly) {
        return;
    }
    const div = container.current;
    const events = Object();
    const getInteractiveConfig = (mousePosition, e) => {
        let userConfig = {};
        if (interactiveHook) {
            const event = Object.assign({ ctrlKey: e.ctrlKey, altKey: e.altKey, metaKey: e.metaKey, shiftKey: e.shiftKey }, mousePosition);
            userConfig = interactiveHook(event);
        }
        return userConfig;
    };
    const onStart = (e) => {
        // FIXME: remove the as
        if (e.pointerType === 'mouse' && e.button !== 0) {
            return;
        }
        const mousePosition = getMousePosition(div, e);
        const userConfig = getInteractiveConfig(mousePosition, e);
        if (userConfig.readOnly) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (window.PointerEvent) {
            // FIXME: remove the as
            events.capturedPointerId = e.pointerId;
            div.setPointerCapture(events.capturedPointerId);
            div.addEventListener('pointermove', onMove);
            div.addEventListener('pointerup', onStop);
            div.addEventListener('pointercancel', onCancel);
        }
        else {
            // fallback with mouse event
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onStop);
            events.capturedWindow = true;
        }
        div.addEventListener('contextmenu', onContextMenu);
        events.capturedContextMenu = true;
        dispatch(Object.assign(Object.assign({ type: 'START' }, mousePosition), userConfig));
    };
    const clearCapture = () => {
        if (events.capturedPointerId !== undefined) {
            div.releasePointerCapture(events.capturedPointerId);
            div.removeEventListener('pointermove', onMove);
            div.removeEventListener('pointerup', onStop);
            div.removeEventListener('pointercancel', onCancel);
            events.capturedPointerId = undefined;
        }
        if (events.capturedWindow) {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onStop);
            events.capturedWindow = false;
        }
        if (events.capturedContextMenu) {
            div.removeEventListener('contextmenu', onContextMenu);
            events.capturedContextMenu = false;
        }
    };
    const onMove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const mousePosition = getMousePosition(div, e);
        const userConfig = getInteractiveConfig(mousePosition, e);
        if (userConfig.readOnly) {
            return;
        }
        dispatch(Object.assign(Object.assign({ type: 'MOVE' }, mousePosition), userConfig));
    };
    const onStop = () => {
        clearCapture();
        dispatch({ type: 'STOP' });
    };
    const onCancel = () => {
        clearCapture();
        dispatch({ type: 'CANCEL' });
    };
    const onContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        clearCapture();
        dispatch({ type: 'CANCEL' });
        return false;
    };
    const onWheel = useMouseWheel ? onScroll(dispatch) : null;
    const eventdown = window.PointerEvent ? 'pointerdown' : 'mousedown';
    div.addEventListener(eventdown, onStart);
    if (onWheel) {
        div.addEventListener('wheel', onWheel);
    }
    return () => {
        clearCapture();
        div.removeEventListener(eventdown, onStart);
        if (onWheel) {
            div.removeEventListener('wheel', onWheel);
        }
    };
};

const reduceOnStart = (state, action, callbacks) => {
    const mouseAngle = state.mouseAngle;
    const percentage = state.percentage;
    const position = calculatePositionFromMouseAngle(Object.assign(Object.assign(Object.assign({ previousMouseAngle: null, previousPercentage: null }, state), { mouseAngle: mouseAngle, percentage: percentage }), action));
    const steps = action.steps || state.steps;
    const position2 = snapPosition(position, state, steps);
    const value = getValueFromPercentage(Object.assign(Object.assign({}, state), position2));
    callbacks.onStart();
    callbacks.onInteractiveChange(value);
    if (state.tracking) {
        callbacks.onChange(value);
    }
    return Object.assign(Object.assign(Object.assign(Object.assign({}, state), { isActive: true }), position2), { startPercentage: state.percentage, startValue: state.value, value });
};
const reduceOnMove = (state, action, callbacks) => {
    const mouseAngle = state.mouseAngle;
    const percentage = state.percentage;
    const position = calculatePositionFromMouseAngle(Object.assign(Object.assign(Object.assign({ previousMouseAngle: state.mouseAngle, previousPercentage: state.percentage }, state), { mouseAngle: mouseAngle, percentage: percentage }), action));
    const steps = action.steps || state.steps;
    const position2 = snapPosition(position, state, steps);
    const value = getValueFromPercentage(Object.assign(Object.assign({}, state), position2));
    callbacks.onInteractiveChange(value);
    if (state.tracking) {
        callbacks.onChange(value);
    }
    return Object.assign(Object.assign(Object.assign({}, state), position2), { value });
};
const reduceOnStop = (state, action, callbacks) => {
    if (state.value !== null) {
        if (!state.tracking) {
            callbacks.onChange(state.value);
        }
    }
    callbacks.onEnd();
    return Object.assign(Object.assign({}, state), { isActive: false, value: state.value, percentage: state.percentage, startPercentage: undefined, startValue: undefined });
};
const reduceOnCancel = (state, action, callbacks) => {
    const percentage = state.startPercentage;
    const value = state.startValue;
    callbacks.onEnd();
    if (state.tracking) {
        callbacks.onChange(value);
    }
    return Object.assign(Object.assign({}, state), { isActive: false, value,
        percentage, startPercentage: undefined, startValue: undefined });
};
const reduceOnSteps = (state, action, callbacks) => {
    if (action.direction === undefined) {
        throw Error('Missing direction from Steps action');
    }
    if (state.value === null) {
        return state;
    }
    const value = clamp(state.min, state.max, state.value + 1 * action.direction);
    callbacks.onChange(value);
    return Object.assign(Object.assign({}, state), { value, percentage: getPercentageFromValue(Object.assign(Object.assign({}, state), { value })) });
};
const reducer = (callbacks) => (state, action) => {
    switch (action.type) {
        case 'START':
            return reduceOnStart(state, action, callbacks);
        case 'MOVE':
            return reduceOnMove(state, action, callbacks);
        case 'STOP':
            return reduceOnStop(state, action, callbacks);
        case 'CANCEL':
            return reduceOnCancel(state, action, callbacks);
        case 'STEPS':
            return reduceOnSteps(state, action, callbacks);
        default:
            return Object.assign(Object.assign({}, state), { isActive: false, value: state.value });
    }
};
var useUpdate = ({ min, max, multiRotation, initialValue, angleOffset = 0, angleRange = 360, size, steps, onChange, onInteractiveChange, interactiveHook, onStart, onEnd, readOnly, tracking, useMouseWheel, }) => {
    const svg = React.useRef(null);
    const container = React.useRef(null);
    const callbacks = {
        onChange,
        onInteractiveChange,
        onStart,
        onEnd,
    };
    const [{ percentage, value }, dispatch] = React.useReducer(reducer(callbacks), {
        isActive: false,
        min,
        max,
        multiRotation,
        angleOffset,
        angleRange,
        mouseAngle: null,
        percentage: initialValue ? (initialValue - min) / (max - min) : 0,
        value: initialValue || 0,
        svg,
        tracking,
        container,
        size,
        steps,
    });
    React.useEffect(handleEventListener({
        container,
        dispatch,
        readOnly,
        useMouseWheel,
        interactiveHook,
    }), [useMouseWheel, readOnly]);
    return {
        svg,
        container,
        percentage: percentage,
        value: value,
        onKeyDown: onKeyDown(dispatch),
    };
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

const pointOnCircle$2 = (center, radius, angle) => ({
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
});
const degTorad$1 = (deg) => (Math.PI * deg) / 180;
const clampDeg = (deg) => deg >= 360 ? 359.999 : deg <= -360 ? -359.999 : deg;
const calcPath$1 = ({ percentageFrom, percentageTo, angleOffset, angleRange, arcWidth, radius: outerRadius, center, }) => {
    const angle = angleRange * (percentageTo - percentageFrom);
    const clampedAngle = clampDeg(angle);
    const angleFrom = angleOffset - 90 + angleRange * percentageFrom;
    const innerRadius = outerRadius - arcWidth;
    const angleFromRad = degTorad$1(angleFrom);
    const angleToRad = degTorad$1(angleFrom + clampedAngle);
    const largeArcFlag = Math.abs(clampedAngle) < 180 ? 0 : 1;
    const direction = clampedAngle >= 0 ? 1 : 0;
    const p1 = pointOnCircle$2(center, outerRadius, angleFromRad);
    const p2 = pointOnCircle$2(center, outerRadius, angleToRad);
    const p3 = pointOnCircle$2(center, innerRadius, angleToRad);
    const p4 = pointOnCircle$2(center, innerRadius, angleFromRad);
    return `M${p1.x},${p1.y} A${outerRadius},${outerRadius} 0 ${largeArcFlag} ${direction} ${p2.x},${p2.y}L${p3.x},${p3.y} A${innerRadius},${innerRadius} 0 ${largeArcFlag} ${1 - direction} ${p4.x},${p4.y} L${p1.x},${p1.y}`;
};
const Range = (_a) => {
    var { color, percentage, percentageFrom = null, percentageTo = null } = _a, props = __rest(_a, ["color", "percentage", "percentageFrom", "percentageTo"]);
    let pfrom;
    let pto;
    if (percentageFrom !== null && percentageTo !== null) {
        pfrom = percentageFrom;
        pto = percentageTo;
    }
    else if (percentageFrom !== null) {
        pfrom = percentageFrom;
        pto = percentage;
    }
    else if (percentageTo !== null) {
        pfrom = percentage;
        pto = percentageTo;
    }
    else {
        pfrom = 0;
        pto = percentage;
    }
    if (pfrom === null || pto === null) {
        return React__default["default"].createElement(React__default["default"].Fragment, null);
    }
    const d = calcPath$1(Object.assign(Object.assign({}, props), { percentageFrom: pfrom, percentageTo: pto }));
    return (React__default["default"].createElement("g", null,
        React__default["default"].createElement("path", { d: d, style: { fill: color } })));
};

const Arc = (_a) => {
    var { percentage, color, background } = _a, props = __rest(_a, ["percentage", "color", "background"]);
    return (React__default["default"].createElement("g", null,
        background && (React__default["default"].createElement(Range, Object.assign({ percentage: percentage, percentageFrom: percentage, percentageTo: 1, color: background }, props))),
        React__default["default"].createElement(Range, Object.assign({ percentage: percentage, percentageFrom: 0, percentageTo: percentage, color: color }, props))));
};

const PointerShape = ({ type, width, height, color, className, }) => {
    switch (type) {
        case 'rect':
            return (React__default["default"].createElement("rect", { x: -width * 0.5, width: width, height: height, fill: color, className: className }));
        case 'circle':
            return React__default["default"].createElement("circle", { r: width, fill: color, className: className });
        case 'triangle':
            const d = `M 0,0 L ${width / 2},${height} L ${-width / 2},${height} z`;
            return React__default["default"].createElement("path", { d: d, fill: color, className: className });
    }
    return React__default["default"].createElement(React__default["default"].Fragment, null);
};
const Pointer = ({ children, width, height = width, angleOffset, angleRange, percentage, useRotation = true, radius, center, type, color, className, }) => {
    if (percentage === null) {
        return React__default["default"].createElement(React__default["default"].Fragment, null);
    }
    let transform;
    if (useRotation) {
        transform = `rotate(${angleOffset + angleRange * percentage} ${center} ${center})
					translate( ${center} ${center - radius - height})`;
    }
    else {
        const angle = ((angleOffset + angleRange * percentage - 90) * Math.PI) / 180;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        transform = `translate(${x} ${y})`;
    }
    return (React__default["default"].createElement("g", { transform: transform },
        children &&
            React__default["default"].Children.map(children, (child) => {
                if (!React.isValidElement(child)) {
                    return child;
                }
                return React__default["default"].cloneElement(child, {
                    // @ts-expect-error
                    width: width !== null && width !== void 0 ? width : 0,
                    height: height !== null && height !== void 0 ? height : 0,
                    percentage,
                });
            }),
        type && (React__default["default"].createElement(PointerShape, { type: type, width: width, height: height, color: color, className: className }))));
};

const renderCircle = ({ tickWidth, translateX, translateY, angleOffset, stepSize, center, color, active, activeColor, activeClassName, className, }) => (_, i) => (React__default["default"].createElement("circle", { r: tickWidth, key: i, className: i === active ? activeClassName : className, fill: i === active ? activeColor : color, stroke: "none", transform: `
        rotate(${angleOffset + stepSize * i} ${center} ${center}) 
        translate(${translateX} ${translateY})
        ` }));
const renderRect = ({ tickWidth, tickHeight, translateX, translateY, angleOffset, stepSize, center, color, active, activeColor, activeClassName, className, }) => (_, i) => (React__default["default"].createElement("rect", { className: i === active ? activeClassName : className, fill: i === active ? activeColor : color, stroke: "none", width: tickWidth, height: tickHeight, key: i, transform: `
        rotate(${angleOffset + stepSize * i} ${center} ${center}) 
        translate(${translateX} ${translateY})
        ` }));
const renderCustom = (_a) => {
    var { fn } = _a, props = __rest(_a, ["fn"]);
    return (_, i) => fn(Object.assign(Object.assign({}, props), { i }));
};
const Scale = ({ angleRange, steps, type = 'rect', radius, tickWidth, tickHeight, angleOffset, center, color, activeColor = color, className, activeClassName = className, fn, percentage, }) => {
    const stepSize = angleRange / steps;
    const length = steps + (angleRange === 360 ? 0 : 1);
    const translateX = center - tickWidth / 2;
    const translateY = center - radius;
    if (percentage === null) {
        return React__default["default"].createElement(React__default["default"].Fragment, null);
    }
    const active = Math.round((length - 1) * percentage);
    function getRenderFn() {
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
                return React__default["default"].createElement(React__default["default"].Fragment, null);
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
    return React__default["default"].createElement("g", null, Array.from({ length }, renderFn));
};

const Value = ({ value, size, decimalPlace = 0, className, marginBottom = 0, }) => {
    if (value === null || value === undefined) {
        return React__default["default"].createElement(React__default["default"].Fragment, null);
    }
    let label = value.toFixed(decimalPlace);
    // make sure no negative zero is displayed
    if (label.startsWith('-') && Number.parseFloat(label) === 0) {
        label = label.slice(1);
    }
    return (React__default["default"].createElement("text", { style: { userSelect: 'none' }, x: "50%", textAnchor: "middle", className: className, y: (size !== null && size !== void 0 ? size : 0) - marginBottom }, label));
};

const pointOnCircle$1 = (center, radius, angle) => ({
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
});
const degTorad = (deg) => (Math.PI * deg) / 180;
function ordered(v1, p1, v2, p2) {
    if (v1 <= v2) {
        return [v1, p1, v2, p2];
    }
    else {
        return [v2, p2, v1, p1];
    }
}
const calcPath = ({ percentageFrom, percentageTo, angleOffset, angleRange, arcWidth, outerRadiusFrom, outerRadiusTo, center, }) => {
    const [percentageMin, outerRadiusMin, percentageMax, outerRadiusMax] = ordered(percentageFrom, outerRadiusFrom, percentageTo, outerRadiusTo);
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
        const outerRadius = outerRadiusMin + (outerRadiusMax - outerRadiusMin) * coef;
        const innerRadius = outerRadius - arcWidth;
        const angleRad = startAngleRad + (endAngleRad - startAngleRad) * coef;
        const angleDeg = ((angleRad * 180) / Math.PI) * coef;
        const po = pointOnCircle$1(center, outerRadius, angleRad);
        const pi = pointOnCircle$1(center, innerRadius, angleRad);
        if (i === 0) {
            start = `${po.x},${po.y} `;
        }
        else {
            forth += `${outerRadius},${outerRadius} ${angleDeg} 0 1 ${po.x},${po.y} `;
        }
        if (i === nb) {
            link = `${pi.x},${pi.y} `;
        }
        else {
            back =
                `${innerRadius},${innerRadius} ${angleDeg} 0 0 ${pi.x},${pi.y} ` +
                    back;
        }
    }
    return `M ${start}A ${forth}L ${link}A ${back}z`;
};
const Spiral = (_a) => {
    var { color, percentage, percentageFrom = null, radiusFrom = null, percentageTo = null, radiusTo = null } = _a, props = __rest(_a, ["color", "percentage", "percentageFrom", "radiusFrom", "percentageTo", "radiusTo"]);
    let pfrom, pto;
    if (percentageFrom !== null && percentageTo !== null) {
        pfrom = percentageFrom;
        pto = percentageTo;
    }
    else if (percentageFrom !== null) {
        pfrom = percentageFrom;
        pto = percentage;
    }
    else if (percentageTo !== null) {
        pfrom = percentage;
        pto = percentageTo;
    }
    else {
        pfrom = 0;
        pto = percentage;
    }
    if (radiusFrom === null || radiusTo === null) {
        return React__default["default"].createElement(React__default["default"].Fragment, null);
    }
    if (pfrom === null || pto === null) {
        return React__default["default"].createElement(React__default["default"].Fragment, null);
    }
    const d = calcPath(Object.assign({ percentageFrom: pfrom, percentageTo: pto, outerRadiusFrom: radiusFrom, outerRadiusTo: radiusTo }, props));
    return (React__default["default"].createElement("g", null,
        React__default["default"].createElement("path", { d: d, style: { fill: color } })));
};

const pointOnCircle = (center, radius, angle) => {
    const rad = (angle * Math.PI) / 180;
    return {
        x: center + radius * Math.cos(rad),
        y: center + radius * Math.sin(rad),
    };
};
const Label = ({ label, angleRange, angleOffset, percentage, center, radius = 0, className, style = {}, userSelect = 'none', }) => {
    if (!label || percentage === null) {
        return React__default["default"].createElement(React__default["default"].Fragment, null);
    }
    const angle = angleOffset + 90 + angleRange * percentage;
    const p = pointOnCircle(center, radius, angle);
    return (React__default["default"].createElement("g", { transform: `translate( ${center - p.x} ${center - p.y})` },
        React__default["default"].createElement("text", { style: Object.assign({ userSelect }, style), x: "50%", y: "50%", textAnchor: "middle", className: className, dominantBaseline: "middle" }, label)));
};

const isInternalComponent = ({ type }) => type === Arc ||
    type === Pointer ||
    type === Scale ||
    type === Value ||
    type === Range ||
    type === Spiral ||
    type === Label;
const Knob = ({ min, max, value: initialValue, multiRotation = false, angleOffset = 0, angleRange = 360, size, onChange = () => { }, onInteractiveChange = () => { }, interactiveHook = undefined, onStart = () => { }, onEnd = () => { }, children, steps, snap = false, tracking = true, readOnly = false, useMouseWheel = true, ariaValueText, ariaLabelledBy, className, }) => {
    const { percentage, value, svg, container, onKeyDown } = useUpdate({
        min,
        max,
        multiRotation,
        initialValue,
        angleOffset,
        angleRange,
        size,
        steps: snap ? steps : undefined,
        onChange,
        onInteractiveChange,
        interactiveHook,
        useMouseWheel,
        readOnly,
        tracking,
        onStart,
        onEnd,
    });
    return (React__default["default"].createElement("div", { ref: container, 
        // @ts-expect-error
        tabIndex: "0", style: { outline: 'none', width: size, height: size }, "aria-valuemax": max, "aria-valuemin": min, "aria-valuenow": value, "aria-valuetext": ariaValueText, "aria-labelledby": ariaLabelledBy, onKeyDown: readOnly ? undefined : onKeyDown, className: className },
        React__default["default"].createElement("svg", { width: size, height: size, ref: svg }, React__default["default"].Children.map(children, (child) => {
            if (!React.isValidElement(child)) {
                return child;
            }
            return isInternalComponent(child)
                ? React__default["default"].cloneElement(child, Object.assign({ percentage,
                    size,
                    value,
                    angleOffset,
                    angleRange, radius: size / 2, center: size / 2, steps }, child.props))
                : child;
        }))));
};

exports.Arc = Arc;
exports.Knob = Knob;
exports.Label = Label;
exports.Pointer = Pointer;
exports.Range = Range;
exports.Scale = Scale;
exports.Spiral = Spiral;
exports.Value = Value;
//# sourceMappingURL=index.js.map
