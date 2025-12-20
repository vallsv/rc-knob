import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Value } from '../src/Value';

describe('Value', () => {
    it('renders correct with a given value', () => {
        const { container } = render(
            <svg>
                <Value
                    size={50}
                    value={10.1212}
                    className="someClassName"
                    percentage={10}
                    angleOffset={10}
                    angleRange={10}
                    radius={10}
                    center={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct with a negative 0', () => {
        const { container } = render(
            <svg>
                <Value
                    size={50}
                    value={-0.001}
                    decimalPlace={2}
                    className="someClassName"
                    percentage={10}
                    angleOffset={10}
                    angleRange={10}
                    radius={10}
                    center={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
    it('renders nothing correct without a given value', () => {
        const { container } = render(
            <svg>
                <Value
                    size={50}
                    className="someClassName"
                    value={null}
                    percentage={10}
                    angleOffset={10}
                    angleRange={10}
                    radius={10}
                    center={10}
                />
            </svg>,
        );
        expect(container.children[0].innerHTML).toBe('');
    });
});
