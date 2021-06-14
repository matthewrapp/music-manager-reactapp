import { Redirect } from "react-router-dom";

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

export const eraseCookie = async (cookie) => {
    let cookieName = cookie.split('=')[0];
    document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    return
}