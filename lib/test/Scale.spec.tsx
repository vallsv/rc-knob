import React from 'react'
import { shallow } from 'enzyme'
import { RenderCustomProps, Scale } from '../src/Scale'

describe('Scale', () => {
    it('renders correct no type is set', () => {
        const component = shallow(
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
        )
        expect(component).toMatchSnapshot()
    })
    it('renders correct no type is set to rect', () => {
        const component = shallow(
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
        )
        expect(component).toMatchSnapshot()
    })
    it('renders correct no type is set to circle', () => {
        const component = shallow(
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
        )
        expect(component).toMatchSnapshot()
    })
    it('renders correct with custom render function for ticks', () => {
        const fn = (props: RenderCustomProps) => (
            <circle r={props.tickWidth} x={props.translateX} y={props.translateY} key={props.i} />
        )
        const component = shallow(
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
        )
        expect(component).toMatchSnapshot()
    })
})
