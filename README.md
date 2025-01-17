### Patterns:
- For writing code: "camelCase";

### Stacks:
- Database: PostgreSQL;
- Frontend: React JS, Typescript, Tailwindcss, + other front-related libraries;
- Backend: Node JS, Typescript, Express JS, + other packages, modules and libraries;

<!-- PERSONAL NOTES THAT WILL BE DELETED SOON -->
### AUTHENTICATION & AUTHORIZATION:
## REGISTRATION:
- after the first registration the user must verify the email, otherwise the user won't be able to send some requests;
- when phone number added, the followings must be done:
  - country-number auto detection;
  - phone number validation;
  - phone number should be unique;
  - phone number should be verified via OTP or SMS;

## LOGIN:
- when a new session is created, we inform the user in other sessions [if exist];
- when the current session deleted/user logs out, we delete the session from DB;
- when another session is deleted from the current session, we not only delete but redirect the user to the login page on the device where the session was deleted;
- forgot password ability;

* Session Deactivation: Simple Delition, WebSocket, or Polling;


<!-- VALIDATION RELATED INFO -->
password:
- min length 6 characters;
- must be a mix of uppercase and lowercase letters, numbers, and special characters;
- must not contain empty space/string like " " any where;
- is required field of course;

username:
- must not start with the number;
- can not contain only numbers;
- minimum length 6 characters;
- maximum length is 100 characters;
- must not contain empty space/string like " " any where;
- is required field of course;

firtname & lastname:
- required;
- must be strings;
- must contain any letter;
- must not be only an empty string like "      ";

email:
- required;
- must be email format;