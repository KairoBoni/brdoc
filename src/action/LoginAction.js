export const tryLogEmail = (usr, pass) => {
    return {
        type: "LOGON_EMAIL",
        usr: usr,
        pass: pass,
    }
}

export const tryLogFB = () => {
    return {
        type: "LOGON_FB",
    }
}

export const registerPress = () => {
    return {
        type: "REGISTER",
    }
}
