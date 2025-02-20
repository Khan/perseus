import{B as o}from"./index-dLgOY9TT.js";import{V as n}from"./index-iTGWTR8W.js";import{P as y}from"./index-xxLWRBZ2.js";import{S as w}from"./index-86cQASob.js";import{S as b}from"./all-widgets-igc3IBL_.js";import{H as m}from"./index-OUR0CuKj.js";import{r as e}from"./index-6oxdNXpR.js";import{S as E,R as l}from"./side-by-side-tJgyQ1ZU.js";import{s as k}from"./util-BNjKZr9R.js";import"./underscore-885MUNGo.js";import"./random-util-taBURWXy.js";import"./jquery-5v7aFUvu.js";import"./phet-simulation-Sua1c876.js";import"./dependencies-CP7Uh8Kq.js";import"./perseus-api-Y55S7ZPk.js";import"./server-item-renderer-adRF-k02.js";import"./article-renderer-QbHmaYtC.js";import"./hints-renderer-t046zLh8.js";import{R as P}from"./renderer-Olu3o6mV.js";import"./base-radio-Ht_yoYIT.js";import"./button-group-f5V3tSn8.js";import"./svg-image-cJbLXoet.js";import"./hud-VpTa1tZ-.js";import"./icon-H34hvC3Q.js";import"./index-lU_YwmQ-.js";import"./inline-icon-8e4u-lSW.js";import"./math-input-0siM5I0I.js";import"./multi-button-group-7ejnk4_z.js";import"./number-input-vmESOOv9.js";import"./range-input-u47S3qzp.js";import"./text-input-RScYhDpD.js";import"./text-list-editor-9dKImvgD.js";import{u as v}from"./i18n-context-jir6aF-r.js";import{r as I}from"./register-all-widgets-for-testing-jivgBVLz.js";import"./index-smZ6iCr_.js";const T=""+new URL("device-mobile-o16X2EYh.svg",import.meta.url).href,R=({question:t,apiOptions:d,reviewMode:u=!1,...c})=>{I();const r=e.useRef(null),[a,g]=e.useState(null),[s,p]=e.useState(!1),{strings:h}=v();return e.createElement(E,{leftTitle:e.createElement(n,{style:{flexDirection:"row",alignItems:"center",width:"100%"}},"Widget",e.createElement(n,{style:{marginLeft:"auto"}},e.createElement(b,{icon:e.createElement(y,{icon:T}),checked:s,onChange:p}))),left:e.createElement(n,null,e.createElement(n,{className:s?"perseus-mobile":""},e.createElement(P,{ref:r,content:t.content,images:t.images,widgets:t.widgets,problemNum:0,apiOptions:{...d,isMobile:s},reviewMode:u,strings:h,...c})),e.createElement(n,{style:{flexDirection:"row",alignItems:"center"}},e.createElement(o,{onClick:()=>{if(!r.current)return;const i=r.current.getUserInputMap(),f=k(t,r.current.getUserInputMap(),"en");g([i,f])}},"Check"),e.createElement(w,{size:8}),e.createElement(o,{onClick:()=>{var i;(i=r.current)==null||i.showRationalesForCurrentlySelectedChoices()}},"Show Rationales")),a!=null&&e.createElement(e.Fragment,null,e.createElement(m,{style:{marginTop:"10px"}},"Guess"),e.createElement(l,{quotesOnKeys:!1,enableClipboard:!1,src:a[0]}),e.createElement(m,{style:{marginTop:"10px"}},"Score"),e.createElement(l,{quotesOnKeys:!1,enableClipboard:!1,src:a[1]}))),jsonObject:t})};R.__docgenInfo={description:"",methods:[],displayName:"RendererWithDebugUI",props:{question:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},description:""},reviewMode:{defaultValue:{value:"false",computed:!1},required:!1}}};export{R};
