import React from 'react';

const ProjectCard = ({ project }) => {
  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'server':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"/>
            </svg>
        );
      case 'database':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>
            </svg>
        );
      case 'api':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"/>
            </svg>
        );
      case 'globe':
        return (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
        );
      case 'analysis':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"/>
            </svg>
        );
      case 'robot':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M17.7529 14.0004C18.9956 14.0004 20.0029 15.0078 20.0029 16.2504V17.1555C20.0029 18.2492 19.5255 19.2883 18.6957 20.0008C17.1302 21.3447 14.8899 22.0016 11.9999 22.0016C9.11038 22.0016 6.87156 21.345 5.30869 20.0013C4.48007 19.2889 4.00342 18.2505 4.00342 17.1577V16.2504C4.00342 15.0078 5.01078 14.0004 6.25342 14.0004H17.7529ZM17.7529 15.5004H6.25342C5.8392 15.5004 5.50342 15.8362 5.50342 16.2504V17.1577C5.50342 17.8134 5.78941 18.4364 6.28658 18.8638C7.54467 19.9455 9.44068 20.5016 11.9999 20.5016C14.5599 20.5016 16.4577 19.9451 17.7186 18.8626C18.2165 18.4352 18.5029 17.8117 18.5029 17.1555V16.2504C18.5029 15.8362 18.1671 15.5004 17.7529 15.5004ZM11.8984 2.00782L12.0002 2.00098C12.3799 2.00098 12.6937 2.28313 12.7434 2.64921L12.7502 2.75098L12.7494 3.49998L16.2499 3.50048C17.4925 3.50048 18.4999 4.50784 18.4999 5.75048V10.2551C18.4999 11.4977 17.4925 12.5051 16.2499 12.5051H7.74988C6.50724 12.5051 5.49988 11.4977 5.49988 10.2551V5.75048C5.49988 4.50784 6.50724 3.50048 7.74988 3.50048L11.2494 3.49998L11.2502 2.75098C11.2502 2.37128 11.5324 2.05749 11.8984 2.00782L12.0002 2.00098L11.8984 2.00782ZM16.2499 5.00048H7.74988C7.33566 5.00048 6.99988 5.33627 6.99988 5.75048V10.2551C6.99988 10.6693 7.33566 11.0051 7.74988 11.0051H16.2499C16.6641 11.0051 16.9999 10.6693 16.9999 10.2551V5.75048C16.9999 5.33627 16.6641 5.00048 16.2499 5.00048ZM9.74917 6.50048C10.4391 6.50048 10.9985 7.05981 10.9985 7.74977C10.9985 8.43973 10.4391 8.99906 9.74917 8.99906C9.0592 8.99906 8.49988 8.43973 8.49988 7.74977C8.49988 7.05981 9.0592 6.50048 9.74917 6.50048ZM14.2419 6.50048C14.9319 6.50048 15.4912 7.05981 15.4912 7.74977C15.4912 8.43973 14.9319 8.99906 14.2419 8.99906C13.5519 8.99906 12.9926 8.43973 12.9926 7.74977C12.9926 7.05981 13.5519 6.50048 14.2419 6.50048Z" fill="currentColor"/>
            </svg>
        );
      default:
        return null;
    }
  };

  const getVisualization = () => {
    const visuals = {
      'server': (
        <div className="relative h-full flex flex-col">
          {/* Type label at top */}
          <div className="flex justify-center mb-1">
            <span className="text-[9px] font-mono text-teal-400 opacity-80">{project.card.type}</span>
          </div>
          {/* Server visualization */}
          <div className="flex-1 flex flex-col justify-center space-y-2">
            <div className="flex gap-1.5 justify-center">
              <div className="w-8 h-1.5 bg-teal-400 rounded-full opacity-70"></div>
              <div className="w-4 h-1.5 bg-teal-300 rounded-full opacity-50"></div>
            </div>
            <div className="flex gap-1.5 justify-center">
              <div className="w-6 h-1.5 bg-teal-400 rounded-full opacity-60"></div>
              <div className="w-6 h-1.5 bg-teal-300 rounded-full opacity-40"></div>
            </div>
            <div className="flex gap-1.5 justify-center">
              <div className="w-9 h-1.5 bg-teal-400 rounded-full opacity-80"></div>
              <div className="w-3 h-1.5 bg-teal-300 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      ),
      'database': (
        <div className="relative h-full flex flex-col">
          {/* Type label at top */}
          <div className="flex justify-center mb-1">
            <span className="text-[9px] font-mono text-teal-400 opacity-80">{project.card.type}</span>
          </div>
          {/* Database visualization */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-1.5">
            <div className="w-12 h-2.5 bg-teal-400 rounded-full opacity-80"></div>
            <div className="w-10 h-2.5 bg-teal-300 rounded-full opacity-65"></div>
            <div className="w-11 h-2.5 bg-teal-400 rounded-full opacity-50"></div>
            <div className="w-9 h-2.5 bg-teal-300 rounded-full opacity-35"></div>
          </div>
        </div>
      ),
      'api': (
        <div className="relative h-full flex flex-col">
          {/* Type label at top */}
          <div className="flex justify-center mb-1">
            <span className="text-[9px] font-mono text-teal-400 opacity-80">{project.card.type}</span>
          </div>
          {/* API grid */}
          <div className="flex-1 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-1.5">
              <div className="w-2.5 h-2.5 bg-teal-400 rounded opacity-80"></div>
              <div className="w-2.5 h-2.5 bg-slate-500 rounded opacity-60"></div>
              <div className="w-2.5 h-2.5 bg-teal-300 rounded opacity-70"></div>
              <div className="w-2.5 h-2.5 bg-slate-600 rounded opacity-50"></div>
              <div className="w-2.5 h-2.5 bg-teal-400 rounded opacity-90"></div>
              <div className="w-2.5 h-2.5 bg-slate-500 rounded opacity-65"></div>
              <div className="w-2.5 h-2.5 bg-teal-300 rounded opacity-60"></div>
              <div className="w-2.5 h-2.5 bg-slate-600 rounded opacity-40"></div>
              <div className="w-2.5 h-2.5 bg-teal-400 rounded opacity-75"></div>
            </div>
          </div>
        </div>
      ),
      'analysis': (
        <div className="relative h-full flex flex-col">
          {/* Type label at top */}
          <div className="flex justify-center mb-1">
            <span className="text-[9px] font-mono text-teal-400 opacity-80">{project.card.type}</span>
          </div>
          {/* Analysis visualization */}
          <div className="flex-1 flex items-end justify-center gap-1.5 px-1">
            <div className="w-2 h-4 bg-teal-300 rounded-t opacity-60"></div>
            <div className="w-2 h-7 bg-teal-400 rounded-t opacity-80"></div>
            <div className="w-2 h-10 bg-teal-400 rounded-t opacity-90"></div>
            <div className="w-2 h-6 bg-teal-300 rounded-t opacity-70"></div>
            <div className="w-2 h-8 bg-teal-400 rounded-t opacity-85"></div>
          </div>
        </div>
      ),
      'robot': (
        <div className="relative h-full flex flex-col">
          {/* Type label at top */}
          <div className="flex justify-center mb-1">
            <span className="text-[9px] font-mono text-teal-400 opacity-80">{project.card.type}</span>
          </div>
          {/* Simple robot visualization */}
          <div className="flex-1 flex flex-col justify-center items-center space-y-2">
            {/* Robot head */}
            <div className="w-8 h-5 border border-teal-400 rounded bg-teal-400 bg-opacity-15"></div>
            {/* Robot eyes */}
            <div className="flex justify-center gap-2">
              <div className="w-1 h-1 bg-teal-400 rounded-full opacity-80"></div>
              <div className="w-1 h-1 bg-teal-400 rounded-full opacity-80"></div>
            </div>
            {/* Robot body */}
            <div className="w-6 h-4 bg-teal-300 rounded opacity-60"></div>
          </div>
        </div>
      )
    };
    return visuals[project.card.icon] || visuals['api'];
  };

  return (
    <div className="hidden sm:block sm:order-1 sm:col-span-2 sm:translate-y-1">
      <div className="aspect-square w-28 bg-slate-800 bg-opacity-20 border border-slate-700 border-opacity-40 rounded-xl p-4 transition-all duration-300 group-hover:border-teal-400 group-hover:border-opacity-50 group-hover:bg-slate-800 group-hover:bg-opacity-30">
        <div className="h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {getVisualization()}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
