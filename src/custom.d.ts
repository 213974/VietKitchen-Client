// src/custom.d.ts

declare module '*.css';

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module "*.svg" {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}