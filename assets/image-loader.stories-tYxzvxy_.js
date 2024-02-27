import{j as n}from"./jsx-runtime-BGVbfQ2Z.js";import{I as t}from"./image-loader-BrzYBUzY.js";import"./index-qhcEwEpg.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./dependencies-fnqF3NiV.js";const h="http://www.khanacademy.org/images/ohnoes-concerned.svg",y="https://www.khanacademy.org/images/hand-tree.new.png",E={title:"Perseus/Components/Image Loader"},e=o=>n(t,{src:h,preloader:null,imgProps:{alt:"ALT"},onUpdate:()=>{}}),r=o=>n(t,{src:y,preloader:null,imgProps:{alt:"ALT"},onUpdate:()=>{}}),a=o=>n(t,{src:"http://abcdefiahofshiaof.noway.badimage.com",preloader:null,imgProps:{alt:"ALT"},onUpdate:()=>{},children:n("span",{children:"You can see me! The image failed to load."})});var s,l,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <ImageLoader src={svgUrl}
  // @ts-expect-error [FEI-5003] - TS2322 - Type 'null' is not assignable to type '() => ReactElement<any, string | JSXElementConstructor<any>> | null | undefined'.
  preloader={null} imgProps={{
    alt: "ALT"
  }} onUpdate={() => {}} />;
}`,...(m=(l=e.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var d,c,i;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <ImageLoader src={imgUrl}
  // @ts-expect-error [FEI-5003] - TS2322 - Type 'null' is not assignable to type '() => ReactElement<any, string | JSXElementConstructor<any>> | null | undefined'.
  preloader={null} imgProps={{
    alt: "ALT"
  }} onUpdate={() => {}} />;
}`,...(i=(c=r.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var g,p,u;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <ImageLoader src="http://abcdefiahofshiaof.noway.badimage.com"
  // @ts-expect-error [FEI-5003] - TS2322 - Type 'null' is not assignable to type '() => ReactElement<any, string | JSXElementConstructor<any>> | null | undefined'.
  preloader={null} imgProps={{
    alt: "ALT"
  }} onUpdate={() => {}}>
            <span>You can see me! The image failed to load.</span>
        </ImageLoader>;
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const U=["SvgImage","PngImage","InvalidImageWithChildrenForFailedLoading"];export{a as InvalidImageWithChildrenForFailedLoading,r as PngImage,e as SvgImage,U as __namedExportsOrder,E as default};
