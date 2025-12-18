import React from 'react';
import { Knob, Scale } from '@vallsv/rc-knob';
import styles from './styles.module.css';

export default function KnobExample() {
  return <Knob 
    size={100}  
    angleOffset={220} 
    angleRange={280}
    steps={20}
    min={0}
    max={20}
    className={styles.withFilter}
    onChange={value => console.log(value)}
  >
    <Scale
      tickWidth={5}
      tickHeight={15}
      radius={45}
      type="circle"
      activeClassName={styles.activeScale}
      className={styles.normalScale}
    />
    <filter id="filter">
      <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="5"
          result="blur"
      />
      <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -7"
          result="goo"
      />
      <feComposite
          in="SourceGraphic"
          in2="goo"
          operator="arithmetic"
          k1="0.1"
          k2="1"
          k3="0.9"
          k4="-0.4"
      />
    </filter>
  </Knob>
}
