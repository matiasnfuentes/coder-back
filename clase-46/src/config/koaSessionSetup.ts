import mongoose from "mongoose";
import { MONGO_URL, SESSION_SECRET } from "./config";
import session from "koa-session";

//export const initSession = async (app: Application) => {
//  app.keys = [SESSION_SECRET];
//  const connection = await mongoose.connect(MONGO_URL);
//
//  app.use(
//    session(
//      {
//        store: new MongooseStore({
//          collection: "appSessions",
//          connection: connection,
//          expires: 86400, // 1 day is the default
//          name: "AppSession",
//        }),
//      },
//      app
//    )
//  );
//};
//
