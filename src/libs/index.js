import { defineAsyncComponent } from 'vue'
// export { confirm } from './confirm/index'
// export { message } from './message/index'
export default {
  //?vite通用组件自动化注册
  //*vite的glob导入功能->在系统中导入多个模块
  //*defineAsyncComponent按需加载的异步组件
  install(app) {
    //1.遍历当前目录下所有文件夹中的index.vue
    const components = import.meta.glob('./*/index.vue')

    //2.遍历获取到的组件模块
    for (const [fullPath, fn] of Object.entries(components)) {
      const componentName = 'm-' + fullPath.replace('./', '').split('/')[0]
      //3.使用app.component进行注册
      app.component(componentName, defineAsyncComponent(fn))
    }
  }
}
