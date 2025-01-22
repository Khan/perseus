import{j as e}from"./jsx-runtime-63Ea5SlK.js";import{B as m}from"./index-sN6aPTh8.js";import{V as i}from"./index-Cj1jPHW9.js";import{P as w}from"./index-TVweWxDl.js";import{S as b}from"./index-GucNpBmh.js";import{S as x}from"./article-renderer-iOM4vfLu.js";import{H as d}from"./index-SAZ92ybN.js";import{r as o}from"./index-6oxdNXpR.js";import{S as j,R as l}from"./side-by-side-CgClmJ7L.js";import"./util-FOHsj4WS.js";import"./index-default-4_ZsnO94.js";import"./version-zYAx5FCH.js";import"./jquery-5v7aFUvu.js";import"./phet-simulation-q2Yc5cWN.js";import"./dependencies-CP7Uh8Kq.js";import"./perseus-api-_PWPZoDE.js";import"./perseus-item-jvzZM9P4.js";import"./hints-renderer-quHutrtR.js";import{R as P,s as k}from"./renderer-xeSf3CLl.js";import"./base-radio-gB8IODaC.js";import"./button-group-G5CZaedn.js";import"./graph-rY0-ZyCF.js";import"./svg-image-5xpyV1oq.js";import"./hud-ifw9Ofbw.js";import"./icon-7RFbyLiL.js";import"./index-ioZjKB__.js";import"./inline-icon-6fh0Wu1y.js";import"./math-input-QxXJEOyl.js";import"./multi-button-group-QUVHbBcE.js";import"./number-input-UIPjyiFR.js";import"./range-input-qUFfLiJq.js";import"./text-input-6UCssezM.js";import"./text-list-editor-ND6Qift6.js";import{u as I,m as R}from"./i18n-context-ihOeIMY_.js";import{r as S}from"./register-all-widgets-for-testing-1SDg4izj.js";import"./index-smZ6iCr_.js";const v=""+new URL("device-mobile-o16X2EYh.svg",import.meta.url).href,T=({question:t,apiOptions:u,reviewMode:g=!1,...p})=>{S();const r=o.useRef(null),[n,c]=o.useState(null),[a,h]=o.useState(!1),{strings:f}=I();return e.jsx(j,{leftTitle:e.jsxs(i,{style:{flexDirection:"row",alignItems:"center",width:"100%"},children:["Widget",e.jsx(i,{style:{marginLeft:"auto"},children:e.jsx(x,{icon:e.jsx(w,{icon:v}),checked:a,onChange:h})})]}),left:e.jsxs(i,{children:[e.jsx(i,{className:a?"perseus-mobile":"",children:e.jsx(P,{ref:r,content:t.content,images:t.images,widgets:t.widgets,problemNum:0,apiOptions:{...u,isMobile:a},reviewMode:g,strings:f,...p})}),e.jsxs(i,{style:{flexDirection:"row",alignItems:"center"},children:[e.jsx(m,{onClick:()=>{if(!r.current)return;const s=r.current.getUserInputMap(),y=k(t,r.current.getUserInputMap(),R,"en");c([s,y])},children:"Check"}),e.jsx(b,{size:8}),e.jsx(m,{onClick:()=>{var s;(s=r.current)==null||s.showRationalesForCurrentlySelectedChoices()},children:"Show Rationales"})]}),n!=null&&e.jsxs(e.Fragment,{children:[e.jsx(d,{style:{marginTop:"10px"},children:"Guess"}),e.jsx(l,{quotesOnKeys:!1,enableClipboard:!1,src:n[0]}),e.jsx(d,{style:{marginTop:"10px"},children:"Score"}),e.jsx(l,{quotesOnKeys:!1,enableClipboard:!1,src:n[1]})]})]}),jsonObject:t})};T.__docgenInfo={description:"",methods:[],displayName:"RendererWithDebugUI",props:{question:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
additional attributes for the image.`},{key:"widgets",value:{name:"signature",type:"object",raw:"{\n    [Property in keyof PerseusWidgetTypes as `${Property} ${number}`]: PerseusWidgetTypes[Property];\n}",signature:{properties:[{key:{name:"PerseusWidgetTypes",required:!0},value:{name:"PerseusWidgetTypes[Property]",raw:"PerseusWidgetTypes[Property]"}}]},required:!0},description:`A dictionary of {[widgetName]: Widget} to be referenced from the content
field.`},{key:"metadata",value:{name:"ReadonlyArray",elements:[{name:"string"}],raw:"ReadonlyArray<string>",required:!1}},{key:"images",value:{name:"signature",type:"object",raw:`{
    [imageUrl: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},description:""},reviewMode:{defaultValue:{value:"false",computed:!1},required:!1}}};export{T as R};
