import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { RenderCustomProps, Scale } from '../src/Scale';

describe('Scale', () => {
    it('renders correct no type is set', () => {
        const { container } = render(
            <svg>
                <Scale
                    angleRange={200}
                    steps={5}
                    radius={40}
                    tickWidth={2}
                    tickHeight={10}
                    angleOffset={90}
                    center={20}
                    percentage={50}
                    color="lime"
                    activeColor="red"
                    className="someClassName"
                    activeClassName="someActiveClassName"
                    value={0}
                    size={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct no type is set to rect', () => {
        const { container } = render(
            <svg>
                <Scale
                    type="rect"
                    angleRange={200}
                    steps={5}
                    radius={40}
                    tickWidth={2}
                    tickHeight={10}
                    angleOffset={90}
                    center={20}
                    percentage={50}
                    color="lime"
                    activeColor="red"
                    className="someClassName"
                    activeClassName="someActiveClassName"
                    value={0}
                    size={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct no type is set to circle', () => {
        const { container } = render(
            <svg>
                <Scale
                    type="circle"
                    angleRange={200}
                    steps={5}
                    radius={40}
                    tickWidth={2}
                    tickHeight={10}
                    angleOffset={90}
                    center={20}
                    percentage={50}
                    color="lime"
                    activeColor="red"
                    className="someClassName"
                    activeClassName="someActiveClassName"
                    value={0}
                    size={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct with custom render function for ticks', () => {
        const fn = (props: RenderCustomProps) => (
            <circle
                r={props.tickWidth}
                x={props.translateX}
                y={props.translateY}
                key={props.i}
            />
        );
        const { container } = render(
            <svg>
                <Scale
                    angleRange={200}
                    steps={5}
                    radius={40}
                    tickWidth={2}
                    tickHeight={10}
                    angleOffset={90}
                    center={20}
                    percentage={50}
                    color="lime"
                    activeColor="red"
                    className="someClassName"
                    activeClassName="someActiveClassName"
                    fn={fn}
                    value={0}
                    size={10}
                />
            </svg>,
        );
        expect(container.children[0].children[0]).toMatchSnapshot();
    });
});
