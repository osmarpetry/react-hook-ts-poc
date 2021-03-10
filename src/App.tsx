import React, { useEffect } from 'react';
import {
  FormProvider,
  useForm,
  useFormContext,
  UseFormMethods,
} from 'react-hook-form';

import FirstHelloWorld from 'container/FirstHelloWorld';

import Input from 'components/Input';

export interface RegistrationFormData {
  name: string;
  mobile: string;
  birthday: string;
  'first-hello-world': number;
}

export const ConnectForm = ({
  children,
}: {
  children: (
    methods: UseFormMethods<RegistrationFormData>
  ) => React.ReactElement;
}) => {
  const methods = useFormContext<RegistrationFormData>();

  return children({ ...methods });
};

export default function App() {
  const methods = useForm<RegistrationFormData>();
  const { register, handleSubmit, errors } = methods;
  const onSubmit = (data: RegistrationFormData) => console.log(data);

  useEffect(() => {
    register('name', {
      required: { value: true, message: 'Esse campo é obrigatório' },
    });

    register('mobile', {
      required: false,
      pattern: {
        value: /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/i,
        message: 'Deve ser (12) 12345-1234',
      },
    });

    register('first-hello-world', {
      required: false,
      min: {
        value: 1,
        message: 'Deve ser igual ou maior que 01',
      },
      max: {
        value: 100,
        message: 'Deve ser igual ou menos que 100',
      },
    });
  }, [register]);

  console.log(errors);
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nome"
          type="text"
          placeholder="Seu nome aqui"
          name="name"
          ref={register({
            minLength: {
              value: 2,
              message: 'Deve conter no minímo de 02 caracteres',
            },
            maxLength: {
              value: 15,
              message: 'Deve conter até 15 caracteres',
            },
          })}
          error={errors?.['name']?.message}
        />
        <Input
          label="Aniversário"
          type="datetime"
          placeholder="dia/mes/ano"
          name="birthday"
          ref={register({
            required: false,
            pattern: {
              value: /\d{2}\/\d{2}\/\d{4}/i,
              message: 'Padrão deve ser 31/12/2021',
            },
          })}
          error={errors?.['birthday']?.message}
        />
        <Input
          label="Celular"
          type="tel"
          placeholder="(12) 12345-1234"
          name="mobile"
        />
        <FirstHelloWorld />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}
