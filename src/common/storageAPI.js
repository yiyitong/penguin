
let addKeyToStorage = (key, value) => {
    localStorage[key] = value
}

const delKeyfromStorage = (key) => {
    localStorage.removeItem(key)
}

const getValueFromStorage = (key) => {
    return localStorage.getItem(key)
}

export default {
    addKeyToStorage,
    delKeyfromStorage,
    getValueFromStorage
}