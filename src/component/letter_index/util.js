import _ from 'lodash'

const letterList = _.map(_.range(65, 91), v => String.fromCharCode(v))

function data2Group (data, getFirstLetter) {
  const flMap = {}

  _.each(data, v => {
    const fl = getFirstLetter(v.text)[0].toUpperCase()

    if (!letterList.includes(fl)) {
      if (!flMap['#']) {
        flMap['#'] = [v]
      } else {
        flMap['#'].push(v)
      }

      return
    }

    if (!flMap[fl]) {
      flMap[fl] = [v]
    } else {
      flMap[fl].push(v)
    }
  })

  const gData = _.groupBy(data, v => getFirstLetter(v.text)[0].toUpperCase())
  const result = []

  _.each(letterList, v => {
    if (gData[v]) {
      result.push({
        label: v,
        children: gData[v]
      })
    }
  })

  return result
}

export {
  letterList,
  data2Group
}
