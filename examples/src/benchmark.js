const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()
const { performance } = require('perf_hooks')
const R = require('ramda')
const mkEntry = require('./generate-rows')

var quickSort = (function () {
    function partition(fn, array, left, right) {
        var cmp = fn(array[right - 1])
        var minEnd = left
        var maxEnd = left

        for (maxEnd = left; maxEnd < right - 1; maxEnd += 1) {
            if (fn(array[maxEnd]) <= cmp) {
                swap(array, maxEnd, minEnd)
                minEnd += 1
            }
        }
        swap(array, minEnd, right - 1)
        return minEnd
    }

    function swap(array, i, j) {
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
        return array
    }

    function quickSort(fn, array, left, right) {
        if (left < right) {
            var p = partition(fn, array, left, right)
            quickSort(fn, array, left, p)
            quickSort(fn, array, p + 1, right)
        }
        return array
    }

    return function (fn, array) {
        return quickSort(fn, array, 0, array.length)
    }
}())

const rows = new Array(5000).fill(0).map(mkEntry)
const propDessert = R.prop('dessert')

suite
  .add('sortBy', function() {
    R.sortBy(propDessert, rows)
  })
  .add('quickSort', function() {
    quickSort(propDessert, rows)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is:' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
