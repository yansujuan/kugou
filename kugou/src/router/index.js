import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router=new VueRouter({
	routes:[{
				path:"/index",
				component:require('../views/index')
			},
			{
				path:"/rank",
				component:require('../views/rank')
			},
			{
				path:'/rank/info/:id',
				component:require('../views/rank_info')	
			},
			{
				path:'/plist',
				component:require('../views/plist')
			},
			{
				path:'/plist/info/:id',
				component:require('../views/plist_info')
			},
			{
				path:'/singer',
				component:require('../views/singer')
			},
			{
				path:'/singer/list/:id',
				component:require('../views/singer_list')
			},
			{
				path:'/singer/info/:id',
				component:require('../views/singer_info')
			},
			{
				path:'/ringtone',
				component:require('../views/ringtone')
			},
			{
				path:'/search',
				component:require('../views/search')
			},
			{
				path:'*',redirect:'/index'
			}
	]
})
export default router;