const template = require('./user-profile.html');

export const UserProfileComponent = {
  template,
  controller: class UserProfileComponent {
    constructor(Auth, UsersService, $window) {
      'ngInject';

      this.Auth = Auth;
      this.UsersService = UsersService;
      this.$window = $window;
    }
    $onInit() {
      this.profile = this.Auth.getLoggedUser();
      this._profile = Object.assign({}, this.profile);
    }
    updateEmail(e) {
      if (e.keyCode === 13) {
        this.emailEdit = false;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.profile.email)) { // eslint-disable-line
          const data = {
            id: this.profile.id,
            email: this.profile.email
          };

          this.UsersService.updateEmail(data);
        } else {
          this.profile.email = this._profile.email;
        }
      }
    }
    updatePassword() {
      const req = this.$window.confirm('Do you want to reset the password');
      if (!req) {
        return;
      }
      const data = {
        id: this.profile.id,
        password: this.user.password
      };
      this.UsersService.updatePassword(data);
    }
  }
};
