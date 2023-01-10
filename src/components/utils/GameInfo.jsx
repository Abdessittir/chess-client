import { useStore } from '../../context/store';
import styles from '../../styles/utils/Player.module.css';

const GameInfo = () => {
  const { challenge, set } = useStore('challenge');
  const handleChange = (player) => {
    const challengeInfo = {
      by: {
        email: challenge.by.email,
        playAs: player,
      },
      to: {
        email: challenge.to.email,
        playAs: player === 'White' ? 'Black' : 'White',
      },
      accepted: false,
    };
    set({
      challenge: challengeInfo,
    })
  };

  const handleTime = (time) => {
    set({
      challenge: {
        ...challenge,
        time,
      },
    });
  };

  return (
    <fieldset className={styles.player}>
      <legend>play as</legend>

      <div className={styles.play_as}>
        <div>
          <input
            type="radio"
            id="White"
            name="player"
            value="White"
            className="btn"
            onChange={() => handleChange("White")}
          />
          <label htmlFor="White">White</label>
        </div>

        <div>
          <input
            type="radio"
            id="Black"
            name="player"
            value="Black"
            onChange={() => handleChange("Black")}
          />
          <label htmlFor="Black">Black</label>
        </div>
      </div>

      <div className={styles.time}>
      <div>
        <input
          type="radio"
          id="3"
          name="time"
          value="3"
          onChange={() => handleTime(3)}
        />
        <label htmlFor="Black">3 min</label>
      </div>

      <div>
        <input
          type="radio"
          id="5"
          name="time"
          value="5"
          onChange={() => handleTime(5)}
        />
        <label htmlFor="Black">5 min</label>
      </div>

      <div>
        <input
          type="radio"
          id="10"
          name="time"
          value="10"
          onChange={() => handleTime(10)}
        />
        <label htmlFor="Black">10 min</label>
      </div>

      <div className={styles.time}>
        <input
          type="radio"
          id="30"
          name="time"
          value="30"
          onChange={() => handleTime(30)}
        />
        <label htmlFor="Black">30 min</label>
      </div>
      </div>
    </fieldset>
  );
}

export default GameInfo;
