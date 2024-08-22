import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';

function Account() {
  return (
    <div>
      <UpdateUserDataForm />
      <UpdatePasswordForm />
    </div>
  );
}

export default Account;
