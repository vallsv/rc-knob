import React from 'react';
import { Knob, Arc, Pointer } from 'rc-knob';
import styles from './styles.module.css';


export default function KnobExample() {
  return <Knob 
    size={100}  
    angleOffset={220} 
    angleRange={280}
    min={0}
    max={100}
    className={styles.styledKnob}
    onChange={value => console.log(value)}
  >
    <Arc 
      arcWidth={1.5}
    />
    <circle r="40" cx="50" cy="50" />
    <Pointer 
      width={2}
      height={35}
      radius={10}
      type="rect"
      color="#fff"
    />
  </Knob>;
}
