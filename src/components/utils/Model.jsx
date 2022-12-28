import isEmail from 'validator/lib/isemail';

import { useStore } from '../../context/store';
import styles from '../../styles/utils/Model.module.css';
import FormLayout from './FormLayout';
import Input from './Input';

import { addFriend } from '../../api/user';
import { useState } from 'react';
import Pending from './Pending';

const Model = ({ of }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(null);

  const { correctToken, set } = useStore('correctToken');
  const { user } = useStore('user');

  const handleClose = () => set({
    formModel: {
      show: false,
      of: null,
    }
  });

  const handleChange = (e) => {
    setEmail(e.target.value);
    setInvalid(null);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !isEmail(email)) {
      setInvalid("Invalid email");
      return;
    }
    setLoading(true);

    const token = correctToken.callback(localStorage.getItem('token'));
    addFriend(token, email).then((res) => {
      if(res.success) {
        console.log(res, user.info.friends);
        set({
          alertMessage: {
            type: 'success',
            message: res.message,
          },
          user: {
            info: {
              ...user.info,
              friends: [...user.info.friends, res.friend],
            },
            userPending: false,
          },
        });
      } else {
        set({
          alertMessage: {
            type: 'error',
            message: res.error,
          }
        })
      }
      setLoading(false);
      setEmail('');
    })
  };

  if(loading) {
    return (
      <div className={styles.model}>
        <Pending />
      </div>
    );
  }
  return (
    <div className={styles.model}>
      <FormLayout>
        <div onClick={handleClose} className={styles.close}>
          <div className={styles.bar}></div>
        </div>
        <h3>New {of}</h3>
        <Input
          label="email"
          invalid={invalid ? invalid : null}
          attrs={{
            type: 'email',
            placeholder: 'Your email',
            name: 'email',
            value: email,
            onChange: handleChange,
          }}
        />
        <Input
          label={null}
          attrs={{
            type: 'submit',
            name: 'submit',
            value: 'submit',
            onClick: handleSubmit
          }}
        />
      </FormLayout>
    </div>
  );
}

export default Model;