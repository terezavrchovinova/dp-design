import { RevealOnScroll } from '../RevealOnScroll'

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 md:px-12"
    >
      <RevealOnScroll>
        {/* Heading */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold leading-tight text-gradient opacity-0"
          data-reveal-child
        >
          Hi, I'm <br />
          Daniela Plamínková
        </h1>

        {/* Subheading */}
        <p
          className="text-white mt-25  mx-auto mb-25 opacity-0"
          data-reveal-child
        >
          I'm a graphic designer and video editor with experience in a wide
          range of areas within graphic design.
        </p>

        {/* CTA buttons */}
        <div
          className="flex justify-center space-x-4 opacity-0"
          data-reveal-child
        >
          {/* Primary CTA */}
          <a
            href="#projects"
            className="relative inline-block py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-400 bg-[length:200%_auto] bg-left hover:bg-right transition-all duration-300 ease-out shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute top-0 left-[-75%] w-1/2 h-full bg-gradient-to-r from-white/30 to-transparent skew-x-[-20deg] transition-all duration-500 ease-in-out hover:left-[130%]"></span>
          </a>

          {/* Secondary CTA */}
          <a
            href="#contact"
            className="relative inline-block py-3 px-6 rounded-xl font-semibold text-blue-400 border border-blue-500/50 transition-all duration-300 ease-out hover:text-white hover:bg-blue-500/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="relative z-10">Contact Me</span>
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_70%)] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
          </a>
        </div>
      </RevealOnScroll>

      {/* Decorative animated blobs */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-pink-400 opacity-20 blur-3xl rounded-full animate-blob z-0"></div>
      <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-blue-500 opacity-20 blur-3xl rounded-full animate-blob animation-delay-2000 z-0"></div>
    </section>
  )
}
