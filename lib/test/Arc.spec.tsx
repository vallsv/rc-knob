import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Arc } from '../src/Arc';

describe('Arc', () => {
    it('renders correct with background color is given', () => {
        const { container } = render(
            <svg>
                <Arc
                    percentage={50}
                    angleOffset={0}
                    angleRange={180}
                    arcWidth={5}
                    center={0}
                    radius={50}
                    color="lime"
                    background="red"
                    value={0}
                    size={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct without background color is given', () => {
        const { container } = render(
            <svg>
                <Arc
                    percentage={50}
                    angleOffset={0}
                    angleRange={180}
                    arcWidth={5}
                    center={0}
                    radius={50}
                    color="lime"
                    background="red"
                    value={0}
                    size={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
});
