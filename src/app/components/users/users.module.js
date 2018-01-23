import angular from 'angular';

import {UsersComponent} from './users.component';
import {UserFormComponent} from './user-form/user-form.component';
import {login} from './login/login.component';

import {AuthService} from './auth.service';
import UsersService from './users.service';

import {UserProfileComponent} from './user-profile/user-profile.component';

import {logout} from './logout.component';

angular
  .module('wsApp.users', [])
  .component('users', UsersComponent)
  .component('userForm', UserFormComponent)
  .component('login', login)
  .component('userProfile', UserProfileComponent)
  .component('logout', logout)
  .service('Auth', AuthService)
  .service('UsersService', UsersService);
