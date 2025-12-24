import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Knob, Pointer } from '../src';

describe('Pointer', () => {
    it('renders correct with type rect', () => {
        const { container } = render(
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={220}
                angleRange={90}
            >
                <Pointer
                    type="rect"
                    width={5}
                    height={2}
                    color="red"
                    className="someClassName"
                />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct with type circle', () => {
        const { container } = render(
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={220}
                angleRange={90}
            >
                <Pointer
                    type="circle"
                    width={5}
                    color="red"
                    className="someClassName"
                />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });

    it('renders correct with a child as pointer', () => {
        const CustomPointer = ({ width }: { width: number }) => (
            <circle r={`${width}`} />
        );
        const { container } = render(
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={220}
                angleRange={90}
            >
                <Pointer width={5} color="red" className="someClassName">
                    <CustomPointer width={0} />
                </Pointer>
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });
});
