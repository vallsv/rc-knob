import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { RenderCustomProps, Knob, Scale } from '../src';

describe('Scale', () => {
    it('renders correct no type is set', () => {
        const { container } = render(
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={90}
                angleRange={200}
            >
                <Scale
                    steps={5}
                    radius={40}
                    tickWidth={2}
                    tickHeight={10}
                    color="lime"
                    activeColor="red"
                    className="someClassName"
                    activeClassName="someActiveClassName"
                />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct type is set to rect', () => {
        const { container } = render(
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={90}
                angleRange={200}
            >
                <Scale
                    type="rect"
                    steps={5}
                    radius={40}
                    tickWidth={2}
                    tickHeight={10}
                    color="lime"
                    activeColor="red"
                    className="someClassName"
                    activeClassName="someActiveClassName"
                />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });
    it('renders correct type is set to circle', () => {
        const { container } = render(
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={90}
                angleRange={200}
            >
                <Scale
                    type="circle"
                    steps={5}
                    radius={40}
                    tickWidth={2}
                    tickHeight={10}
                    color="lime"
                    activeColor="red"
                    className="someClassName"
                    activeClassName="someActiveClassName"
                />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
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
            <Knob
                min={0}
                max={100}
                value={50}
                size={100}
                angleOffset={90}
                angleRange={200}
            >
                <Scale
                    steps={5}
                    radius={40}
                    tickWidth={2}
                    tickHeight={10}
                    color="lime"
                    activeColor="red"
                    className="someClassName"
                    activeClassName="someActiveClassName"
                    fn={fn}
                />
            </Knob>,
        );
        expect(container.children[0].children[0].children[0]).toMatchSnapshot();
    });
});
