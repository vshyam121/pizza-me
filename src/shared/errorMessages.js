export const lookupErrorCode = errorCode => {
  if (errorCode === "INVALID_PASSWORD" || errorCode === "EMAIL_NOT_FOUND") {
    return "The username or password you entered is incorrect.";
  } else if (errorCode.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
    return "You've made too many unsuccessful attempts. Please try again later.";
  } else {
    return "There was an error submitting your credentials.";
  }
};
