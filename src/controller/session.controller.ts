import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession } from '../service/session.service'
import { signJwt } from "../utils/jwt.utils";
import config from 'config';
import { findSessions, updateSession } from '../service/session.service'

export async function createUserSessionHandler(
  req: Request,
  res: Response
) {

    const user = await validatePassword(req.body)

    if(!user) {
        return res.status(401).send("Invalid email or password")
    }

    const session = await createSession(user._id, req.get("user-agent") || "")

    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
    );

    const refreshToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get('refreshTokenTtl') } //1 yr 
    );

    res.cookie("accessToken", accessToken, {
        maxAge: 3.6e+6, // 15 mins
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
    });

    res.cookie("refreshToken", refreshToken, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
    });

    return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(
    req: Request,
    res: Response
    ) {
        const userId = res.locals.user._id

        const sessions = await findSessions({ user: userId, valid: true });

        return res.send(sessions);
}

export async function deleteSessionHandler(
    req: Request,
    res: Response
    ) {
        const sessionId = res.locals.user.session;

        await updateSession( { _id: sessionId }, { valid: false } );

        return res.send({
            accessToken: null, 
            refreshToken: null
        });
}