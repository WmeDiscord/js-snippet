import { Logger, common } from "replugged";
const logger = Logger.plugin("JS-Snippets:OA-CSS");
// @ts-expect-error window
const { DiscordNative } = window;
const { users } = common;
let timer: NodeJS.Timeout;

async function inj(): Promise<void> {
  const { id, avatar } = users.getCurrentUser();
  let css = `
  body::before {
    content: url("https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=128");
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
  // https://codepen.io/raykuo/pen/QgaKrr
  let wave = `
  body::after {
    content: "";
    position: absolute;
    left: 50%;
    min-width: 300vw;
    min-height: 300vw;
    background-color: var(--brand-experiment);
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    top: 95%;
    opacity: .5;
    border-radius: 47%;
    animation-duration: 10s;
  }
  
  @keyframes rotate {
    0% {transform: translate(-50%, 0) rotateZ(0deg);}
    50% {transform: translate(-50%, -2%) rotateZ(180deg);}
    100% {transform: translate(-50%, 0%) rotateZ(360deg);}
  }
  `;

  let cached = (await DiscordNative.userDataCache.getCached()) || {};
  cached.WmeSplashCSS = css + wave;
  cached.openasarSplashCSS += cached.WmeSplashCSS;
  logger.log(cached);
  DiscordNative.userDataCache.cacheUserData(JSON.stringify(cached));
}

// wait for OA to load its stuff
async function oaLoad(): Promise<void> {
  // @ts-expect-error window
  if (window.openasar) {
    clearInterval(timer);
    await inj();
  }
}

export function oaCSS(): void {
  timer = setInterval(oaLoad, 1000);
}
