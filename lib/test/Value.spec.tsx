import React from 'react'
import { shallow } from 'enzyme'
import { Value } from '../src/Value'

describe('Value', () => {
    it('renders correct with a given value', () => {
        const component = shallow(
            <Value
                size={50} value={10.1212} className="someClassName"
                percentage={10} angleOffset={10} angleRange={10} radius={10} center={10}          
            />
        )
        expect(component).toMatchSnapshot()
    })
    it('renders correct with a negative 0', () => {
        const component = shallow(
            <Value
                size={50} value={-0.001} decimalPlace={2} className="someClassName"
                percentage={10} angleOffset={10} angleRange={10} radius={10} center={10}          
            />
        )
        expect(component).toMatchSnapshot()
    })
    it('renders nothing correct without a given value', () => {
        const component = shallow(
            <Value
                size={50} className="someClassName"
                value={null}
                percentage={10} angleOffset={10} angleRange={10} radius={10} center={10}          
            />
        )
        expect(component.html()).toBe("")
    })
})
