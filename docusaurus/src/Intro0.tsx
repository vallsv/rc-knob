import React from 'react';
import { Knob, Arc, Pointer } from 'rc-knob';
import colors from './assets/colors.js';

export function Intro0() {
return <Knob
  size={100}  
  angleOffset={220} 
  angleRange={280}
  value={33}
  min={0}
  max={100}
>
  {/* @ts-expect-error */}
  <Arc
    arcWidth={5}
    color={colors.primary}
    background={colors.shadow}
  />
  {/* @ts-expect-error */}
  <Pointer
    width={5}
    height={40}
    radius={10}
    type="rect"
    color={colors.primary}
  />
</Knob>

}
