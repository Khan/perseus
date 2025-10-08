import{j as e,g as o,B as d,R as g,A as m,av as c}from"./iframe-BWhbci3x.js";import{g as u}from"./feature-flags-util-Vxq3J9D8.js";import{g as l,a as p}from"./image-widget-generator-BkbJOfbU.js";const h=(t,{args:r,parameters:n})=>e.jsx(i,{question:o({content:(n==null?void 0:n.content)??"[[☃ image 1]]",widgets:{"image 1":l({options:p({...r})})}})});function i(t){const{question:r}=t;return e.jsx(d,{widgets:r.widgets,problemNum:0,children:({userInput:n,handleUserInput:s,initializeUserInput:a})=>e.jsx(g,{userInput:n,handleUserInput:s,initializeUserInput:a,strings:c,content:r.content,widgets:r.widgets,images:r.images,apiOptions:{...m.defaults,flags:u({"image-widget-upgrade":!0})}})})}h.__docgenInfo={description:"",methods:[],displayName:"imageRendererDecorator"};i.__docgenInfo={description:"",methods:[],displayName:"ImageQuestionRenderer",props:{question:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
     * the user.
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
the user.
@deprecated`},{key:"images",value:{name:"signature",type:"object",raw:`{
    [imageUrl: string]: PerseusImageDetail;
}`,signature:{properties:[{key:{name:"string"},value:{name:"signature",type:"object",raw:`{
    // The width of the image
    width: number;
    // the height of the image
    height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},description:""}}};const y=t=>e.jsx("div",{className:"framework-perseus perseus-mobile",children:e.jsx(t,{})}),f=t=>e.jsx("div",{className:"framework-perseus perseus-article",children:e.jsx(t,{})}),w=t=>e.jsx("div",{className:"framework-perseus perseus-mobile perseus-article",children:e.jsx(t,{})}),b=t=>e.jsx("div",{style:{direction:"rtl"},children:e.jsx(t,{})});y.__docgenInfo={description:"",methods:[],displayName:"mobileDecorator"};f.__docgenInfo={description:"",methods:[],displayName:"articleDecorator"};w.__docgenInfo={description:"",methods:[],displayName:"mobileArticleDecorator"};b.__docgenInfo={description:"",methods:[],displayName:"rtlDecorator"};export{i as I,f as a,w as b,h as i,y as m,b as r};
