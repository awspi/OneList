export default {
  //简单访问
  userInfo: (state) => state.user.userInfo, //选中的filter选项
  currentFilter: (state) => state.app.currentFilter, //选中的filter选项
  detailTaskId: (state) => state.app.detailTaskId, //detail页面的id
  token: (state) => state.user.token,
  listTitle: (state) => state.task.listTitle, //title
  task_group_first: (state) => state.task.task_group_first,
  task_group_second: (state) => state.task.task_group_second,
  task_group_third: (state) => state.task.task_group_third,
  task_group_fourth: (state) => state.task.task_group_fourth
}
