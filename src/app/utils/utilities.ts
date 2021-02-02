import { FormGroup, ValidationErrors } from '@angular/forms';

/** Forms Utilities */
export function getFieldErrorMessage(form: FormGroup, control: string, messages: { [key: string]: Array<any> }): string {
  const controlErrors: ValidationErrors = form.get(control).errors;
  let errMessages: Array<any> = messages[control];
  let errMsg: string;
  if (controlErrors != null) {
    for (let errorKey of Object.keys(controlErrors)) {
      errMsg = errMessages.find((element) => element.type == errorKey).message;
      break;
    }
  }
  return errMsg;
}
