var robin191 = {
  compact: function (ary) {
    return ary.filter(it => it)
  },
}

var robin191 = {
  difference: function (ary, ...value) {
    var result = []
    for (var i = 0; i < ary.length; i++) {
      result.push(ary[i])

    }
    for (var j = 0; j < arguments.length; i++) {
      result = result.filter(item => !arguments[i].includs(item))
    }
    return result
  },
}

var robin191 = {
  dorp: function (ary,number) {
    return ary.slice(number,ary.length)
  },
}

var robin191 = {
  dorpRight: function (ary,number) {
    for (var i = 0;i < number;i++) {
      return ary.pop()
    }
  },
}

var robin191 = {
  flatten: function (ary) {
    var result = []
    for (var item of ary) {
      if (Array.isArray(item)) {
        for (var val of item) {
          result.push(val)
        }
      } else {
        result.push(item)
      }
    }
    return result
  },
}

var robin191 = {
  flattenDeep: function (ary) {
    var result = []
    for (var item of ary) {
      if (Array.isArray(item)) {
        var flattedItem = flattenDeep(item)
        result.push(...flattedItem)
      } else {
        result.push(item)
      }
    }
    return result
  },
}

var robin191 = {
  flattenDepth: function (ary, depth = 1) {
    if (depth == 0) {
      return ary.slice()
    }
    var result = []
    for (var item of ary) {
      if (Array.isArray(item)) {
        var flattedItem = flattenDepth(item, depth - 1)
        result.push(...flattedItem)
      } else {
        result.push(item)
      }
    }
    return result
  },
}

