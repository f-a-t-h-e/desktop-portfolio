import { windowsStore } from "$lib/windows.store";
import FilePath from "./FilePath";
import FolderPath from "./FolderPath";

export default class DesktopPath {
  private readonly set: (value: DesktopPath) => void;
  constructor(set: (value: DesktopPath) => void) {
    this.set = set;
    // const projects = new FolderPath({
    //   desktop: this,
    //   name: "Projects",
    //   contents: [],
    // })
    const staticProjects = new FolderPath({
      desktop: this,
      name: "Landing & Static pages",
      // parent: projects,
      contents: [],
    });
    const svelteKistProjects = new FolderPath({
      desktop: this,
      name: "SvelteKit Projects",
      // parent: projects,
      contents: [],
    });
    const nextJsProjects = new FolderPath({
      desktop: this,
      name: "NextJs Projects",
      // parent: projects,
      contents: [],
    });
    const reactJsProjects = new FolderPath({
      desktop: this,
      name: "ReactJs Projects",
      // parent: projects,
      contents: [],
    });
    const vanillaJsProjects = new FolderPath({
      desktop: this,
      name: "Vanilla JS Projects",
      // parent: projects,
      contents: [],
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://f-a-t-h-e.github.io/Templates/Elzero:%20HTML%20And%20CSS%20Template%201/`,
        icon: `<svg width="1em" height="1em" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="29.5" y1="47" x2="29.5" y2="154" stroke="#24484F" stroke-width="19"/><circle cx="127" cy="100" r="44" stroke="#10CAB7" stroke-width="20"/></svg>`,
      },
      desktop: this,
      name: `HTML And CSS Template 1`,
      parent: staticProjects,
      fileType: "code",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://f-a-t-h-e.github.io/Templates/Elzero:%20HTML%20And%20CSS%20Template%202`,
        icon: `<img class="w-[1em] h-[1em]" width="1em" height="1em" src="Kasper.png">`,
      },
      desktop: this,
      name: `HTML And CSS Template 2`,
      parent: staticProjects,
      fileType: "code",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://f-a-t-h-e.github.io/Templates/Elzero:%20HTML%20And%20CSS%20Template%203/`,
        icon: `<svg width="1em" height="1em" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5824 33V6.81818H28.6108V10.794H16.3253V17.902H27.7287V21.8778H16.3253V29.0241H28.7131V33H11.5824Z" fill="#2196F3"/></svg>`,
      },
      desktop: this,
      name: `HTML And CSS Template 3`,
      parent: staticProjects,
      fileType: "code",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://f-a-t-h-e.github.io/Templates/Elzero:%20HTML%20And%20CSS%20Template%204/`,
        icon: `<svg width="1em" height="1em" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 33V7H29V11H12.735V18.0068H23.1074V22H12.735V29H17V33H8Z" fill="#2196F3"/><path d="M20 33V24" stroke="black" stroke-width="4"/><path d="M26 33V16" stroke="black" stroke-width="4"/><path d="M32 33V7" stroke="black" stroke-width="4"/></svg>`,
      },
      desktop: this,
      name: `HTML And CSS Template 4`,
      parent: staticProjects,
      fileType: "code",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://my-tasks-board.netlify.app/`,
        icon: `<svg class="logo-svg svelte-19fp6cv" width="1em" height="1em" viewBox="0 0 100 100"><g fill="#ffffff"><rect width="100%" height="100%" rx="10" ry="10"></rect></g><g fill="#e9a23b"><path d="M37.156,88.325c0.055-0.165,5.626-16.541,11.969-32.71c2.241-5.716,4.213-10.482,5.951-14.469  c-6.801-16.531-13.719-30.913-17.194-30.913C29.507,10.233,2.5,89.767,2.5,89.767h34.167L37.156,88.325z M19.753,49.038  c0,0,13.938-35.744,17.978-35.744c3.76-0.003,15.449,29.091,15.449,29.091l-7.337-5.271l-9.375,9.816l-5.946-5.615L19.753,49.038z"></path><path fill="#e9a23b" d="M68.551,24.656c-6.849,0-28.949,65.067-28.949,65.067H97.5C97.5,89.724,75.235,24.656,68.551,24.656z M69.725,59.1  l-8.691-9.099l-6.179,4.883c0,0,10.035-26.772,13.696-26.971c3.742-0.202,16.046,33.141,16.046,33.141l-9.361-7.158L69.725,59.1z"></path></g></svg>`,
      },
      desktop: this,
      name: `challenge-my-task-boardy`,
      parent: svelteKistProjects,
      fileType: "code",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://kanban-task-management-web-app.pages.dev/`,
        icon: `<svg stroke="#635fc7" fill="#635fc7" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm5 2h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m-5 1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm9-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1"></path></svg>`,
      },
      desktop: this,
      name: `kanban-task-management-web-app`,
      parent: svelteKistProjects,
      fileType: "svelte",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://dann-good-coffee.pages.dev/`,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.74 130.27" width="1em" height="1em" fill="#c06522" stroke-width="0"><path d="M16.09,24.79c-.07-4.3-.05-6.4-.09-10.11.92.02,1.4.03,2.41.04,2.43.03,4.31,1.11,4.22,4.88-.09,3.8-1.78,5.32-4.04,5.27-1.05-.03-1.55-.04-2.5-.07ZM40.17,15.47s-.05,0-.09,0c-.79,3.17-1.25,4.5-2.11,7.64,1.82.07,2.7.11,4.42.18-.92-3.18-1.32-4.56-2.22-7.82ZM39.75,68.44c1.43-.27,2.2-1.31,1.84-3.39-.35-2.02-1.4-2.74-2.99-2.62-1.59.11-2.95,1.12-2.41,3.31.56,2.27,2.13,2.98,3.56,2.71ZM42.69,39.49c-2.38.01-4.32,1.46-4.28,5.06.03,3.72,2.05,5.96,4.49,5.87,2.44-.09,4.16-2.62,4.1-6.23-.06-3.49-1.93-4.71-4.31-4.7ZM61.81,43.39c.02,3.51,1.99,6.25,4.48,6.25,2.49,0,4.31-2.94,4.29-6.4-.02-3.34-1.86-4.11-4.35-4.14-2.49-.02-4.44.9-4.42,4.29ZM130.69,54.51c-.61,12.94-9.83,23.57-22.3,25.7-1.14.18-2.14.38-2.88,1.01-.67.54-1.24,13.06-1.41,13.91-2.13,10.42-8.97,20.11-18.58,25.34-9.69,5.27-21.44,10.11-32.68,9.79-9.36-.14-17.62-3.44-25.65-6.88-8.51-3.65-15.65-9.61-20.26-17.19-5.31-8.71-5.5-17.09-5.78-26.04-.14-4.94-.92-15.27-.9-26.62C.26,43.56.03,10.13,0,4.39-.04,2.63,1.52.73,3.18.16c3.11-.41,10.49.13,25.36-.05,11.74-.15,18.45,1.1,26.97.65,9.86-.52,16.22.1,23.84.07,12.18-.04,22.1-.95,25.14-.63.25.03.5.11.71.24,2.64,1.6,1.83,4.78,1.87,7.88.01,1.33.13,10.66.14,11.93,0,.75-.16,5.01.08,5.39.37.78,2.09,1.03,3.27,1.33,12.34,3.07,20.89,14.86,20.13,27.55ZM76.59,10.5c.08,5.08.23,11.99.19,20.36,2.27.04,3.36.06,5.68.07.06-5.62.06-7.26-.01-13.5h.03c2.93,6.24,4.21,7.89,6.79,13.49,3.37-.02,4.81-.04,8.18-.1.09-8.35-.07-16.53-.14-20.82-2.3.1-3.09.14-5.21.22.01,2.57.11,6.83.03,12-.02,0-.04,0-.06,0-2.07-5.14-3.23-9.19-5.54-11.81-3.85.1-6.2.14-9.96.09ZM83.05,66.78c.29-.79.53-1.4.99-2.73,2.04.3,3.2.49,5.08.82.88-2.24,1.41-3.66,2.14-5.63-3.73-.04-6.37-.19-10.06-.05-1.76,6.06-3.1,10.79-6.16,15.21,2.51,1.43,4.25,2.7,6.37,5.03,1.23-1.57,1.99-2.76,3.09-4.6-1.46-.99-2.33-1.47-4.06-2.33.59-1.09.88-1.69,1.43-2.92,1.36.48,2.04.75,3.33,1.29.61-1.24,1.09-2.29,1.45-3.13-1.4-.4-2.15-.6-3.6-.96ZM79.25,59.25c-4,.1-6.75-.24-10.24-.3-.85,4.86-1.56,8.71-2.89,11.97,3.6.96,5.15,1.53,7.82,2.88.68-1.04,1.16-1.91,1.76-3.2-1.75-.56-2.74-.85-4.73-1.35.26-.8.38-1.25.63-2.18,1.54.3,2.5.49,3.83.79.32-.9.64-1.72.77-2.27-1.38-.22-2.48-.39-4.09-.62.05-.55.18-.97.4-2,2.24.22,3.5.4,5.57.54.49-1.67.8-2.81,1.18-4.25ZM61.74,64.12c.15-.88.12-.84.28-1.83,2.09.06,3.22.08,5.11.21.29-1.39.49-2.38.72-3.56-3.31-.03-5.41.13-9.63-.11-.54,4.4-.93,7.75-1.19,10.57,1.45.1,2.16.17,3.58.38.27-1.09.55-1.75.8-3.37,1.56.13,2.34.21,3.88.4.2-.84.3-1.5.5-2.41-1.62-.13-2.43-.19-4.07-.28ZM66.24,33.82c-6.93-.1-11.61,3.69-11.64,9.86-.04,6.4,4.79,11.17,11.73,11.27,7.03.1,11.04-5.73,11.01-11.8-.03-5.95-4.17-9.22-11.09-9.33ZM51.23,61.94c2.06-.08,3.08-.02,5.19.11.13-1.28.24-2.21.35-3.31-3.95-.26-5.83-.08-9.73.11-.04,4.53-.01,7.67.99,10.65,1.41-.14,2.11-.19,3.49-.22-.18-1.11-.1-1.72-.22-3.31,1.53-.04,2.31-.02,3.92.05,0-.77.01-1.4.07-2.22-1.67-.07-2.46-.1-4.07-.04,0-.84-.03-.82.02-1.8ZM53.59,30.7c2.22-.05,3.35-.11,5.76-.14-.06-5.72-.11-7.79-.24-13.59h.03c2.82,5.76,4.3,7.87,7.06,13.62,3.38.06,4.76.13,8.14.22.04-8.39-.1-15.16-.18-20.34-2.27-.05-3.32-.1-5.57-.15.12,3.12.24,6.6.29,11.59-.02,0-.04,0-.06,0-2.26-5.06-3.6-8.4-5.99-11.65-3.75.02-5.51.2-9.2.28-.01,6.09.05,11.65-.04,20.17ZM42.61,34.02c-6.56-.06-11.52,4.12-11.49,10.74.03,6.87,5.01,10.89,11.88,10.69,6.96-.21,10.2-5.38,10.23-11.68.03-6.18-4.06-9.68-10.62-9.75ZM23.8,63.97c1.34-.16,2.41.61,3.05,2.23.03.08.11.27.18.5,1.26-.26,1.94-.4,3.35-.67-.05-.21-.16-.52-.22-.71-.64-2.23-3.41-6.02-7.7-6.05-4.42-.03-6.92,4.41-3.62,10.82,3.17,6.14,7.16,8.12,10.45,5.9,3-2.03,3.43-4.43,2.02-7.64-.07-.16-.18-.42-.31-.69-1.35.32-2,.49-3.21.81.14.27.21.4.24.47.8,1.66.46,2.75-.75,3.29-1.36.61-3.3-.37-4.73-3.44-1.41-3.01-.41-4.63,1.23-4.83ZM40.6,70.96c3.76-.99,5.57-2.7,5.04-6.26-.52-3.49-2.57-5.98-7.13-5.88-4.56.1-8.17,3.38-6.71,7.66,1.51,4.45,5.11,5.46,8.81,4.48ZM28.95,30.5c2.96-.02,4.27,0,7.02.05.43-1.59.65-2.38,1.07-3.93,2.66.07,3.82.1,6.45.18.44,1.55.66,2.34,1.1,3.91,3.11.06,4.43.07,7.48.02-2.77-8.5-4.26-13.65-7.35-20.4-3.39-.18-4.81-.29-8.19-.42-2.84,6.99-4.32,11.59-7.57,20.59ZM9.75,9.72c.11,8.25.17,11.35.29,20.41,3.93.09,4.85.18,8.56.27,6.81.16,10.83-3.46,10.89-10.76.07-6.97-3.82-9.76-11.49-9.81-3.69-.03-4.84-.07-8.26-.1ZM8.55,45.37c.03,6.68,4.15,9.86,9.26,10.08,2.79.12,5.22-.92,5.88-3.01.01,0,.02,0,.03,0-.01,1.21-.09,2.48-.13,2.9,2.21.03,3.76.04,5.86.04-.02-3.62-.03-6.38-.04-10.64-4.24.14-7.11.18-11,.19,0,1.23,0,1.84,0,3.07,1.66,0,2.6,0,4.45-.03,0,.09,0,.14,0,.23-.02,1.91-1.88,3.08-3.67,3.05-2.5-.05-3.99-1.97-4.04-5.84-.05-3.94,1.44-5.96,4.16-5.91,2.04.04,3.86,1.09,3.84,3.07,0,.25,0,.54-.04.82,2.27-.03,3.84-.05,6.09-.12.03-.31.06-.9.06-1.36-.02-4.55-4.22-7.94-10.32-8.07-6.66-.14-10.41,4.46-10.38,11.53ZM97.28,60.38c0-.26-.22-.61-.36-.82-.13-.18-.46-.37-.68-.37-.26,0-.58.25-.71.47-.12.24-.28.46-.35.72-.44,1.33-1.58,4.9-3.41,8.97-1.24,2.76-2.78,5.74-4.51,8.46-1.86,2.98-3.92,5.62-6.17,7.26-1.45-2.8-3.91-5.36-7.18-7.37-2.72-1.67-6.04-2.85-9.66-3.74-3.18-.77-6.54-1.2-10.17-1.2-.3,0-.39.01-.69.01s-.3-.03-.59-.03c-3.62,0-7.03.54-10.21,1.31-3.59.88-6.78,2.2-9.5,3.84-3.28,1.99-5.84,4.39-7.27,7.15-2.29-1.59-4.31-4.34-6.2-7.29-1.73-2.71-3.46-5.58-4.71-8.34-1.83-4.05-2.78-7.69-3.19-9.02-.07-.25-.28-.48-.39-.7-.13-.24-.41-.28-.69-.28h-.03c-.26,0-.56.01-.68.25-.1.18-.26.38-.31.55-.03.05-.05.14-.05.2-.21,1.95-.44,3.97-.25,5.91.2,3.18.2,6.37.42,9.53.21,3.18.48,6.34.78,9.49.3,3.18.47,6.35.94,9.5.51,3.43,2.07,6.42,4.03,9.24,1.79,2.6,3.95,5.22,6.96,7.37,2.25,1.58,4.71,2.89,7.22,4.13,2.44,1.22,5.02,2.25,7.67,3.18,2.56.89,5.2,1.75,7.96,2.39,2.65.59,5.33.72,7.99.72s5.28-.35,7.94-.94c2.75-.67,5.41-1.37,7.99-2.25,2.67-.93,5.19-2.04,7.63-3.24,2.51-1.24,5.02-2.44,7.24-4.04,3.05-2.16,5.49-4.52,7.28-7.11,1.95-2.85,3.09-6.04,3.61-9.48.46-3.14.81-6.3,1.1-9.46.3-3.16.61-6.33.82-9.5.21-3.16.34-6.34.54-9.5.3-1.97.03-3.99-.16-5.95ZM98.82,42.64c-.02-6.02-3.48-8.24-10.86-8.2-3.55.02-5.62.02-8.72-.01-.07,8.37-.04,13.03.01,20.53,2.98.06,4.91.1,8.79.16,7.1.1,10.81-6.17,10.79-12.47ZM107.76,37.96c-.38-.04-.6.27-.6.59-.03.92.18,3.4.18,5.84,0,5.19-.34,16.38-.34,20.07.08,1.05-.13,2.37.44,3.32.47.59,1.29.65,2.1.37,3.23-1.29,6-3.91,7.71-6.94,5.03-8.69.33-20.73-9.5-23.24ZM71.2,89.52c-1.09-1.87-3.37-2.81-6.22-3.01-1.48-.09-6.88-.31-11.69-.41-4.71.09-10.11.52-11.67.61-2.85.2-4.97.89-6.14,2.85-.59,1.08-.73,2.24-1.12,3.31-.59,1.57,0,2.99,1.18,4.27,2.17,2.46,4.68,2.8,7.92,1.14.69-.39,1.4-.76,2.08-1.15,1.18-.78,2.39-1.67,3.67-2.47,1.37-.78,2.82-.94,4.2-.94s2.8.37,4.07,1.16c1.28.78,2.59,1.35,3.87,2.14.69.39,1.36.8,2.04,1.19,3.24,1.57,5.78,1.42,7.94-1.03h.01c1.08-1.37,1.88-2.85,1.19-4.42-.41-1.08-.72-2.27-1.31-3.26ZM88.16,39.49c-.98,0-1.47,0-2.44.01-.11,2.04-.16,3.54-.25,9.73,1.04,0,1.57,0,2.64-.02,2.29-.02,3.94-2.99,3.99-6.35.05-3.33-1.59-3.4-3.94-3.38Z"></path></svg>`,
      },
      desktop: this,
      name: `Dann Good Coffee`,
      parent: svelteKistProjects,
      fileType: "svelte",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://svelte-ecommerce.pages.dev/`,
        icon: `<svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="white"/><g clip-path="url(#clip0_779_23)"><path d="M7.87168 11.7609H14.4051V8.23913H7.87168V4.52174H15.857V1H4V18.6087H7.87168V11.7609Z" fill="#151515"/></g><defs><clipPath id="clip0_779_23"><rect width="12" height="18" fill="white" transform="translate(4 1)"/></clipPath></defs></svg>`,
      },
      desktop: this,
      name: `Freshnesecom`,
      parent: svelteKistProjects,
      fileType: "svelte",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://events-app-nextjs14.vercel.app/`,
        icon: `<svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36.0002 12H21.5184L8.01836 4C7 3 6.49996 1 9.00041 0H44.0002C46.5002 0.999957 46.0002 3 45.0184 4L36.0002 12Z" fill="#624CF5"/><path d="M21.8201 36.001L36.302 36.001L44.802 44.001C45.8203 45.001 46.3203 47.001 43.8199 48.001L8.82012 48.001C6.32012 47.001 6.82012 45.001 7.80196 44.001L21.8201 36.001Z" fill="#624CF5"/><path d="M21 16.822V31.3039L6 39.8039C5 40.8222 3 41.3222 2 38.8218L2 8.82202C2.99996 6.32202 5 6.82202 6 7.80386L21 16.822Z" fill="#FA776C"/><circle cx="30" cy="24" r="6" fill="#FA776C"/></svg>`,
      },
      desktop: this,
      name: `Evently`,
      parent: nextJsProjects,
      fileType: "next",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://reddit-clone-f-a-t-h-e.vercel.app/`,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="1em" height="1em"><circle cx="400" cy="400" fill="#ff4500" r="400"/><path d="M666.8 400c.08 5.48-.6 10.95-2.04 16.24s-3.62 10.36-6.48 15.04c-2.85 4.68-6.35 8.94-10.39 12.65s-8.58 6.83-13.49 9.27c.11 1.46.2 2.93.25 4.4a107.268 107.268 0 0 1 0 8.8c-.05 1.47-.14 2.94-.25 4.4 0 89.6-104.4 162.4-233.2 162.4S168 560.4 168 470.8c-.11-1.46-.2-2.93-.25-4.4a107.268 107.268 0 0 1 0-8.8c.05-1.47.14-2.94.25-4.4a58.438 58.438 0 0 1-31.85-37.28 58.41 58.41 0 0 1 7.8-48.42 58.354 58.354 0 0 1 41.93-25.4 58.4 58.4 0 0 1 46.52 15.5 286.795 286.795 0 0 1 35.89-20.71c12.45-6.02 25.32-11.14 38.51-15.3s26.67-7.35 40.32-9.56 27.45-3.42 41.28-3.63L418 169.6c.33-1.61.98-3.13 1.91-4.49.92-1.35 2.11-2.51 3.48-3.4 1.38-.89 2.92-1.5 4.54-1.8 1.61-.29 3.27-.26 4.87.09l98 19.6c9.89-16.99 30.65-24.27 48.98-17.19s28.81 26.43 24.71 45.65c-4.09 19.22-21.55 32.62-41.17 31.61-19.63-1.01-35.62-16.13-37.72-35.67L440 186l-26 124.8c13.66.29 27.29 1.57 40.77 3.82a284.358 284.358 0 0 1 77.8 24.86A284.412 284.412 0 0 1 568 360a58.345 58.345 0 0 1 29.4-15.21 58.361 58.361 0 0 1 32.95 3.21 58.384 58.384 0 0 1 25.91 20.61A58.384 58.384 0 0 1 666.8 400zm-396.96 55.31c2.02 4.85 4.96 9.26 8.68 12.97 3.71 3.72 8.12 6.66 12.97 8.68A40.049 40.049 0 0 0 306.8 480c16.18 0 30.76-9.75 36.96-24.69 6.19-14.95 2.76-32.15-8.68-43.59s-28.64-14.87-43.59-8.68c-14.94 6.2-24.69 20.78-24.69 36.96 0 5.25 1.03 10.45 3.04 15.31zm229.1 96.02c2.05-2 3.22-4.73 3.26-7.59.04-2.87-1.07-5.63-3.07-7.68s-4.73-3.22-7.59-3.26c-2.87-.04-5.63 1.07-7.94 2.8a131.06 131.06 0 0 1-19.04 11.35 131.53 131.53 0 0 1-20.68 7.99c-7.1 2.07-14.37 3.54-21.72 4.39-7.36.85-14.77 1.07-22.16.67-7.38.33-14.78.03-22.11-.89a129.01 129.01 0 0 1-21.64-4.6c-7.08-2.14-13.95-4.88-20.56-8.18s-12.93-7.16-18.89-11.53c-2.07-1.7-4.7-2.57-7.38-2.44s-5.21 1.26-7.11 3.15c-1.89 1.9-3.02 4.43-3.15 7.11s.74 5.31 2.44 7.38c7.03 5.3 14.5 9.98 22.33 14s16 7.35 24.4 9.97 17.01 4.51 25.74 5.66c8.73 1.14 17.54 1.53 26.33 1.17 8.79.36 17.6-.03 26.33-1.17A153.961 153.961 0 0 0 476.87 564c7.83-4.02 15.3-8.7 22.33-14zm-7.34-68.13c5.42.06 10.8-.99 15.81-3.07 5.01-2.09 9.54-5.17 13.32-9.06s6.72-8.51 8.66-13.58A39.882 39.882 0 0 0 532 441.6c0-16.18-9.75-30.76-24.69-36.96-14.95-6.19-32.15-2.76-43.59 8.68s-14.87 28.64-8.68 43.59c6.2 14.94 20.78 24.69 36.96 24.69z" fill="#fff"/></svg>`,
      },
      desktop: this,
      name: `Reddit-Clone`,
      parent: nextJsProjects,
      fileType: "next",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://admin-dashboard-vmup.onrender.com/`,
        icon: `<svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_779_24)"><rect width="20" height="20" fill="#191F45"/><path d="M5.43466 17V2.45455H14.8949V4.66335H8.0696V8.61222H14.4048V10.821H8.0696V14.7912H14.9517V17H5.43466Z" fill="#FFE3A3"/></g><defs><clipPath id="clip0_779_24"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>`,
      },
      desktop: this,
      name: `ECOMVISION`,
      parent: reactJsProjects,
      fileType: "code",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://f-a-t-h-e.github.io/physics-javascript-game/`,
        icon: `<img class="w-[1em] h-[1em]" width="1em" height="1em" src="/physics-game.png" alt="physics-game">`,
      },
      desktop: this,
      name: `physics-javascript-game`,
      parent: vanillaJsProjects,
      fileType: "code",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://f-a-t-h-e.github.io/Planetary-Defense/`,
        icon: `<img class="w-[1em] h-[1em]" width="1em" height="1em" src="/planetary-defense.png" alt="planetary-defense">`,
      },
      desktop: this,
      name: `Planetary-Defense`,
      parent: vanillaJsProjects,
      fileType: "code",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://f-a-t-h-e.github.io/Space-Shooter/`,
        icon: `<img class="w-[1em] h-[1em]" width="1em" height="1em" src="/space-shooter.png" alt="space-shooter">`,
      },
      desktop: this,
      name: `Space-Shooter`,
      parent: vanillaJsProjects,
      fileType: "code",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://f-a-t-h-e.github.io/Space-Invaders/`,
        icon: `<img class="w-[1em] h-[1em]" width="1em" height="1em" src="/space-invaders.png" alt="space-invaders">`,
      },
      desktop: this,
      name: `Space-Invaders`,
      parent: vanillaJsProjects,
      fileType: "code",
    });
  }
  name: "Desktop" = "Desktop";
  path: "/" = "/";
  contents: { [key: string]: FolderPath | FilePath } = {};
  // _contents: any = {};
  // get contents() {
  //   return this._contents;
  // }
  // set contents(val: { [key: string]: FolderPath | FilePath }) {
  //   this._contents = val;
  //   console.log("sett");

  // }
  gridItems: (FolderPath | FilePath | undefined)[] = [];
  apply() {
    const currentItems = Object.values(this.contents);
    // let newLoc = 0;
    for (let i = 0; i < currentItems.length; i++) {
      let found = false;
      for (let j = 0; j < this.gridItems.length; j++) {
        if (this.gridItems[j] === currentItems[i]) {
          // j = this.gridItems.length;
          found = true;
          break;
        }
      }
      if (found) {
        continue;
      }
      for (let j = 0; j < this.gridItems.length; j++) {
        if (this.gridItems[j]) continue;
        this.gridItems[j] = currentItems[i];
        found = true;
        break;
      }
      if (found) {
        continue;
      }
      alert("Couldn't find a space for the extra file/folder");
    }

    this.set(this);
    windowsStore.refresh();
  }
  moveGridItem(from:number,to:number) {
    if (this.gridItems[to]) {
      alert("Moving to a target is not implemented yet");
      return;
    }
    this.gridItems[to] = this.gridItems[from];
    delete this.gridItems[from];
    this.apply();
  }
  resetGrid(w: number, h: number) {
    const numOfRows = Math.ceil((h - 8) / 87.975);
    const numOfCols = Math.ceil((w - 8) / 87.975);
    if (numOfRows * numOfCols > this.gridItems.length) {
      this.gridItems = this.gridItems.filter((val) => !!val);
      this.gridItems.length = numOfRows * numOfCols;
      this.apply();
    }
  }
}
