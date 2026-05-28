import { Experience } from "../experiences-data";

const citrusHackExperience = {
  slug: "citrus-hack",
  title: "Citrus Hack",
  period: "Dec 2024 - Present",
  role: ["Director", "UI/UX Design & Operations Lead"],
  skills: ["Leadership", "Event Management", "Mentorship", "Technical Communication"],
  thumbnail: "/logos/citrus-hack.svg",
  shortDescription: "Lead student tech initiatives and organized coding events as part of the Citrus Hack organization.",
  sections: [
    {
      id: "intro-opportunities",
      content: (
        <p>
          Citrus Hack is the largest hackathon organization on campus. As President, I identified and created new opportunities for members to grow, collaborate, and lead, including launching new workshops and expanding our mentorship program.
        </p>
      ),
    },

    {
      id: "background-story",
      content: (
        <p>
          My journey with Citrus Hack began as a participant, then as an event chair, and eventually as President. Each step taught me the value of community and the impact of empowering others to take initiative.
        </p>
      ),
    },

    {
      id: "org-impact-contributions",
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
} satisfies Experience;

export default citrusHackExperience;