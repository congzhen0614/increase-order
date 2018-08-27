/**
 * Created by abc on 2018/8/27.
 */
import md5 from 'crypto-js/md5'

export function getMd5 (mobile) {
  let salt = `@te3,d587%fikl;;=23+go666`
  return md5(mobile + salt).toString()
}
