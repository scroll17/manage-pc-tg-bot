declare module 'process' {
    global {
        namespace NodeJS {
            interface ProcessEnv {
                BOT_TOKEN: string;
                OWNER_TG_ID: string;
            }
        }
    }
}