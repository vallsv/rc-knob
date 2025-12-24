import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Knob, Spiral } from '../src';

describe('Spiral', () => {
    it('renders with more than 1 turn', () => {
        const { container } = render(
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={0}
                angleRange={360}
            >
                <Spiral
                    color="lime"
                    arcWidth={5}
                    percentageFrom={0}
                    radiusFrom={100}
                    percentageTo={5}
                    radiusTo={50}
                />
            </Knob>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
    it('renders with less than 1 turn', () => {
        const { container } = render(
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={0}
                angleRange={360}
            >
                <Spiral
                    color="lime"
                    arcWidth={5}
                    percentageFrom={0.1}
                    radiusFrom={100}
                    percentageTo={0.8}
                    radiusTo={50}
                />
            </Knob>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
});
