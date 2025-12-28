import React from 'react';
import { Knob, Value, Arc, Pointer } from '@vallsv/rc-knob';
import styles from './styles.module.css';

export default function BasicExample() {
    return (
        <Knob
            size={100}
            angleOffset={220}
            angleRange={280}
            min={0}
            max={100}
            onChange={(value) => console.log(value)}
            className={styles.myknob}
        >
            <Arc arcWidth={5} className={styles.arc} radius={47.5} />
            <Pointer
                width={5}
                radius={40}
                type="circle"
                className={styles.pointer}
            />
            <Value marginBottom={40} className={styles.value} />
        </Knob>
    );
}
