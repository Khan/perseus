import{j as e}from"./jsx-runtime-BT65X5dW.js";import{B as m}from"./index-CYrfVekP.js";import{V as i}from"./index-CskvhqFA.js";import{P as b}from"./index-CIHqsnLr.js";import{S as x}from"./index-B-CZbs2J.js";import{S as j}from"./all-widgets-mRp0dq-A.js";import{H as d}from"./index-CbNKSLRm.js";import{r as a}from"./index-C6mWTJJr.js";import{S as k,R as p}from"./split-view-DQPsD37O.js";import"./core-widget-registry-2eRuEUfZ.js";import{s as P}from"./util-CfzqFt4k.js";import"./underscore-U-AHniOr.js";import"./jquery-CkHB0_Mt.js";import"./answer-choices-BLw65nLN.js";import"./index-B1Gws05u.js";import{u as I}from"./i18n-context-3AkWzTTj.js";import"./perseus-api-Ty_QvlNi.js";import{R}from"./renderer-DnhW87FU.js";import"./index-D7h-teXI.js";import"./dependencies-BsVPGK1s.js";import"./zoomable-tex-Dy-nElJT.js";import"./svg-image-9gRPvOod.js";import"./no-important-DlFk8a1I.js";import"./number-input-DRyiTmoO.js";import"./simple-keypad-input-1R0khRCc.js";import"./text-input-sKoOaXZH.js";import"./phet-simulation-Bf9VVn_f.js";import"./sortable-BPGVCo8B.js";import"./fixed-to-responsive-CTsII9Xx.js";import"./math-input-Cx3Nq8BR.js";import"./video-transcript-link-C0e3jsHe.js";import"./server-item-renderer-BO3c19tP.js";import"./article-renderer-qpM876TX.js";import"./hints-renderer-gqxYhAO9.js";import"./base-radio-Lq31BfxU.js";import"./button-group-CrIfrEdw.js";import"./hud-CP_ly967.js";import"./icon-BfyZ3piz.js";import"./index-D75qsWGa.js";import"./inline-icon-AJRwMA4Z.js";import"./multi-button-group-U6RQwTwG.js";import"./range-input-BRhuxdZq.js";import"./text-list-editor-HcP7oGoC.js";import{r as v}from"./register-all-widgets-for-testing-DOg_fxGt.js";import"./index-Dd-cahjY.js";const T=""+new URL("device-mobile-CjXpfYRi.svg",import.meta.url).href,S=({question:t,apiOptions:u,reviewMode:l=!1,...c})=>{v();const r=a.useRef(null),[o,g]=a.useState(null),[s,h]=a.useState(!1),{strings:f}=I(),y={...u,isMobile:s,customKeypad:s};return e.jsx(k,{rendererTitle:e.jsxs(i,{style:{flexDirection:"row",alignItems:"center",width:"100%"},children:["Widget",e.jsx(i,{style:{marginLeft:"auto"},children:e.jsx(j,{icon:e.jsx(b,{icon:T}),checked:s,onChange:h})})]}),renderer:e.jsxs(i,{children:[e.jsx(i,{className:s?"perseus-mobile":"",children:e.jsx(R,{ref:r,content:t.content,images:t.images,widgets:t.widgets,problemNum:0,apiOptions:y,reviewMode:l,strings:f,...c})}),e.jsxs(i,{style:{flexDirection:"row",alignItems:"center"},children:[e.jsx(m,{onClick:()=>{if(!r.current)return;const n=r.current.getUserInputMap(),w=P(t,r.current.getUserInputMap(),"en");g([n,w])},children:"Check"}),e.jsx(x,{size:8}),e.jsx(m,{onClick:()=>{var n;(n=r.current)==null||n.showRationalesForCurrentlySelectedChoices()},children:"Show Rationales"})]}),o!=null&&e.jsxs(e.Fragment,{children:[e.jsx(d,{style:{marginTop:"10px"},children:"Guess"}),e.jsx(p,{quotesOnKeys:!1,enableClipboard:!1,src:o[0]}),e.jsx(d,{style:{marginTop:"10px"},children:"Score"}),e.jsx(p,{quotesOnKeys:!1,enableClipboard:!1,src:o[1]})]})]}),jsonObject:t})};S.__docgenInfo={description:"",methods:[],displayName:"RendererWithDebugUI",props:{question:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
    /**
     * Formerly used in the PerseusGradedGroup widget.  A list of "tags" that
     * are keys that represent other content in the system.  Not rendered to
     * the user. NOTE: perseus_data.go says this is required even though it
     * isn't necessary.
     * @deprecated
     */
    metadata?: any;
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
field.`},{key:"metadata",value:{name:"any",required:!1},description:`Formerly used in the PerseusGradedGroup widget.  A list of "tags" that
are keys that represent other content in the system.  Not rendered to
the user. NOTE: perseus_data.go says this is required even though it
isn't necessary.
@deprecated`},{key:"images",value:{name:"signature",type:"object",raw:`{
    [imageUrl: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},description:""},reviewMode:{defaultValue:{value:"false",computed:!1},required:!1}}};export{S as R};
