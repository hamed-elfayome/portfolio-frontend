import React from 'react';

const animations = `
  @keyframes serverload {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.7; }
  }
  @keyframes serverled {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }
  @keyframes dataflow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.03); }
  }
  @keyframes flowline {
    0%, 100% { opacity: 0.4; transform: scaleX(1); }
    50% { opacity: 0.7; transform: scaleX(1.05); }
  }
  @keyframes chartgrow {
    0% { transform: scaleY(0.8); opacity: 0.7; }
    50% { transform: scaleY(1.02); opacity: 1; }
    100% { transform: scaleY(1); opacity: 0.9; }
  }
  @keyframes grid {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.5; }
  }
  @keyframes indicator {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }
  @keyframes metric {
    0%, 100% { opacity: 0.5; transform: scaleX(1); }
    50% { opacity: 0.8; transform: scaleX(1.05); }
  }
  @keyframes automation {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    33% { opacity: 0.8; transform: scale(1.02); }
    66% { opacity: 0.9; transform: scale(1.01); }
  }
  @keyframes autoflow {
    0%, 100% { opacity: 0.4; transform: scaleX(1); }
    50% { opacity: 0.8; transform: scaleX(1.1); }
  }
  @keyframes autoprocess {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  @keyframes autoprogress {
    0% { opacity: 0.4; }
    25% { opacity: 0.6; }
    50% { opacity: 0.8; }
    75% { opacity: 0.6; }
    100% { opacity: 0.4; }
  }
  @keyframes autostatus {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.05); }
  }
  @keyframes globe {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.02); }
  }
  @keyframes latitude {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }
  @keyframes longitude {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }
  @keyframes webapp {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }
`;

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
          <div className="flex justify-center mb-2">
            <span className="text-[9px] font-mono text-teal-400 opacity-80">{project.card.type}</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-14 h-10 bg-slate-800/20 border border-teal-400/30 rounded">
              <div className="absolute inset-1 flex flex-col justify-between">
                <div className="h-1.5 bg-teal-400/40 border border-teal-400/60 rounded-sm relative overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-400/20 to-teal-400/5 animate-[serverload_4s_ease-in-out_infinite]"></div>
                  <div className="absolute right-0.5 top-0.5 w-1 h-0.5 bg-green-400 rounded-full animate-[serverled_3s_ease-in-out_infinite]"></div>
                </div>
                <div className="h-1.5 bg-teal-400/50 border border-teal-400/70 rounded-sm relative overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-400/25 to-teal-400/8 animate-[serverload_4s_ease-in-out_infinite_1s]"></div>
                  <div className="absolute right-0.5 top-0.5 w-1 h-0.5 bg-teal-400 rounded-full animate-[serverled_2.5s_ease-in-out_infinite]"></div>
                </div>
                <div className="h-1.5 bg-teal-400/30 border border-teal-400/50 rounded-sm relative">
                  <div className="absolute right-0.5 top-0.5 w-1 h-0.5 bg-slate-500 rounded-full"></div>
                </div>
                <div className="h-1.5 bg-teal-400/40 border border-teal-400/60 rounded-sm relative overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-400/20 to-teal-400/5 animate-[serverload_4s_ease-in-out_infinite_2s]"></div>
                  <div className="absolute right-0.5 top-0.5 w-1 h-0.5 bg-green-400 rounded-full animate-[serverled_3.5s_ease-in-out_infinite]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      'database': (
        <div className="relative h-full flex flex-col">
          <div className="flex justify-center mb-2">
            <span className="text-[9px] font-mono text-teal-400 opacity-80">{project.card.type}</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-14 h-10">
              <div className="absolute inset-0 border border-teal-400/30 rounded-lg bg-slate-800/20">
                <div className="absolute top-1 left-1 grid grid-cols-4 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-teal-400/60 rounded-sm animate-[dataflow_4s_ease-in-out_infinite]"></div>
                  <div className="w-1.5 h-1.5 bg-teal-300/40 rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-teal-400/70 rounded-sm animate-[dataflow_4s_ease-in-out_infinite_1s]"></div>
                  <div className="w-1.5 h-1.5 bg-teal-300/50 rounded-sm"></div>
                </div>
                <div className="absolute top-3 left-1 grid grid-cols-4 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-teal-300/50 rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-teal-400/80 rounded-sm animate-[dataflow_4s_ease-in-out_infinite_2s]"></div>
                  <div className="w-1.5 h-1.5 bg-teal-300/40 rounded-sm animate-[dataflow_4s_ease-in-out_infinite_0.5s]"></div>
                  <div className="w-1.5 h-1.5 bg-teal-400/60 rounded-sm"></div>
                </div>
                <div className="absolute top-5 left-1 grid grid-cols-4 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-teal-400/50 rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-teal-300/60 rounded-sm animate-[dataflow_4s_ease-in-out_infinite_1.5s]"></div>
                  <div className="w-1.5 h-1.5 bg-teal-400/40 rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-teal-300/70 rounded-sm animate-[dataflow_4s_ease-in-out_infinite_3s]"></div>
                </div>
                <div className="absolute top-2 right-1 flex flex-col gap-1">
                  <div className="w-2 h-0.5 bg-teal-400/60 rounded-full animate-[flowline_2s_ease-in-out_infinite]"></div>
                  <div className="w-1.5 h-0.5 bg-teal-300/50 rounded-full animate-[flowline_2s_ease-in-out_infinite_0.7s]"></div>
                  <div className="w-2 h-0.5 bg-teal-400/40 rounded-full animate-[flowline_2s_ease-in-out_infinite_1.3s]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      'api': (
        <div className="relative h-full flex flex-col">
          <div className="flex justify-center mb-2">
            <span className="text-[9px] font-mono text-teal-400 opacity-80">{project.card.type}</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-14 h-10">
              {/* Central API hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-teal-400/70 border-2 border-teal-400/40 rounded-full">
                <div className="absolute inset-0.5 bg-teal-400 rounded-full"></div>
              </div>

              {/* API endpoints - circles around center */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-teal-300/60 border border-teal-300/80 rounded-full"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-teal-300/60 border border-teal-300/80 rounded-full"></div>
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-2 h-2 bg-teal-300/60 border border-teal-300/80 rounded-full"></div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-2 h-2 bg-teal-300/60 border border-teal-300/80 rounded-full"></div>

              {/* Connection lines */}
              <div className="absolute top-2 left-1/2 w-px h-3 bg-teal-400/50 transform -translate-x-1/2"></div>
              <div className="absolute bottom-2 left-1/2 w-px h-3 bg-teal-400/50 transform -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-2 w-3 h-px bg-teal-400/50 transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 right-2 w-3 h-px bg-teal-400/50 transform -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      ),
      'analysis': (
        <div className="relative h-full flex flex-col">
          <div className="flex justify-center mb-2">
            <span className="text-[9px] font-mono text-teal-400 opacity-80">{project.card.type}</span>
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-2">
            <div className="relative h-6 bg-slate-800/30 rounded border border-slate-700/40 overflow-hidden">
              <div className="absolute bottom-0 left-1 w-1 bg-gradient-to-t from-teal-400 to-teal-300 rounded-t animate-[chartgrow_3s_ease-out_infinite]" style={{height: '60%'}}></div>
              <div className="absolute bottom-0 left-3 w-1 bg-gradient-to-t from-teal-400 to-teal-300 rounded-t animate-[chartgrow_3s_ease-out_infinite_0.2s]" style={{height: '80%'}}></div>
              <div className="absolute bottom-0 left-5 w-1 bg-gradient-to-t from-teal-400 to-teal-300 rounded-t animate-[chartgrow_3s_ease-out_infinite_0.4s]" style={{height: '45%'}}></div>
              <div className="absolute bottom-0 left-7 w-1 bg-gradient-to-t from-teal-400 to-teal-300 rounded-t animate-[chartgrow_3s_ease-out_infinite_0.6s]" style={{height: '90%'}}></div>
              <div className="absolute bottom-0 left-9 w-1 bg-gradient-to-t from-teal-400 to-teal-300 rounded-t animate-[chartgrow_3s_ease-out_infinite_0.8s]" style={{height: '70%'}}></div>
              <div className="absolute inset-x-0 top-1/4 h-px bg-slate-600/40 animate-[grid_4s_ease-in-out_infinite]"></div>
              <div className="absolute inset-x-0 top-1/2 h-px bg-slate-600/40 animate-[grid_4s_ease-in-out_infinite_0.5s]"></div>
              <div className="absolute inset-x-0 top-3/4 h-px bg-slate-600/40 animate-[grid_4s_ease-in-out_infinite_1s]"></div>
              <div className="absolute top-1 right-1 w-1 h-1 bg-green-400 rounded-full animate-[indicator_1s_ease-in-out_infinite]"></div>
            </div>
            <div className="flex justify-center gap-1">
              <div className="w-1.5 h-0.5 bg-teal-400/60 rounded-full animate-[metric_2s_ease-in-out_infinite]"></div>
              <div className="w-1.5 h-0.5 bg-teal-300/40 rounded-full animate-[metric_2s_ease-in-out_infinite_0.3s]"></div>
              <div className="w-1.5 h-0.5 bg-teal-400/80 rounded-full animate-[metric_2s_ease-in-out_infinite_0.6s]"></div>
            </div>
          </div>
        </div>
      ),
      'robot': (
        <div className="relative h-full flex flex-col">
          <div className="flex justify-center mb-2">
            <span className="text-[9px] font-mono text-teal-400 opacity-80">{project.card.type}</span>
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-2">
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-slate-600/60 rounded border border-slate-500/40 animate-[automation_5s_ease-in-out_infinite]"></div>
              <div className="w-2 h-px bg-teal-400/60 animate-[autoflow_3s_ease-in-out_infinite]"></div>
              <div className="relative w-3 h-3 bg-teal-400/20 rounded border border-teal-400/40">
                <div className="absolute inset-1 bg-teal-400 rounded animate-[autoprocess_2s_ease-in-out_infinite]"></div>
              </div>
              <div className="w-2 h-px bg-teal-400/60 animate-[autoflow_3s_ease-in-out_infinite_1.5s]"></div>
              <div className="w-2 h-2 bg-teal-300/80 rounded border border-teal-300/60 animate-[automation_5s_ease-in-out_infinite_2.5s]"></div>
            </div>
            <div className="flex justify-center gap-1">
              <div className="w-4 h-0.5 bg-gradient-to-r from-slate-600/40 to-teal-400/60 rounded-full animate-[autoprogress_4s_ease-in-out_infinite]"></div>
            </div>
            <div className="flex justify-center gap-0.5">
              <div className="w-1 h-1 bg-green-400/60 rounded-full animate-[autostatus_3s_ease-in-out_infinite]"></div>
              <div className="w-1 h-1 bg-teal-400/80 rounded-full animate-[autostatus_3s_ease-in-out_infinite_1s]"></div>
              <div className="w-1 h-1 bg-slate-500/40 rounded-full"></div>
            </div>
          </div>
        </div>
      ),
      'globe': (
        <div className="relative h-full flex flex-col">
          <div className="flex justify-center mb-2">
            <span className="text-[9px] font-mono text-teal-400 opacity-80">{project.card.type}</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border-2 border-teal-400/40 rounded-full bg-teal-400/10">
                <div className="absolute inset-1 border border-teal-400/60 rounded-full animate-[globe_4s_ease-in-out_infinite]"></div>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-teal-400/50 animate-[latitude_3s_ease-in-out_infinite]"></div>
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-teal-400/50 animate-[longitude_3s_ease-in-out_infinite_1s]"></div>
                <div className="absolute top-2 left-2 w-1 h-1 bg-teal-300/80 rounded-full animate-[webapp_2s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-teal-400/90 rounded-full animate-[webapp_2s_ease-in-out_infinite_0.7s]"></div>
              </div>
            </div>
          </div>
        </div>
      )
    };
    return visuals[project.card.icon] || visuals['api'];
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: animations }} />
      <div className="hidden sm:block sm:order-1 sm:col-span-2 sm:translate-y-1">
        <div className="aspect-square w-28 bg-slate-800 bg-opacity-20 border border-slate-700 border-opacity-40 rounded-xl p-4 transition-all duration-300 group-hover:border-teal-400 group-hover:border-opacity-50 group-hover:bg-slate-800 group-hover:bg-opacity-30">
          <div className="h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            {getVisualization()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
