import React from 'react'
import { f7, f7ready, App, View } from 'framework7-react'

import routes from '../js/routes'
import { requestMotion, sendMovementsUser } from '../js/movement'

const MyApp = () => {

    const f7params = {
        name: 'Recommandation playlist musicale',
        theme: 'auto',
        darkMode: true,
        colors: {
            primary: '#400073',
        },

        routes: routes,

        // Register service worker (only on production build)
        serviceWorker: process.env.NODE_ENV ==='production' ? {
            path: '/service-worker.js',
        } : {},
    }

    f7ready(() => {
        f7.on('click', () => {
            requestMotion()
        })
        setInterval(async () => {
            await sendMovementsUser(f7)
        // }, 30000)
        // }, 1200000)
        }, 120000)
    })

    return (
        <App { ...f7params }>
            {/* view-main */}
            <View main className="safe-areas" url="/" />
        </App>
    )
}
export default MyApp