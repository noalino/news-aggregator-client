import { Link } from 'react-router-dom';
import topics from '@config/topics';
import { NavLink } from 'react-router-dom';

const TopicsList = () => {
	return (
		<div id='topics'>
			{topics.map(({ name }) => (
				<NavLink key={name} to={`/${name}`} activeClassName='active'>
					<span>#</span>
					{name}
				</NavLink>
			))}
		</div>
	);
};

export default TopicsList;
