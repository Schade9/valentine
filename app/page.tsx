"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const hearts = ["💕", "💖", "💗", "💓", "💝", "❤️", "💘", "🌹"];
const funnyMessages = [
  "Nice try! 😏",
  "Nope! 🙈",
  "Can't catch me! 💨",
  "Think again! 😘",
  "Not so fast! 🏃",
  "Keep trying! 😂",
  "Almost! 🤭",
  "Just say yes! 💕",
];

interface FloatingHeart {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
}

interface Confetti {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  size: number;
}

export default function Home() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [noButtonStyle, setNoButtonStyle] = useState<React.CSSProperties>({});
  const [noButtonText, setNoButtonText] = useState("No");
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [escapeCount, setEscapeCount] = useState(0);
  const heartIdRef = useRef(0);
  const confettiIdRef = useRef(0);

  // Create floating hearts
  useEffect(() => {
    const createHeart = () => {
      const newHeart: FloatingHeart = {
        id: heartIdRef.current++,
        emoji: hearts[Math.floor(Math.random() * hearts.length)],
        left: Math.random() * 100,
        size: Math.random() * 20 + 15,
        duration: Math.random() * 5 + 8,
      };

      setFloatingHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 15000);
    };

    // Initial hearts
    for (let i = 0; i < 20; i++) {
      setTimeout(createHeart, i * 500);
    }

    // Continue creating hearts
    const interval = setInterval(createHeart, 800);
    return () => clearInterval(interval);
  }, []);

  // Handle No button escape
  const handleNoHover = useCallback(() => {
    const newCount = escapeCount + 1;
    setEscapeCount(newCount);

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const btnWidth = 120;
    const btnHeight = 50;

    const maxX = vw - btnWidth - 20;
    const maxY = vh - btnHeight - 20;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoButtonStyle({
      position: "fixed",
      left: `${newX}px`,
      top: `${newY}px`,
      transition: "none",
    });

    if (newCount % 2 === 0) {
      setNoButtonText(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
    }

    if (newCount > 3) {
      setYesButtonScale(1 + newCount * 0.1);
    }

    if (newCount === 8) {
      setNoButtonText("Just click Yes! 🥺");
    }
  }, [escapeCount]);

  // Handle Yes click
  const handleYes = () => {
    setShowCelebration(true);
    createConfetti();
  };

  // Create confetti explosion
  const createConfetti = () => {
    const shapes = ["❤️", "💕", "💖", "✨", "🌟", "💗"];

    // First wave
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const newConfetti: Confetti = {
          id: confettiIdRef.current++,
          emoji: shapes[Math.floor(Math.random() * shapes.length)],
          left: Math.random() * 100,
          duration: Math.random() * 2 + 2,
          size: Math.random() * 15 + 10,
        };
        setConfetti((prev) => [...prev, newConfetti]);

        setTimeout(() => {
          setConfetti((prev) => prev.filter((c) => c.id !== newConfetti.id));
        }, 4000);
      }, i * 30);
    }

    // Second wave
    setTimeout(() => {
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          const newConfetti: Confetti = {
            id: confettiIdRef.current++,
            emoji: shapes[Math.floor(Math.random() * shapes.length)],
            left: Math.random() * 100,
            duration: Math.random() * 2 + 2,
            size: Math.random() * 15 + 10,
          };
          setConfetti((prev) => [...prev, newConfetti]);

          setTimeout(() => {
            setConfetti((prev) => prev.filter((c) => c.id !== newConfetti.id));
          }, 4000);
        }, i * 50);
      }
    }, 1000);
  };

  return (
    <>
      {/* Decorative text */}
      <div className="fixed top-[15%] left-[10%] font-[var(--font-playfair)] italic text-[var(--pink-dark)] opacity-15 text-2xl pointer-events-none -rotate-[15deg]">
        xoxo
      </div>
      <div className="fixed bottom-[20%] right-[5%] font-[var(--font-playfair)] italic text-[var(--pink-dark)] opacity-15 text-2xl pointer-events-none rotate-[10deg]">
        be mine
      </div>
      <div className="fixed top-[60%] left-[3%] font-[var(--font-playfair)] italic text-[var(--pink-dark)] opacity-15 text-2xl pointer-events-none -rotate-[5deg]">
        forever
      </div>

      {/* Cupid arrows */}
      <div className="fixed top-[10%] left-[5%] text-4xl opacity-30 animate-[drift_20s_linear_infinite]">
        💘
      </div>
      <div className="fixed top-[70%] right-[8%] text-4xl opacity-30 animate-[drift_20s_linear_infinite] [animation-delay:-5s]">
        💘
      </div>
      <div className="fixed top-[40%] left-[90%] text-4xl opacity-30 animate-[drift_20s_linear_infinite] [animation-delay:-10s]">
        💘
      </div>

      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute opacity-60 animate-[floatUp_linear_infinite]"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`,
              filter: "drop-shadow(0 0 5px rgba(255, 105, 180, 0.3))",
            }}
          >
            {heart.emoji}
          </div>
        ))}
      </div>

      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="fixed top-[-20px] animate-[confettiFall_linear_forwards] z-[100]"
          style={{
            left: `${c.left}%`,
            animationDuration: `${c.duration}s`,
            fontSize: `${c.size}px`,
          }}
        >
          {c.emoji}
        </div>
      ))}

      {/* Question Page */}
      <div
        className={`fixed inset-0 flex flex-col justify-center items-center z-10 p-5 transition-all duration-800 ${
          showCelebration ? "opacity-0 pointer-events-none scale-90" : "opacity-100"
        }`}
      >
        <div className="text-[80px] animate-[pulse_1.5s_ease-in-out_infinite] drop-shadow-[0_10px_30px_rgba(230,57,70,0.4)]">
          💖
        </div>

        <h1 className="font-[var(--font-playfair)] text-[clamp(2.5rem,8vw,5rem)] text-[var(--red-deep)] my-8 text-center leading-tight drop-shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
          Will You Be <em className="text-[var(--pink-dark)]">My Valentine?</em>
        </h1>

        <p className="text-[clamp(1rem,3vw,1.5rem)] text-[var(--red-love)] mb-10 italic text-center max-w-[500px]">
          &quot;Are you a magician? Because whenever I look at you, everyone else disappears.&quot; ✨
        </p>

        <div className="flex gap-10 flex-wrap justify-center items-center min-h-[100px] relative">
          <button
            onClick={handleYes}
            className="group relative px-20 py-8 font-[var(--font-quicksand)] text-2xl font-bold border-none rounded-full cursor-pointer uppercase tracking-widest text-white transition-transform duration-300 hover:scale-110 overflow-hidden animate-[glowPulse_2s_ease-in-out_infinite]"
            style={{
              background: "linear-gradient(145deg, #ff6b8a 0%, var(--red-love) 50%, #c1121f 100%)",
              transform: `scale(${yesButtonScale})`,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 p-20">Yes! 💕</span>
          </button>

          <button
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            className="px-14 py-7 font-[var(--font-quicksand)] text-lg font-semibold border-2 border-gray-300 rounded-full cursor-pointer uppercase tracking-wider text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-all duration-200"
            style={{
              background: "linear-gradient(145deg, #f5f5f5 0%, #e0e0e0 100%)",
              boxShadow: `
                0 4px 15px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.8)
              `,
              ...noButtonStyle,
            }}
          >
            {noButtonText}
          </button>
        </div>
      </div>

      {/* Celebration Page */}
      <div
        className={`fixed inset-0 flex flex-col justify-center items-center z-10 p-5 transition-all duration-800 ${
          showCelebration ? "opacity-100" : "opacity-0 pointer-events-none scale-90"
        }`}
        style={{
          background: "radial-gradient(ellipse at center, var(--cream) 0%, var(--pink-light) 100%)",
        }}
      >
        <div className={showCelebration ? "animate-[zoomIn_0.8s_ease-out]" : ""}>
          <div className="text-[120px] animate-[megaPulse_0.8s_ease-in-out_infinite] drop-shadow-[0_20px_50px_rgba(230,57,70,0.5)] text-center">
            💗
          </div>

          <h1 className="font-[var(--font-playfair)] text-[clamp(3rem,10vw,6rem)] text-[var(--red-deep)] my-5 text-center drop-shadow-[3px_3px_6px_rgba(0,0,0,0.15)]">
            YAY!!!
          </h1>

          <p className="text-[clamp(1.2rem,4vw,2rem)] text-[var(--pink-dark)] mb-8 font-[var(--font-playfair)] italic text-center">
            <span className="inline-block animate-[sparkle_1s_ease-in-out_infinite]">✨</span>
            {" "}I knew you&apos;d say yes!{" "}
            <span className="inline-block animate-[sparkle_1s_ease-in-out_infinite] [animation-delay:0.2s]">✨</span>
          </p>

          <div
            className="max-w-[600px] text-[clamp(1rem,2.5vw,1.3rem)] text-[var(--red-love)] leading-relaxed p-8 rounded-2xl border-2 border-[var(--pink-medium)] text-center mx-auto"
            style={{
              background: "rgba(255,255,255,0.7)",
              boxShadow: "0 10px 40px rgba(255, 105, 180, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <p className="my-4">💕 You just made me the happiest person in the whole wide world! 💕</p>
            <p className="my-4">
              Get ready for the best valentines day, and more love than you can handle!
            </p>
            <p className="my-4">
              🌹 <strong>You + Me = Forever</strong> 🌹
            </p>
            <p className="my-4 mt-6 italic">
              &quot;I love you more than yesterday, but less than tomorrow!!&quot; 🍕❤️
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
