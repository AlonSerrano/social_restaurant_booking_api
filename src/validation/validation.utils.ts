import { ValidationError } from "joi";

export const formatJoiError = (error: ValidationError): string => {
  return error.details.map((detail) => detail.message).join(", ");
};
