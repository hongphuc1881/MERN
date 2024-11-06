import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { loginAccount } from '../../../api/auth.api';
import { Button } from '../../../components/Button';
import { ResponseApi } from '../../../types/utils.type';
import { schema, Schema } from '../../../utils/rule';
import { isAxiosUnprocessableEntityError } from '../../../utils/utils';
import styles from './styles.module.css';
export const LoginPc = () => {
  const loginMutation = useMutation({
    mutationFn: (body: Pick<Schema, 'email' | 'password'>) =>
      loginAccount(body),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Pick<Schema, 'email' | 'password'>>({
    resolver: yupResolver(schema.pick(['email', 'password'])),
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess(data) {
        console.log(data);
      },
      onError(error) {
        if (isAxiosUnprocessableEntityError<ResponseApi<Schema>>(error)) {
          const formError = error.response?.data.data;
          if (formError?.email) {
            setError('email', { message: formError.email });
          }
          if (formError?.password) {
            setError('password', { message: formError.password });
          }
        }
      },
    });
  });

  return (
    <div className={styles.module}>
      <form onSubmit={onSubmit} className={styles.form} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="email">Tên đăng nhập: </label>
          <input
            type="email"
            {...register('email')}
            id="email"
            placeholder="Nhập email"
          />
          <span className={styles.errorMessage}>{errors.email?.message}</span>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Mật khẩu: </label>
          <input
            type="password"
            {...register('password')}
            id="password"
            placeholder="Nhập mật khẩu"
          />
          <span className={styles.errorMessage}>
            {errors.password?.message}
          </span>
        </div>
        <Button type="submit" size="middle" theme="primary">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};
