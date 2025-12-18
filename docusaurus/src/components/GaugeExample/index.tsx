import React, { useEffect, useMemo, useState } from 'react';
import { Knob, Pointer, Range, Scale, Value } from '@vallsv/rc-knob';
import styles from './styles.module.css';

function useSmoothRand(min: number, max: number) {
    const [value, setValue] = useState((min + max) * 0.5);
    const [target, setTarget] = useState((min + max) * 0.5);
    useEffect(() => {
        const interval = setInterval(() => {
            setTarget(Math.random() * (max - min) + min);
        }, 2000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v + target) * 0.5);
        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, [target]);
    return value;
}

export default function Gauge(props: {
    value: number | null | 'rand';
    min: number;
    max: number;
    lowWarning?: number;
    hiWarning?: number;
    lowDanger?: number;
    hiDanger?: number;
}) {
    const { value, min, max, lowWarning, hiWarning, lowDanger, hiDanger } =
        props;

    const randValue = useSmoothRand(min, max);
    const realValue = value === 'rand' ? randValue : value;

    function toPercent(v: number): number {
        return (v - min) / (max - min);
    }

    const geometry = useMemo(() => {
        const lowPercentDanger =
            lowDanger === undefined ? undefined : toPercent(lowDanger);
        const hiPercentDanger =
            hiDanger === undefined ? undefined : toPercent(hiDanger);
        const lowPercentWarning =
            lowWarning === undefined ? undefined : toPercent(lowWarning);
        const hiPercentWarning =
            hiWarning === undefined ? undefined : toPercent(hiWarning);
        return {
            lowPercentDanger,
            hiPercentDanger,
            lowPercentWarning,
            hiPercentWarning,
        };
    }, [min, max, lowWarning, hiWarning, lowDanger, hiDanger]);

    const valueClassName = useMemo(() => {
        if (realValue === null) {
            return styles.value;
        }
        if (lowDanger && realValue <= lowDanger) {
            return `${styles.value} ${styles['value-danger']}`;
        }
        if (hiDanger && realValue >= hiDanger) {
            return `${styles.value} ${styles['value-danger']}`;
        }
        if (lowWarning && realValue <= lowWarning) {
            return `${styles.value} ${styles['value-warning']}`;
        }
        if (hiWarning && realValue >= hiWarning) {
            return `${styles.value} ${styles['value-warning']}`;
        }
        return styles.value;
    }, [realValue, lowDanger, hiDanger, lowWarning, hiWarning]);

    return (
        <Knob
            size={100}
            angleOffset={240}
            angleRange={240}
            min={min}
            max={max}
            value={realValue}
            readOnly={true}
            className={styles.gauge}
        >
            {geometry.lowPercentDanger && (
                <Range
                    arcWidth={20}
                    className={`${styles.range} ${styles['range-danger']}`}
                    percentageFrom={0.0}
                    percentageTo={geometry.lowPercentDanger}
                />
            )}
            {geometry.lowPercentWarning && (
                <Range
                    arcWidth={20}
                    className={`${styles.range} ${styles['range-warning']}`}
                    percentageFrom={geometry.lowPercentDanger ?? 0}
                    percentageTo={geometry.lowPercentWarning}
                />
            )}
            <Range
                arcWidth={20}
                className={styles.range}
                percentageFrom={
                    geometry.lowPercentWarning ?? geometry.lowPercentDanger ?? 0
                }
                percentageTo={
                    geometry.hiPercentWarning ?? geometry.hiPercentDanger ?? 1.0
                }
            />
            {geometry.hiPercentWarning && (
                <Range
                    arcWidth={20}
                    className={`${styles.range} ${styles['range-warning']}`}
                    percentageFrom={geometry.hiPercentWarning}
                    percentageTo={geometry.hiPercentDanger ?? 1}
                />
            )}
            {geometry.hiPercentDanger && (
                <Range
                    arcWidth={20}
                    className={`${styles.range} ${styles['range-danger']}`}
                    percentageFrom={geometry.hiPercentDanger}
                    percentageTo={1}
                />
            )}
            <Scale
                steps={20}
                tickWidth={1}
                tickHeight={5}
                radius={49}
                color="#303030"
            />
            <circle r="5" cx="50" cy="50" fill="black" />
            <Pointer
                percentage={toPercent(realValue)}
                width={10}
                height={35}
                radius={2}
                type="triangle"
                color="black"
            />
            <Value className={valueClassName} value={realValue} />
        </Knob>
    );
}
