type Fn<T> = (...args: any[]) => Promise<T> | T;
type ErrorHandler = (error: unknown, attempt: number) => void;
type FinallyHandler = () => void;
type LoggerHandler = (message: string, data?: any) => void;
type Fallback<T> = (...args: any[]) => Promise<T> | T;

interface SafeExecuteOptions<T> {
  retries?: number;
  errorHandler?: ErrorHandler;
  finallyHandler?: FinallyHandler;
  logger?: LoggerHandler;
  fallback?: Fallback<T>;
}

export function safeExecute<T>(fn: Fn<T>, options: SafeExecuteOptions<T> = {}) {
  const {
    retries = 0,
    errorHandler,
    finallyHandler,
    logger,
    fallback,
  } = options;

  return async (
    ...args: Parameters<Fn<T>>
  ): Promise<[T | null, unknown | null]> => {
    // Track for retries
    let attempt = 0;

    while (attempt <= retries) {
      try {
        // Increment the attempt
        attempt++;
        logger?.(`Attempt ${attempt} : Executing function...`);
        const result = await fn(...args);
        logger?.(
          `Function executed successfully on attempt ${attempt} `,
          result,
        );

        // Return executed result and null for no error
        // Go like error handling method
        return [result, null];
      } catch (error) {
        errorHandler?.(error, attempt);
        logger?.(`Error occurred on attempt ${attempt}`, error);

        // Attempt is exceed to retries count, then call fallback function when user provide fallback function
        if (attempt > retries) {
          if (fallback) {
            logger?.('Executing fallback function due to failure');
            try {
              const fallbackResult = await fallback(...args);
              return [fallbackResult, null];
            } catch (fallbackError) {
              return [null, fallbackError];
            }
          }
        }
        return [null, error];
      } finally {
        // Execute finally handler when provided
        finallyHandler?.();
      }
    }
    // This return should never reach
    return [null, null];
  };
}
