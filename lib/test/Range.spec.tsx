import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Knob, Range } from '../src';

describe('Range', () => {
    it('renders correct clockwise small', () => {
        const { container } = render(
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={0}
                angleRange={360}
            >
                <Range
                    percentageFrom={0.2}
                    percentageTo={0.5}
                    arcWidth={5}
                    color="lime"
                />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct clockwise large', () => {
        const { container } = render(
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={0}
                angleRange={360}
            >
                <Range
                    percentageFrom={0.2}
                    percentageTo={0.8}
                    arcWidth={5}
                    radius={50}
                    color="lime"
                />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct anticlockwise small', () => {
        const { container } = render(
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={0}
                angleRange={-360}
            >
                <Range
                    percentageFrom={0.2}
                    percentageTo={0.5}
                    arcWidth={5}
                    radius={50}
                    color="lime"
                />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct anticlockwise large', () => {
        const { container } = render(
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={0}
                angleRange={-360}
            >
                <Range
                    percentageFrom={0.2}
                    percentageTo={0.8}
                    arcWidth={5}
                    radius={50}
                    color="lime"
                />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });
});
