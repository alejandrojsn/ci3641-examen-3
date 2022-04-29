
type ClassName = string;

interface Methods {
    [name: string]: ClassName;
}

interface ClassDefinition {
    name: ClassName;
    parent: ClassName|undefined;
    methods: Methods;
}

export const classes: Record<string, ClassDefinition> = {};

export const processInput = (line: string): string => {
    const tokens = line.split(' ');

    const [command, ...args] = tokens;

    switch(command) {
        case 'CLASS':
            return defineClass(args);
        case 'DESCRIBIR':
            return describeClass(args);
        default:
            return 'unknown command !!!';
    }
};

export const defineClass = (args: string[]): string => {
    let [className, parentClassName]: (string|undefined)[] = [undefined, undefined];
    let methods: string[];

    if (args[1] === ':') {
        ;([className,, parentClassName, ...methods] = args);
    } else {
        ;([className, ...methods] = args);
    }

    if (arrayHasDuplicates(methods)) {
        return 'La clase no puede tener métodos duplicados';
    }

    if (classes[className]) {
        return `La clase ${className} ya existe`;
    }

    if (parentClassName && !classes[parentClassName]) {
        return `La clase ${parentClassName} no existe`;
    } else if (parentClassName) {
        createClassFromParent(className, parentClassName, methods);
    } else {
        createClass(className, methods);
    }

    return 'defined';
};

export const arrayHasDuplicates = (array: string[]): boolean => new Set(array).size !== array.length;

export const createClassFromParent = (className: string, parentClassName: string, methods: string[]): void => {
    const parent = classes[parentClassName];

    const parentMethods = Object.entries(parent.methods);

    classes[className] = {
        name: className,
        parent: parentClassName,
        methods: Object.fromEntries(parentMethods.concat(methods.map(name => [name, className]))),
    };
};

export const createClass = (className: string, methods: string[]): void => {
    classes[className] = {
        name: className,
        parent: undefined,
        methods: Object.fromEntries(methods.map(name => [name, className])),
    };
};

export const describeClass = (args: string[]): string => {
    const [className] = args;

    if (!className) {
        return 'Falta el nombre de la clase';
    }

    const classDefinition = classes[className];

    if (!classDefinition) {
        return `La clase ${className} no existe`;
    }

    return Object
        .entries(classDefinition.methods)
        .map(([name, className]): string => `${name} -> ${className} :: ${name}`)
        .join('\n');
};

