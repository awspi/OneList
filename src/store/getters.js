export default {
  //简单访问
  userInfo: (state) => state.user.userInfo, //选中的filter选项
  currentFilter: (state) => state.app.currentFilter, //选中的filter选项
  token: (state) => state.user.token,
  listTitle: (state) => state.task.listTitle, //title
  pro_1: (state) => state.task.pro_1,
  pro_2: (state) => state.task.pro_2,
  pro_3: (state) => state.task.pro_3,
  pro_4: (state) => state.task.pro_4
}
