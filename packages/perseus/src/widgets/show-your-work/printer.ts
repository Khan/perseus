import {NodeType, type types} from "@math-blocks/semantic";

// TODO: Handle precedence and add in parentheses when necessary.
export function print(node: types.Node): string {
    switch (node.type) {
        case NodeType.Identifier: {
            return node.name;
        }
        case NodeType.Number: {
            return node.value;
        }
        case NodeType.Add: {
            let result = print(node.args[0]);
            for (let i = 1; i < node.args.length; i++) {
                const arg = node.args[i];
                if (arg.type === NodeType.Neg && arg.subtraction) {
                    result += `-${print(arg.arg)}`;
                } else {
                    result += `+${print(arg)}`;
                }
            }

            return result;
        }
        case NodeType.Mul: {
            if (node.implicit) {
                return node.args.map(print).join("");
            } else {
                throw new Error("TODO: handle explicit multiplication");
            }
        }
        case NodeType.Div: {
            const num = print(node.args[0]);
            const den = print(node.args[1]);
            return `\\frac{${num}}{${den}}`;
        }
        case NodeType.LessThan: {
            const left = print(node.args[0]);
            const right = print(node.args[1]);
            return `${left} \\lt ${right}`;
        }
        case NodeType.LessThanOrEquals: {
            const left = print(node.args[0]);
            const right = print(node.args[1]);
            return `${left} \\lte ${right}`;
        }
        case NodeType.GreaterThan: {
            const left = print(node.args[0]);
            const right = print(node.args[1]);
            return `${left} \\gt ${right}`;
        }
        case NodeType.GreaterThanOrEquals: {
            const left = print(node.args[0]);
            const right = print(node.args[1]);
            return `${left} \\gte ${right}`;
        }
        case NodeType.Equals: {
            const left = print(node.args[0]);
            const right = print(node.args[1]);
            return `${left}=${right}`;
        }
        default: {
            throw new Error(`TODO: handle '${node.type}' nodes`);
        }
    }
}
