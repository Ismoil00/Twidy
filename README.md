### Patterns:
- For writing code: "camelCase";

### Stacks:
- Database: PostgreSQL;
- Frontend: React JS, Typescript, Tailwindcss, + other front-related libraries;
- Backend: Node JS, Typescript, Express JS, + other packages, modules and libraries;

<!-- PERSONAL NOTES THAT WILL BE DELETED SOON -->
### AUTHENTICATION & AUTHORIZATION:
- right in the registration the user must verify his email address and then proceed with the account creation;
- forgot password ability in login page;

- when phone number added, the followings must be done:
  - country-number auto detection;
  - phone number validation;
  - phone number should be unique;
  - phone number should be verified via OTP or SMS;


<!-- VALIDATION RELATED INFO -->
password:
- min length 6 characters;
- must be a mix of uppercase and lowercase letters, numbers, and special characters;
- must not contain empty space/string like "    " any where;
- is required field of course;

username:
- must not start with the number;
- can not contain only numbers;
- minimum length 6 characters;
- maximum length is 100 characters;
- must not contain empty space/string like "    " any where;
- is required field of course;

firtname & lastname:
- required;
- must be strings;
- must contain any letter;
- must not be only an empty string like "    ";

email:
- required;
- must be email format;
