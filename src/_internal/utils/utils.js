// @flow

// Monadic Operations
// alias: chain, fmap, bind
export const chain = (f) => (x) => [].concat.apply([], map(f)(x))
export const compose = (...fns) => (...args) => fns.reduceRight((acc, fn) => fn(acc), ...args)
export const pipe = (...fns) => (...args) => fns.reduce((acc, fn) => fn(acc), ...args)
// alias id, const, constant,
export const identity = (x) => x
// alias: perform, run
// alias: append, concat
// alias: mapTails, cobind, cofmap
// alias: tails, cojoin
// alias: head, copure, extract
// alias: concatMap, andThen
// alias: orSome, orJust
// alias: some, just
// alias: isNone, isNothing
// alias: isSome, isJust
// alias: unit, pure, of, return

export const map = (f) => (arr) => arr.map(f)

export const isEmpty = (x: mixed): boolean => x === '' || x === undefined || x === null
export const noop = () => {}
export const join = (val) => (str) => str.join(val)
export const log = (name) => (x) => console.log(name, x) || x

// Math
export const mean = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length

// React
export const getDisplayName = (x) => x.displayName || x.name || x.type
