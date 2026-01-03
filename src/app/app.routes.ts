import { Routes, CanActivateFn } from '@angular/router';
import { Login } from './login/login';
// Simple auth guard
export const authGuard: CanActivateFn = () => {
	return !!localStorage.getItem('auth_token');
};
import { Dashboard } from './dashboard/dashboard';
import { Uers } from './uers/uers';
import { SetUp } from './set-up/set-up';

import { Schedule } from './schedule/schedule';

import { Student } from './student/student';

import { Class } from './class/class';
import { Lecturer } from './lecturer/lecturer';

import { Setting } from './setting/setting';
import { UserLog } from './user-log/user-log';
import { RollUser } from './roll-user/roll-user';
import { Developer } from './developer/developer';
import { Major } from './major/major';

export const routes: Routes = [
	{ path: 'login', component: Login },
	{ path: '', component: Dashboard, canActivate: [authGuard] },
	{ path: 'uers', component: Uers, canActivate: [authGuard] },
	{ 
		path: 'setup', 
		component: SetUp,
		canActivate: [authGuard],
		children: [
			{ path: 'schedule', component: Schedule },
			{ path: 'student', component: Student },
			{ path: 'class', component: Class },
			{ path: 'lecturer', component: Lecturer },
			{path:	'major', component: Major},
			{ path: '', redirectTo: 'schedule', pathMatch: 'full' }
		]
	},
	{
		path: 'setting',
		component: Setting,
		canActivate: [authGuard],
		children: [
			{ path: 'user-log', component: UserLog },
			{ path: 'roll-user', component: RollUser },
			{ path: '', redirectTo: 'user-log', pathMatch: 'full' }
		]
	},
	{ path: 'developer', component: Developer, canActivate: [authGuard] },
	{ path: '**', redirectTo: '' },
];
