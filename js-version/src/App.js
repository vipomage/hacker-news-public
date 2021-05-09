import React, { useContext, useEffect, useState } from 'react';
import './App.scss';

import ErrorComponent from './components/error/error-component';
import StoriesComponent from './components/stories/stories-component';
import LoadingComponent from './components/loading/loading-component';
import ApiContext from './shared/context/api-context';

export default function App() {
  const [errorMessage, setError] = useState('');
  const [stories, setStories] = useState([]);
  const api = useContext(ApiContext);

  useEffect(() => {
    fetchTopStories(api).then(setStories).catch(setError);
  }, [api]);

  return errorMessage ? (
    ErrorComponent(errorMessage)
  ) : (
    <div className="app-component">
      <h1 className={'site-header'}>Hacker News</h1>
      {!!stories.length ? <StoriesComponent stories={stories} /> : <LoadingComponent />}
    </div>
  );
}

async function fetchTopStories(api) {
  const topStoryIds = await api.getTopStoryIds();

  const topTenStoryPromises = topStoryIds
    // Slice top 10
    .slice(0, 10)
    // Map each stories id to fetch Promise:
    // Note: We use either *bind* or pass arg using arrow func
    .map(api.getStoryById.bind(api));

  // await All Story Promises since map does not respect async/await (parallel execution)
  return await Promise.all(topTenStoryPromises);
}
