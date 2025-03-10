import{B as o}from"./index-71P4mDMp.js";import{V as n}from"./index-hw7d7wq0.js";import{P as w}from"./index-6pF6CjBQ.js";import{S as b}from"./index-v_a-r9JG.js";import{S as E}from"./all-widgets-VMhHuzEq.js";import{H as m}from"./index-jek-Xksa.js";import{r as e}from"./index-6oxdNXpR.js";import{S as k,R as l}from"./split-view-ZwWleG5_.js";import"./random-util-9WQRKwFZ.js";import{s as P}from"./util-ghoLYzZ7.js";import"./underscore-885MUNGo.js";import"./jquery-5v7aFUvu.js";import"./phet-simulation-2fci0qCu.js";import"./dependencies-CP7Uh8Kq.js";import"./perseus-api-Y55S7ZPk.js";import"./server-item-renderer-natTgqS7.js";import"./article-renderer-o7ZiMdLE.js";import"./hints-renderer-W_ESOac6.js";import{R as I}from"./renderer-TsApkbFs.js";import"./base-radio-JSYX41ej.js";import"./button-group-f5V3tSn8.js";import"./svg-image-JxxWp2z_.js";import"./hud-VpTa1tZ-.js";import"./icon-H34hvC3Q.js";import"./index-3j9EmwNK.js";import"./inline-icon-8e4u-lSW.js";import"./math-input-eAT_ndNA.js";import"./multi-button-group-7ejnk4_z.js";import"./number-input-numpZFNM.js";import"./range-input-oo-uLot_.js";import"./text-input-ebI7LPno.js";import"./text-list-editor-9dKImvgD.js";import{u as v}from"./i18n-context-Q5gDzbF3.js";import{r as T}from"./register-all-widgets-for-testing-aZ0m5r1V.js";import"./index-smZ6iCr_.js";const R=""+new URL("device-mobile-o16X2EYh.svg",import.meta.url).href,S=({question:t,apiOptions:d,reviewMode:c=!1,...u})=>{T();const r=e.useRef(null),[s,p]=e.useState(null),[i,g]=e.useState(!1),{strings:h}=v(),y={...d,isMobile:i,customKeypad:i};return e.createElement(k,{rendererTitle:e.createElement(n,{style:{flexDirection:"row",alignItems:"center",width:"100%"}},"Widget",e.createElement(n,{style:{marginLeft:"auto"}},e.createElement(E,{icon:e.createElement(w,{icon:R}),checked:i,onChange:g}))),renderer:e.createElement(n,null,e.createElement(n,{className:i?"perseus-mobile":""},e.createElement(I,{ref:r,content:t.content,images:t.images,widgets:t.widgets,problemNum:0,apiOptions:y,reviewMode:c,strings:h,...u})),e.createElement(n,{style:{flexDirection:"row",alignItems:"center"}},e.createElement(o,{onClick:()=>{if(!r.current)return;const a=r.current.getUserInputMap(),f=P(t,r.current.getUserInputMap(),"en");p([a,f])}},"Check"),e.createElement(b,{size:8}),e.createElement(o,{onClick:()=>{var a;(a=r.current)==null||a.showRationalesForCurrentlySelectedChoices()}},"Show Rationales")),s!=null&&e.createElement(e.Fragment,null,e.createElement(m,{style:{marginTop:"10px"}},"Guess"),e.createElement(l,{quotesOnKeys:!1,enableClipboard:!1,src:s[0]}),e.createElement(m,{style:{marginTop:"10px"}},"Score"),e.createElement(l,{quotesOnKeys:!1,enableClipboard:!1,src:s[1]}))),jsonObject:t})};S.__docgenInfo={description:"",methods:[],displayName:"RendererWithDebugUI",props:{question:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
