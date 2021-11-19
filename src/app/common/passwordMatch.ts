import { FormGroup } from '@angular/forms';

export function PasswordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        debugger
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
