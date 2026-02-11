/// <reference types="vite/client" />

// Explicitly define SVG component type if you use SVGR or similar, 
// otherwise vite/client handles the string import.
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
}