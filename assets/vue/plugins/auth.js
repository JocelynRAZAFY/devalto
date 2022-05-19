import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const BgcKey = 'Bgc'
const currentPageKey = 'currentPage'
const auth = 'auth'
const fbInfo = 'fb'
const userInfo = 'userInfo'
const pagination = 'page'
const event = 'eventTask'
const Partner = 'partner'
const hubUrl = 'hubUrl'
const userWithoutCurrent = 'userWithoutCurrent'
const article = 'article'
const notifToken = 'notifToken'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function setBgc(bgc) {
    return Cookies.set(BgcKey, bgc)
}

export function getBgc() {
    return Cookies.get(BgcKey)
}

export function setCuPage(currentPage) {
    return Cookies.set(currentPageKey, currentPage)
}

export function getCuPage() {
    return Cookies.get(currentPageKey)
}

export function getIsAuth() {
    return Cookies.get(auth)
}

export function setIsAuth(isAuth) {
    return Cookies.set(auth, isAuth)
}

export function setFb(fb) {
    return Cookies.set(fbInfo, fb)
}

export function getFb() {
    return Cookies.get(fbInfo)
}

export function removeFb() {
    return Cookies.remove(fbInfo)
}

export function setUserInfo(user) {
    return Cookies.set(userInfo, user)
}

export function getUserInfo(user) {
    return Cookies.get(userInfo)
}

export function removeUserInfo() {
    return Cookies.remove(userInfo)
}

export function setPage(page) {
    return Cookies.set(pagination, page)
}

export function getPage() {
    return Cookies.get(pagination)
}

export function removePage() {
    return Cookies.remove(pagination)
}

export function setEvent(eventTask) {
    return Cookies.set(event, eventTask)
}

export function getEvent() {
    return Cookies.get(event)
}

export function removeEvent() {
    return Cookies.remove(event)
}

export function setPartner(partnerId) {
    return Cookies.set(Partner, partnerId)
}

export function getPartner() {
    return Cookies.get(Partner)
}

export function getHubUrl() {
    return Cookies.get(hubUrl)
}

export function setHubUrl(url) {
    return Cookies.set(hubUrl, url)
}

export function removeHubUrl() {
    return Cookies.remove(hubUrl)
}

export function getUserWC() {
    return Cookies.get(userWithoutCurrent)
}

export function setUserWC(user) {
    return Cookies.set(userWithoutCurrent, user)
}

export function removeUserWC() {
    return Cookies.remove(userWithoutCurrent)
}

export function getIdArt() {
    return Cookies.get(article)
}

export function setIdArt(idArticle) {
    return Cookies.set(article, idArticle)
}

export function getNotifToken() {
    return Cookies.get(notifToken)
}

export function setNotifToken(notif) {
    return Cookies.set(notifToken, notif)
}
