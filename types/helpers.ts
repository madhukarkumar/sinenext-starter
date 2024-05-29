export type Override<T extends object, K extends object> = Omit<T, keyof K> & K;
