/**
 * @param {*} genresMostListenedOfUser 
 * @returns 
 */
export function calculateGenreCounts(genresMostListenedOfUser) {
    return genresMostListenedOfUser.reduce(
        (previous, current) => (previous[current] = previous[current] + 1 || 1, previous), {}
    )
}

/**
 * @param {*} genres 
 * @param {*} genreToConvert 
 * @returns { number }
 */
export function getPercentageGenres(genres, genreToConvert) {
    const values = Object.values(genres)
    const totalValuesOfGenres = values.reduce((previousValue, value) => previousValue + value)

    return Math.round((genres[genreToConvert] / totalValuesOfGenres) * 100)
}