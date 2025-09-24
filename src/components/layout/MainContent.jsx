import About from '../sections/About';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import GitHub from '../sections/GitHub';
import Contact from '../sections/Contact';

const MainContent = () => {
  return (
    <main id="content" className="lg:w-[52%] max-w-none">
      <About />
      <Experience />
      <Projects />
      <GitHub />
      <Contact />
    </main>
  );
};

export default MainContent;
