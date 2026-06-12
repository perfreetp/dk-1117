export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/voice/index',
    'pages/hot/index',
    'pages/task/index',
    'pages/settings/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fdf2f8',
    navigationBarTitleText: '今日崩溃',
    navigationBarTextStyle: 'black',
    backgroundColor: '#fdf2f8'
  },
  tabBar: {
    color: '#9ca3af',
    selectedColor: '#e879f9',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '群组'
      },
      {
        pagePath: 'pages/voice/index',
        text: '发声'
      },
      {
        pagePath: 'pages/hot/index',
        text: '热度'
      },
      {
        pagePath: 'pages/task/index',
        text: '任务'
      },
      {
        pagePath: 'pages/settings/index',
        text: '设置'
      }
    ]
  }
})
