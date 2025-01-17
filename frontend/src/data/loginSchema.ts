export const loginSchema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      minLength: 6,
      maxLength: 100,
      pattern: "^(?!\\d)(?!\\d+$)[^\\s]+$",
      errorMessage: {
        minLength: "Username must be at least 6 characters long.",
        maxLength: "Username must not exceed 100 characters.",
        pattern:
          "Username cannot start with a number, consist solely of numbers, or contain spaces.",
      },
    },
    password: {
      type: "string",
      minLength: 6,
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[~!@#$%^&*()_\\-+=])[A-Za-z\\d~!@#$%^&*()_\\-+=]{6,}$",
      not: {
        pattern: "\\s",
      },
      errorMessage: {
        minLength: "Password must be at least 6 characters long.",
        pattern:
          "Password must include uppercase and lowercase letters, numbers, and special characters.",
        not: "Password must not contain spaces.",
      },
    },
  },
  required: ["username", "password"],
  additionalProperties: false,
};
