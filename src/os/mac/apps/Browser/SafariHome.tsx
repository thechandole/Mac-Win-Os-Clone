
// import nhi karne ho to public ka access dena padta he 

import githubIcon from "../../../../assets/safari icon/github-142-svgrepo-com.svg";
import linkedinIcon from "../../../../assets/safari icon/linkedin.svg";
import naukriIcon from "../../../../assets/safari icon/naukri.png";
import portfolioIcon from "../../../../assets/safari icon/portfolio.svg";


const FAVOURITES = [
  {
    name: "Portfolio",
    url: "https://www.thechandole.online",
    icon: portfolioIcon,
  },
  {
    name: "GitHub",
    url: "https://github.com/thechandole",
    icon: githubIcon,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/akash-chandole-57830223b/",
    icon: linkedinIcon,
  },
  {
    name: "Naukri",
    url: "https://www.naukri.com/mnjuser/profile?id=&altresid",
    icon: naukriIcon,
  },
];




type Props = {
  onSearch: (query: string) => void;
};

export default function SafariHome({ onSearch }: Props) {
  return (
    
    <div className="flex-1 flex flex-col items-center justify-center bg-transparent backdrop-blur-sm">


       <h1
  className="
    text-4xl
    font-medium
    tracking-tight
    mb-8
    text-neutral-800
  "
  style={{
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  }}
>
  Safari
</h1>



      {/* Search Bar */}
      <div className="w-[420px] mb-10">

       

         <input
          autoFocus
          placeholder="Search or enter website name"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch((e.target as HTMLInputElement).value);
            }
          }}
          className="
            w-full px-4 py-3
            backdrop-blur-2xl
            border border-white/50
            rounded-full
            bg-white/50
            shadow-[0_4px_14px_rgba(0,0,0,0.09)]
            outline-none
            text-neutral-800
            focus:ring-2 focus:ring-blue-400/40
          "
        /> 
      </div> 

      {/* Quick Links */}

  
{/* ───── FAVOURITES ───── */}
<div className="w-full flex justify-center mt-12">
  <div className="max-w-5xl">
    <h2 className="mb-4 text-xl font-bold text-black">
      Favourites
    </h2>

    <div className="grid grid-cols-4 gap-4 justify-items-center ">
      {FAVOURITES.map((item) => (
        <span
          key={item.name}
          onClick={() => onSearch(item.url)}
          className="flex flex-col items-center gap-2 focus:outline-none"
        >
          {/* Icon Tile */}
          <div
            className="
              w-16 h-16
              rounded-2xl
              border border-white/40
              bg-white
              shadow-md
              flex items-center justify-center
              hover:scale-105 active:scale-95 transition-transform
              hover:shadow-lg hover:-translate-y-1
            "
          >
            <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur 
                flex items-center justify-center">
  <img
    src={item.icon}
    className="w-10 h-10 object-contain p-0.5"
  />
</div>

          </div>

          {/* Label */}
          <span className="text-xs text-neutral-700">
            {item.name}
          </span>
        </span>
      ))}
    </div>
  </div>
</div>


      </div>
  );
}

