export const authCookie = async (docCookies) => {
    let authenticationCookie;
    await docCookies.split('; ').forEach(cookie => {
        if (cookie.split('=')[0].trim() === 'auth') {
            authenticationCookie = cookie;
        } else {
            return new Error('No Authentication Cookie')
        }
    });

    return authenticationCookie;
}

export const artistIdCookie = async (docCookies) => {
    let artistIdCookie;
    await docCookies.split('; ').forEach(cookie => {
        if (cookie.trim().split('=')[0] === 'artistId') {
            artistIdCookie = cookie;
        } else {
            return new Error('No Artist Cookie')
        }
    })

    return artistIdCookie
}