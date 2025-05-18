/// <reference types="vite/client" />

// Type definitions for modules without type declarations
declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

declare module 'react-hot-toast';
declare module 'lucide-react';
declare module 'framer-motion';
declare module 'html-to-image';
declare module 'jspdf';
// Add any other missing module declarations here

// Global type augmentations
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
