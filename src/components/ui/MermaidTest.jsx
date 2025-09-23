import React, { useEffect, useRef, useState } from 'react';

const MermaidTest = () => {
  const mermaidRef = useRef(null);
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    console.log('🧪 MermaidTest: Component mounted');

    if (mermaidRef.current) {
      const testMermaid = async () => {
        try {
          setStatus('📦 Loading Mermaid...');
          console.log('🧪 MermaidTest: Loading Mermaid dynamically...');

          // Dynamic import
          const mermaidModule = await import('mermaid');
          const mermaid = mermaidModule.default || mermaidModule;

          console.log('🧪 MermaidTest: Mermaid loaded:', !!mermaid);
          console.log('🧪 MermaidTest: Available methods:', Object.keys(mermaid));

          setStatus('⚙️ Initializing...');

          // Initialize mermaid
          await mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            securityLevel: 'loose',
            themeVariables: {
              primaryColor: '#0891b2',
              primaryTextColor: '#e2e8f0',
              background: '#1e293b'
            }
          });

          console.log('🧪 MermaidTest: Mermaid initialized');
          setStatus('🎨 Rendering diagram...');

          // Simple test diagram
          const diagramCode = `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E`;

          console.log('🧪 MermaidTest: Diagram code:', diagramCode);

          // Try to render
          console.log('🧪 MermaidTest: Attempting to render...');
          const result = await mermaid.render('test-diagram-simple', diagramCode);

          console.log('🧪 MermaidTest: Render result:', result);

          if (result && result.svg && mermaidRef.current) {
            mermaidRef.current.innerHTML = result.svg;
            setStatus('✅ Successfully rendered!');
            console.log('🧪 MermaidTest: ✅ Successfully rendered!');
          } else {
            throw new Error('No SVG returned from mermaid.render()');
          }

        } catch (error) {
          console.error('🧪 MermaidTest: ❌ Error:', error);
          setStatus(`❌ Failed: ${error.message}`);

          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = `
              <div class="p-4 bg-red-900/20 text-red-400 rounded border border-red-700">
                <div class="font-semibold mb-2">Mermaid Test Failed</div>
                <div class="text-sm mb-2">${error.message}</div>
                <div class="text-xs text-red-300">Check console for details</div>
              </div>
            `;
          }
        }
      };

      // Run the test
      testMermaid();
    }
  }, []);

  return (
    <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Mermaid Test Component</h3>
      <div
        ref={mermaidRef}
        className="min-h-[200px] bg-slate-900/50 rounded p-4 flex items-center justify-center text-slate-400"
      >
        Loading Mermaid test...
      </div>
    </div>
  );
};

export default MermaidTest;