/**
 * A hook like useState that allows you to use await the setter
 */
export declare const useStateWithAwait: <T = any>(initialState: T) => [T, (newValue: T) => Promise<void>];
//# sourceMappingURL=useStateWithAwait.d.ts.map