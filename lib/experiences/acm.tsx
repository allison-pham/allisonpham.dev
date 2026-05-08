import { Experience } from "../experiences-data";

const acmExperience = {
  slug: "acm",
  title: "Association for Computing Machinery (ACM) at UC Riverside",
  period: "Sep 2023 - Present (2 yrs 8 mos)",
  role: ["President", "Event Chair", "Board Intern"],
  skills: ["Management", "Events", "Outreach", "Projects", "Professional Development", "Finance", "Marketing"],
  thumbnail: "/logos/acm.svg",
  shortDescription: "Lead student tech initiatives and organized coding events as part of the ACM chapter.",
  oneSentence: "Empowering the next generation of tech leaders through community, mentorship, and hands-on events.",
  sections: [
    {
      id: "intro-opportunities",
      content: (
        <p>
          ACM at UCR is the largest tech student organization on campus. With my board, we identified and created new opportunities for members to grow, collaborate, and lead, including launching new workshops and expanding our mentorship program.
        </p>
      ),
    },

    {
      id: "background-story",
      content: (
        <p>
          My journey with ACM began as a general member, then Board Intern, Event Chair, and eventually as President. Each step taught me the value of community and the impact of empowering others to take initiative.
        </p>
      ),
    },

    {
      id: "org-impact-contributions",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Lead UCR's largest technical organization for computer science</li>
          <li>Deliver opportunities for technical, professional development, and community aspects across a team of 50+ executive board and programs board (directors, leads) members</li>
        </ul>
      ),
    },
  ],
} satisfies Experience;

export default acmExperience;