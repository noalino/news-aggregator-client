const Footer = () => {
	const currentDate = new Date();
	return (
		<div id='footer'>
			<p>Copyright © 2019-{currentDate.getFullYear()} Benoît Gelineau</p>
		</div>
	);
};

export default Footer;
