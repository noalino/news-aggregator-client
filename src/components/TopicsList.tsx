import topics from '@config/topics';

const TopicsList = () => {
	return (
		<div className='TopicsList'>
			{topics.map((topic) => (
				<p key={topic.name}>#{topic.name}</p>
			))}
		</div>
	);
};

export default TopicsList;
