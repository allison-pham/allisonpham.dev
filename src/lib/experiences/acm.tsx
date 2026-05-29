import { Experience } from "../main-pages/experiences-layout";

const acmExperience = {
  slug: "acm",
  title: "Association for Computing Machinery (ACM) at UC Riverside",
  period: "Sep 2023 - Present (2 yrs 8 mos)",
  role: ["President", "Event Chair", "Board Intern"],
  skills: ["Management", "Events", "Outreach", "Projects", "Professional Development", "Finance", "Marketing"],
  thumbnail: "/logos/acm.svg",
  shortDescription: "tldr: Lead ACM at UCR across hundreds of students, supporting 80+ events, 6 programs, initiatives, and opportunities.",
  sections: [
    {
      id: "intro-opportunities",
      content: (
        <>
          <p>
            ACM at UCR is the largest tech org on campus rooted in computer science (open to all years, majors, and skill levels).
            ACM's vision is to provide accessible opportunities for technical growth, professional development, and community engagement
              to empower students to achieve their goals and make an impact in the world.
          </p>

          <p>
            Our mission is to create a community that fosters learning, collaboration, and innovation in computer science and engineering.
            We achieve this through a wide range of events, programs, and initiatives that account for the diverse interests of our members.
            ACM preps members for their future careers and foster a space for exploring a passion for tech.
          </p>

          <p>
            As President, I worked with my board to identify and create new opportunities for members to grow and collaborate,
              including launching new events and management systems for internal operations.
          </p>
        </>
      ),
    },

    {
      id: "background-story",
      content: (
        <p>
          My journey with ACM began in fall 2023 as a general member, then Board Intern.
          During winter 2024, I became Event Chair and eventually President in spring 2025.
          Each step taught me the value of community and the impact of empowering others to lead initiatives.
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