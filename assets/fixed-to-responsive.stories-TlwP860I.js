import{j as e}from"./jsx-runtime-63Ea5SlK.js";import{g as i}from"./dependencies-CP7Uh8Kq.js";import{F as r}from"./fixed-to-responsive-for_tVF1.js";import"./index-6oxdNXpR.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-dnMhQZ-1.js";import"./constants-iPV6vHZm.js";const a="https://www.khanacademy.org/images/ohnoes-concerned.svg",N="https://www.khanacademy.org/images/hand-tree.new.png",t=200,g=600,s=1024,n=1024,G={title:"Perseus/Components/Fixed to Responsive"},l=o=>e.jsx(r,{width:n,height:t,children:e.jsx("img",{alt:"",width:t,height:t,src:i().staticUrl(a)})}),d=o=>e.jsx(r,{width:n,height:g,children:e.jsx("img",{alt:"",width:g,height:g,src:i().staticUrl(a)})}),c=o=>e.jsx(r,{width:n,height:s,children:e.jsx("img",{alt:"",width:s,height:s,src:i().staticUrl(a)})}),m=o=>e.jsx(r,{width:n,height:t,children:e.jsx("img",{alt:"",width:s,height:s,src:i().staticUrl(a)})}),h=o=>e.jsxs(r,{width:n,height:t,children:[e.jsx("img",{alt:"",width:t,height:t,src:N},1),e.jsx("img",{alt:"",width:t,height:t,src:i().staticUrl(a)},2)]}),p=o=>e.jsx(r,{width:n,height:s,constrainHeight:!0,children:e.jsx("img",{alt:"",width:s,height:s,src:i().staticUrl(a)})}),u=o=>e.jsx(r,{width:n,height:g,allowFullBleed:!0,children:e.jsx("img",{alt:"",width:g,height:g,src:i().staticUrl(a)})});l.__docgenInfo={description:"",methods:[],displayName:"SmallImageWithSmallContainer"};d.__docgenInfo={description:"",methods:[],displayName:"SmallImageWithMediumContainer"};c.__docgenInfo={description:"",methods:[],displayName:"LargeImageWithLargeContainer"};m.__docgenInfo={description:"",methods:[],displayName:"LargeImageWithSmallerContainer"};h.__docgenInfo={description:"",methods:[],displayName:"TwoOverlayedImagesInsteadOneResponsiveContainer"};p.__docgenInfo={description:"",methods:[],displayName:"HeightConstrainingAnImage"};u.__docgenInfo={description:"",methods:[],displayName:"AllowingFullBleed"};var w,x,S;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeSmall}>
            <img alt="" width={sizeSmall} height={sizeSmall} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(S=(x=l.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var R,v,I;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeMedium}>
            <img alt="" width={sizeMedium} height={sizeMedium} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(I=(v=d.parameters)==null?void 0:v.docs)==null?void 0:I.source}}};var z,U,F;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeLarge}>
            <img alt="" width={sizeLarge} height={sizeLarge} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(F=(U=c.parameters)==null?void 0:U.docs)==null?void 0:F.source}}};var y,C,T;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeSmall}>
            <img alt="" width={sizeLarge} height={sizeLarge} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(T=(C=m.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var L,j,_;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeSmall}>
            <img alt="" key={1} width={sizeSmall} height={sizeSmall} src={imgUrl} />
            <img alt="" key={2} width={sizeSmall} height={sizeSmall} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(_=(j=h.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var A,f,W;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeLarge} constrainHeight={true}>
            <img alt="" width={sizeLarge} height={sizeLarge} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(W=(f=p.parameters)==null?void 0:f.docs)==null?void 0:W.source}}};var M,E,D;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeMedium} allowFullBleed={true}>
            <img alt="" width={sizeMedium} height={sizeMedium} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(D=(E=u.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};const J=["SmallImageWithSmallContainer","SmallImageWithMediumContainer","LargeImageWithLargeContainer","LargeImageWithSmallerContainer","TwoOverlayedImagesInsteadOneResponsiveContainer","HeightConstrainingAnImage","AllowingFullBleed"];export{u as AllowingFullBleed,p as HeightConstrainingAnImage,c as LargeImageWithLargeContainer,m as LargeImageWithSmallerContainer,d as SmallImageWithMediumContainer,l as SmallImageWithSmallContainer,h as TwoOverlayedImagesInsteadOneResponsiveContainer,J as __namedExportsOrder,G as default};
