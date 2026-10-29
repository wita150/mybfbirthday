
import React, { useEffect, useRef, useState } from "react";

const GREETING_FIRST_LINE = "Happy Birthday,";
const GREETING_SECOND_LINE = "Sayangku! ♡";
const GREETING_TEXT = `${GREETING_FIRST_LINE} ${GREETING_SECOND_LINE}`;
const PUBLIC_MUSIC_TRACKS = [
  {
    title: "My Love Mine All Mine - Mitski",
    url: "/image/My%20Love%20Mine%20All%20Mine%20(Official%20Lyric%20Video)%20-%20Mitski.m4a",
  },
];
const LETTER_TEXT = [
  "Selamat ulang tahun, sayangku, pacarku, Jhon Andriano Simamora. 🤍",
  "Sayang, di umurmu yang baru ini, aku harap kamu selalu sehat, bahagia, segala pekerjaanmu dilancarkan, dan dimudahkan dalam mengejar semua impianmu. Untuk semua harapan yang masih banyak, semoga satu per satu segera dikabulkan sama Tuhan, yaa.",
  "Sayang, terima kasih ya untuk semua rasa sayangmu selama ini dan seterusnya. Terima kasih juga karena selalu sabar menghadapi setiap mood-ku, hehe. Sehat-sehat ya, sayang. Kita bareng-bareng terus, yaa. Walaupun LDR, aku harap jarak nggak jadi alasan buat kita berhenti saling merayakan. Semoga kita semakin bisa belajar, sama-sama tumbuh di dalam Tuhan, dan semakin mengerti gimana caranya mengatur waktu untuk satu sama lain, supaya kita tetap bisa saling bertukar cerita, baik suka maupun duka.",
  "Sayang, buat apa pun pergumulan yang masih banyak di hatimu, semoga Tuhan segera kasih jalan dan kekuatan buat kamu melewati semuanya, yaa, hasian. Jangan terlalu keras sama diri sendiri, ya, sayang. Aku mungkin nggak selalu bisa ada di sampingmu secara langsung, tapi aku akan selalu ikut mendoakan yang terbaik buatmu. 🤍",
  "Satu lagi, sama aku lebih lama lagi ya, sayang. I love you. ♡",
  "I hope it's always you and me, through every era of our lives. You're my favorite notification, my comfort person, and my favorite kind of forever. I wanna grow with you, laugh with you, and keep falling for you in a million different ways. No matter what happens, I hope we always find our way back to each other. It's you, always you. ♡",
  "With love,\nyour girlfriend, Wita.",
].join("\n\n");

function GiftConfetti({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    const duration = 4350;
    const colors = ["#ff176b", "#ffcf00", "#00d9ff", "#8cff00", "#ff6b00", "#bb35ff", "#ffffff", "#00e6a8", "#ff4fc8"];

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const particles = Array.from({ length: 1800 }, () => {
      return {
        x: width / 2 + (Math.random() - 0.5) * 110,
        y: height * 0.55 + (Math.random() - 0.5) * 70,
        velocityX: (Math.random() - 0.5) * width * 1.35,
        velocityY: (Math.random() - 0.68) * height * 1.5,
        gravity: 28 + Math.random() * 72,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 11,
        sway: 12 + Math.random() * 48,
        swayOffset: Math.random() * Math.PI * 2,
        width: 4 + Math.random() * 8,
        height: 7 + Math.random() * 16,
        delay: Math.random() * 0.3,
        lifetime: 2.9 + Math.random() * 0.85,
        color: colors[Math.floor(Math.random() * colors.length)],
        isRound: Math.random() < 0.2,
      };
    });

    const startedAt = performance.now();
    let previousFrame = startedAt;
    let animationFrame;

    const draw = (now) => {
      const elapsed = now - startedAt;
      const delta = Math.min((now - previousFrame) / 1000, 0.04);
      previousFrame = now;
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        const age = elapsed / 1000 - particle.delay;
        if (age < 0 || age > particle.lifetime) return;

        particle.x += particle.velocityX * delta;
        particle.y += particle.velocityY * delta;
        particle.x += Math.sin(age * 3.2 + particle.swayOffset) * particle.sway * delta;
        particle.velocityY += particle.gravity * delta;
        particle.rotation += particle.spin * delta;

        const fadeIn = Math.min(1, age / 0.16);
        const fadeOut = Math.min(1, (particle.lifetime - age) / 1.1);
        context.globalAlpha = Math.max(0, Math.min(fadeIn, fadeOut));
        context.fillStyle = particle.color;
        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);

        if (particle.isRound) {
          context.beginPath();
          context.arc(0, 0, particle.width / 2, 0, Math.PI * 2);
          context.fill();
        } else {
          context.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height);
        }

        context.restore();
      });

      context.globalAlpha = 1;
      if (elapsed < duration) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      context.clearRect(0, 0, width, height);
    };
  }, [active]);

  return <canvas className="gift-gate__confetti" ref={canvasRef} aria-hidden="true" />;
}

