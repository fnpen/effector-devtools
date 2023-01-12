import type { Unit } from "effector";
export * from "effector";

type Config = {
  inPage?: boolean;
  routeKeyboard?: boolean;
};

export declare function logDiff(name: string, ...args: any[]): void;
export declare function logName(name: string, ...args: any[]): void;
export declare function log(...args: any[]): void;
export declare function attachLogger<T>(unit: Unit<T>): void;
export declare function setupLogger(config: Config): void;
