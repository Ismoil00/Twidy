export const registrationSchema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      pattern: "^(?!\\d)[a-zA-Z0-9]{6,100}$",
      not: {
        pattern: "^\\d+$",
      },
      errorMessage: {
        pattern:
          "Username must be 6-100 characters long, cannot start with a number, and must not contain spaces.",
        not: "Username cannot consist solely of numbers.",
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
    firstname: {
      type: "string",
      minLength: 1,
      pattern: ".*[a-zA-Z]+.*",
      errorMessage: {
        minLength: "Firstname is required.",
        pattern:
          "Firstname must contain at least one letter and must not be empty or contain only spaces.",
      },
    },
    lastname: {
      type: "string",
      minLength: 1,
      pattern: ".*[a-zA-Z]+.*",
      errorMessage: {
        minLength: "Lastname is required.",
        pattern:
          "Lastname must contain at least one letter and must not be empty or contain only spaces.",
      },
    },
    email: {
      type: "string",
      format: "email",
      errorMessage: {
        format: "Email must be a valid email address.",
      },
    },
  },
  required: ["username", "password", "firstname", "lastname", "email"],
  additionalProperties: false,
};
