import { Request, Response, Router } from "express";

import { expressAdapter } from "../../adapters/express";
import { getLoggedInUserComposer } from "../../../infrastructure/services/agreement/getLoggedInUser";
import { updateLoggedInUserComposer } from "../../../infrastructure/services/agreement/updateLoggedInUser";
import passport from "passport";

const userRoutes = Router();

userRoutes.get(
  "/me",
  passport.authenticate("oauth-bearer", { session: false }),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getLoggedInUserComposer());
    return response.status(adapter.statusCode).json(adapter.body);
  }
);

userRoutes.put(
  "/me",
  passport.authenticate("oauth-bearer", { session: false }),
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, updateLoggedInUserComposer());
    return response.status(adapter.statusCode).json(adapter.body);
  }
);

export { userRoutes };
