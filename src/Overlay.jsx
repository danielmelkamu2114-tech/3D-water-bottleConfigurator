import React from 'react';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { state } from './Store';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { useProgress } from '@react-three/drei';
import SplitText from 'gsap/src/SplitText';

gsap.registerPlugin(ScrollTrigger);


const Overlay = () => {
  const snap = useSnapshot(state)
  
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',     
    });
  };

  

  return (<>
  <div className="relative w-full">
   <section className='relative w-full z-20'>

     
       <Hero/>
       {snap.intro ? <><Navbar /> <Section1/> </>: (<><Navbar/><Customize/></>)}
   </section>
   </div>


    </>
  );
};

export default Overlay;



function Navbar(){ 
  const nav = useRef(null)
    
   useGSAP(()=>{
      gsap.from(nav.current,{
          yPercent:-100,
          duration:2,
          
          ease:'none'
      })
     })
  
  return(<nav ref={nav} className="fixed pointer-events-auto top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-md ">
      <div className="text-xl font-bold text-blue-500">Bottles</div>
        <ul className="flex items-center  gap-6 text-md font-medium text-black/50">
          <li className="cursor-pointer hover:text-black/70">Home</li>
          <li className="cursor-pointer hover:text-black/70">About</li>
          <li className="cursor-pointer hover:text-black/70">Shop</li>
        </ul>
      <button className="text-md  text-white bg-blue-500 rounded-full px-9 py-1 hover:-translate-y-0.2 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 active:translate-y-0">Order</button>
</nav>)}




