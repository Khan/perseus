import{j as o}from"./jsx-runtime-5BUNAZ9W.js";import{I as s}from"./image-loader-s-naDkf8.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./dependencies-9B_Bv_mA.js";const u="http://www.khanacademy.org/images/ohnoes-concerned.svg",I="https://www.khanacademy.org/images/hand-tree.new.png",v={title:"Perseus/Components/Image Loader"},e=n=>o(s,{src:u,preloader:null,imgProps:{alt:"ALT"},onUpdate:()=>{}}),a=n=>o(s,{src:I,preloader:null,imgProps:{alt:"ALT"},onUpdate:()=>{}}),r=n=>o(s,{src:"http://abcdefiahofshiaof.noway.badimage.com",preloader:null,imgProps:{alt:"ALT"},onUpdate:()=>{},children:o("span",{children:"You can see me! The image failed to load."})});e.__docgenInfo={description:"",methods:[],displayName:"SvgImage"};a.__docgenInfo={description:"",methods:[],displayName:"PngImage"};r.__docgenInfo={description:"",methods:[],displayName:"InvalidImageWithChildrenForFailedLoading"};var t,d,m;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <ImageLoader src={svgUrl} preloader={null} imgProps={{
    alt: "ALT"
  }} onUpdate={() => {}} />;
}`,...(m=(d=e.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var g,i,c;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <ImageLoader src={imgUrl} preloader={null} imgProps={{
    alt: "ALT"
  }} onUpdate={() => {}} />;
}`,...(c=(i=a.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var l,p,h;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <ImageLoader src="http://abcdefiahofshiaof.noway.badimage.com" preloader={null} imgProps={{
    alt: "ALT"
  }} onUpdate={() => {}}>
            <span>You can see me! The image failed to load.</span>
        </ImageLoader>;
}`,...(h=(p=r.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};const w=["SvgImage","PngImage","InvalidImageWithChildrenForFailedLoading"];export{r as InvalidImageWithChildrenForFailedLoading,a as PngImage,e as SvgImage,w as __namedExportsOrder,v as default};
