declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URI: string;
            GA_CLIENT_EMAIL: string;
            GA_PRIVATE_KEY: string;   
        }
    }
}

export {}