import Framework7 from "framework7/bundle"

/**
 * @param { Framework7 } f7
 * @param { string } playlist
 * @returns { void }
 */
export function sendNotificationForRecommendation(f7, playlist) {

    let notificationWithButton = null
    if (!notificationWithButton) {

        notificationWithButton = f7.notification.create({
            icon: '<i class="f7-icons">music_albums</i>',
            title: 'PULSE PLAY',
            subtitle: 'Veuillez voire votre playlist en cliquent ici.',
            text: 'Cliquer sur (x) pour fermer la notification',
            closeButton: true,
            on: {
                close: function () {
                    f7.view.main.router.navigate({ name: 'playlist-recommended',  params: { playlist: playlist }})
                }
            }
        });
    }
    notificationWithButton.open()
}
