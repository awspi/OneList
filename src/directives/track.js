import { TRIGGER_TYPE_BROWSE, TRIGGER_TYPE_CLICK } from '@/constants'
export default {
  //? 在绑定元素的父组件被挂载后调用
  //value：指令的绑定值
  mounted(el, binding) {
    if (binding.value) {
      const params = {
        currentUrl: binding.value.currentUrl,
        actionType: binding.value.actionType,
        triggerType: binding.value.triggerType,
        behavior: binding.value.behavior
      }
      //* 触发类型为浏览->直接打印
      if (binding.value.triggerType === TRIGGER_TYPE_BROWSE) {
        console.log(`tracker:  ${JSON.stringify(params)}`)
      }
      //* 触发类型为点击->点击后打印
      if (binding.value.triggerType === TRIGGER_TYPE_CLICK) {
        el.addEventListener(
          'click',
          () => console.log(`tracker:  ${JSON.stringify(params)}`),
          false
        )
      }
    }
  }
}
