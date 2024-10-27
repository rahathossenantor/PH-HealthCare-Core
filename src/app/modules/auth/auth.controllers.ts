import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import authServices from "./auth.services";
import config from "../../config";

const loginUser = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const response = await authServices.loginUser(req.body);
    const { accessToken, refreshToken, needsPasswordChange } = response;

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config.node_env === "production",
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 365
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully.",
        data: {
            accessToken,
            needsPasswordChange
        }
    });
});

const getRefreshToken = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const { refreshToken } = req.cookies;
    const response = await authServices.getRefreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully.",
        data: {
            accessToken: response
        }
    });
});

const authControllers = {
    loginUser,
    getRefreshToken
};

export default authControllers;
