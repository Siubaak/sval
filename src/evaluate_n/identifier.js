import { DEADZONE } from '../share/const';
export function Identifier(node, scope, options = {}) {
    const { getVar = false, throwErr = true } = options;
    if (node.name === 'undefined') {
        return undefined;
    }
    const variable = scope.find(node.name);
    if (variable) {
        if (getVar) {
            return variable;
        }
        else {
            const value = variable.get();
            if (value === DEADZONE) {
                throw new ReferenceError(`${node.name} is not defined`);
            }
            else {
                return value;
            }
        }
    }
    else if (throwErr) {
        throw new ReferenceError(`${node.name} is not defined`);
    }
    else {
        return undefined;
    }
}
