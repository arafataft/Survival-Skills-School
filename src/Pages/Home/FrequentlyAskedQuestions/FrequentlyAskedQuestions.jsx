import './FrequentlyAskedQuestions.css'
const FrequentlyAskedQuestions = () => {
  const faqs = [
    {
      id: 1,
      question: 'How do I register for classes?',
      answer: 'You can register for classes by visiting our website and navigating to the registration page. Follow the instructions provided to complete the registration process.',
    },
    {
      id: 2,
      question: 'What should I bring to the camp?',
      answer: 'We recommend bringing appropriate outdoor clothing, sturdy footwear, a water bottle, sunscreen, and insect repellent. Additionally, please refer to the specific equipment list provided for each camp.',
    },
    {
      id: 3,
      question: 'Are there any age restrictions for the classes?',
      answer: 'Yes, some classes have age restrictions due to the nature of the activities involved. Please check the class details or contact us directly for more information regarding age requirements.',
    },
  ];

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map(faq => (
          <div key={faq.id} className="faq">
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
