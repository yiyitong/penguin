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
  
  export default {
    translateTitle
  }
  