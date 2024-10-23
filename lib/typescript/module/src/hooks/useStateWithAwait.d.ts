/**
 * A hook that provides a state setter that can be awaited.
 *
 * @param initialState The initial value of the state.
 * @returns A tuple containing the current state and a setter function that returns a Promise.
 */
export declare const useStateWithAwait: <T = any>(initialState: T) => [T, (newValue: T) => Promise<void>];
//# sourceMappingURL=useStateWithAwait.d.ts.map