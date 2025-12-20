import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Pointer } from '../src/Pointer';

describe('Pointer', () => {
    it('renders correct with type rect', () => {
        const { container } = render(
            <svg>
                <Pointer
                    type="rect"
                    width={5}
                    height={2}
                    angleOffset={220}
                    angleRange={90}
                    percentage={50}
                    radius={50}
                    center={10}
                    color="red"
                    className="someClassName"
                    value={0}
                    size={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct with type circle', () => {
        const { container } = render(
            <svg>
                <Pointer
                    type="circle"
                    width={5}
                    angleOffset={220}
                    angleRange={90}
                    percentage={50}
                    radius={50}
                    center={10}
                    color="red"
                    className="someClassName"
                    value={0}
                    size={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });

    it('renders correct with a child as pointer', () => {
        const CustomPointer = ({ width }: { width: number }) => (
            <circle r={`${width}`} />
        );
        const { container } = render(
            <svg>
                <Pointer
                    width={5}
                    angleOffset={220}
                    angleRange={90}
                    percentage={50}
                    radius={50}
                    center={10}
                    color="red"
                    className="someClassName"
                    value={0}
                    size={10}
                >
                    <CustomPointer width={0} />
                </Pointer>
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
});
