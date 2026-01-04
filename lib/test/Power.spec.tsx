import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Knob, Power } from '../src';

describe('Power', () => {
    it('renders correctlty', () => {
        const { container } = render(
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={0}
                angleRange={180}
            >
                <Power
                    percentageFrom={0}
                    percentageTo={1}
                    widthFrom={1}
                    widthTo={10}
                />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });
});
