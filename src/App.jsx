import { Sidebar, MainContent, MouseFollower } from './components';
import ScrollIndicator from './components/ui/ScrollIndicator';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 relative">
      <MouseFollower />
      <ScrollIndicator />
      <main className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0 relative z-10">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Sidebar />
          <MainContent />
        </div>
      </main>
    </div>
  )
}

export default App
