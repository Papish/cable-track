export default class ErrorMessageService {
  constructor($uibModal) {
    'ngInject';

    this.$uibModal = $uibModal;
  }

  setError(error) {
    this._throwError(error);
  }

  _throwError(error) {
    this.$uibModal.open({
      template: error,
      keyboard: false,
      backdrop: 'static'
    });
  }
}
