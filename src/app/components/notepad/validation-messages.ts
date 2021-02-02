export const Custom_Validation_Messages = {
  name: [
    { type: 'required', message: 'Notepad title is required' },
    { type: 'maxlength', message: 'Note cannot be more than 255 characters long' },
  ],
  title: [
    { type: 'required', message: 'Note title is required' },
    { type: 'maxlength', message: 'Note cannot be more than 255 characters long' },
  ],
  text: [
    { type: 'required', message: 'Note is required' },
    { type: 'maxlength', message: 'Note cannot be more than 1000 characters long' },
  ],
};
