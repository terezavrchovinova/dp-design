import { RevealOnScroll } from '../RevealOnScroll'

export const About = () => {
  const experience = [
    {
      title: 'Graphic Designer – Imper (Saleskit)',
      date: 'Oct 2024 – Present',
      description:
        'Creative graphic work for business materials and presentations.',
    },
    {
      title: 'Graphic Designer & Video Editor – JVS GROUP',
      date: 'Aug 2021 – Present',
      description:
        'Design for exhibitions and concerts, TV commercials, promo videos, motion graphics, editing, social media visuals, HTML5/PPC banners, brochures, and more.',
    },
    {
      title: 'DTP Operator – GZ Media',
      date: 'Nov 2019 – Jun 2021',
      description:
        'Preparation of print materials, color correction, print-ready files.',
    },
    {
      title: 'Graphic Designer – BEEFBROTHERS, S.R.O.',
      date: 'May 2018 – Jun 2018',
      description: 'Short-term design support for branding and campaigns.',
    },
    {
      title: 'Print & Packaging – ART D',
      date: 'May 2017 – Jul 2017',
      description:
        'Studio internship focused on packaging and print materials.',
    },
  ]

  const education = {
    school: 'Secondary School of Multimedia and Promotional Arts (EDUSO)',
    years: '2015 – 2019',
    focus: 'Film and Animation Production',
  }

  const skills = [
    'Online Graphics',
    'Video Production',
    'Video Editing',
    'Motion Graphics',
    'Branding',
    'Photography',
    'DTP',
  ]

  const tools = [
    { name: 'Adobe Photoshop', src: 'src/assets/icons/photoshop.svg' },
    { name: 'Adobe Illustrator', src: 'src/assets/icons/illustrator.svg' },
    { name: 'Adobe InDesign', src: '/src/assets/icons/indesign.svg' },
    { name: 'Adobe After Effects', src: '/src/assets/icons/after-effects.svg' },
    { name: 'Adobe Premiere Pro', src: '/src/assets/icons/premiere-pro.svg' },
    {
      name: 'Adobe Lightroom',
      src: 'src/assets/icons/photoshop-lightroom.svg',
    },
    { name: 'Adobe Dimension', src: '/src/assets/icons/dimension.svg' },
    { name: 'Cinema 4D', src: '/src/assets/icons/cinema-4d.svg' },
    { name: 'Midjourney', src: '/src/assets/icons/midjourney.webp' },
  ]

  const adobeTools = tools.filter((tool) =>
    [
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Adobe InDesign',
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'Adobe Lightroom',
      'Adobe Dimension',
    ].includes(tool.name),
  )

  const otherTools = tools.filter((tool) => !adobeTools.includes(tool))

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <h2
            className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
            data-reveal-child
          >
            About Me
          </h2>

          <p className="text-white text-lg max-w-3xl mx-auto" data-reveal-child>
            I’m a graphic designer and video editor with experience in many
            areas of design including branding, motion graphics, print and
            digital content, and packaging.
          </p>

          {/* Experience */}
          <div className="space-y-4 text-left" data-reveal-child>
            <h3 className="text-2xl font-semibold text-center mb-4">
              Experience
            </h3>
            {experience.map((job, index) => (
              <div
                key={index}
                className="backdrop-blur-md border rounded-xl p-4 shadow-sm"
              >
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h4 className="text-lg font-medium">{job.title}</h4>
                  <span className="text-sm text-white">{job.date}</span>
                </div>
                <p className="text-white mt-1">{job.description}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div data-reveal-child>
            <h3 className="text-2xl font-semibold text-center mb-4">
              Education
            </h3>
            <div className="backdrop-blur-md rounded-xl p-4 max-w-xl mx-auto shadow-sm">
              <h4 className="text-lg font-medium">{education.school}</h4>
              <p className="text-sm text-white">{education.years}</p>
              <p className="text-white mt-1">{education.focus}</p>
            </div>
          </div>

          {/* Skills */}
          <div data-reveal-child>
            <h3 className="text-2xl font-semibold text-center mb-4">Skills</h3>
            <ul className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="p-[2px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                >
                  <div className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium">
                    {skill}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div data-reveal-child>
            <h3 className="text-2xl font-semibold text-center mb-6">
              Tools I Use
            </h3>

            {/* Adobe Tools Row */}
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              {adobeTools.map((tool, index) => (
                <div
                  key={index}
                  className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
                >
                  <img
                    src={tool.src}
                    alt={tool.name}
                    title={tool.name}
                    className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-200"
                  />
                </div>
              ))}
            </div>

            {/* Other Tools Row */}
            <div className="flex flex-wrap justify-center gap-6">
              {otherTools.map((tool, index) => (
                <div
                  key={index}
                  className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
                >
                  <img
                    src={tool.src}
                    alt={tool.name}
                    title={tool.name}
                    className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
