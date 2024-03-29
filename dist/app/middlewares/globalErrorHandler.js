"use strict";
/* eslint-disable no-unused-expressions */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const handleValidatorError_1 = __importDefault(require("../../errors/handleValidatorError"));
const ApiError_1 = require("../../errors/ApiError");
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (error, req, res, next) => {
    config_1.default.env === "development"
        ? console.log("Global Error Handler~", error.message)
        : console.log("Global Error Handler~");
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorMessage = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === "ValidatorError") {
        const simplifiedError = (0, handleValidatorError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(error);
        message = simplifiedError.message;
        statusCode = simplifiedError.statusCode;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof ApiError_1.ApiError) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        // eslint-disable-next-line no-undefined
        stack: config_1.default.env !== "production" ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
