import { Injector, Logger, common, themes } from "replugged";
import { oaCSS } from "./openAsarSplashCSS";

const inject = new Injector();
const logger = Logger.plugin("JS-Snippets");

function F9(e: { key: string }): void {
  if (e.key === "F9") {
    logger.log("Refreshed theme");
    common.toast.toast("Refreshed Theme");
    themes.reload("com.wmeluna.Lucord");
  }
}

export async function start(): Promise<void> {
  document.body.addEventListener("keyup", F9);
  await oaCSS();
}

export function stop(): void {
  inject.uninjectAll();
  document.body.removeEventListener("keyup", F9);
}
