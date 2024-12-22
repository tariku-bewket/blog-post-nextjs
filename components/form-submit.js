'use client';

import { useFormStatus } from 'react-dom';

export default function FormSubmit() {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <>
        <button type='reset' disabled>
          Reset
        </button>
        <button type='submit' disabled>
          Creating post...
        </button>
      </>
    );
  }

  return (
    <>
      <button type='reset'>Reset</button>
      <button>Create Post</button>
    </>
  );
}
