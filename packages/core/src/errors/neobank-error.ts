/**
 * Custom error class for Neobank SDK errors
 */
export class NeobankError extends Error {
  public readonly code: number;
  public readonly detail: string | null;
  public readonly statusCode: number;

  constructor(
    message: string,
    code: number,
    statusCode: number,
    detail: string | null = null
  ) {
    super(message);
    this.name = 'NeobankError';
    this.code = code;
    this.statusCode = statusCode;
    this.detail = detail;

    // Maintain proper stack trace for where error was thrown (only available in V8)
    if (typeof (Error as any).captureStackTrace === 'function') {
      (Error as any).captureStackTrace(this, NeobankError);
    }
  }

  /**
   * Creates a NeobankError from an API response
   */
  static fromApiResponse(
    message: string,
    code: number,
    statusCode: number,
    detail: string | null = null
  ): NeobankError {
    return new NeobankError(message, code, statusCode, detail);
  }

  /**
   * Returns a JSON representation of the error
   */
  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      detail: this.detail,
    };
  }
}

/**
 * Type guard to check if an error is a NeobankError
 */
export function isNeobankError(error: unknown): error is NeobankError {
  return error instanceof NeobankError;
}
