/**
 * 头部导航
 */
export const menuData = [
  {
    href: 'index.html',
    name: '首页'
  },
  {
    href: 'news.html',
    name: '新闻中心'
  },
  {
    href: 'service.html',
    name: '在线服务',
    children: [
      {
        href: '',
        name: '干线船期查询'
      },
      {
        href: '',
        name: '支线船期查询'
      },
      {
        href: '',
        name: '空箱箱源查询'
      },
      {
        href: '',
        name: '进口物流通关跟踪'
      },
      {
        href: '',
        name: '出口物流通关跟踪'
      }
    ]
  },
  {
    href: 'about.html',
    name: '关于我们'
  },
  {
    href: '###',
    name: '联系我们'
  },
  {
    href: '###',
    name: '帮助中心'
  }
]

/**
 * 首页服务列表
 */
export const services = [
  {
    name: '信息查询',
    icon: 'filesearch',
    links: [
      {
        href: '###',
        name: '干线船期查询'
      },
      {
        href: '###',
        name: '支线船期查询'
      },
      {
        href: '###',
        name: '空箱箱源查询'
      }
    ]
  },
  {
    name: '物流跟踪',
    icon: 'location',
    links: [
      {
        href: '###',
        name: '进口物流通关跟踪'
      },
      {
        href: '###',
        name: '出口物流通关跟踪'
      }
    ]
  }
]

/**
 * 内页banner
 */
export const banner = {
  about: ''
}