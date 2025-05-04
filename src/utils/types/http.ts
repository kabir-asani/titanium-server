import type { Session, User } from "better-auth";
import { HTTPException } from "hono/http-exception";
import type { ClientErrorStatusCode, ServerErrorStatusCode } from "hono/utils/http-status";

export type SecureSession = {
  Variables: {
    user: User;
    session: Session;
  };
};

export type HttpRouteExceptionOptions = {
  message: string;
};

export class HttpRouteException extends HTTPException {
  constructor(status: ClientErrorStatusCode | ServerErrorStatusCode, options?: HttpRouteExceptionOptions) {
    super(status, options);
  }
}

export const httpRouteException = (
  status: ClientErrorStatusCode | ServerErrorStatusCode,
  options?: HttpRouteExceptionOptions,
) => {
  const exception = new HttpRouteException(status, options);

  return exception;
};

export const badRequestException = (options?: HttpRouteExceptionOptions) => httpRouteException(400, options);
export const unauthorizedException = (options?: HttpRouteExceptionOptions) => httpRouteException(401, options);
export const forbiddenException = (options?: HttpRouteExceptionOptions) => httpRouteException(403, options);
export const notFoundException = (options?: HttpRouteExceptionOptions) => httpRouteException(404, options);
export const conflictException = (options?: HttpRouteExceptionOptions) => httpRouteException(409, options);
export const unprocessableContentException = (options?: HttpRouteExceptionOptions) => httpRouteException(422, options);
export const internalServerException = (options?: HttpRouteExceptionOptions) => httpRouteException(500, options);
