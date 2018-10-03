import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home'
import AdminSurveyList from './components/AdminSurveyList'
import Survey from './components/Survey'
import UserSurveyList from './components/UserSurveyList'
import Result from './components/Result'
import UserList from './components/UserList'

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/admin/survey'
		},
		{
			path: '/admin',
			name: 'Admin',
			component: Home,
			children: [
				{
					path: 'survey',
					name: 'AdminSurvey',
					component: AdminSurveyList
				},
				{
					path: 'survey/:id',
					name: 'AdminSurveyDetails',
					component: Survey
				}
			]
		},
		{
			path: '/user',
			component: Home,
			children: [
				{
					path: '',
					name: 'User',
					component: UserList,
				},
				{
					path: ':userId/survey/:id',
					name: 'UserSurveyDetails',
					component: Result
				},
				{
					path: ':userId/survey',
					name: 'UserSurveyList',
					component: UserSurveyList
				}
			]
		}
	],
	scrollBehavior() {
		return { x: 0, y: 0 }
	}
})