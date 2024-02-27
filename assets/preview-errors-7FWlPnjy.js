import{d}from"./index-PPLHz8o0.js";let e;const s=new Uint8Array(16);function u(){if(!e&&(e=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!e))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return e(s)}const n=[];for(let E=0;E<256;++E)n.push((E+256).toString(16).slice(1));function c(E,t=0){return n[E[t+0]]+n[E[t+1]]+n[E[t+2]]+n[E[t+3]]+"-"+n[E[t+4]]+n[E[t+5]]+"-"+n[E[t+6]]+n[E[t+7]]+"-"+n[E[t+8]]+n[E[t+9]]+"-"+n[E[t+10]]+n[E[t+11]]+n[E[t+12]]+n[E[t+13]]+n[E[t+14]]+n[E[t+15]]}const a=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),r={randomUUID:a};function I(E,t,i){if(r.randomUUID&&!t&&!E)return r.randomUUID();E=E||{};const R=E.random||(E.rng||u)();if(R[6]=R[6]&15|64,R[8]=R[8]&63|128,t){i=i||0;for(let o=0;o<16;++o)t[i+o]=R[o];return t}return c(R)}var m=class extends Error{constructor(){super(...arguments),this.data={},this.documentation=!1,this.fromStorybook=!0}get fullErrorCode(){let E=String(this.code).padStart(4,"0");return`SB_${this.category}_${E}`}get name(){let E=this.constructor.name;return`${this.fullErrorCode} (${E})`}get message(){let E;return this.documentation===!0?E=`https://storybook.js.org/error/${this.fullErrorCode}`:typeof this.documentation=="string"?E=this.documentation:Array.isArray(this.documentation)&&(E=`
${this.documentation.map(t=>`	- ${t}`).join(`
`)}`),`${this.template()}${E!=null?`

More info: ${E}
`:""}`}},_=(E=>(E.PREVIEW_CLIENT_LOGGER="PREVIEW_CLIENT-LOGGER",E.PREVIEW_CHANNELS="PREVIEW_CHANNELS",E.PREVIEW_CORE_EVENTS="PREVIEW_CORE-EVENTS",E.PREVIEW_INSTRUMENTER="PREVIEW_INSTRUMENTER",E.PREVIEW_API="PREVIEW_API",E.PREVIEW_REACT_DOM_SHIM="PREVIEW_REACT-DOM-SHIM",E.PREVIEW_ROUTER="PREVIEW_ROUTER",E.PREVIEW_THEMING="PREVIEW_THEMING",E.RENDERER_HTML="RENDERER_HTML",E.RENDERER_PREACT="RENDERER_PREACT",E.RENDERER_REACT="RENDERER_REACT",E.RENDERER_SERVER="RENDERER_SERVER",E.RENDERER_SVELTE="RENDERER_SVELTE",E.RENDERER_VUE="RENDERER_VUE",E.RENDERER_VUE3="RENDERER_VUE3",E.RENDERER_WEB_COMPONENTS="RENDERER_WEB-COMPONENTS",E))(_||{}),N=class extends m{constructor(E){super(),this.data=E,this.category="PREVIEW_API",this.code=2,this.documentation="https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#using-implicit-actions-during-rendering-is-deprecated-for-example-in-the-play-function"}template(){return d`
      We detected that you use an implicit action arg during ${this.data.phase} of your story.  
      ${this.data.deprecated?`
This is deprecated and won't work in Storybook 8 anymore.
`:""}
      Please provide an explicit spy to your args like this:
        import { fn } from '@storybook/test';
        ... 
        args: {
         ${this.data.name}: fn()
        }
    `}};export{N as I,I as v};
