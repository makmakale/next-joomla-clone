const JConfig = {
    dbHost: process.env.DB_HOSTNAME!,
    dbPort: Number(process.env.DB_PORT) || 5432,
    dbUser: process.env.DB_USERNAME!,
    dbPass: process.env.DB_PASSWORD!,
    dbName: process.env.DB_NAME!,
    dbSsl: process.env.NODE_ENV === 'production',
};

export default JConfig;
