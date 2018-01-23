const template = require('./users.html');

export const UsersComponent = {
  template,
  controller: class UsersComponent {
    constructor(Auth, UsersService, $uibModal) {
      'ngInject';

      this.Auth = Auth;

      this.UsersService = UsersService;
      this.$uibModal = $uibModal;
    }

    $onInit() {
      this.UsersService.getAll()
        .then(users => {
          this.users = users;
        });

      this.loggedUser = this.Auth.getLoggedUser();
    }

    newUser() {
      const modalInstance = this.$uibModal.open({
        component: 'userForm'
      });

      modalInstance.result.then(data => {
        this.UsersService.save(data)
          .then(user => {
            if (!user) {
              return;
            }
            this.users.unshift(user);
          });
      }, () => {
        //
      });
    }

    onSelected(user) {
      // Only admin is allowed
      if (this.loggedUser.role !== '1') {
        return;
      }
      const modalInstance = this.$uibModal.open({
        component: 'userForm',
        resolve: {
          user() {
            return user;
          }
        }
      });

      modalInstance.result.then(data => {
        const dataToUpdate = {
          id: data.id,
          role: data.role
        };
        this.UsersService.update(dataToUpdate)
          .then(user => {
            console.log(user);
          });
      }, () => {
      });
    }

    // formSubmit() {
    //   if (this.edit === false && angular.isUndefined(this.user.id)) {

    //     this.UsersService.save(this.user)
    //       .then(data => {
    //         if (data.id) {
    //           this.users.unshift(data);
    //           this.user = {};
    //         }
    //       });
    //   } else {

    //     const index = this.users.findIndex(data => data.id === this.users.id);

    //     this.UsersService.update(this.users)
    //       .then(data => {
    //         this.users[index] = data;
    //         this.edit = false;
    //         this.user = {};
    //       });
    //   }
    // }
  }
};
