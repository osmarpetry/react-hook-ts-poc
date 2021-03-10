import Input from 'components/Input';
import {
  useFormContext,
} from 'react-hook-form';

import {  RegistrationFormData } from 'App';

export default function FirstHelloWorld() {
  const { register, errors } = useFormContext<RegistrationFormData>();

  return (
      <Input
        label='Primeiro "hello world"'
        type="number"
        placeholder="Idade"
        name="first-hello-world"
        ref={register}
        error={errors['first-hello-world']?.message}
      />
  );
}
