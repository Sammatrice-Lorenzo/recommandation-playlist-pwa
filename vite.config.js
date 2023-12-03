
import path from 'path'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import fs from 'fs'
import https from 'https'

dotenv.config()

const SRC_DIR = path.resolve(__dirname, './src')
const PUBLIC_DIR = path.resolve(__dirname, './public')
const BUILD_DIR = path.resolve(__dirname, './www',)

const ENV_LOCAL = path.resolve(__dirname, './.env.local',)
const KEY_SSL = path.resolve(__dirname, './config/ssl/key.pem',)
const CERT_SSL = path.resolve(__dirname, './config/ssl/cert.pem',)
const env = dotenv.config({ path: ENV_LOCAL }).parsed || dotenv.config().parsed

const options = {
    key: fs.readFileSync(KEY_SSL, 'utf8'),
    cert: fs.readFileSync(CERT_SSL, 'utf8')
}

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
            https: https.createServer(options),
            host: true,
        },
        define: {
            CLIENT_ID: JSON.stringify(env.CLIENT_ID),
            CLIENT_SECRET: JSON.stringify(env.CLIENT_SECRET),
            URL_SITE: JSON.stringify(env.URL_SITE),
            API_URL: JSON.stringify(env.API_URL),

            // Firebase
            FIREBASE_API_KEY: JSON.stringify(env.FIREBASE_API_KEY),
            AUTH_DOMAIN_FIREBASE: JSON.stringify(env.AUTH_DOMAIN_FIREBASE),
            DATABASE_URL: JSON.stringify(env.DATABASE_URL),
            PROJECT_ID: JSON.stringify(env.PROJECT_ID),
            STORAGE_BUCKET_FIREBASE: JSON.stringify(env.STORAGE_BUCKET_FIREBASE),
            MESSAGING_SENDER_ID: JSON.stringify(env.MESSAGING_SENDER_ID),
            APP_ID: JSON.stringify(env.APP_ID),
        }
    }
}
