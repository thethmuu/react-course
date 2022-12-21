import React from 'react';
import { Link, useParams } from 'react-router-dom';
import usePlayer from '../hooks/usePlayer';
import Loading from './Loading';

const Player = () => {
  const { name } = useParams();
  const { response: player, loading } = usePlayer(name);
  if (loading === true) return <Loading />;
  if (!player) return null;

  return (
    <div className='panel'>
      <img
        src={`${player.avatar}`}
        alt={`${player.avatar}'s avatar`}
        className='avatar'
      />
      <h1 className='medium-header'>{player.name}</h1>
      <h3 className='header'>#{player.number}</h3>
      <div className='row'>
        <ul className='info-list' style={{ marginRight: 80 }}>
          <li>
            Team
            <div>
              <Link to={`${player.teamId}`}>
                {player.teamId[0].toUpperCase() + player.teamId.slice(1)}
              </Link>
            </div>
          </li>
          <li>
            Positon <div>{player.position}</div>
          </li>
          <li>
            PPG <div>{player.ppg}</div>
          </li>
        </ul>
        <ul className='info-list'>
          <li>
            APG <div>{player.apg}</div>
          </li>
          <li>
            SPG <div>{player.spg}</div>
          </li>
          <li>
            RPG <div>{player.rpg}</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Player;
