declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;
      SESSION_SECRET: string;
      JWT_SECRET: string;
      FORK: boolean;
    }
  }
}

export {};
