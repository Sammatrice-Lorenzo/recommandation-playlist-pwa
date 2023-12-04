
/**
 * @param { string } url 
 * @returns { URL }
 */
export function getUrl(url)
{
    return new URL(url, API_URL)
}