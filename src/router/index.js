import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Policy from '@/pages/policy'
import Regim from '@/pages/regime'
import Mien from '@/pages/mien'
import Example from '@/pages/example'
import Mien_details from '@/pages/mien_details'
import Directories from '@/pages/directories'
import Directories_details from '@/pages/directories_details'
import Article from '@/pages/article'
import Organization from '@/pages/organization'
import Errorpage from '@/pages/error'
import Study from '@/pages/Study'
import Study_details from '@/pages/study_details'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/policy',
      name: 'policy',
      component: Policy
    },
    {
      path: '/policy/:id',
      name: 'policy_details',
      component: Article
    },
    {
      path:'/Regim',
      name:'regim',
      component:Regim
    },
    {
      path:'/Regim/:id',
      name:'regim_details',
      component:Article
    },
    {
      path:'/Mien',
      name:'mien',
      component:Mien,
      
    },
    {
      path:'/Example',
      name:'example',
      component:Example
    },
    {
      path:'/Example/:id',
      name:'example_details',
      component:Article
    },
    {
      path:'/Mien_details/:id',
      name:'mien_details',
      component:Article
    },
    {
      path:'/Directories',
      name:'directories',
      component:Directories
    },
    {
      path:'/Directories_details/:id',
      name:'directories_details',
      component:Directories_details
    },
    {
      path:'/Organization',
      name:'organization',
      component:Organization
    },
    {
      path:'/Study',
      name:'study',
      component:Study
    },
    {
      path:'/Study_details/:id',
      name:'study_details',
      component:Study_details
    },
    {
      path:'*',
      name:'error',
      component:Errorpage
    }
  ]
})
