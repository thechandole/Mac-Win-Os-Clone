import { useEffect, useState } from "react";
import { techStack } from "../../../../core/data";

const COMMAND = "thechandole /profile";

export default function CmdContent() {
  const [typed, setTyped] = useState("");
  const [phase, setPhase] =
    useState<"typing" | "running" | "idle">("typing");
  const [progress, setProgress] = useState(0);

  /* ⌨️ typing animation */
  useEffect(() => {
    if (phase !== "typing") return;

    if (typed.length < COMMAND.length) {
      const delay = 80 + Math.random() * 80;
      const t = setTimeout(() => {
        setTyped(COMMAND.slice(0, typed.length + 1));
      }, delay);

      return () => clearTimeout(t);
    }

    setTimeout(() => setPhase("running"), 300);
  }, [typed, phase]);

  /* 📊 fake running output */
  useEffect(() => {
    if (phase !== "running") return;

    if (progress < 100) {
      const t = setTimeout(() => {
        setProgress((p) => Math.min(100, p + Math.ceil(Math.random() * 10)));
      }, 220);

      return () => clearTimeout(t);
    }

    setTimeout(() => setPhase("idle"), 400);
  }, [progress, phase]);

  return (
    <div className="text-green-400 font-mono text-sm mt-3 ml-2 leading-relaxed">
      {/* COMMAND LINE */}
      <div>
        <span className="text-white">C:\Users\Akash&gt; </span>
        <span>{typed}</span>
        {phase === "typing" && <Cursor />}
      </div>

      {/* OUTPUT */}
      {phase !== "typing" && (
        <div className="mt-3 space-y-1">
          <TableOutput />

          <div>Beginning verification phase of system scan.</div>

          {phase !== "idle" && (
            <div>Verification {progress}% complete.</div>
          )}

          {phase === "idle" && (
            <>
              <div className="text-green-400">
      6 of 6 stacks loaded successfully (100%)
    </div>
              <div>
                Windows Resource Protection did not find any integrity violations.
              </div>

              {/* 🟢 IDLE PROMPT */}
              <div className="mt-3">
                <span className="text-white">C:\Users\Akash&gt; </span>
                <Cursor />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* blinking cursor */
function Cursor() {
  return (
    <span className="inline-block w-2 animate-pulse">▋</span>
  );
}

/* profile table output */
function TableOutput() {
  return (
    <>
      <h3 className="m-3 ml-11 mt-5 text-white">Category <span className="ml-8">Technologies</span></h3>
      
                  <h3 className="mb-3 text-white/80">--------------------------------------------------------------------------</h3>
      
              
      
              <div className="space-y-">
                {techStack.map((item) => (
                  <div key={item.category} className="flex gap-3">
                    <span className="text-green-400 ml-2">›</span>
                    <span className="w-24 ml-5 opacity-80">{item.category}</span>
                    <span className="opacity-90">{item.tech}</span>
                  </div>
                ))}
              </div>
      
               <h3 className="mt-4 text-white/80">--------------------------------------------------------------------------</h3>
    </>
  );
}
