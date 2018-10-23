let getStringValue = (keys, item) => {
    if (keys.length > 0) {
      let value = item[keys[0]]
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return value
      } else {
        keys.splice(0, 1)
        return getStringValue(keys, value)
      }
    }
  }
  
  let translateTitle = (key, item) => {
    if (!key || key.length === 0) {
      return ''
    }
    if (key.indexOf('{') > -1) {
      return key.replace(/{[\w.]+}/g, function (word) {
        let keys = word.substr(1, word.length - 2).split('.')
        return getStringValue(keys, item)
      })
    }
    return key
  }
  
  let deepCopy = (dst, ori) => {
    let keys = Object.keys(ori)
    keys.forEach((key) => {
      if (typeof ori[key] === 'object') {
        if (Array.isArray(ori[key])) {
          if (!Array.isArray(dst[key])) {
            dst[key] = []
            ori[key].forEach((el) => {
              dst[key].push(deepCopy({}, el))
            })
          } else {
            ori[key].forEach((el, index) => {
              deepCopy(dst[key][index], el)
            })
          }
        }
        else if (ori[key] !== null) {
          dst[key] = {}
          deepCopy(dst[key], ori[key])
        } else {
          dst[key] = null
        }
      } else if (typeof ori[key] === 'function') {
        // do nothing
      } else {
        if (typeof dst === 'undefined') {
          console.info(dst, ori)
        }
        dst[key] = ori[key]
      }
    })
    return dst
  }

  export default {
    translateTitle,
    deepCopy
  }
  