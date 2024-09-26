import "./style.css";
// Do not forget to import the PanicMode CSS file
import "panicmode/dist/panicmode.css";

// Import the PanicRouter, PanicHeader they work together
import { PanicRouter } from "panicmode";
import { PanicHeader } from "panicmode";

// Import for example the PanicJumbo component
import { PanicJumbo } from "panicmode";

// Import the head function to update the title of the page
import { updateHeadPanic } from "panicmode";

// Function to load JSON data from a URL
import { loadJsonData } from "@/utils/loadJsonData.ts";

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Root element not found");

// Add a link to the header to navigate back to the home page
const header = new PanicHeader("<a href='/'>Matthieu Gravy</a>");
// Create a new PanicRouter instance
const router = new PanicRouter(rootElement, header);

// Append the header to the root element
rootElement.appendChild(header.render());

// Create a new div element to hold the content
const contentElement = document.createElement("div");
contentElement.id = "content";
rootElement.appendChild(contentElement);

// Add a route for the home page, this route update the header and content
router.addRoute(
  "/",
  async () => {
    try {
      updateHeadPanic(
        "MG | Home",
        "You can use this to describe your page",
        "/typescript.svg"
      );
      const data = await loadJsonData("home.json");

      const panicJumbo = new PanicJumbo(
        data.panicJumbo.title,
        data.panicJumbo.titleTag,
        data.panicJumbo.contentTag,
        data.panicJumbo.content,
        data.panicJumbo.buttonText,
        data.panicJumbo.buttonTag,
        data.panicJumbo.buttonClass,
        data.panicJumbo.buttonLinkText,
        data.panicJumbo.buttonLink
      );

      contentElement.innerHTML = "";
      contentElement.appendChild(panicJumbo.render());
    } catch (error) {
      console.error("Error loading JSON data:", error);
    }
  },
  "Home"
);

router.addRoute(
  "/about",
  async () => {
    try {
      updateHeadPanic(
        "MG | About",
        "You can use this to describe your page",
        "/vite.svg"
      );
      const data = await loadJsonData("about.json");

      const aboutJumbo = new PanicJumbo(
        data.panicJumbo.title,
        data.panicJumbo.titleTag,
        data.panicJumbo.contentTag,
        data.panicJumbo.content,
        data.panicJumbo.buttonText,
        data.panicJumbo.buttonTag,
        data.panicJumbo.buttonClass,
        data.panicJumbo.buttonLinkText,
        data.panicJumbo.buttonLink,
        () => {
          alert("AboutJumbo clicked!");
        }
      );

      contentElement.innerHTML = "";
      contentElement.appendChild(aboutJumbo.render());
    } catch (error) {
      console.error("Error loading JSON data:", error);
    }
  },
  "About"
);

// Do not forget to call render to render the current route
router.render();
