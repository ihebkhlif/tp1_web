
export const TODO_VALIDATION_MESSAGES = {
  name: {
    string: 'Name must be a string.',
    required: 'Name is required.',
    minLength: 'Name must contain at least 3 characters.',
    maxLength: 'Name must contain at most 10 characters.',
  },
  description: {
    string: 'Description must be a string.',
    required: 'Description is required.',
    minLength: 'Description must contain at least 10 characters.',
  },
  status: {
    invalid: 'Status must be a valid todo status.',
  },
};
