export const authCookie = (docCookies) => {
    return docCookies.split('; ').find(cookie => {
        if (cookie.split('=')[0].trim() === 'auth') {
            return cookie
        }
    })
}

export const artistIdCookie = (docCookies) => {
    return docCookies.split('; ').find(cookie => {
        if (cookie.trim().split('=')[0] === 'artistId') {
            return cookie
        }
    })
}