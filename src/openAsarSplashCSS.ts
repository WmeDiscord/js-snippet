import { Logger } from "replugged";
const logger = Logger.plugin("JS-Snippets:OA-CSS");
// @ts-expect-error window
const { DiscordNative } = window;

let css = `
body::before {
  content: url("https://cdn.discordapp.com/avatars/865632950443835392/5022524fc171bd856b0d281115045d54.png?size=128");
  display: block;
  border-radius: 50%;
  overflow: clip;
  margin-bottom: 22px;
}
video {
  display: none;
}
:root #text {
  text-transform: capitalize;
}
`;

async function inj(): Promise<void> {
  let cached = (await DiscordNative.userDataCache.getCached()) || {};
  cached["WmeSplashCSS"] = css;
  cached["openasarSplashCSS"] += cached["WmeSplashCSS"];
  logger.log(cached);
  DiscordNative.userDataCache.cacheUserData(JSON.stringify(cached));
}
export async function oaCSS(): Promise<void> {
  setTimeout(inj, 10500);
}
