import React from 'react';
import './stories-component.scss';

import { StoryModel } from '../../shared/model/story-model';
import StoryComponent from './story/story-component';

export default function StoriesComponent(props: { stories: StoryModel[] }) {
  const { stories } = props;

  return (
    <div className="stories">
      {stories.map((story: StoryModel) => (
        <StoryComponent key={story.id} story={story} />
      ))}
    </div>
  );
}
