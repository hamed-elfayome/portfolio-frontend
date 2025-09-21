import React from 'react';

const HighlightedText = ({ text, highlightedWords = [] }) => {
  if (!highlightedWords || highlightedWords.length === 0) {
    return <span>{text}</span>;
  }

  // Create a single regex that captures both text and highlighted words
  const pattern = new RegExp(`(${highlightedWords.join('|')})`, 'gi');
  
  // Split text and create elements in one pass
  const elements = text.split(pattern).map((part, index) => {
    // Check if this part is a highlighted word (case-insensitive)
    const isHighlighted = highlightedWords.some(word => 
      part.toLowerCase() === word.toLowerCase()
    );
    
    if (isHighlighted) {
      return (
        <span 
          key={index}
          className="text-white font-medium transition-colors duration-200 cursor-default"
        >
          {part}
        </span>
      );
    }
    
    return <span key={index}>{part}</span>;
  });
  
  return <>{elements}</>;
};

export default HighlightedText;