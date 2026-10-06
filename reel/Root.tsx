import { Composition } from "remotion";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/latin-800.css";
import { CdiReel } from "./CdiReel";

export const Root = () => (
  <Composition id="CdiReel" component={CdiReel} durationInFrames={600} fps={30} width={1080} height={1920} />
);
