import{j as e}from"./jsx-runtime-63Ea5SlK.js";import{B as m}from"./index-_CVl-B2F.js";import{V as i}from"./index-_3CKOwHy.js";import{P as w}from"./index-7Z-R4z4z.js";import{S as b}from"./index-o999uk82.js";import{S as x}from"./article-renderer-m0kaLliM.js";import{H as d}from"./index-4dAUYsag.js";import{r as o}from"./index-6oxdNXpR.js";import{S as j,R as l}from"./side-by-side-FUSR9ELs.js";import{s as k}from"./util-YkAIiTyM.js";import"./index-default-4_ZsnO94.js";import"./random-util-cSB29zlT.js";import"./jquery-5v7aFUvu.js";import"./phet-simulation-t69N-Bc7.js";import"./dependencies-CP7Uh8Kq.js";import"./perseus-api-DO0X8arb.js";import"./server-item-renderer-9s3eGk7j.js";import"./hints-renderer-aww2F0am.js";import{R}from"./renderer-jgdfcZ3C.js";import"./base-radio-3jaqmVaD.js";import"./button-group-SY8dumRU.js";import"./svg-image-iAt6R7IC.js";import"./hud-n-xEkDjs.js";import"./icon-7RFbyLiL.js";import"./index-4SmKKGcF.js";import"./inline-icon-6fh0Wu1y.js";import"./math-input-RyWSMB7M.js";import"./multi-button-group-3E5hf1eq.js";import"./number-input-bzF7pQdX.js";import"./range-input-iIJwkgiQ.js";import"./text-input-sfhSm06x.js";import"./text-list-editor-ND6Qift6.js";import{u as P}from"./i18n-context-GVCAGr7t.js";import{r as I}from"./register-all-widgets-for-testing-5iV9PLTM.js";import"./index-smZ6iCr_.js";const v=""+new URL("device-mobile-o16X2EYh.svg",import.meta.url).href,S=({question:t,apiOptions:u,reviewMode:g=!1,...c})=>{I();const r=o.useRef(null),[s,p]=o.useState(null),[a,h]=o.useState(!1),{strings:f}=P();return e.jsx(j,{leftTitle:e.jsxs(i,{style:{flexDirection:"row",alignItems:"center",width:"100%"},children:["Widget",e.jsx(i,{style:{marginLeft:"auto"},children:e.jsx(x,{icon:e.jsx(w,{icon:v}),checked:a,onChange:h})})]}),left:e.jsxs(i,{children:[e.jsx(i,{className:a?"perseus-mobile":"",children:e.jsx(R,{ref:r,content:t.content,images:t.images,widgets:t.widgets,problemNum:0,apiOptions:{...u,isMobile:a},reviewMode:g,strings:f,...c})}),e.jsxs(i,{style:{flexDirection:"row",alignItems:"center"},children:[e.jsx(m,{onClick:()=>{if(!r.current)return;const n=r.current.getUserInputMap(),y=k(t,r.current.getUserInputMap(),"en");p([n,y])},children:"Check"}),e.jsx(b,{size:8}),e.jsx(m,{onClick:()=>{var n;(n=r.current)==null||n.showRationalesForCurrentlySelectedChoices()},children:"Show Rationales"})]}),s!=null&&e.jsxs(e.Fragment,{children:[e.jsx(d,{style:{marginTop:"10px"},children:"Guess"}),e.jsx(l,{quotesOnKeys:!1,enableClipboard:!1,src:s[0]}),e.jsx(d,{style:{marginTop:"10px"},children:"Score"}),e.jsx(l,{quotesOnKeys:!1,enableClipboard:!1,src:s[1]})]})]}),jsonObject:t})};S.__docgenInfo={description:"",methods:[],displayName:"RendererWithDebugUI",props:{question:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    /**
     * Translatable Markdown content to be rendered.  May include references to
     * widgets (as [[☃ widgetName]]) or images (as ![image text](imageUrl)).
     * For each image found in this content, there can be an entry in the
     * \`images\` dict (below) with the key being the image's url which defines
     * additional attributes for the image.
     */
    content: string;
    /**
     * A dictionary of {[widgetName]: Widget} to be referenced from the content
     * field.
     */
    widgets: PerseusWidgetsMap;
    // Used in the PerseusGradedGroup widget.  A list of "tags" that are keys
    // that represent other content in the system.  Not rendered to the user.
    // NOTE: perseus_data.go says this is required even though it isn't necessary.
    metadata?: ReadonlyArray<string>;
    /**
     * A dictionary of {[imageUrl]: PerseusImageDetail}.
     */
    images: {
        [imageUrl: string]: PerseusImageDetail;
    };
}`,signature:{properties:[{key:"content",value:{name:"string",required:!0},description:`Translatable Markdown content to be rendered.  May include references to
widgets (as [[☃ widgetName]]) or images (as ![image text](imageUrl)).
For each image found in this content, there can be an entry in the
\`images\` dict (below) with the key being the image's url which defines
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof TRegistry as `${Property & string} ${number}`]: TRegistry[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"TRegistry[Property]"}}]},required:!0},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
field.`},{key:"metadata",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [imageUrl: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},description:""},reviewMode:{defaultValue:{value:"false",computed:!1},required:!1}}};export{S as R};
