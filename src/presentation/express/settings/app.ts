import express from "express";
import passport from "passport";
import passportAzureAd from "passport-azure-ad";
import cors from "cors";
import "dotenv/config";
import { replaceWithEnv } from "../../../utils/replaceWithEnv";
import routes from "../routers";

const BearerStrategy = passportAzureAd.BearerStrategy;
type LoggingLevel = "info" | "error" | "warn";

const loggingLevel: LoggingLevel = "info" as LoggingLevel;

const options = {
  identityMetadata: replaceWithEnv("MSAL_CONFIG_IDENTITY_META_DATA"),
  clientID: replaceWithEnv("MSAL_CONFIG_CLIENT_ID"),
  audience: replaceWithEnv("MSAL_CONFIG_AUDIENCE"),
  issuer: replaceWithEnv("MSAL_CONFIG_ISSUER"),
  validateIssuer: true,
  passReqToCallback: true,
  loggingLevel: loggingLevel,
  loggingNoPII: true, // Enable to diagnose
};

const bearerStrategy = new BearerStrategy(options, (req, token, done) => {
  return done(null, {}, token);
});

const corsOptions = {
  origin: replaceWithEnv("CORS_CONFIG_ORIGIN"),
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(passport.initialize());

passport.use(bearerStrategy);

app.use("/v1", routes);

export { app };
