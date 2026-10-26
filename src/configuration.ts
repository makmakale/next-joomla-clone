const JConfig = {
    dbUrl: process.env.DATABASE_URL!,
    siteName: process.env.NEXT_PUBLIC_SITENAME,
    lifetime: Number(process.env.NEXT_PUBLIC_LIFETIME) || 15,

    //
    // dbHost: process.env.DB_HOSTNAME!,
    // dbPort: Number(process.env.DB_PORT!) || 5432,
    // dbUser: process.env.DB_USERNAME!,
    // dbPass: process.env.DB_PASSWORD!,
    // dbName: process.env.DB_NAME!,
};

export default JConfig;
