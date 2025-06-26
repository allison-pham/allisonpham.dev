export default function ExperiencesPage() {
  return (
    <main className="flex flex-col items-start justify-center px-12 sm:px-36 md:px-52 lg:px-72 xl:px-80 py-20 max-w-6xl mx-auto flex-grow">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold mb-8">Experiences</h1>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-white">Computer Science & Engineering</h2>
            <div className="space-y-8">

              <div className="border-l-2 border-purple-400 pl-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h3 className="text-xl font-semibold text-purple-300">Lead Systems Engineer</h3>
                  {/* <span className="text-sm text-gray-400 mt-1 sm:mt-0">Date</span> */}
                </div>
                <p className="text-gray-300 font-medium mb-2">NASA L&apos;SPACE Program</p>
                {/* <p className="text-gray-300 font-medium mb-2">NASA L'SPACE Program • Location</p> */}
                <p className="text-gray-300 mb-3 leading-relaxed">
                  Product development and system-level projects for <b>space communication</b>.
                </p>
                {/* <div className="flex flex-wrap gap-2">
                  <SkillTag>Skill</SkillTag>
                </div> */}
              </div>

              <div className="border-l-2 border-purple-400 pl-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h3 className="text-xl font-semibold text-purple-300">Research & Development Software Engineer Intern</h3>
                </div>
                <p className="text-gray-300 font-medium mb-2">Nucleo</p>
                <p className="text-gray-300 mb-3 leading-relaxed">
                  Implemented AI solutions in the <b>neurotech</b> field.
                </p>
              </div>

              <div className="border-l-2 border-purple-400 pl-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h3 className="text-xl font-semibold text-purple-300">Computer Science Grader</h3>
                </div>
                <p className="text-gray-300 font-medium mb-2">University of California, Riverside</p>
                <p className="text-gray-300 mb-3 leading-relaxed">
                  Computer science course grader for <b>120+ undergraduate students</b> across 10+ assignments, quizzes, and exams.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-white">Organization Involvement (Current)</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">{"//"}</span>
                <div>
                  <p className="text-gray-300">
                    <b className="text-purple-300">President</b> - Association for Computing Machinery (ACM)
                  </p>
                  {/* <p className="text-sm text-gray-400">Description</p> */}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">{"//"}</span>
                <div>
                  <p className="text-gray-300">
                    <b className="text-purple-300">Director</b> - Citrus Hack
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">{"//"}</span>
                <div>
                  <p className="text-gray-300">
                    <b className="text-purple-300">Director</b> - Cutie Hack
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">{"//"}</span>
                <div>
                  <p className="text-gray-300">
                    <b className="text-purple-300">Treasurer</b> - Gamespawn
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">{"//"}</span>
                <div>
                  <p className="text-gray-300">
                    <b className="text-purple-300">Committee</b> - Associated Students of UC Riverside (ASUCR)
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-white">Organization Involvement (Previous)</h2>
            <div className="space-y-6">

              <div className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">{"//"}</span>
                <div>
                  <p className="text-gray-300">
                    <b className="text-purple-300">Bourns College of Engineering Senator</b> - Associated Students of UC Riverside (ASUCR)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">{"//"}</span>
                <div>
                  <p className="text-gray-300">
                    <b className="text-purple-300">Event Chair</b> - Association for Computing Machinery (ACM)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">{"//"}</span>
                <div>
                  <p className="text-gray-300">
                    <b className="text-purple-300">Operations & UI/UX Lead</b> - Citrus Hack
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">{"//"}</span>
                <div>
                  <p className="text-gray-300">
                    <b className="text-purple-300">Operations Lead</b> - Cutie Hack
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">{"//"}</span>
                <div>
                  <p className="text-gray-300">
                    <b className="text-purple-300">Project & Workshop Coordinator</b> - Gamespawn
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}