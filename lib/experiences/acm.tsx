import { Experience } from "../experiences-data";


const acmExperience = {
  slug: "acm",
  title: "Association for Computing Machinery (ACM)",
  period: "2023 - Present",
  role: "President",
  skills: ["Leadership", "Event Management", "Mentorship", "Technical Communication"],
  thumbnail: "/logos/acm.svg",
  shortDescription: "Led student tech initiatives and organized coding events as part of the ACM chapter.",
  oneSentence: "Empowering the next generation of tech leaders through community, mentorship, and hands-on events.",
  sections: [
    {
      id: "intro-opportunities",
      title: "Intro & Opportunities",
      content: (
        <p>
          ACM at UCR is the largest tech student organization on campus. As President, I identified and created new opportunities for members to grow, collaborate, and lead, including launching new workshops and expanding our mentorship program.
        </p>
      ),
    },
    {
      id: "background-story",
      title: "Background Story",
      content: (
        <p>
          My journey with ACM began as a participant, then as an event chair, and eventually as President. Each step taught me the value of community and the impact of empowering others to take initiative.
        </p>
      ),
    },
    {
      id: "org-impact-contributions",
      title: "Org Impact & My Contributions",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Organized and hosted 5+ coding workshops for 100+ students</li>
          <li>Coordinated a university-wide hackathon with 200+ participants</li>
          <li>Expanded mentorship program, pairing 50+ students with industry mentors</li>
          <li>Invited industry professionals for guest lectures and networking sessions</li>
        </ul>
      ),
    },
  ],
};

export default acmExperience;
