import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Uers } from './uers/uers';
import { SetUp } from './set-up/set-up';

import { Schedule } from './schedule/schedule';

import { Student } from './student/student';

import { Class } from './class/class';
import { Lecturer } from './lecturer/lecturer';
import { Setting } from './setting/setting';
import { UserLog } from './user-log/user-log';
import { Developer } from './developer/developer';

export const routes: Routes = [
	{ path: '', component: Dashboard },
	{ path: 'uers', component: Uers },
	{ 
		path: 'setup', 
		component: SetUp,
		children: [
			{ path: 'schedule', component: Schedule },
			{ path: 'student', component: Student },
			{ path: 'class', component: Class },
			{ path: 'lecturer', component: Lecturer },
			{ path: '', redirectTo: 'schedule', pathMatch: 'full' }
		]
	},
	{
		path: 'setting',
		component: Setting,
		children: [
			{ path: 'user-log', component: UserLog },
			{ path: '', redirectTo: 'user-log', pathMatch: 'full' }
		]
	},
	{ path: 'developer', component: Developer },
    {path: '**', redirectTo: ''},
];
