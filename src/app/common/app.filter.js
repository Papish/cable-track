/** @ngInject */
export function EncryptStringFilter($window) {
  return function (x) {
    return $window.btoa(x);
  };
}

export function firstLetterToCapital() {
  return function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
}

export function toNumber() {
	return function (string) {
		return parseFloat(string);
	};
}
