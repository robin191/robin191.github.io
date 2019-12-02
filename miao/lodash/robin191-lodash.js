var robin191 = {
  chunk: function (ary,number) {
    var array = []
    var len = ary.length
    if (len <= 1) {
      return ary
    }
    for(let i= 0; i < Math.ceil(ary.len / number); i++) {
      let ary = array.slice(0,number - 1)
      array.push(ary)
      array.splice(0,number - 1)
    }
    return array
  },

  compact: function (ary) {
    return ary.filter(it => it)
  },

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

  differenceBy: function (array,values,predicate) {
    let predicate = iteratee(predicate)
  },

  dorp: function (ary,number) {
    return ary.slice(number,ary.length)
  },

  dorpRight: function (ary,number) {
    for (var i = 0;i < number;i++) {
      return ary.pop()
    }
  },

  dropRightWhile: function () {
    
  },

  fill: function (ary,value,start,end) {
    for (var i = start; i <= end ;i++) {
      arr[i] = value
    }
    return ary
  },

  findIndex: function(array,predicate,start = 0) {
    let predicate = iteratee(predicate)
    for(let i = 0;i < array.length;i++) {
      if(predicate(array[i])) {
        return i
      }
    }
    return -1
  },

  findLastIndex: function(array,predicate,fromIndex=array.length-1) {
    let predicate = iteratee(predicate)
    for(let i = array.length-1;i >= 0;i--) {
      if(predicate(array[i])){ 
        return i
      }
    }
    return -1
  },

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

  head: function (ary) {
    if (ary.length == 0) {
      return undefined
    }
    return ary[0]
  },

  indexOf: function (ary, value, fromIndex = 0) {
    for(var i = fromIndex;i < ary.length;i++) {
     if(ary[i] == value) {
       return i
     }
    }
    return -1
   },

  initial: function (ary) {
    return ary.slice(0,ary.length - 1)
  },

  intersection: function (ary) {
    return ary.slice(0,ary.length - 1)
  },

  jion: function (ary,separator) {
    var res = ary[0]
    for (var i = 1;i < ary.length;i++) {
      res += separator + ary[i].toString()
    }

    return res
  },

  last: function (ary) {
    return ary[ary.length - 1]
  },

  lastIndexOf: function (ary,value,fromIndex) {
   for(let i = ary.length - 1;i >0;i--) {
     if(ary[i] == value) {
       return i
     }
   }
   return -1
  },

  pull: function (ary,value) {
    for(let i = 0;i < ary.length;i++) {
      if(ary[i] == value) {
        ary.splice(i,1)
        i--
      }
    }
    return ary
  },

  reverse: function (ary) {
    let number = ary.length
    for(let i = 0;i < Math.ceil(number / 2) ;i++) {
      let temp = ary[i]
      ary[i] = ary[number - 1]
      ary[number - 1] = temp
      number--
    }
    return ary
  },

  sortedIndex: function (ary,value) {
    var  last = ary.length
    var  start = 0
    var  mid = Math.floor((last + start) / 2)
    
    while(start < last) {
      
      if(ary[mid] >= value) {
        last = mid
      }else{
        start = mid + 1
      }
    }
    return start
  },

  union: function (...ary) {
    var arys = flattenDeep(ary)
    var res = []
    for(var it of arys) {
      if(!res.includs(it)) {
        res.push(it)
      }
    }
    return res
  },

  unionBy: function (ary) {
    return ary.slice(0,ary.length - 1)
  },

  unzip: function (ary) {
    return ary.slice(0,ary.length - 1)
  },

  without: function (ary) {
    return ary.slice(0,ary.length - 1)
  },

  xor: function (ary) {
    return ary.slice(0,ary.length - 1)
  },

}
