import topics from '@config/topics';
import { NavLink } from 'react-router-dom';

const TopicsList = () => {
  return (
    <ul id='topics'>
      {topics.map(({ name }) => (
        <li key={name}>
          <NavLink to={`/${name}`} activeClassName='active'>
            <span>#</span>
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default TopicsList;