function BackgroundFireworks({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    const colors = ["#ff3b81", "#ffc928", "#37d9f5", "#a4e65b", "#bd72ed", "#ffffff"];

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const createBurst = (startedAt) => {
      const x = width * (0.12 + Math.random() * 0.76);
      const y = height * (0.12 + Math.random() * 0.7);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const particles = Array.from({ length: 48 + Math.floor(Math.random() * 28) }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 45 + Math.random() * 115;

        return {
          x,
          y,
          velocityX: Math.cos(angle) * speed,
          velocityY: Math.sin(angle) * speed,
          gravity: 18 + Math.random() * 28,
          size: 1.5 + Math.random() * 2.5,
          life: 1.25 + Math.random() * 0.65,
          color: Math.random() < 0.18 ? "#fff8d6" : color,
        };
      });

      return { startedAt, particles };
    };

    const startedAt = performance.now();
    let previousFrame = startedAt;
    let nextBurstAt = startedAt + 400;
    let bursts = [createBurst(startedAt)];
    let animationFrame;

    const draw = (now) => {
      const delta = Math.min((now - previousFrame) / 1000, 0.04);
      previousFrame = now;
      context.clearRect(0, 0, width, height);

      if (now >= nextBurstAt) {
        bursts.push(createBurst(now));
        nextBurstAt = now + 850 + Math.random() * 1050;
      }

      bursts = bursts.filter((burst) => now - burst.startedAt < 2100);
      bursts.forEach((burst) => {
        const age = (now - burst.startedAt) / 1000;
        burst.particles.forEach((particle) => {
          if (age >= particle.life) return;

          particle.velocityX *= Math.pow(0.985, delta * 60);
          particle.velocityY = particle.velocityY * Math.pow(0.985, delta * 60) + particle.gravity * delta;
          particle.x += particle.velocityX * delta;
          particle.y += particle.velocityY * delta;

          context.globalAlpha = Math.min(0.78, (particle.life - age) * 0.65);
          context.strokeStyle = particle.color;
          context.fillStyle = particle.color;
          context.shadowColor = particle.color;
          context.shadowBlur = 7;
          context.lineWidth = particle.size;
          context.beginPath();
          context.moveTo(particle.x - particle.velocityX * 0.025, particle.y - particle.velocityY * 0.025);
          context.lineTo(particle.x, particle.y);
          context.stroke();
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size * 0.8, 0, Math.PI * 2);
          context.fill();
        });
      });

      context.globalAlpha = 1;
      context.shadowBlur = 0;
      animationFrame = window.requestAnimationFrame(draw);
    };

    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      context.clearRect(0, 0, width, height);
    };
  }, [active]);

  return <canvas className="background-fireworks" ref={canvasRef} aria-hidden="true" />;
}

