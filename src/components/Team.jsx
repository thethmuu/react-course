import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import useTeam from '../hooks/useTeam';
import Loading from './Loading';
import TeamLogo from './TeamLogo';

const Team = () => {
  const { teamId } = useParams();
  const { response: team, loading } = useTeam(teamId);
  console.log(team);

  let body;
  if (loading === true) {
    body = <Loading />;
  } else if (team === null) {
    body = <Navigate to={`/teams`} />;
  } else {
    body = (
      <div style={{ width: '100%' }}>
        <TeamLogo id={team.id} className='center' />
        <h1 className='medium-header'>{team.name}</h1>
        <ul className='info-list row'>
          <li>
            Est. <div>{team.established}</div>
          </li>
          <li>
            Manager <div>{team.manager}</div>
          </li>
          <li>
            Coach <div>{team.coach}</div>
          </li>
        </ul>
        <Link className='btn-main center' to={`/${teamId}`}>
          {team.name} Team Page
        </Link>
      </div>
    );
  }

  return <div className='panel'>{body}</div>;
};

export default Team;
