// 时间格式化
const formatDate = function (date, fmt, def) {
  if (date === undefined || date === null) {
    return def
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

const formatLongToDate = function (milliseconds, fmt, def) {
  if (milliseconds === undefined || milliseconds === null || milliseconds < 1) {
    return def
  }
  return formatDate(new Date(milliseconds), fmt, def)
}

const getNowSecondTimestamp = function getNowSecondTimestamp () {
  return Math.trunc(new Date().valueOf() / 1000)
}

const getDateSecondTimestamp = function getDateSecondTimestamp (dt) {
  return Math.trunc(dt.valueOf() / 1000)
}

const transDBTimeToFormatDate = function (dbTimestamp, fmt, def) {
  if (dbTimestamp === undefined || dbTimestamp === null || dbTimestamp === '') {
    return def
  }

  return formatDate(new Date(dbTimestamp), fmt, def)
}

export default {
  formatDate: formatDate,
  formatLongToDate: formatLongToDate,
  getNowSecondTimestamp: getNowSecondTimestamp,
  getDateSecondTimestamp: getDateSecondTimestamp,
  transDBTimeToFormatDate: transDBTimeToFormatDate
}
