import _ from 'lodash'

export default function toCamelCaseKey(obj) {
  return _.mapKeys(obj, (_v, k) => _.camelCase(k))
}
