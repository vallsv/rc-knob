import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Spiral } from '../src/Spiral';

describe('Spiral', () => {
    it('renders with less than 1 turn', () => {
        const { container } = render(
            <svg>
                <Spiral
                    radius={10}
                    percentage={0}
                    color="lime"
                    center={100}
                    angleOffset={0}
                    angleRange={360}
                    arcWidth={5}
                    percentageFrom={0}
                    radiusFrom={100}
                    percentageTo={5}
                    radiusTo={50}
                    value={0}
                    size={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
    it('renders with more than 1 turn', () => {
        const { container } = render(
            <svg>
                <Spiral
                    radius={10}
                    percentage={0}
                    color="lime"
                    center={100}
                    angleOffset={0}
                    angleRange={360}
                    arcWidth={5}
                    percentageFrom={0.1}
                    radiusFrom={100}
                    percentageTo={0.8}
                    radiusTo={50}
                    value={0}
                    size={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
});
