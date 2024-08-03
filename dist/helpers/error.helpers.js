"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessedEntityError = exports.VariantAlsoNegotiatesError = exports.ServiceUnavailableError = exports.InternalServerError = exports.TooManyRequestsError = exports.ConflictError = exports.ForbiddenError = exports.UnauthorizedError = exports.NotFoundError = exports.BadRequestError = exports.ErrorsHelpers = void 0;
/**
 * Classe base para erros personalizados.
 * @extends {Error}
 */
class ErrorsHelpers extends Error {
    /**
     * Cria uma nova instância de ErrorsHelpers.
     * @param {errorsInterfaces.IErrorsHelpers} {message, statusCode} - Detalhes do erro.
     */
    constructor({ message, statusCode }) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ErrorsHelpers';
    }
}
exports.ErrorsHelpers = ErrorsHelpers;
/**
 * Classe para erros de BadRequest (400).
 * @extends {ErrorsHelpers}
 */
class BadRequestError extends ErrorsHelpers {
    constructor({ message }) {
        super({ message, statusCode: 400 });
    }
}
exports.BadRequestError = BadRequestError;
/**
 * Classe para erros de NotFound (404).
 * @extends {ErrorsHelpers}
 */
class NotFoundError extends ErrorsHelpers {
    constructor({ message }) {
        super({ message, statusCode: 404 });
    }
}
exports.NotFoundError = NotFoundError;
/**
 * Classe para erros de Unauthorized (401).
 * @extends {ErrorsHelpers}
 */
class UnauthorizedError extends ErrorsHelpers {
    constructor({ message }) {
        super({ message, statusCode: 401 });
    }
}
exports.UnauthorizedError = UnauthorizedError;
/**
 * Classe para erros de Forbidden (403).
 * @extends {ErrorsHelpers}
 */
class ForbiddenError extends ErrorsHelpers {
    constructor({ message }) {
        super({ message, statusCode: 403 });
    }
}
exports.ForbiddenError = ForbiddenError;
/**
 * Classe para erros de Conflict (409).
 * @extends {ErrorsHelpers}
 */
class ConflictError extends ErrorsHelpers {
    constructor({ message }) {
        super({ message, statusCode: 409 });
    }
}
exports.ConflictError = ConflictError;
/**
 * Classe para erros de Too Many Requests (429).
 * @extends {ErrorsHelpers}
 */
class TooManyRequestsError extends ErrorsHelpers {
    constructor({ message }) {
        super({ message, statusCode: 429 });
    }
}
exports.TooManyRequestsError = TooManyRequestsError;
/**
 * Classe para erros de Internal Server Error (500).
 * @extends {ErrorsHelpers}
 */
class InternalServerError extends ErrorsHelpers {
    constructor({ message }) {
        super({ message, statusCode: 500 });
    }
}
exports.InternalServerError = InternalServerError;
/**
 * Classe para erros de Service Unavailable (503).
 * @extends {ErrorsHelpers}
 */
class ServiceUnavailableError extends ErrorsHelpers {
    constructor({ message }) {
        super({ message, statusCode: 503 });
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
/**
 * Classe para erros de Variant Also Negotiates (506).
 * @extends {ErrorsHelpers}
 */
class VariantAlsoNegotiatesError extends ErrorsHelpers {
    constructor({ message }) {
        super({ message, statusCode: 506 });
    }
}
exports.VariantAlsoNegotiatesError = VariantAlsoNegotiatesError;
/**
 * Classe para erros de unsprocessed entity (422).
 * @extends {ErrorsHelpers}
 */
class UnprocessedEntityError extends ErrorsHelpers {
    constructor({ message }) {
        super({ message, statusCode: 422 });
    }
}
exports.UnprocessedEntityError = UnprocessedEntityError;
