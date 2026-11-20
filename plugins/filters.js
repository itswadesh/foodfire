import Vue from 'vue'
import { currency as currencyConfig } from '~/config'
Vue.filter('currency', function(value, currency, decimals) {
  const digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : currencyConfig.symbol
  decimals = decimals != null ? decimals : 2
  let stringified = Math.abs(value).toFixed(decimals)
  let _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  let i = _int.length % 3
  let head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
  let _float = decimals ? stringified.slice(-1 - decimals) : ''
  let sign = value < 0 ? '-' : ''
  return (
    sign +
    currency +
    ' ' +
    head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
  )
})
Vue.filter('ago', function(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return ~~(between / 60) + ' minutes'
  } else if (between < 86400) {
    return ~~(between / 3600) + ' hours'
  } else {
    return ~~(between / 86400) + ' days'
  }
})
