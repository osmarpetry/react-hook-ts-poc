import { forwardRef, InputHTMLAttributes } from 'react';
import { ConnectForm, RegistrationFormData } from '../App';

type InputProps = {
  error?: string;
  label: string;
  name: keyof RegistrationFormData;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = (
  { type, label, placeholder, name, error = '', ...props }: InputProps,
  ref: React.Ref<HTMLInputElement>
) => {
  if (ref) {
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          id={name}
          name={name}
          ref={ref}
          {...props}
        />
        <p>{error}</p>
      </div>
    );
  }

  // Posso fazer autocomple aqui!
  return (
    <ConnectForm>
      {({ register, errors }) => (
        <div>
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            placeholder={placeholder}
            id={name}
            name={name}
            ref={register}
            {...props}
          />
          <p>{errors?.[name]?.message}</p>
        </div>
      )}
    </ConnectForm>
  );
};

export default forwardRef(Input);
