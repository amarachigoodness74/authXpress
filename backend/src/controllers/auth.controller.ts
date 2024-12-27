import { NextFunction, Request, Response } from "express";
import { logger } from "../utils";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updatePassword,
  updateUser,
  validateUser,
} from "../services/user.service";
import { signAccessToken, verifyAccessToken } from "../utils/jwtUtils";
import { ICreateToken } from "../interfaces/token.interface";
import {
  AlreadyExistingUserException,
  CustomException,
  ServerErrorException,
  WrongCredentialsException,
} from "../utils/errors";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await findUserByEmail(email, next);
    if (existingUser) {
      return next(new (AlreadyExistingUserException as any)());
    }

    // Create new user
    await createUser({ name, email, password }, next);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    logger.error(`Register Controller Error: ${error.message}`);
    return next(new (ServerErrorException as any)());
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const userIsValid = await validateUser(email, password, next);

    if (!userIsValid) {
      return next(new (WrongCredentialsException as any)());
    }

    const user = await findUserByEmail(email, next);
    if (!user) {
      return next(new (WrongCredentialsException as any)());
    }
    const accessTokenData: ICreateToken = {
      email: user.email,
      isRefreshToken: false,
    };
    const refreshTokenData: ICreateToken = {
      email: user.email,
      isRefreshToken: true,
    };

    const accessToken = (await signAccessToken(accessTokenData, next)) || "";
    const refreshToken = (await signAccessToken(refreshTokenData, next)) || "";

    await updateUser(user._id as string, { token: refreshToken }, next);
    res.status(200).json({
      status: "success",
      payload: { ...user, token: accessToken },
    });
  } catch (error: any) {
    logger.error(`Login Controller Error: ${error.message}`);
    return next(new (ServerErrorException as any)());
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const user = await findUserByEmail(email, next);
  if (!user) {
    // This is returned like this to prevent hackers from confirming unregistered emails
    return next(
      res.status(200).json({
        status: "success",
        message: "Please check your mail",
      })
    );
  }
  const createAccessToken: ICreateToken = {
    email: user.email,
    isRefreshToken: false,
  };
  const token = await signAccessToken(createAccessToken, next);
  // TODO: We are to to send a mail to user here
  res.status(200).json({
    status: "success",
    payload: { token },
  });
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const updatedUser = await updatePassword(email, password, next);
    if (updatedUser) {
      res.status(200).json({
        status: "success",
        message: "Password updated successfully",
      });
    }
    return next(new (CustomException as any)(500, "Operation unsuccessful"));
  } catch (error: any) {
    logger.error(
      `resetPasswordController AuthController Error: ${error.message}`
    );
    return next(new (ServerErrorException as any)());
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await findUserById(id, next);
    if (user) {
      const tokenIsValid = await verifyAccessToken(
        { token: user.token, isRefreshToken: true },
        next
      );
      if (tokenIsValid) {
        const accessToken = await signAccessToken(
          { email: user.email, isRefreshToken: false },
          next
        );
        res.status(200).json({
          status: "success",
          payload: { ...user, token: accessToken },
        });
      }
    }
  } catch (error: any) {
    logger.error(`refreshToken Controller Error: ${error.message}`);
    return next(new (CustomException as any)(500, "Operation unsuccessful"));
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const updatedUser = await updateUser(id, { token: "" }, next);

    if (updatedUser) {
      res.status(200).json({ message: "Logged out successfully" });
    }
  } catch (error: any) {
    logger.error(`updatePassword UserService Error: ${error.message}`);
    return next(new (CustomException as any)(500, "Operation unsuccessful"));
  }
};
