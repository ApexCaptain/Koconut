declare class KoconutError extends Error {
  constructor(message: string);
}
export declare class KoconutInvalidArgumentException extends KoconutError {}
export declare class KoconutIndexOutOfBoundsException extends KoconutError {}
export declare class KoconutNoSuchElementException extends KoconutError {}
export declare class KoconutConflictException extends KoconutError {}
export {};
