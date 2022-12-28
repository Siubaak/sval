import evaluate from '.';
export function Program(program, scope) {
    for (let i = 0; i < program.body.length; i++) {
        evaluate(program.body[i], scope);
    }
}
