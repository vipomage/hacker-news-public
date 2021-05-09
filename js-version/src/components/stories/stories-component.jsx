import React from 'react';
import './stories-component.scss';

import StoryComponent from './story/story-component';

export default function StoriesComponent(props) {
  const { stories } = props;

  return (
    <div className="stories">
      {stories.map((story) => (
        <StoryComponent key={story.id} story={story} />
      ))}
    </div>
  );
}
