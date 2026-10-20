const JConfig = {
    dbUrl: process.env.DATABASE_URL!,
    dbHost: process.env.DB_HOSTNAME || 'localhost',
    dbPort: Number(process.env.DB_PORT!) || 5432,
    dbUser: process.env.DB_USERNAME!,
    dbPass: process.env.DB_PASSWORD!,
    dbName: process.env.DB_NAME!,
    siteName: process.env.NEXT_PUBLIC_SITENAME,
};

export default JConfig;
