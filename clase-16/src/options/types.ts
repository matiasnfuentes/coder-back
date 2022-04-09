export type DbOptions = {
  client: string;
  connection: {
    host?: string;
    user?: string;
    password?: string;
    database?: string;
    filename?: string;
  };
  useAsDefault?: boolean;
};
