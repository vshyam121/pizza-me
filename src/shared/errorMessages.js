export const lookupErrorCode = (errorCode) => {
  console.log(errorCode);
  if (errorCode === "INVALID_PASSWORD" || errorCode === "EMAIL_NOT_FOUND") {
    return "The username or password you entered is incorrect.";
  } else if (errorCode.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
    return "You've made too many unsuccessful attempts. Please try again later.";
  } else if (errorCode === "EMAIL_EXISTS") {
    return "The email you entered is already taken. Please try another one.";
  } else {
    return "There was an error submitting your credentials.";
  }
};
