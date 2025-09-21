import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import aboutData from '../../data/about.json';
import HighlightedText from '../ui/HighlightedText';

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
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="About me"
    >
      <div className={`transition-all duration-1000 delay-200 ${
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
