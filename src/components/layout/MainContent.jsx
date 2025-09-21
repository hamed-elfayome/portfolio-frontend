import About from '../sections/About';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';

const MainContent = () => {
  return (
    <main id="content" className="pt-24 lg:w-[52%] lg:py-24">
      <About />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
};

export default MainContent;
