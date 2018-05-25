class AddPointFormController {
	save() {
		this.onSave({
			$event: this.point
		});
	}
	cancel() {
		this.onCancel();
	}
}

export const AddPointForm = {
	template: require('./AddPointForm.html'),
	controller: AddPointFormController,
	bindings: {
		point: '<',
		onSave: '&',
		onCancel: '&'
	}
};
