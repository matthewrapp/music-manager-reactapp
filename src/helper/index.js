export const authCookie = (docCookies) => {
    return docCookies.split(';').find(cookie => {
        if (cookie.split('=')[0].trim() === 'auth') {
            return cookie
        } else {
            throw new Error('No authentication cookie.');
        }
    })
}