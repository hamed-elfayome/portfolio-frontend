// Utility functions for the portfolio

export const scrollToSection = (sectionId) => {
  console.log('scrollToSection called with:', sectionId);
  const element = document.getElementById(sectionId);
  console.log('Found element:', element);
  if (element) {
    console.log('Calling scrollIntoView on element:', element);
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    console.log('scrollIntoView called');
  } else {
    console.log('Element not found!');
  }
};
