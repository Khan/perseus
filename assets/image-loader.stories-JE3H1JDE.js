import{j as n}from"./jsx-runtime-5BUNAZ9W.js";import{I as o}from"./image-loader-A74C9PE_.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./dependencies-9B_Bv_mA.js";const h="http://www.khanacademy.org/images/ohnoes-concerned.svg",I="https://www.khanacademy.org/images/hand-tree.new.png",E={title:"Perseus/Components/Image Loader"},e=t=>n(o,{src:h,preloader:null,imgProps:{alt:"ALT"},onUpdate:()=>{}}),a=t=>n(o,{src:I,preloader:null,imgProps:{alt:"ALT"},onUpdate:()=>{}}),r=t=>n(o,{src:"http://abcdefiahofshiaof.noway.badimage.com",preloader:null,imgProps:{alt:"ALT"},onUpdate:()=>{},children:n("span",{children:"You can see me! The image failed to load."})});e.__docgenInfo={description:"",methods:[],displayName:"SvgImage"};a.__docgenInfo={description:"",methods:[],displayName:"PngImage"};r.__docgenInfo={description:"",methods:[],displayName:"InvalidImageWithChildrenForFailedLoading"};var s,d,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <ImageLoader src={svgUrl}
  // @ts-expect-error [FEI-5003] - TS2322 - Type 'null' is not assignable to type '() => ReactElement<any, string | JSXElementConstructor<any>> | null | undefined'.
  preloader={null} imgProps={{
    alt: "ALT"
  }} onUpdate={() => {}} />;
}`,...(l=(d=e.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var i,m,g;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <ImageLoader src={imgUrl}
  // @ts-expect-error [FEI-5003] - TS2322 - Type 'null' is not assignable to type '() => ReactElement<any, string | JSXElementConstructor<any>> | null | undefined'.
  preloader={null} imgProps={{
    alt: "ALT"
  }} onUpdate={() => {}} />;
}`,...(g=(m=a.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var c,p,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <ImageLoader src="http://abcdefiahofshiaof.noway.badimage.com"
  // @ts-expect-error [FEI-5003] - TS2322 - Type 'null' is not assignable to type '() => ReactElement<any, string | JSXElementConstructor<any>> | null | undefined'.
  preloader={null} imgProps={{
    alt: "ALT"
  }} onUpdate={() => {}}>
            <span>You can see me! The image failed to load.</span>
        </ImageLoader>;
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const P=["SvgImage","PngImage","InvalidImageWithChildrenForFailedLoading"];export{r as InvalidImageWithChildrenForFailedLoading,a as PngImage,e as SvgImage,P as __namedExportsOrder,E as default};
