// otp.js
import base32 from 'base-32';
import CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';

const normalize = (key) => {
  let k2 = key.trim().replace(/ /g, '');
  if (k2.length % 8 !== 0) {
    k2 += '='.repeat(8 - (k2.length % 8));
  }
  return k2;
};

const prefix0 = (h) => {
  if (h.length < 6) {
    h = '0'.repeat(6 - h.length) + h;
  }
  return h;
};

const getHOTPToken = (secret, intervalsNo) => {
  const key = Buffer.from(base32.decode(normalize(secret)), 'binary');
  const msg = Buffer.alloc(8);
  msg.writeUInt32BE(Math.floor(intervalsNo / Math.pow(2, 32)), 0);
  msg.writeUInt32BE(intervalsNo % Math.pow(2, 32), 4);

  const hmac = CryptoJS.HmacSHA1(CryptoJS.enc.Hex.parse(msg.toString('hex')), CryptoJS.enc.Hex.parse(key.toString('hex')));
  const h = hmac.toString(CryptoJS.enc.Hex);
  const offset = parseInt(h.substring(h.length - 1), 16);
  const part = h.substring(offset * 2, offset * 2 + 8);
  const token = (parseInt(part, 16) & 0x7fffffff) % 1000000;
  return prefix0(token.toString());
};

const getTOTPToken = (secret) => {
  const intervalsNo = Math.floor(Date.now() / 1000 / 30);
  return getHOTPToken(secret, intervalsNo);
};

export { getTOTPToken };
