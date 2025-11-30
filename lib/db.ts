import { MongoClient } from "mongodb";
import { typedEnv } from "./env";

const globalWithMongo = global as typeof global & {
  _mongoPr?: MongoClient;
};

globalWithMongo._mongoPr ??= new MongoClient(typedEnv.MONGODB_URI);

export const client = globalWithMongo._mongoPr;
export const db = client.db(typedEnv.DB_NAME);
