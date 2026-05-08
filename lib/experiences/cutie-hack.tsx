import { Experience } from "../experiences-data";

const cutieHackExperience = {
  slug: "cutie-hack",
  title: "Cutie Hack",
  period: "Sep 2023 - Present",
  role: "President, Event Chair, Board Intern",
  skills: ["Leadership", "Event Management", "Mentorship", "Technical Communication"],
  thumbnail: "/logos/cutie-hack.svg",
  shortDescription: "Lead student tech initiatives and organized coding events as part of the Cutie Hack organization.",
  oneSentence: "Empowering the next generation of tech leaders through community, mentorship, and hands-on events.",
  sections: [
    {
      id: "intro-opportunities",
      title: "Intro & Opportunities",
      content: (
        <p>
          Cutie Hack is the largest hackathon organization on campus. As President, I identified and created new opportunities for members to grow, collaborate, and lead, including launching new workshops and expanding our mentorship program.
        </p>
      ),
    },
    {
      id: "background-story",
      title: "Background Story",
      content: (
        <p>
          My journey with Cutie Hack began as a participant, then as an event chair, and eventually as President. Each step taught me the value of community and the impact of empowering others to take initiative.
        </p>
      ),
    },
    {
      id: "org-impact-contributions",
      title: "Org Impact & My Contributions",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Lead UCR's largest technical organization for computer science</li>
          <li>Deliver opportunities for technical, professional development, and community aspects across a team of 50+ executive board and programs board (directors, leads) members</li>
          <li>Expanded mentorship program, pairing 50+ students with industry mentors</li>
          <li>Invited industry professionals for guest lectures and networking sessions</li>
        </ul>
      ),
    },
  ],
};

export default cutieHackExperience;