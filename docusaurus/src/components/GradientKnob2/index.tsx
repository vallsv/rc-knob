import React from 'react';
import { Knob, Arc, Pointer, Scale } from 'rc-knob';


export default function KnobExample({size}) {
  const scaleSize = 10
  const margin = 2
  const backKnobSize = size - (scaleSize + margin) * 2
  const knobSize = 0.686 * backKnobSize
  const ptWidth = 7.2 / 100 * backKnobSize

  return (
    <Knob
      size={size}
      angleOffset={220}
      angleRange={280}
      min={0}
      max={100}
      onChange={value => console.log(value)}
    >
      <defs>
  <radialGradient id="k2bg1" cx="1" cy="0.5" r="1" gradientTransform="scale(.5 1)" gradientUnits="objectBoundingBox">
   <stop stopColor="#6c6f76" offset="0"/>
   <stop stopColor="#333535" offset="1"/>
  </radialGradient>

  <linearGradient id="k2bg2" x1="0.46" x2="0.72" y1="0.17" y2="0.92" gradientUnits="objectBoundingBox">
   <stop stopColor="#6f6c6b" offset="0"/>
   <stop stopColor="#494848" offset="1"/>
  </linearGradient>
  <linearGradient id="k2bg2s" x1="0.39" x2="0.90" y1="0.19" y2="0.8"  gradientUnits="objectBoundingBox">
   <stop stopColor="#b2adac" offset="0"/>
   <stop stopColor="#63605f" offset=".22368"/>
   <stop stopColor="#6d6968" offset="1"/>
  </linearGradient>

  <linearGradient id="k2pt1" x1="0" x2="0" y1="0" y2="1" gradientUnits="objectBoundingBox">
   <stop stopColor="#cbc8c3" offset="0"/>
   <stop stopColor="#e7e5e2" offset=".9127"/>
   <stop stopColor="#ffffff" offset="1"/>
  </linearGradient>
  <linearGradient id="k2pt2" x1="0" x2="0" y1="0" y2="1"  gradientUnits="objectBoundingBox">
   <stop stopColor="#f3f2f1" offset="0"/>
   <stop stopColor="#eeedeb" offset=".036396"/>
   <stop stopColor="#cdcac4" offset="1"/>
  </linearGradient>
      </defs>
        <circle cx={size/2} cy={size/2} r={backKnobSize/2} fill="url(#k2bg1)" />
        <circle cx={size/2} cy={size/2} r={knobSize/2} fill="url(#k2bg2)"
          stroke="url(#k2bg2s)" strokeWidth="2"/>
      <Scale
        steps={8}
        tickWidth={4}
        tickHeight={scaleSize}
        radius={size/2}
        color="#505050"
      />
      <Pointer
        width={0}
        height={0}
        useRotation={true}
        radius={0}>
        <g>
        <rect
          x={-ptWidth/2}
          y={-backKnobSize/2}
          width={ptWidth}
          height={backKnobSize/2-knobSize/2}
          fill="url(#k2pt1)" />
        <rect
          x={-ptWidth/2}
          y={-knobSize/2}
          width={ptWidth}
          height={ptWidth/2+knobSize/2}
          fill="url(#k2pt2)" />
        </g>
      </Pointer>
    </Knob>);
}
