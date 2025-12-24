import { createContext, useContext } from 'react';
import type { KnobState } from 'types';

type KnobContextType = KnobState;

export const KnobContext = createContext<KnobContextType | null>(null);

/**
 * Access to the parent Knob context.
 *
 * @param componentName: Name of the component using this hook,
 *                       for readability of the error message.
 * @throws An Error if no Knob is part of the parents of this component.
 */
export function useKnobContext(componentName: string): KnobContextType {
    const context = useContext(KnobContext);
    if (context === null) {
        throw new Error(
            `Component <${componentName}> not part of the <Knob> context`,
        );
    }
    return context;
}
