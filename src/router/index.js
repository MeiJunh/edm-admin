import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 首页不需要修改
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/edm',
    name: 'edm',
    meta: {
      icon: 'logo-buffer',
      title: 'edm处理'
    },
    component: Layout,
    children: [
      {
        path: 'gbrs_archive_list',
        name: '干部人事档案信息列表',
        meta: {
          icon: 'logo-buffer',
          title: '干部人事档案信息列表'
        },
        component: () => import('@/views/archive/ren_shi_dang_an.vue')
      }, {
        path: 'ldry_archive_list',
        name: '流动人员人事档案',
        meta: {
          icon: 'logo-buffer',
          title: '流动人员人事档案'
        },
        component: () => import('@/views/archive/liu_dong_ren_yuan.vue')
      }, {
        path: 'ajj_archive_list',
        name: '案卷级档案',
        meta: {
          icon: 'logo-buffer',
          title: '案卷级档案'
        },
        component: () => import('@/views/archive/an_juan_ji.vue')
      }, {
        path: 'wjj_archive_list',
        name: '文件级档案',
        meta: {
          icon: 'logo-buffer',
          title: '文件级档案'
        },
        component: () => import('@/views/archive/wen_jian_ji.vue')
      }, {
        path: 'fyss_archive_list',
        name: '法院诉讼档案',
        meta: {
          icon: 'logo-buffer',
          title: '法院诉讼档案'
        },
        component: () => import('@/views/archive/fa_yuan_su_song.vue')
      }, {
        path: 'bdc_archive_list',
        name: '不动产档案',
        meta: {
          icon: 'logo-buffer',
          title: '不动产档案'
        },
        component: () => import('@/views/archive/bu_dong_chan.vue')
      }
    ]
  },
  {
    path: '/edm_tool',
    name: '实用工具',
    meta: {
      icon: 'logo-buffer',
      title: '实用工具'
    },
    component: Layout,
    children: [
      {
        path: 'file_path',
        name: '获取文件路径',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '获取文件路径'
        },
        component: () => import('@/views/tools/file_path.vue')
      }, {
        path: 'copy_move_file',
        name: '文件拷贝/迁移',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '文件拷贝/迁移'
        },
        component: () => import('@/views/tools/copy_or_move_file.vue')
      },
      {
        path: 'img_format_trans',
        name: '图片格式转化',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '图片格式转化'
        },
        component: () => import('@/views/tools/img_format_trans.vue')
      }, {
        path: 'pdf',
        name: 'pdf相关工具',
        meta: {
          access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: 'pdf相关工具'
        },
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        children: [
          {
            path: 'mergePdfDir',
            name: 'pdf合并',
            meta: {
              icon: 'md-funnel',
              title: 'pdf合并'
            },
            component: () => import('@/views/tools/pdf_merge.vue')
          },
          {
            path: 'removePdf',
            name: 'pdf截取',
            meta: {
              icon: 'md-funnel',
              title: 'pdf截取'
            },
            component: () => import('@/views/tools/pdf_remove.vue')
          }, {
            path: 'replacePdf',
            name: 'pdf替换',
            meta: {
              icon: 'md-funnel',
              title: 'pdf替换'
            },
            component: () => import('@/views/tools/pdf_replace.vue')
          }]
      }]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: {title: 'Example', icon: 'el-icon-s-help'},
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: {title: 'Table', icon: 'table'}
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: {title: 'Tree', icon: 'tree'}
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'el-form',
  //       component: () => import('@/views/form/index'),
  //       meta: {title: 'el-form', icon: 'form'}
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: {title: 'Menu1'},
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: {title: 'Menu1-1'}
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: {title: 'Menu1-2'},
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: {title: 'Menu1-2-1'}
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: {title: 'Menu1-2-2'}
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: {title: 'Menu1-3'}
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: {title: 'menu2'}
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: {title: 'External Link', icon: 'link'}
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
