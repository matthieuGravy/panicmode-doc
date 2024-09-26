import "./style.css";
import { PanicCard } from "panicmode";
import { PanicHeader } from "panicmode";
import { PanicJumbo } from "panicmode";
import { PanicRouter } from "panicmode";

import "panicmode/dist/panicmode.css";

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Root element not found");

const header = new PanicHeader("<a href='/'>PanicMode</a>");
const router = new PanicRouter(rootElement, header);

rootElement.appendChild(header.render());

const contentElement = document.createElement("div");
contentElement.id = "content";
rootElement.appendChild(contentElement);

async function loadJsonData(url: string) {
  const response = await fetch(new URL(url, import.meta.url).href);
  if (!response.ok) {
    throw new Error(`Failed to load JSON data from ${url}`);
  }
  return await response.json();
}

router.addRoute(
  "/",
  async () => {
    try {
      const data = await loadJsonData("src/content/home.json");

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

      const panicCard = new PanicCard(
        data.panicCard.title,
        data.panicCard.content,
        data.panicCard.imageSrc,
        data.panicCard.imageAlt,
        data.panicCard.buttonText,
        data.panicCard.buttonLink,
        data.panicCard.buttonClass
      );

      contentElement.innerHTML = "";
      contentElement.appendChild(panicJumbo.render());
      contentElement.appendChild(panicCard.render());
    } catch (error) {
      console.error("Error loading JSON data:", error);
    }
  },
  "Home"
);
router.addRoute(
  "/docs",
  () => {
    contentElement.innerHTML =
      "<h1>Contact Us</h1><p>Get in touch with the PanicMode team.</p>";
  },
  "Docs"
);

router.addRoute(
  "/about",
  () => {
    contentElement.innerHTML =
      "<h1>About PanicMode</h1><p>PanicMode is a UI component library for quick prototyping.</p>";
  },
  "About"
);

router.render();
