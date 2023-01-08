import { useNavigate } from 'react-router-dom';

import styles from '../../styles/utils/FriendCard.module.css';

import remove from '../../assets/remove.png';

import { useStore } from '../../context/store';
import { useState } from 'react';
import { removeFriend } from '../../context/storeSetters';

const FriendCard = ({ friend }) => {
  const [loading, setLoading] = useState(false);

  const { user } = useStore('user');
  const { correctToken, set } = useStore('correctToken');

  const navigate = useNavigate();

  const handleRemove = () => {
    setLoading(true);
    const token = correctToken.callback(localStorage.getItem('token'));
    removeFriend(friend._id, token, set, user).then(() => setLoading(false));
  };

  const handleClick = () => {
    set({
      challenge: {
        by: user.info.email,
        accepted: false,
      },
    });
    navigate('/game');
  };

  return (
    <div className={styles[loading? 'removing_friend' : 'friend']}>
      <p>{friend.email}</p>
      
      <div className={styles.friend_actions}>
        <button onClick={handleClick} className="btn" disabled={friend.status === 'offline'}>
          Challenge
        </button>
      <p
        title={friend.status}
        className={styles[friend.status === 'online' ? 'online' : 'offline']}
      ></p>

      <button className={styles.remove} onClick={handleRemove}>
        <img src={remove} alt="delete friend" />
      </button>
      </div>
    </div>
  );
};
export default FriendCard;