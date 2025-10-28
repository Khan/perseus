import{j as e,g as l,p as h,R as m,A as g,al as p}from"./iframe-Drd1SmRq.js";import{g as u}from"./feature-flags-util-Vxq3J9D8.js";import{g as f,a as y}from"./image-widget-generator-BkbJOfbU.js";const w=(r,{args:t,parameters:a})=>e.jsx(o,{question:l({content:(a==null?void 0:a.content)??"[[☃ image 1]]",widgets:{"image 1":f({options:y({...t})})}})});function o(r){const{question:t}=r;return e.jsx(h,{widgets:t.widgets,problemNum:0,children:({userInput:a,handleUserInput:d,initializeUserInput:c})=>e.jsx(m,{userInput:a,handleUserInput:d,initializeUserInput:c,strings:p,content:t.content,widgets:t.widgets,images:t.images,apiOptions:{...g.defaults,flags:u({"image-widget-upgrade":!0})}})})}w.__docgenInfo={description:"",methods:[],displayName:"imageRendererDecorator"};o.__docgenInfo={description:"",methods:[],displayName:"ImageQuestionRenderer",props:{question:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]},required:!0},description:"A dictionary of {[imageUrl]: PerseusImageDetail}."}]}},description:""}}};const j=r=>e.jsx("div",{className:"framework-perseus perseus-mobile",children:e.jsx(r,{})}),x=r=>e.jsx("div",{className:"framework-perseus perseus-article",children:e.jsx(r,{})}),N=r=>e.jsx("div",{className:"framework-perseus perseus-mobile perseus-article",children:e.jsx(r,{})}),b=r=>e.jsx("div",{style:{direction:"rtl"},children:e.jsx(r,{})}),s="Prophase (sometimes divided into prophase and prometaphase):",i="Chromosomes: In prophase, the chromosomes condense, forming the characteristic “X” shape that is often shown in diagrams. Each “X” is a duplicated chromosome. The two sides of the “X” are called sister chromatids, and they are attached at a point called the centromere. Even though the chromosome has been copied at this point of the cell cycle, as long as the two copies (sister chromatids) are attached, they are considered a single chromosome.",n="The nucleolus (a structure inside the nucleus where ribosomes are made) disappears during prophase. The mitotic spindle begins to form during prophase, starting at regions called centrosomes. These regions contain the material needed for building the spindle, and also function to regulate the spindle throughout mitosis.",v=r=>e.jsxs("div",{className:"framework-perseus perseus-mobile perseus-article",children:[e.jsx("div",{className:"paragraph",children:e.jsx("div",{className:"perseus-widget-container widget-nohighlight widget-float-left",children:e.jsx(r,{})})}),e.jsx("div",{className:"paragraph",children:s}),e.jsx("div",{className:"paragraph",children:i}),e.jsx("div",{className:"paragraph",children:n})]}),k=r=>e.jsxs("div",{className:"framework-perseus perseus-mobile perseus-article",children:[e.jsx("div",{className:"paragraph",children:e.jsx("div",{className:"perseus-widget-container widget-nohighlight widget-float-right",children:e.jsx(r,{})})}),e.jsx("div",{className:"paragraph",children:s}),e.jsx("div",{className:"paragraph",children:i}),e.jsx("div",{className:"paragraph",children:n})]}),D=r=>e.jsxs("div",{className:"framework-perseus perseus-article",children:[e.jsx("div",{className:"paragraph",children:e.jsx("div",{className:"perseus-widget-container widget-nohighlight widget-float-left",children:e.jsx(r,{})})}),e.jsx("div",{className:"paragraph",children:s}),e.jsx("div",{className:"paragraph",children:i}),e.jsx("div",{className:"paragraph",children:n})]}),I=r=>e.jsxs("div",{className:"framework-perseus perseus-article",children:[e.jsx("div",{className:"paragraph",children:e.jsx("div",{className:"perseus-widget-container widget-nohighlight widget-float-right",children:e.jsx(r,{})})}),e.jsx("div",{className:"paragraph",children:s}),e.jsx("div",{className:"paragraph",children:i}),e.jsx("div",{className:"paragraph",children:n})]});j.__docgenInfo={description:"",methods:[],displayName:"mobileDecorator"};x.__docgenInfo={description:"",methods:[],displayName:"articleDecorator"};N.__docgenInfo={description:"",methods:[],displayName:"mobileArticleDecorator"};b.__docgenInfo={description:"",methods:[],displayName:"rtlDecorator"};v.__docgenInfo={description:"",methods:[],displayName:"mobileArticleFloatLeftDecorator"};k.__docgenInfo={description:"",methods:[],displayName:"mobileArticleFloatRightDecorator"};D.__docgenInfo={description:"",methods:[],displayName:"articleFloatLeftDecorator"};I.__docgenInfo={description:"",methods:[],displayName:"articleFloatRightDecorator"};export{o as I,x as a,N as b,D as c,I as d,v as e,k as f,w as i,j as m,b as r};
