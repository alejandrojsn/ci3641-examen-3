"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.describeClass = exports.createClass = exports.createClassFromParent = exports.arrayHasDuplicates = exports.defineClass = exports.processInput = exports.classes = void 0;
exports.classes = {};
const processInput = (line) => {
    const tokens = line.split(' ');
    const [command, ...args] = tokens;
    switch (command) {
        case 'CLASS':
            return (0, exports.defineClass)(args);
        case 'DESCRIBIR':
            return (0, exports.describeClass)(args);
        default:
            return 'unknown command !!!';
    }
};
exports.processInput = processInput;
const defineClass = (args) => {
    let [className, parentClassName] = [undefined, undefined];
    let methods;
    if (args[1] === ':') {
        ;
        ([className, , parentClassName, ...methods] = args);
    }
    else {
        ;
        ([className, ...methods] = args);
    }
    if ((0, exports.arrayHasDuplicates)(methods)) {
        return 'La clase no puede tener métodos duplicados';
    }
    if (exports.classes[className]) {
        return `La clase ${className} ya existe`;
    }
    if (parentClassName && !exports.classes[parentClassName]) {
        return `La clase ${parentClassName} no existe`;
    }
    else if (parentClassName) {
        (0, exports.createClassFromParent)(className, parentClassName, methods);
    }
    else {
        (0, exports.createClass)(className, methods);
    }
    return 'defined';
};
exports.defineClass = defineClass;
const arrayHasDuplicates = (array) => new Set(array).size !== array.length;
exports.arrayHasDuplicates = arrayHasDuplicates;
const createClassFromParent = (className, parentClassName, methods) => {
    const parent = exports.classes[parentClassName];
    const parentMethods = Object.entries(parent.methods);
    exports.classes[className] = {
        name: className,
        parent: parentClassName,
        methods: Object.fromEntries(parentMethods.concat(methods.map(name => [name, className]))),
    };
};
exports.createClassFromParent = createClassFromParent;
const createClass = (className, methods) => {
    exports.classes[className] = {
        name: className,
        parent: undefined,
        methods: Object.fromEntries(methods.map(name => [name, className])),
    };
};
exports.createClass = createClass;
const describeClass = (args) => {
    const [className] = args;
    if (!className) {
        return 'Falta el nombre de la clase';
    }
    const classDefinition = exports.classes[className];
    if (!classDefinition) {
        return `La clase ${className} no existe`;
    }
    return Object
        .entries(classDefinition.methods)
        .map(([name, className]) => `${name} -> ${className} :: ${name}`)
        .join('\n');
};
exports.describeClass = describeClass;
