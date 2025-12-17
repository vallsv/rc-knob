import React from 'react';
import { Knob, Scale } from 'rc-knob';
import styles from './styles.module.css';

export default function KnobExample() {
  return <Knob 
    size={100}  
    angleOffset={220} 
    angleRange={280}
    steps={40}
    min={0}
    max={40}
    onChange={value => console.log(value)}
  >
    <Scale 
      tickWidth={2}
      tickHeight={2}
      radius={45}
      type="circle"
      activeClassName={styles.activeScale}
      className={styles.normalScale}
    />
  </Knob>
}
