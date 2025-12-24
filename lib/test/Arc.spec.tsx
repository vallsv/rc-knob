import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Knob, Arc } from '../src';

describe('Arc', () => {
    it('renders correct with background color is given', () => {
        const { container } = render(
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={0}
                angleRange={180}
            >
                <Arc arcWidth={5} color="lime" background="red" />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct without background color is given', () => {
        const { container } = render(
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={0}
                angleRange={180}
            >
                <Arc arcWidth={5} color="lime" />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });
});