export default function BfProjectBirthday() {
    const [isLoading, setIsLoading] = useState(true);
    const [letterOpen, setLetterOpen] = useState(false);
    const [candlesOut, setCandlesOut] = useState([false, false, false]);
    const [pin, setPin] = useState("");
    const [pinError, setPinError] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);
    const [giftOpened, setGiftOpened] = useState(false);
    const [giftBurstDone, setGiftBurstDone] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [typedCharacters, setTypedCharacters] = useState(0);
    const [typedLetterCharacters, setTypedLetterCharacters] = useState(0);
    const [videoPlaybackError, setVideoPlaybackError] = useState(false);

  useEffect(() => {
    const loadingTimeout = window.setTimeout(() => setIsLoading(false), 1800);
    return () => window.clearTimeout(loadingTimeout);
  }, []);

  const memories = [
    { image: "image1.jpeg", alt: "Kenangan foto bersama" },
    { image: "image2.jpeg", alt: "Momen manis bersama" },
    { image: "image3.jpeg", alt: "Kolase foto photobooth berdua", centered: true },
    { image: "image4.jpeg", alt: "Bermain gokart bersama" },
    { image: "image5.jpeg", alt: "Foto berdua di depan cermin" },
    { image: "image6.jpeg", alt: "Kenangan bersama di arena permainan" },
    { image: "image7.jpeg", alt: "Foto berdua di cermin" },
    { image: "image8.jpeg", alt: "Foto-foto kenangan masa kecil", centered: true },
    { image: "image9.jpeg", alt: "Kenangan foto bersama 9" },
    { image: "image10.jpeg", alt: "Kenangan foto bersama 10" },
    { image: "image11.jpeg", alt: "Kenangan foto bersama 11" },
    { image: "image12.jpeg", alt: "Kenangan foto bersama 12" },
    { image: "image13.jpeg", alt: "Kenangan foto bersama 13" },
    { image: "image14.jpeg", alt: "Kenangan foto bersama 14" },
    { image: "image15.jpeg", alt: "Kenangan foto bersama 15" },
  ];

  const hearts = Array.from({ length: 18 }, (_, i) => i);
  const memoryVideoRef = useRef(null);
  const allCandlesOff = candlesOut.every(Boolean);

  useEffect(() => {
    if (!giftBurstDone) return undefined;

    const updateScrollProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 100;
      setScrollProgress(Math.round(Math.min(100, Math.max(0, progress))));
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    const content = document.querySelector(".birthday-content");
    const resizeObserver = new ResizeObserver(updateScrollProgress);
    if (content) resizeObserver.observe(content);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      resizeObserver.disconnect();
    };
  }, [giftBurstDone]);

  useEffect(() => {
    if (!giftBurstDone) return undefined;

    const revealElements = document.querySelectorAll(".birthday-content .birthday-reveal");
    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => {
        element.classList.add("is-revealed");
        if (element.classList.contains("memory-card")) {
          element.classList.add("is-visible");
        }
      });
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-revealed");
        if (entry.target.classList.contains("memory-card")) {
          entry.target.classList.add("is-visible");
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [giftBurstDone]);

  useEffect(() => {
    const video = memoryVideoRef.current;
    if (!giftBurstDone || !video) return undefined;

    let effectActive = true;
    setVideoPlaybackError(false);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch((error) => {
          if (!effectActive) return;
          if (!(error instanceof Error && error.name === "NotAllowedError")) {
            console.error("Video kenangan gagal diputar:", error);
          }
          setVideoPlaybackError(true);
        });
      } else {
        video.pause();
      }
    });
    observer.observe(video);

    return () => {
      effectActive = false;
      observer.disconnect();
    };
  }, [giftBurstDone]);

  useEffect(() => {
    if (!letterOpen) {
      setTypedLetterCharacters(0);
      return undefined;
    }

    let characterCount = 0;
    let typingTimeout;
    const typeNextCharacter = () => {
      characterCount += 1;
      setTypedLetterCharacters(characterCount);

      if (characterCount >= LETTER_TEXT.length) return;

      const typedCharacter = LETTER_TEXT[characterCount - 1];
      const pause = ".!?".includes(typedCharacter) ? 120 : ",;".includes(typedCharacter) ? 55 : 16;
      typingTimeout = window.setTimeout(typeNextCharacter, pause);
    };

    typingTimeout = window.setTimeout(typeNextCharacter, 180);
    return () => window.clearTimeout(typingTimeout);
  }, [letterOpen]);

  useEffect(() => {
    if (!giftBurstDone) return undefined;

    setTypedCharacters(0);
    let characterCount = 0;
    const typingInterval = window.setInterval(() => {
      characterCount += 1;
      setTypedCharacters(characterCount);
      if (characterCount >= GREETING_TEXT.length) {
        window.clearInterval(typingInterval);
      }
    }, 110);

    return () => window.clearInterval(typingInterval);
  }, [giftBurstDone]);

  const enterPinDigit = (digit) => {
    if (pin.length >= 6) return;

    const nextPin = pin + digit;
    setPinError(false);
    setPin(nextPin);

    if (nextPin.length === 6) {
      if (nextPin === "210126") {
        setHasAccess(true);
      } else {
        setPin("");
        setPinError(true);
      }
    }
  };

  const handleKeypadKeyDown = (event) => {
    if (/^\d$/.test(event.key)) {
      event.preventDefault();
      enterPinDigit(event.key);
    } else if (event.key === "Backspace") {
      event.preventDefault();
      setPin((currentPin) => currentPin.slice(0, -1));
      setPinError(false);
    } else if (event.key === "Escape") {
      setPin("");
      setPinError(false);
    }
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (isLoading) {
    return (
      <main className="loading-screen">
        <div className="loading-screen__content" role="status" aria-live="polite">
          <span className="loading-flower" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <b />
          </span>
          <p>Menyiapkan sesuatu yang spesial untukmu...</p>
        </div>
      </main>
    );
  }

  if (!hasAccess) {
    return (
      <main className="pin-gate">
        <section className="pin-gate__content" aria-labelledby="pin-title">
          <h1 id="pin-title">For You, My Love</h1>
          <p className="pin-gate__description">
            Enter the Date we started dating as the login PIN.
          </p>

          <div
            className="pin-gate__keypad-wrap"
            onKeyDown={handleKeypadKeyDown}
          >
            <div
              className="pin-gate__indicators"
              role="status"
              aria-label={`${pin.length} dari 6 angka dimasukkan`}
            >
              {Array.from({ length: 6 }, (_, index) => (
                <span
                  className={`pin-gate__indicator${index < pin.length ? " is-filled" : ""}`}
                  key={index}
                />
              ))}
            </div>

            {pinError && (
              <p className="pin-gate__error" role="alert">
                PIN belum tepat. Coba lagi, ya.
              </p>
            )}

            <div className="pin-gate__keypad" aria-label="Papan ketik PIN">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
                <button
                  className="pin-gate__key"
                  key={digit}
                  onClick={() => enterPinDigit(digit)}
                  type="button"
                >
                  {digit}
                </button>
              ))}
              <button
                className="pin-gate__key pin-gate__key--utility"
                onClick={() => {
                  setPin("");
                  setPinError(false);
                }}
                type="button"
              >
                Hapus
              </button>
              <button
                className="pin-gate__key"
                onClick={() => enterPinDigit("0")}
                type="button"
              >
                0
              </button>
              <button
                aria-label="Hapus angka terakhir"
                className="pin-gate__key pin-gate__key--utility"
                onClick={() => {
                  setPin((currentPin) => currentPin.slice(0, -1));
                  setPinError(false);
                }}
                type="button"
              >
                ⌫
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      <GiftConfetti active={giftOpened} />
      {!giftBurstDone ? (
      <main className={`gift-gate${giftOpened ? " is-open" : ""}`}>
        <section className="gift-gate__content" aria-labelledby="gift-title">
          <p className="eyebrow">A LITTLE SURPRISE FOR YOU</p>
          <h1 id="gift-title">Ada hadiah untukmu</h1>
          <button
            aria-label="Ketuk kotak kado untuk membuka hadiah"
            className={`gift-box${giftOpened ? " is-open" : ""}`}
            disabled={giftOpened}
            onClick={() => {
              setGiftOpened(true);
              window.setTimeout(() => setGiftBurstDone(true), 750);
            }}
            type="button"
          >
            <span className="gift-box__bow" />
            <span className="gift-box__body" />
            <span className="gift-box__lid" />
          </button>
          <p className="gift-gate__hint" aria-live="polite">
            {giftOpened ? "BOOM! ♡" : "Ketuk kadonya untuk membuka ♡"}
          </p>
        </section>
      </main>
      ) : (
    <main className="birthday">
      <div
        aria-label="Progres halaman"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={scrollProgress}
        className="scroll-progress"
        role="progressbar"
      >
        <span style={{ width: `${scrollProgress}%` }} />
      </div>
      <BackgroundFireworks active={giftBurstDone} />
      <div className="floating-hearts">
        {hearts.map((heart) => (
          <span
            key={heart}
            style={{
              left: `${(heart * 37) % 100}%`,
              animationDelay: `${(heart % 8) * 0.8}s`,
              fontSize: `${14 + (heart % 4) * 5}px`,
            }}
          >
            {heart % 2 === 0 ? "♡" : "♥"}
          </span>
        ))}
      </div>

      <div className="birthday-content">
      <section className="hero birthday-slide" id="home" aria-label="Ucapan ulang tahun">
        <div className="hero-text">
          <p className="eyebrow">A SPECIAL DAY FOR SOMEONE SPECIAL</p>
          <h1 aria-label={GREETING_TEXT}>
            <span className="greeting-first-line">
              {GREETING_TEXT.slice(0, Math.min(typedCharacters, GREETING_FIRST_LINE.length))}
              {typedCharacters <= GREETING_FIRST_LINE.length && typedCharacters < GREETING_TEXT.length && <i className="typing-caret" />}
            </span>
            <br />
            <span>
              {typedCharacters > GREETING_FIRST_LINE.length && GREETING_TEXT.slice(GREETING_FIRST_LINE.length + 1, typedCharacters)}
              {typedCharacters > GREETING_FIRST_LINE.length && typedCharacters < GREETING_TEXT.length && <i className="typing-caret" />}
            </span>
          </h1>
          <p className="subtitle">
            Semoga harimu dipenuhi cinta, tawa, dan semua hal baik.
          </p>

          <div className="music-player">
            <div className="music-player__header">
              <span className="music-player__note" aria-hidden="true">♫</span>
              <div className="music-player__track-info">
                <strong>{PUBLIC_MUSIC_TRACKS[0].title}</strong>
              </div>
            </div>

            <div className="music-player__transport">
              <audio
                autoPlay
                controls
                src={PUBLIC_MUSIC_TRACKS[0].url}
              />
            </div>
          </div>
        </div>

        <div className="cake-area">
          <div className="sparkle sparkle-one">✦</div>
          <div className="sparkle sparkle-two">✧</div>
          <div className="cake">
            <div className="cake__candles">
              {[0, 1, 2].map((candle) => (
                <span className={`cake__candle${candlesOut[candle] ? " is-out" : ""}`} key={candle}>
                  <button
                    aria-label={candlesOut[candle] ? `Lilin ${candle + 1} sudah padam` : `Tiup lilin ${candle + 1}`}
                    className="cake__flame"
                    disabled={candlesOut[candle]}
                    onClick={() => {
                      setCandlesOut((current) => current.map((isOut, index) => index === candle ? true : isOut));
                    }}
                    type="button"
                  />
                  {candlesOut[candle] && <i className="cake__smoke" />}
                </span>
              ))}
            </div>
            <div className="cake__body" aria-hidden="true">
              <span className="cake__tier cake__tier--bottom" />
              <span className="cake__tier cake__tier--middle" />
              <span className="cake__tier cake__tier--top" />
              <span className="cake__top-heart">♡</span>
            </div>
            <div className="cake__plate" aria-hidden="true" />
          </div>
          <div className="cake-caption" aria-live="polite">
            {allCandlesOff
              ? "Yeay, God Bless! ✨"
              : "Make a wish bebe! ♡"}
          </div>
        </div>
      </section>

      <section className="letter-section section birthday-slide birthday-reveal" id="letter" aria-label="A Letter From My Heart">
        {!letterOpen ? (
          <>
            <div className="letter-decoration">💌</div>
            <p className="eyebrow">SURAT DARI HATIKU</p>
            <h2>Untuk Kamu, Kesayanganku</h2>
            <p className="section-desc">
              di klik ya, sayangku.♡
            </p>
            <button
              className="main-button"
              onClick={() => setLetterOpen(true)}
            >
              Here 💌
            </button>
          </>
        ) : (
          <article className="love-letter" aria-label="Isi surat ulang tahun">
            {LETTER_TEXT.slice(0, typedLetterCharacters)
              .split("\n\n")
              .filter(Boolean)
              .map((paragraph, index) => (
                <p className={index === 6 ? "letter-sign" : ""} key={index}>
                  {paragraph}
                </p>
              ))}
            {typedLetterCharacters < LETTER_TEXT.length && (
              <i className="typing-caret letter-caret" aria-hidden="true" />
            )}
          </article>
        )}
        </section>

        <section className="memories section birthday-slide" id="memories" aria-label="Our Little Memories">
          <h2 className="birthday-reveal">Our Memories</h2>
          <p className="section-desc birthday-reveal">✦ every moment captured in love ✦</p>

          <div className="memory-showcase">
            <div className="memory-grid">
              {memories.map((memory, index) => (
                <article
                  className={`memory-card card-${index + 1} birthday-reveal`}
                  key={memory.image}
                  style={{ "--memory-delay": `${(index % 3) * 0.12}s` }}
                >
                  <div className="memory-card__float">
                    <div className={`memory-image${memory.centered ? " memory-image--centered" : ""}${memory.image === "image9.jpeg" ? " memory-image--image9" : ""}`}>
                      <img src={`/image/${memory.image}`} alt={memory.alt} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="memory-video section birthday-slide" id="our-video" aria-label="Video kenangan kita">
          <h2 className="birthday-reveal">Our Little Video</h2>
          <p className="section-desc birthday-reveal">A little moment just for us ♡</p>
          <video
            className="memory-video__player birthday-reveal"
            controls
            muted
            playsInline
            preload="metadata"
            ref={memoryVideoRef}
            src="/image/vidkita.mp4"
          >
            Browser kamu tidak mendukung pemutaran video.
          </video>
          {videoPlaybackError && (
            <p className="memory-video__error" role="status">
              Video belum bisa diputar otomatis. Tekan tombol putar untuk memulai.
            </p>
          )}
        </section>

        <section className="birthday-closing section birthday-slide" id="birthday-closing" aria-labelledby="birthday-closing-title">
          <div className="birthday-closing__card birthday-reveal">
            <span className="birthday-closing__heart" aria-hidden="true">♡</span>
            <p className="eyebrow">UNTUK KAMU, SELALU</p>
            <h2 id="birthday-closing-title">Sampai ulang tahun berikutnya</h2>
            <p className="birthday-closing__message">
              Semoga ini jadi satu dari banyak ulang tahun yang bisa kita rayakan bersama.
            </p>
            <p className="birthday-closing__signoff">I love you, always. ♡</p>
            <div className="birthday-closing__actions">
              <button onClick={() => scrollToSection("home")} type="button">Kembali ke atas ↑</button>
              <button
                onClick={() => {
                  setLetterOpen(true);
                  scrollToSection("letter");
                }}
                type="button"
              >
                Baca surat lagi 💌
              </button>
            </div>
          </div>
        </section>

      </div>
    </main>
      )}
    </>
  );
}
