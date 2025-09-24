import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import aboutData from '../../data/about.json';
import HighlightedText from '../common/HighlightedText';

const About = () => {
  const [ref, isIntersecting] = useIntersectionObserver();

  const renderParagraph = (paragraph, index) => {
    return (
      <HighlightedText 
        text={paragraph.text} 
        highlightedWords={paragraph.highlightedWords} 
      />
    );
  };

  return (
    <section
      id="about"
      ref={ref}
      className="snap-section"
      aria-label="About me"
    >
      <div className={`w-full max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {aboutData.paragraphs.map((paragraph, index) => (
          <p key={index} className={`text-slate-400 ${index < aboutData.paragraphs.length - 1 ? 'mb-4' : ''}`}>
            {renderParagraph(paragraph, index)}
          </p>
        ))}
      </div>
    </section>
  );
};

export default About;
