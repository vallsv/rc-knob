import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Knob } from '../src/Knob';

describe('Knob', () => {
    it('provides the expected mouse API', () => {
        const { container } = render(
            <Knob
                min={0}
                max={100}
                size={10}
                onStart={() => {}}
                onEnd={() => {}}
                onChange={() => {}}
            />,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
});
