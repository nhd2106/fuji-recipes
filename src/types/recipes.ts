import { color, ColorSpaceObject } from './../../node_modules/@types/d3-color/index.d';
export type Recipe = {
    name: string;
    filmSimulation: string;
    cameraModel: string;
    grainEffect: string;
    colorChromeEffect: string;
    colorChromeFxBlue?: string;
    monoChromaticColor?: string;
    whiteBalance?: string;
    dynamicRange?: string;
    toneCurve?: string;
    color?: string;
    sharpness?: string;
    noiseReduction?: string;
    clarity?: string;
    mainImage: string;
    dRangePriority?: string;
    ColorSpace?: string;
    id: string;
}