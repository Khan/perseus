import{a as r,j as i}from"./jsx-runtime-FVsy8kgq.js";const a=({path:s,width:t,height:n,style:l={},title:e})=>r("svg",{role:"img","aria-hidden":!e,style:{verticalAlign:"middle",...l},width:`${t/n}em`,height:"1em",viewBox:`0 0 ${t} ${n}`,children:[!!e&&i("title",{children:e}),i("path",{d:s,fill:"currentColor"})]});a.__docgenInfo={description:`A stripped version of Icon.jsx from webapp. Takes an SVG icon and renders it
inline like Font Awesome did.

You can refer to \`icon-paths.ts\` for all available SVG icons.

We assume that the viewBox is cropped and aligned to (0, 0), but icons can
be defined differently. At some point we might want to add these attributes
to \`icon-paths.js\`, but for now this is a fairly safe assumption.

Sample usage:

\`\`\`
const editIcon = {
     path: "M41.209 53.753l5.39 0l0 5.39l3.136 0l6.468-6.517-8.477-8.526-6.517 6.517l0 3.136zm33.173-34.937q-.882-.882-1.862.049l-19.6 19.6q-.931.98-.049 1.862t1.862-.049l19.6-19.6q.931-.98.049-1.862zm-38.563 45.668l0-16.121l37.632-37.632 16.17 16.121-37.632 37.632l-16.17 0zm43.022-12.397l0 10.633q-.049 6.713-4.753 11.417t-11.368 4.704l-46.599 0q-6.713 0-11.417-4.753t-4.704-11.368l0-46.599q0-6.664 4.753-11.417t11.368-4.704l46.599 0q3.528 0 6.566 1.372.833.392.98 1.323t-.49 1.617l-2.744 2.744q-.784.784-1.96.441t-2.352-.343l-46.599 0q-3.675 0-6.321 2.646t-2.646 6.321l0 46.599q0 3.675 2.646 6.321t6.321 2.646l46.599 0q3.675 0 6.321-2.646t2.646-6.321l0-7.056q0-.735.49-1.225l3.577-3.577q.833-.833 1.96-.392t1.127 1.617zm7.203-51.646q2.254 0 3.773 1.568l8.526 8.526q1.568 1.568 1.568 3.822t-1.568 3.773l-5.145 5.145-16.121-16.121 5.145-5.145q1.568-1.568 3.822-1.568z",
     width: 100,
     height: 78.912,
};
<InlineIcon {...editIcon} />
\`\`\``,methods:[],displayName:"InlineIcon",props:{path:{required:!0,tsType:{name:"string"},description:""},height:{required:!0,tsType:{name:"number"},description:""},width:{required:!0,tsType:{name:"number"},description:""},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"",defaultValue:{value:"{}",computed:!1}},title:{required:!1,tsType:{name:"string"},description:""}}};export{a as I};
