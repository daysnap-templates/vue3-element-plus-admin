import { LayoutView } from '@/layout'
import { PD } from '@/stores'

import { defineRoutes } from '../defineRoutes'

export default defineRoutes([
  {
    path: '/syp',
    redirect: '/syp/merchant',
    component: LayoutView,
    name: 'SYP',
    meta: { title: '私域拍', icon: 'icon-siyupai' },
    children: [
      {
        path: '/syp/merchant',
        name: 'MerchantManageView',
        component: () => import('@/views/syp/merchant-manage/MerchantManageView.vue'),
        meta: { title: '商户管理', icon: 'icon-shanghuguanli', pd: PD.syp.member.list },
      },
      {
        path: '/syp/assess-examine',
        name: 'AssessExamineView',
        component: () => import('@/views/syp/assess-examine/AssessExamineView.vue'),
        meta: { title: '评估审核', icon: 'icon-pinggushenhe', pd: PD.syp.audit.list },
      },
      {
        path: '/syp/auction-manage',
        name: 'AuctionManageView',
        component: () => import('@/views/syp/auction-manage/AuctionManageView.vue'),
        meta: { title: '拍卖会管理', icon: 'icon-paimaihuiguanli', pd: PD.syp.auction.list },
      },
      {
        path: '/syp/auction-manage/auction-detail/:id',
        name: 'AuctionManageDetailView',
        component: () => import('@/views/syp/auction-manage/AuctionManageDetailView.vue'),
        hidden: true,
        meta: {
          title: '拍卖会详情',
          activePath: '/syp/auction-manage',
          pd: PD.syp.auction.detail,
        },
      },
      {
        path: '/syp/auction-manage/lot-setting/:id',
        name: 'AuctionManageLotSettingView',
        component: () => import('@/views/syp/auction-manage/AuctionManageLotSettingView.vue'),
        hidden: true,
        meta: {
          title: '拍品设置',
          activePath: '/syp/auction-manage',
          pd: PD.syp.auction.av.setting,
        },
      },
      {
        path: '/syp/auction-manage/lot-detail/:id',
        name: 'AuctionManageLotDetailView',
        component: () => import('@/views/syp/auction-manage/AuctionManageLotDetailView.vue'),
        hidden: true,
        meta: {
          title: '拍品详情',
          activePath: '/syp/auction-manage',
          pd: PD.syp.auction.av.detail,
        },
      },
      {
        path: '/syp/lot-manage',
        name: 'LotManageView',
        component: () => import('@/views/syp/lot-manage/LotManageView.vue'),
        meta: { title: '拍品管理', icon: 'icon-paipinguanli', pd: PD.syp.av.list },
      },
      {
        path: '/syp/order-manage',
        name: 'OrderManageView',
        component: () => import('@/views/syp/order-manage/OrderManageView.vue'),
        meta: {
          title: '订单管理',
          icon: 'icon-dingdanguanli',
          pd: PD.syp.order.list,
        },
      },
      {
        path: '/syp/data-report',
        name: 'DataReportView',
        component: () => import('@/views/syp/data-report/DataReportView.vue'),
        meta: { title: '数据报表', icon: 'icon-shujubaobiao', pd: PD.syp.report.list },
      },
    ],
  },
])
