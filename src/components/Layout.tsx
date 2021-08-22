import { Footer, NavBar } from '@components';
import '@styles/Layout.scss';

type LayoutProps = {
	children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<NavBar />
			<main>
				{children}
				<Footer />
			</main>
		</>
	);
};

export default Layout;
