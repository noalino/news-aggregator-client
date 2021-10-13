import { useState } from 'react';
import { Footer, NavBar, TopicsList } from '@components';
import '@styles/Layout.scss';

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isCookiesAccepted, setIsCookiesAccepted] = useState(false);
  return (
    <>
      <NavBar isExpanded={isNavExpanded} toggleExpand={setIsNavExpanded} />
      <div id='view'>
        <TopicsList />
        <main>
          {children}
          <Footer />
        </main>
      </div>
      {!isCookiesAccepted && (
        <div id='cookies-popin'>
          <p>This website uses cookies.</p>
          <button onClick={() => setIsCookiesAccepted(true)}>Got it!</button>
        </div>
      )}
    </>
  );
};

export default Layout;
