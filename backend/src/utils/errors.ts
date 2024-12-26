/* eslint-disable no-unused-vars */
export function WrongCredentialsException(this: any): void {
  this.status = 406;
  this.message = 'Invalid credentials';
}

export function NotFoundUserException(this: any): void {
  this.status = 403;
  this.message = 'Please login or create an account';
}

export function UnauthorizedUserException(this: any): void {
  this.status = 401;
  this.message = 'You are not authorized';
}

export function ServerErrorException(this: any): void {
  this.status = 500;
  this.message = "Operation unsuccessful";
}

export function AlreadyExistingUserException(this: any): void {
  this.status = 400;
  this.message = "User already exists";
}

export function CustomException(
  this: any,
  code: number,
  message: string
): void {
  this.status = code;
  this.message = message;
}
