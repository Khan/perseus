import{r as e}from"./index-6oxdNXpR.js";import{g as i}from"./dependencies-CP7Uh8Kq.js";import{F as s}from"./fixed-to-responsive-8Rm8IBlT.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-dnMhQZ-1.js";import"./constants-vGHYchdS.js";const a="https://www.khanacademy.org/images/ohnoes-concerned.svg",O="https://www.khanacademy.org/images/hand-tree.new.png",t=200,g=600,r=1024,n=1024,q={title:"Perseus/Components/Fixed to Responsive"},l=o=>e.createElement(s,{width:n,height:t},e.createElement("img",{alt:"",width:t,height:t,src:i().staticUrl(a)})),m=o=>e.createElement(s,{width:n,height:g},e.createElement("img",{alt:"",width:g,height:g,src:i().staticUrl(a)})),c=o=>e.createElement(s,{width:n,height:r},e.createElement("img",{alt:"",width:r,height:r,src:i().staticUrl(a)})),d=o=>e.createElement(s,{width:n,height:t},e.createElement("img",{alt:"",width:r,height:r,src:i().staticUrl(a)})),h=o=>e.createElement(s,{width:n,height:t},e.createElement("img",{alt:"",key:1,width:t,height:t,src:O}),e.createElement("img",{alt:"",key:2,width:t,height:t,src:i().staticUrl(a)})),p=o=>e.createElement(s,{width:n,height:r,constrainHeight:!0},e.createElement("img",{alt:"",width:r,height:r,src:i().staticUrl(a)})),u=o=>e.createElement(s,{width:n,height:g,allowFullBleed:!0},e.createElement("img",{alt:"",width:g,height:g,src:i().staticUrl(a)}));l.__docgenInfo={description:"",methods:[],displayName:"SmallImageWithSmallContainer"};m.__docgenInfo={description:"",methods:[],displayName:"SmallImageWithMediumContainer"};c.__docgenInfo={description:"",methods:[],displayName:"LargeImageWithLargeContainer"};d.__docgenInfo={description:"",methods:[],displayName:"LargeImageWithSmallerContainer"};h.__docgenInfo={description:"",methods:[],displayName:"TwoOverlayedImagesInsteadOneResponsiveContainer"};p.__docgenInfo={description:"",methods:[],displayName:"HeightConstrainingAnImage"};u.__docgenInfo={description:"",methods:[],displayName:"AllowingFullBleed"};var w,S,R;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeSmall}>
            <img alt="" width={sizeSmall} height={sizeSmall} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(R=(S=l.parameters)==null?void 0:S.docs)==null?void 0:R.source}}};var v,I,z;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeMedium}>
            <img alt="" width={sizeMedium} height={sizeMedium} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(z=(I=m.parameters)==null?void 0:I.docs)==null?void 0:z.source}}};var E,U,y;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeLarge}>
            <img alt="" width={sizeLarge} height={sizeLarge} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(y=(U=c.parameters)==null?void 0:U.docs)==null?void 0:y.source}}};var F,x,C;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeSmall}>
            <img alt="" width={sizeLarge} height={sizeLarge} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(C=(x=d.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var T,L,_;h.parameters={...h.parameters,docs:{...(T=h.parameters)==null?void 0:T.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeSmall}>
            <img alt="" key={1} width={sizeSmall} height={sizeSmall} src={imgUrl} />
            <img alt="" key={2} width={sizeSmall} height={sizeSmall} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(_=(L=h.parameters)==null?void 0:L.docs)==null?void 0:_.source}}};var A,f,W;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeLarge} constrainHeight={true}>
            <img alt="" width={sizeLarge} height={sizeLarge} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(W=(f=p.parameters)==null?void 0:f.docs)==null?void 0:W.source}}};var M,D,N;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeMedium} allowFullBleed={true}>
            <img alt="" width={sizeMedium} height={sizeMedium} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(N=(D=u.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};const G=["SmallImageWithSmallContainer","SmallImageWithMediumContainer","LargeImageWithLargeContainer","LargeImageWithSmallerContainer","TwoOverlayedImagesInsteadOneResponsiveContainer","HeightConstrainingAnImage","AllowingFullBleed"];export{u as AllowingFullBleed,p as HeightConstrainingAnImage,c as LargeImageWithLargeContainer,d as LargeImageWithSmallerContainer,m as SmallImageWithMediumContainer,l as SmallImageWithSmallContainer,h as TwoOverlayedImagesInsteadOneResponsiveContainer,G as __namedExportsOrder,q as default};
