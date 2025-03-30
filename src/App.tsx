import { useState } from 'react';

import NewsForm from './components/NewsForm';
import NewsList from './components/NewsList';
import Header from './components/Header';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header setIsOpen={setIsOpen} />

      <main>
        <NewsList />
      </main>
      <NewsForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default App;
