
import * as mobx from 'mobx'
import * as R from 'ramda'

export type ViewModel = {
  columnsLeft: Array<*>,
  columnsRight: Array<*>,
  columns: Array<*>,
}

const isFixedLeftColumn = R.propEq('fixed', 'left')
const isFixedRightColumn = R.propEq('fixed', 'right')
const isNotFixed = R.anyPass([isFixedLeftColumn, isFixedRightColumn])

const mkViewModel = (
  params,
  props,
  context,
) => {
  const elems = {}
  const vm = mobx.observable({
    columnsLeft: mobx.computed(() =>
      R.filter(isFixedLeftColumn, props.columns)
    ),
    columnsRight: mobx.computed(() =>
      R.filter(isFixedRightColumn, props.columns)
    ),
    columns: mobx.computed(() =>
      R.reject(isNotFixed, props.columns)
    ),
    componentDidMount() {
      elems.tableLeft = document.querySelector('.table-inner--left')
      elems.tableLeftContainer = document.querySelector('.fixed-table-left')
      elems.tableCenter = document.querySelector('.table-inner--center')
      elems.tableCenterContainer = document.querySelector('.fixed-table-center')
      elems.tableRight = document.querySelector('.table-inner--right')
      elems.tableRightContainer = document.querySelector('.fixed-table-right')

      elems.scrollTop = null
      elems.scrollLeft = null

      requestAnimationFrame(vm.loop)
    },
    loop() {
      if (
        elems.scrollTop === elems.tableCenter.scrollTop &&
        elems.scrollLeft === elems.tableCenterContainer.scrollLeft
      ) {
        requestAnimationFrame(vm.loop)
      } else {
        elems.scrollTop = elems.tableCenter.scrollTop
        elems.scrollLeft = elems.tableCenterContainer.scrollLeft
        vm.write(vm.read())
        requestAnimationFrame(vm.loop)
      }
    },
    read() {
      const tableCenterContainerWidth = elems.tableCenterContainer.offsetWidth
      const tableLeftContainerContainsShadow = elems.tableLeftContainer.classList.contains('fixed-table-left--box-shadow')
      const tableCenterWidth = elems.tableCenter.offsetWidth
      const tableRightContainerContainsShadow = elems.tableRightContainer.classList.contains('fixed-table-right--box-shadow')

      const shouldAddLeftShadow = elems.scrollLeft > 0 && !tableLeftContainerContainsShadow
      const shouldRemoveLeftShadow = elems.scrollLeft === 0 && tableLeftContainerContainsShadow
      const shouldAddRightShadow = elems.scrollLeft < (tableCenterWidth - tableCenterContainerWidth) && !tableRightContainerContainsShadow
      const shouldRemoveRightShadow = elems.scrollLeft === (tableCenterWidth - tableCenterContainerWidth) && tableRightContainerContainsShadow
      // TODO: maybe use transform instead of scrollTop/scrollLeft?
      // const x = elems.tableLeft.firstChild.firstChild
      // const y = elems.tableRight.firstChild.firstChild

      return { shouldAddLeftShadow, shouldRemoveLeftShadow, shouldAddRightShadow, shouldRemoveRightShadow }
    },
    write({ shouldAddLeftShadow, shouldRemoveLeftShadow, shouldAddRightShadow, shouldRemoveRightShadow }) {
      // x.style.transform = `translate3d(0, ${-elems.scrollTop}px, 0)`
      // y.style.transform = `translate3d(0, ${-elems.scrollTop}px, 0)`
      elems.tableLeft.scrollTop = elems.scrollTop
      elems.tableRight.scrollTop = elems.scrollTop

      if (shouldAddLeftShadow) {
        elems.tableLeftContainer.classList.add('fixed-table-left--box-shadow')
      } else if (shouldRemoveLeftShadow) {
        elems.tableLeftContainer.classList.remove('fixed-table-left--box-shadow')
      }

      if (shouldAddRightShadow) {
        elems.tableRightContainer.classList.add('fixed-table-right--box-shadow')
      } else if (shouldRemoveRightShadow) {
        elems.tableRightContainer.classList.remove('fixed-table-right--box-shadow')
      }
    },
  })

  return vm
}

export default mkViewModel