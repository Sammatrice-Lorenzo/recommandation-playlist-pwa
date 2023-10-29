import { removeToken } from "./token"

export function logout () {
    removeToken()
    window.location.reload(true)
}

export function calculateGenreCounts(genresMostListenedOfUser) {
    return genresMostListenedOfUser.reduce(
        (previous, current) => (previous[current] = previous[current] + 1 || 1, previous), {}
    )
}

export function getPercentageGenres(genres, genreToConvert) {
    const values = Object.values(genres)
    const totalValuesOfGenres = values.reduce((previousValue, value) => previousValue + value)

    return Math.round((genres[genreToConvert] / totalValuesOfGenres) * 100)
}