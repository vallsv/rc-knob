import React from 'react';
import { Knob, Value, Arc, Pointer } from '@vallsv/rc-knob';
import styles from './styles.module.css';
import colors from '@site/src/colors';

export default function BasicExample() {
  return <Knob
    size={100}
    angleOffset={220}
    angleRange={280}
    min={0}
    max={100}
    onChange={value => console.log(value)}
  >
    <Arc
      arcWidth={5}
      color={colors.primary}
      radius={47.5}
    />
    <Pointer
      width={5}
      radius={40}
      type="circle"
      color={colors.secondary}
    />
    <Value
      marginBottom={40}
      className={styles.value}
    />
  </Knob>;
}