import { useForm } from 'react-hook-form';
import styles from './styles.module.css';

export const LoginPc = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className={styles.module}>
      <form
        onSubmit={onSubmit}
        //onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            //value={formData.email}
            //onChange={handleChange}
            placeholder="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            //value={formData.password}
            //onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
