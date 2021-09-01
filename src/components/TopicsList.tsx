import { Link } from 'react-router-dom';
import topics from '@config/topics';

const TopicsList = () => {
	return (
		<div id='topics'>
			{topics.map(({ name }) => (
				<Link key={name} to={`/${name}`}>
					#{name}
				</Link>
			))}
		</div>
	);
};

export default TopicsList;
