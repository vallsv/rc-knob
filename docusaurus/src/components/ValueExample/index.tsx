import React from 'react';
import { Knob, Value } from 'rc-knob';
import styles from './styles.module.css';

export default function ValueExample() {
  return <Knob
    size={100}
    angleOffset={220}
    angleRange={280}
    min={0}
    max={100}
    >
    <Value
      marginBottom={10} 
      className={styles.value}
      />
  </Knob>;
}