
import path from 'path';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config()


const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www',);

const ENV_LOCAL = path.resolve(__dirname, './.env.local',);
const env = dotenv.config({ path: ENV_LOCAL }).parsed || dotenv.config().parsed;

export default async () => {
    return {
        plugins: [
            react(),
        ],
        root: SRC_DIR,
        base: '',
        publicDir: PUBLIC_DIR,
        build: {
            outDir: BUILD_DIR,
            assetsInlineLimit: 0,
            emptyOutDir: true,
            rollupOptions: {
                treeshake: false,
            },
        },
        resolve: {
            alias: {
                '@': SRC_DIR,
            },
        },
        server: {
            host: true,
        },
        define: {
            CLIENT_ID: JSON.stringify(env.CLIENT_ID),
            CLIENT_SECRET: JSON.stringify(env.CLIENT_SECRET),
            URL_SITE: JSON.stringify(env.URL_SITE)
        }
    };
};
