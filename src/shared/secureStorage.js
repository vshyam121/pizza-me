import SecureStorage from 'secure-web-storage';
const CryptoJS = require('crypto-js');

const SECRET_KEY = process.env.REACT_APP_SECURE_WEB_STORAGE_SECRET_KEY;

/* decrypt and encrypt data to/from local storage using the provided secret key */
export const secureStorage = new SecureStorage(localStorage, {
  hash: function hash(key) {
    key = CryptoJS.SHA256(key, SECRET_KEY);

    return key.toString();
  },
  encrypt: function encrypt(data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);

    data = data.toString();

    return data;
  },
  decrypt: function decrypt(data) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);

    data = data.toString(CryptoJS.enc.Utf8);

    return data;
  },
});