function Hero(){
  const heroRef = useRef(null);
  const containerRef = useRef(null)
  const text1 =useRef(null)
   const split1text = new SplitText(text1.current, {type:"lines"})


 useGSAP(
    () => {
      gsap.to(heroRef.current, {
        yPercent: -100, // Slides completely off the top of the viewport
        ease: 'none',   // Ensures 1:1 direct tracking with the scroll wheel
        scrollTrigger: {
          trigger: containerRef.current,
          
          start: 'top top',    // Starts the instant you start scrolling
          end: 'bottom top',       // Finishes after exactly 1 full screen of scrolling
          scrub: true,         // Directly tied to scrollbar (no lag)
              
          onLeave: () => {
            if (heroRef.current) heroRef.current.style.pointerEvents = 'none';
          },
          onEnterBack: () => {
            if (heroRef.current) heroRef.current.style.pointerEvents = 'auto';
          },      // Pins container so it doesn't jump away
        },
      });
    
    gsap.from(heroRef.current, {
    yPercent:-100,
    duration:1,
    opacity:0, })
    
    
    
    },
    { scope: containerRef }


    
  );
  return (<>
    <div id="hero-section" ref={containerRef} className="h-screen w-full pointer-events-none" />
    
    <section ref={heroRef} className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-between bg-linear-to-tr from-blue-600 to to-blue-300 px-6 py-10">
      {/* Spacer to keep center text properly vertically centered */}
      <div />

      {/* Centered Heading */}
      <h2 ref={text1} className="text-center text-lg font-bold tracking-wide text-white sm:text-xl md:text-2xl">
        Use the Bottle, Guard the planet!!
      </h2>

      {/* Bottom Scroll Indicator (Static / Non-button) */}
      <div className="flex flex-col items-center gap-2 text-white/80">
        <span className="text-xs font-medium uppercase tracking-widest">
          Scroll Down
        </span>

        {/* Animated Chevron Down */}
        <svg
          className="h-6 w-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section></> )
}


  function Section1() {
  const containerRef = useRef(null);
  const text1 = useRef(null);
  const text2 = useRef(null);
  const text3 = useRef(null); // Button wrapper
  const text4 = useRef(null);
  const text5 = useRef(null);

  const snap = useSnapshot(state);
  const { progress, active } = useProgress();

  useGSAP(
    () => {
      // Don't initialize if 3D assets are still loading
      if (active || progress < 100) return;

      // Create SplitText only on elements with raw text lines
      const split1 = new SplitText(text1.current, { type: 'lines' });
      const split2 = new SplitText(text2.current, { type: 'lines' });
      const split4 = new SplitText(text4.current, { type: 'lines' });
      const split5 = new SplitText(text5.current, { type: 'lines' });

      // Master Timeline triggered when entering the 2nd page
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%', // Starts animating as soon as 20% of Section1 enters from the bottom
          toggleActions: 'play none none reverse', // Plays forward on scroll down, reverses on scroll up
        },
      });

      // Animate lines in sequence
      tl.from(split1.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
      })
        .from(
          split2.lines,
          {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.8' // Overlaps with previous animation
        )
        .from(
          text3.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'expo.out',
          },
          '-=0.5'
        )
        .from(
          split5.lines,
          {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        .from(
          split4.lines,
          {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.8'
        );

      // Clean up SplitText nodes if component unmounts or dependencies change
      return () => {
        split1.revert();
        split2.revert();
        split4.revert();
        split5.revert();
      };
    },
    { scope: containerRef, dependencies: [snap.intro, active, progress] }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-1 justify-between p-20 pt-10 items-center w-full"
    >
      <div className="flex pointer-events-auto flex-col gap-10 pt-20">
        <h2 ref={text1} className="text-5xl font-bold">
          Drink water <br /> not plastic
        </h2>

        <h2 ref={text2} className="text-sm">
          Every sip should be pure hydration, not microplastics <br /> and chemical aftertaste. Ditching single-use plastic <br /> keeps your water crisp, ice-cold, and toxin-free all day <br /> nourishing your body while cutting everyday waste.
        </h2>

        <div ref={text3} onClick={() => { state.intro = false; }}>
          <button
            onClick={() => { state.intro = false; }}
            className="flex flex-1 items-center text-md duration-400 gap-3 text-white bg-blue-400 rounded-full w-fit px-5 py-3 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/70 active:translate-y-0"
          >
            <svg
              className="h-4 w-4 text-white items-center"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <span>Customize</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 self-end ">
        <h2
          ref={text5}
          className="bg-amber-400 self-end text-6xl font-bold bg-gradient-to-r from-blue-600/50 via-indigo-600/60 to-cyan-500/80 bg-clip-text text-transparent inline-block pb-3"
        >
          Stay  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hydrated
        </h2>
      </div>

      <div ref={text4} className="text-sm pointer-events-auto">
        <h2 className="font-bold">Eco-Friendly</h2>
        <h2>
          Cuts out hundreds of disposable plastics <br /> each year with every single refill.
        </h2>
        <h2 className="font-bold">Vibrant Colors</h2>
        <h2>
          Available in a stunning range of shades <br /> to match your everyday personal style.
        </h2>
      </div>
    </section>
  );
}function Customize(){


    const text1 = useRef()
    const text2 = useRef()
    const text3 = useRef()
 
    const snap = useSnapshot(state)
    const { progress, active } = useProgress()

  
  
  
   useGSAP(()=>{
 const split1text = new SplitText(text1.current, {type:"lines"})
 const split2text = new SplitText(text2.current, {type:"lines"})
 if (active || progress < 100) return


  if(snap.intro ==false) {gsap.from(split1text.lines, {
    yPercent:100,
    duration:1.3,
    opacity:0,
    stagger: 0.1,
     })

    gsap.from(split2text.lines, {
    yPercent:100,
    duration:1,
    opacity:0,
    stagger: 0.1,
    delay:0.3 })
     gsap.to(text3.current, {
   
    opacity:100,
     duration:1.3,
     ease:'expo.out'
     })
     }
     
  },[snap.intro,active, progress])



  
  // 1. Give each variant the exact hex code used by Three.js
  const colorVariants = [
    { id: 'blue', name: 'Ocean Blue', hex: '#0080ff', bgClass: 'bg-[#0080ff]' },
    { id: 'white', name: 'Earth white', hex: '#ffffff', bgClass: 'bg-[#808080]' },
    { id: 'black', name: 'Matte Black', hex: '#171717', bgClass: 'bg-neutral-900' },
    { id: 'brown', name: 'Earth Brown', hex: '#8B4513', bgClass: 'bg-[#8B4513]' },
  ];

  // Logo options (placed inside public/)
  const logoVariants = [
    { id: 'logo1', name: 'Minimal Mark', path: '/logo1.png', preview: '/logo1.png' },
    { id: 'logo2', name: 'Badge Crest', path: '/logo2.png', preview: '/logo2.png' },
    { id: 'logo3', name: 'Typography', path: '/logo3.png', preview: '/logo3.png' },
  ];

  // 2. Read state via Valtio snapshot
 

  return (
    <section className="min-h-screen flex flex-1 justify-between p-20 pt-10 items-center w-full">
      <div className="flex flex-col gap-10 pt-20">
        <div ref={text1}>
          <h2 className="text-5xl font-bold">
            Create Your <br /> Custom Bottle
          </h2>
          <h2 ref={text2} className="text-sm">
            Pick your colors, swap parts, and <br /> click-and-drag to view your design from every angle.
          </h2>
        </div>

        <div
          ref={text3}
          onClick={() => {
            state.intro = true;
          }}
        >
          <button className="pointer-events-auto text-md text-white bg-blue-300 rounded-full px-9 py-1 hover:-translate-y-0.2 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 active:translate-y-0">
            Go back
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 self-end">
        <h2 className="font-bold mb-2">Color-Picker</h2>
        <div className="flex items-center gap-3">
          {colorVariants.map((color) => {
            // Selected state checks the current active hex in Valtio
            const isSelected = snap.bottleColor.toLowerCase() === color.hex.toLowerCase();

            return (
              <button
                key={color.id}
                type="button"
                onClick={() => {
                  state.bottleColor = color.hex; // Directly mutates Valtio proxy
                }}
                aria-label={color.name}
                className={`pointer-events-auto relative h-7 w-7 rounded-full transition-all duration-300 ease-out focus:outline-none ${
                  color.bgClass
                } ${
                  isSelected
                    ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-blue-500 shadow-md'
                    : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-6">
  <h2 className="font-bold">Select Logo</h2>
  
  <div className="flex items-center gap-3">
    {logoVariants.map((logo) => {
      const isSelected = snap.logoTexture === logo.path;

      return (
        <button
          key={logo.id}
          type="button"
          onClick={() => {
            // Toggle selection: click again to clear decal, or switch logo
            state.logoTexture = isSelected ? '' : logo.path;
          }}
          aria-label={logo.name}
          className={`pointer-events-auto relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md p-1.5 transition-all duration-200 border ${
            isSelected
              ? 'border-blue-500 scale-110 shadow-md ring-2 ring-blue-400/50'
              : 'border-white/20 hover:border-white/50 opacity-75 hover:opacity-100 hover:scale-105'
          }`}
        >
          <img
            src={logo.preview}
            alt={logo.name}
            className="h-full w-full object-contain filter drop-shadow"
          />
        </button>
      );
    })}

    {/* Clear/None option */}
    <button
      type="button"
      onClick={() => { state.logoTexture = ''; }}
      className={`pointer-events-auto text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
        !snap.logoTexture
          ? 'border-blue-500 text-blue-500 bg-blue-50/10'
          : 'border-white/20 text-white/60 hover:text-white'
      }`}
    >
      None
    </button>
  </div>
</div>
    </section>
  );}