// src/components/WeatherIcons.js

export const SnowflakeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3m-3 12h3m-3-6h3m-6.75 4.5l3-1.732M5.25 6.75l3 1.732m0 0l3 1.732m-3-1.732l3-1.732m6.75 4.5l-3 1.732m0 0l-3 1.732m3-1.732l-3-1.732" />
  </svg>
);

export const LeafIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 8.418a2.25 2.25 0 00-3.182 0l-3.536 3.536a2.25 2.25 0 000 3.182l3.536 3.536a2.25 2.25 0 003.182 0l3.536-3.536a2.25 2.25 0 000-3.182l-3.536-3.536z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75h.008v.008H12v-.008z" />
  </svg>
);

export const SunIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

export const CloudSunIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a4.5 4.5 0 004.5-4.5F22.5 12.75 21.75 12 21 12c-1.5 0-2.25 1.5-3.75 1.5S13.5 12 12 12s-1.5 1.5-3.75 1.5S4.5 12 3 12c-.75 0-1.5.75-1.5 1.5S2.25 15 2.25 15z" />
    </svg>
);