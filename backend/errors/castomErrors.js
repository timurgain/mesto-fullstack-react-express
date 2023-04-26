class NullQueryResultError extends Error {
  constructor(message = 'Query result is null') {
    super(message);
    this.name = 'NullQueryResultError';
  }
}

class CredentialsError extends Error {
  constructor(message = 'Wrong login or password') {
    super(message);
    this.name = 'CredentialsError';
  }
}

class AuthenticationRequiredError extends Error {
  constructor(message = 'Authentication required') {
    super(message);
    this.name = 'AuthenticationRequiredError';
  }
}

class ForbiddenError extends Error {
  constructor(message = 'Not enough rights') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

class UrlNotFoundError extends Error {
  constructor(message = 'The url doesnt exist') {
    super(message);
    this.name = 'UrlNotFoundError';
  }
}

module.exports = {
  NullQueryResultError,
  CredentialsError,
  AuthenticationRequiredError,
  ForbiddenError,
  UrlNotFoundError,
};
