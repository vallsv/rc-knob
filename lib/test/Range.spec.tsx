import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Range } from '../src/Range';

describe('Range', () => {
    it('renders correct clockwise small', () => {
        const { container } = render(
            <svg>
                <Range
                    percentage={0}
                    percentageFrom={0.2}
                    percentageTo={0.5}
                    angleOffset={0}
                    angleRange={360}
                    arcWidth={5}
                    center={0}
                    radius={50}
                    color="lime"
                    value={0}
                    size={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct clockwise large', () => {
        const { container } = render(
            <svg>
                <Range
                    percentage={0}
                    percentageFrom={0.2}
                    percentageTo={0.8}
                    angleOffset={0}
                    angleRange={360}
                    arcWidth={5}
                    center={0}
                    radius={50}
                    color="lime"
                    value={0}
                    size={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct anticlockwise small', () => {
        const { container } = render(
            <svg>
                <Range
                    percentage={0}
                    percentageFrom={0.2}
                    percentageTo={0.5}
                    angleOffset={0}
                    angleRange={-360}
                    arcWidth={5}
                    center={0}
                    radius={50}
                    color="lime"
                    value={0}
                    size={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct anticlockwise large', () => {
        const { container } = render(
            <svg>
                <Range
                    percentage={0}
                    percentageFrom={0.2}
                    percentageTo={0.8}
                    angleOffset={0}
                    angleRange={-360}
                    arcWidth={5}
                    center={0}
                    radius={50}
                    color="lime"
                    value={0}
                    size={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
});
