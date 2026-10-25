const JConfig = {
    dbUrl: process.env.DATABASE_URL!,
    siteName: process.env.NEXT_PUBLIC_SITENAME,
    lifetime: Number(process.env.NEXT_PUBLIC_LIFETIME) || 15,
};

export default JConfig;
