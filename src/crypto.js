import CryptoJS from 'crypto-js'
import * as sm from 'sm-crypto'
const { sm2 } = sm

const AES = {
    /**
     * 对字符串加密
     * @param str 加密字符
     * @param key 加密解密密钥
     * @param cfg 加密配置
     * @returns {*}
     */
    encrypt (str, key, cfg = {}) {
        return CryptoJS.AES.encrypt(str, CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
            ...cfg
        })
    },
    /**
     * 对字符串解密
     * @param encryptedStr 待解密字符
     * @param key 解密密钥
     * @returns {string} 解密后的字符
     */
    decrypt (encryptedStr, key) {
        const encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedStr)
        const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
        const decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        })
        return decryptedData.toString(CryptoJS.enc.Utf8)
    }
}

const SM2 = {
    prefix: '',
    doEncrypt (str, publicKey, mode = 1, prefix = '04') {
        this.prefix = prefix
        return prefix + sm2.doEncrypt(str, publicKey, mode)
    },
    doDecrypt (encryptData, privateKey, mode) {
        return sm2.doDecrypt(encryptData.substring(this.prefix.length), privateKey, mode)
    }
}
export default {
    AES,
    SM2
}
