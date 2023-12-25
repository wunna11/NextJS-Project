import { useRef } from 'react';
import classes from './profile-form.module.css';

function ProfileForm(props) {

  const oldPassword = useRef();
  const newPassword = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredOldPwd = oldPassword.current.value;
    const enteredNewPwd = newPassword.current.value;

    props.onChangePassword({
      oldPassword: enteredOldPwd,
      newPassword: enteredNewPwd
    });
  }
  
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPassword} />
      </div>
      <div className={classes.control}>
      <label htmlFor='new-password'>New Password</label>
      <input type='password' id='new-password' ref={newPassword} />
    </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;