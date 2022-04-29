import * as clases from './clases';

describe('clases', () => {
    let defineClassSpy: jest.SpiedFunction<typeof clases.defineClass>;
    let describeClassSpy: jest.SpiedFunction<typeof clases.describeClass>;
    let createClassSpy: jest.SpiedFunction<typeof clases.createClass>;
    let createClassFromParentSpy: jest.SpiedFunction<typeof clases.createClassFromParent>;

    beforeAll(() => {
        defineClassSpy = jest.spyOn(clases, 'defineClass');
        describeClassSpy = jest.spyOn(clases, 'describeClass');
        createClassSpy = jest.spyOn(clases, 'createClass');
        createClassFromParentSpy = jest.spyOn(clases, 'createClassFromParent');
    });

    beforeEach(() => {
        //@ts-ignore
        clases.classes = [];
        jest.clearAllMocks();
    });

    describe('processInput', () => {
        describe('when input is CLASS', () => {
            test('should call defineClass with the expected arguments and return its result', () => {
                const input = 'CLASS A : B c d e f';
                const expectedResult = 'defined';
                defineClassSpy.mockReturnValueOnce(expectedResult);
                const result = clases.processInput(input);
                expect(defineClassSpy).toHaveBeenCalledWith(['A', ':', 'B', 'c', 'd', 'e', 'f']);
                expect(result).toEqual(expectedResult);
            });
        });

        describe('when input is DESCRIBIR', () => {
            test('should call describeClass with the expected arguments and return its result', () => {
                const input = 'DESCRIBIR A';
                const expectedResult = 'test result';
                describeClassSpy.mockReturnValueOnce(expectedResult);
                const result = clases.processInput(input);
                expect(describeClassSpy).toHaveBeenCalledWith(['A']);
                expect(result).toEqual(expectedResult);
            });
        });

        describe('when input is unknown', () => {
            test('should return unknown command', () => {
                const input = 'UNKNOWN';
                const expectedResult = 'unknown command !!!';
                const result = clases.processInput(input);
                expect(result).toEqual(expectedResult);
            });
        });
    });

    describe('arrayHasDuplicates', () => {
        describe('when array has duplicates', () => {
            test('should return true', () => {
                const testArray = ['a', 'b', 'c', 'd', 'e', 'c'];
                const result = clases.arrayHasDuplicates(testArray);
                expect(result).toEqual(true);
            });
        });

        describe('when array has no duplicates', () => {
            test('should return false', () => {
                const testArray = ['a', 'b', 'c', 'd', 'e'];
                const result = clases.arrayHasDuplicates(testArray);
                expect(result).toEqual(false);
            });
        });
    });

    describe('defineClass', () => {
        describe('when there are duplicate methods', () => {
            test('should return error message', () => {
                const args = ['A', ':', 'B', 'c', 'd', 'e', 'f', 'c'];
                const result = clases.defineClass(args);
                expect(result).toEqual('La clase no puede tener métodos duplicados');
            });
        });

        describe('when the class already exists', () => {
            test('should return error message', () => {
                clases.classes['A'] = {} as any;
                const args = ['A'];
                const result = clases.defineClass(args);
                expect(result).toEqual('La clase A ya existe');
            });
        });

        describe('when the parent class doesnt exist', () => {
            test('should return error message', () => {
                const args = ['A', ':', 'B'];
                const result = clases.defineClass(args);
                expect(result).toEqual('La clase B no existe');
            });
        });

        describe('when a parent class is defined', () => {
            test('should call createClassFromParent', () => {
                clases.classes['B'] = {} as any;
                const args = ['A', ':', 'B', 'c', 'd', 'e', 'f'];
                createClassFromParentSpy.mockReturnValueOnce(undefined);
                const expectedResult = 'defined';
                const result = clases.defineClass(args);
                expect(createClassFromParentSpy).toHaveBeenCalledWith('A','B', ['c', 'd', 'e', 'f']);
                expect(result).toEqual(expectedResult);
            });
        });

        describe('when a class is defined without parent', () => {
            test('should call createClass', () => {
                const args = ['A', 'c', 'd', 'e', 'f'];
                createClassSpy.mockReturnValueOnce(undefined);
                const expectedResult = 'defined';
                const result = clases.defineClass(args);
                expect(createClassSpy).toHaveBeenCalledWith('A', ['c', 'd', 'e', 'f']);
                expect(result).toEqual(expectedResult);
            });
        });
    });

    describe('createClass', () => {
        test('should create a ClassDefinition and add it to the classes object', () => {
            clases.createClass('A', ['b', 'c', 'd', 'e', 'f']);
            expect(clases.classes['A']).toEqual({
                name: 'A',
                parent: undefined,
                methods: {
                    b: 'A',
                    c: 'A',
                    d: 'A',
                    e: 'A',
                    f: 'A'
                }
            });
        });
    });

    describe('createClassFromParent', () => {
        test('should create a class with the methods from the parent class and the child class, overriding the parents ones if the child redefines them', () => {
            clases.classes['B'] = {
                name: 'B',
                parent: undefined,
                methods: {
                    b: 'B',
                    c: 'B',
                    d: 'B',
                }
            };
            clases.createClassFromParent('A', 'B', ['b', 'e', 'f']);
            expect(clases.classes['A']).toEqual({
                name: 'A',
                parent: 'B',
                methods: {
                    b: 'A',
                    c: 'B',
                    d: 'B',
                    e: 'A',
                    f: 'A'
                }
            });
        });
    });

    describe('describeClass', () => {
        describe('when class name is not passed', () => {
            test('should return error message', () => {
                const result = clases.describeClass([]);
                expect(result).toEqual('Falta el nombre de la clase');
            });
        });

        describe('when class doesnt exist', () => {
            test('should return error message', () => {
                const result = clases.describeClass(['A']);
                expect(result).toEqual('La clase A no existe');
            });
        });

        describe('when class exists', () => {
            test('should return the class description', () => {
                clases.classes['A'] = {
                    name: 'A',
                    parent: 'B',
                    methods: {
                        b: 'B',
                        c: 'B',
                        d: 'A',
                        e: 'A',
                        f: 'A'
                    }
                };
                const result = clases.describeClass(['A']);
                expect(result).toEqual('b -> B :: b\nc -> B :: c\nd -> A :: d\ne -> A :: e\nf -> A :: f');
            });
        });
    });
});
