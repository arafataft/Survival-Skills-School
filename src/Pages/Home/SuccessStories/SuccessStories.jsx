import './SuccessStories.css'
const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: 'J Doe',
      title: 'Overcoming Challenges in the Wilderness',
      story:
        "I attended Survival Skill School with little experience in outdoor survival. The instructors were patient, knowledgeable, and provided hands-on training. I'm now confident in my ability to navigate, build shelter, and find food in the wilderness.",
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'A Life-Changing Experience',
      story:
        'Survival Skill School taught me skills that extend beyond the wilderness. It was an incredible journey of personal growth, self-discovery, and building resilience. I highly recommend it to anyone seeking adventure and personal development.',
    },
  ];

  return (
    <div className="success-stories">
      <h2>Success Stories</h2>
      {stories.map(story => (
        <div key={story.id} className="story">
          <h3 className="story-title">{story.title}</h3>
          <p className="story-text">{story.story}</p>
          <p className="story-author">- {story.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SuccessStories;
