export const toolIconMap: Record<string, { icon: string }> = {
  "Anki": { icon: "/tool-icons/anki.svg" },
  "Asana": { icon: "https://asana.com/favicon.ico" },
  "Evernote": { icon: "/tool-icons/evernote.svg" },
  "Goodreads": { icon: "https://www.goodreads.com/favicon.ico" },
  "Google Calendar": { icon: "https://calendar.google.com/googlecalendar/images/favicon_v2014_1.ico" },
  "Google Drive": { icon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png" },
  "Google Keep": { icon: "/tool-icons/google-keep.svg" },
  "Google Sheets": { icon: "/tool-icons/google-sheets.svg" },
  "Jira": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
  "LifeAt": { icon: "/tool-icons/lifeat.svg" },
  "LinkedIn": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" },
  "NotebookLM": { icon: "/tool-icons/notebookLM.svg" },
  "Notion": { icon: "https://www.notion.so/images/favicon.ico" },
  "Obsidian": { icon: "https://obsidian.md/images/obsidian-logo-gradient.svg" },
  "Pinterest": { icon: "/tool-icons/pinterest.svg" },
  "Quizlet": { icon: "https://quizlet.com/favicon.ico" },
  "Raindrop": { icon: "https://raindrop.io/favicon.ico" },
  "RemNote": { icon: "https://www.remnote.com/favicon.ico" },
  "Substack": { icon: "https://substack.com/favicon.ico" },
  "Taskade": { icon: "https://www.taskade.com/favicon.ico" },
  "Todoist": { icon: "https://todoist.com/favicon.ico" },
  "Trello": { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg" },
  "Virtual Cottage": { icon: "/tool-icons/virtual-cottage.svg" },
}

export function getToolIcon(name: string) {
  return toolIconMap[name] ?? null
}