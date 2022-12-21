import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TeamLogo from './TeamLogo';
import useTeamNames from '../hooks/useTeamNames';
import useTeam from '../hooks/useTeam';
import useTeamsArticles from '../hooks/useTeamsArticles';
import { slugify } from '../utils';
import Loading from './Loading';

function useTeamPageData(teamId) {
  const { response: teamNames, loading: loadingTeamNames } = useTeamNames();
  const { response: articles, loading: loadingArticles } =
    useTeamsArticles(teamId);
  const { response: team, loading: loadingTeam } = useTeam(teamId);

  return {
    teamNames,
    articles,
    team,
    loading: loadingArticles || loadingTeamNames || loadingTeam,
  };
}

const TeamPage = () => {
  const { teamId } = useParams();
  const { teamNames, articles, team, loading } = useTeamPageData(teamId);
  console.warn(team);

  if (loading === true) return <Loading />;

  if (!teamNames.includes(teamId)) {
    return <p className='text-center'>Team: {teamId} does not exist!</p>;
  }

  return (
    <div className='panel'>
      <TeamLogo id={teamId} />
      <h1 className='medium-header'>{team.name}</h1>
      <h4>
        <Link
          to={{
            pathname: '/players',
            search: `?teamId=${teamId}`,
          }}
        >
          View Players
        </Link>
      </h4>
      <h4>Championships</h4>
      <ul className='championships'>
        {team.championships.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ul className='info-list row' style={{ width: '100%' }}>
        <li>
          Est. <div>{team.established}</div>
        </li>
        <li>
          Manager <div>{team.manager}</div>
        </li>
        <li>
          Coach <div>{team.coach}</div>
        </li>
        <li>
          Record{' '}
          <div>
            {team.wins} - {team.losses}
          </div>
        </li>
      </ul>
      {/* Articles */}
      <h2>Articles</h2>
      <ul className='articles'>
        {articles.map((article) => {
          console.log(article);
          return (
            <li key={article.id}>
              <h4 className='article-title'>
                <Link
                  to={`/${slugify(teamId)}/articles/${slugify(article.title)}`}
                >
                  {article.title}
                </Link>
              </h4>
              <div className='article-date'>
                {new Date(article.date).toLocaleDateString()}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TeamPage;
