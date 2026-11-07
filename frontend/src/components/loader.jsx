
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-[300px]">
      <div className="relative w-[200px] h-[200px]">

        <div className="absolute inset-0 animate-[rotate-move_2s_ease-in-out_infinite]"
          style={{ filter: "url(#goo)" }}>

          <div className="dot dot-1 absolute w-[70px] h-[70px] rounded-full bg-[#ffc400]" />
          <div className="dot dot-2 absolute w-[70px] h-[70px] rounded-full bg-[#0051ff]" />
          <div className="dot dot-3 absolute w-[70px] h-[70px] rounded-full bg-[#ff1717]" />

        </div>

        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
              />
            </filter>
          </defs>
        </svg>
      </div>

      <style>{`
        .dot {
          top: 50%;
          left: 50%;
          margin: -35px;
        }

        .dot-1 {
          animation: dot-one 2s ease-in-out infinite;
        }

        .dot-2 {
          animation: dot-two 2s ease-in-out infinite;
        }

        .dot-3 {
          animation: dot-three 2s ease-in-out infinite;
        }

        @keyframes rotate-move {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes dot-one {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-45px, -25px); }
        }

        @keyframes dot-two {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(45px, -25px); }
        }

        @keyframes dot-three {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, 45px); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
