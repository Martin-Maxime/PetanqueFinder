import Api from '@/services/Api';
import decode from 'jwt-decode';
import Router from 'vue-router';
const TOKEN_KEY = 'user-token';
const USER_INFOS = 'user-infos';

export default {
	checkLogin(params) {
		return Api().post('login', params)
	}
}

export function logout() {
	clearIdToken();
	clearUserInfos();
	Router.go('/');
}

export function getIdToken() {
	return localStorage.getItem(TOKEN_KEY);
}

function clearIdToken() {
	localStorage.removeItem(TOKEN_KEY);
}

function clearUserInfos() {
	localStorage.removeItem(USER_INFOS);
}

export function isLoggedIn() {
	const idToken = getIdToken();
	return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
	const token = decode(encodedToken);
	if (!token.exp) { return null; }

	const date = new Date(0);
	date.setUTCSeconds(token.exp);

	return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}