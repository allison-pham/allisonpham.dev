import SkillTag from '../../components/SkillTag';

export default function AboutPage() {
  return (
    <main className="flex flex-col items-start justify-center px-12 sm:px-36 md:px-52 lg:px-72 xl:px-80 py-20 max-w-6xl mx-auto flex-grow">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold mb-8">About</h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p className="text-lg">
            Studying <b className="font-extrabold text-purple-300">Computer Engineering</b> at UC Riverside while focusing on the intersection of business, product, and UI/UX.
          </p>
          
          <p>
            Innovation, growth, and learning are my passions. I strive to <b className="font-extrabold text-purple-300">create solutions</b> that
            solve problems and empower others. My goal is to leverage technology to make a meaningful <b className="font-extrabold text-purple-300">impact.</b>
          </p>
        </div>
         
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">What I Do</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">{"//"}</span>
              <span>Developing enhanced <b>design systems</b> to strengthen optimization and productivity</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">{"//"}</span>
              <span>Designing impactful user interfaces (UI) in combination with <b>gamification</b></span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">{"//"}</span>
              <span>Optimizing for better <b>efficiency and speed</b> with an emphasis on user experience (UX)</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-purple-400 mt-1">{"//"}</span>
              <span>Building <b>scalable applications</b> and exploring emerging tech</span>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Technical Skills</h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-purple-300">Languages</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <SkillTag>C++</SkillTag>
              <SkillTag>Python</SkillTag>
              <SkillTag>Java</SkillTag>
              <SkillTag>TypeScript</SkillTag>
              <SkillTag>JavaScript</SkillTag>
              <SkillTag>C</SkillTag>
              <SkillTag>SQL</SkillTag>
              <SkillTag>Swift</SkillTag>        
              <SkillTag>HTML/CSS</SkillTag>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-purple-300">Frameworks</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <SkillTag>Next.js</SkillTag>
              <SkillTag>React</SkillTag>
              <SkillTag>Vue.js</SkillTag>
              <SkillTag>Tailwind CSS</SkillTag>
              <SkillTag>Spring Boot</SkillTag>
              <SkillTag>SwifUI</SkillTag>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-purple-300">Developer Tools</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <SkillTag>Docker</SkillTag>
              <SkillTag>AWS</SkillTag>
              <SkillTag>Google Cloud</SkillTag>
              <SkillTag>Firebase</SkillTag>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-purple-300">Libraries</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <SkillTag>PyTorch</SkillTag>
              <SkillTag>TensorFlow</SkillTag>
              <SkillTag>scikit-learn</SkillTag>
              <SkillTag>NumPy</SkillTag>
              <SkillTag>pandas</SkillTag>
              <SkillTag>Matplotlib</SkillTag>
              <SkillTag>Three.js</SkillTag>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-purple-300">Hardware / CAD</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <SkillTag>MATLAB</SkillTag>
              <SkillTag>SPICE</SkillTag>
              <SkillTag>Verilog</SkillTag>
              <SkillTag>FPGA Tools</SkillTag>
              <SkillTag>Arduino</SkillTag>
              <SkillTag>Altium</SkillTag>
              <SkillTag>Autodesk</SkillTag>
              <SkillTag>Qt</SkillTag>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-purple-300">Design</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <SkillTag>Figma</SkillTag>
              <SkillTag>Framer</SkillTag>
              <SkillTag>Spline</SkillTag>
              <SkillTag>Canva</SkillTag>
              <SkillTag>Adobe</SkillTag>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}