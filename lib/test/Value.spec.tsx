import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Knob, Value } from '../src';

describe('Value', () => {
    it('renders correct with a given value', () => {
        const { container } = render(
            <Knob
                min={-1}
                max={100}
                value={10.1212}
                size={100}
                angleOffset={0}
                angleRange={360}
            >
                <Value className="someClassName" />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct with a negative 0', () => {
        const { container } = render(
            <Knob
                min={-1}
                max={100}
                value={-0.001}
                size={100}
                angleOffset={0}
                angleRange={360}
            >
                <Value decimalPlace={2} className="someClassName" />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });
    it('renders nothing correct without a given value', () => {
        const { container } = render(
            <Knob
                min={-1}
                max={100}
                value={null}
                size={100}
                angleOffset={0}
                angleRange={360}
            >
                <Value className="someClassName" />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });
});
