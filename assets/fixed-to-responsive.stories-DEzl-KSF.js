import{j as e,ax as i,w as r}from"./iframe-CWbLiuEj.js";const a="https://www.khanacademy.org/images/ohnoes-concerned.svg",N="https://www.khanacademy.org/images/hand-tree.new.png",s=200,g=600,t=1024,n=1024,B={title:"Components/Fixed to Responsive"},l=o=>e.jsx(i,{width:n,height:s,children:e.jsx("img",{alt:"",width:s,height:s,src:r().staticUrl(a)})}),d=o=>e.jsx(i,{width:n,height:g,children:e.jsx("img",{alt:"",width:g,height:g,src:r().staticUrl(a)})}),c=o=>e.jsx(i,{width:n,height:t,children:e.jsx("img",{alt:"",width:t,height:t,src:r().staticUrl(a)})}),h=o=>e.jsx(i,{width:n,height:s,children:e.jsx("img",{alt:"",width:t,height:t,src:r().staticUrl(a)})}),m=o=>e.jsxs(i,{width:n,height:s,children:[e.jsx("img",{alt:"",width:s,height:s,src:N},1),e.jsx("img",{alt:"",width:s,height:s,src:r().staticUrl(a)},2)]}),p=o=>e.jsx(i,{width:n,height:t,constrainHeight:!0,children:e.jsx("img",{alt:"",width:t,height:t,src:r().staticUrl(a)})}),u=o=>e.jsx(i,{width:n,height:g,allowFullBleed:!0,children:e.jsx("img",{alt:"",width:g,height:g,src:r().staticUrl(a)})});l.__docgenInfo={description:"",methods:[],displayName:"SmallImageWithSmallContainer"};d.__docgenInfo={description:"",methods:[],displayName:"SmallImageWithMediumContainer"};c.__docgenInfo={description:"",methods:[],displayName:"LargeImageWithLargeContainer"};h.__docgenInfo={description:"",methods:[],displayName:"LargeImageWithSmallerContainer"};m.__docgenInfo={description:"",methods:[],displayName:"TwoOverlayedImagesInsteadOneResponsiveContainer"};p.__docgenInfo={description:"",methods:[],displayName:"HeightConstrainingAnImage"};u.__docgenInfo={description:"",methods:[],displayName:"AllowingFullBleed"};var w,x,S;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeSmall}>
            <img alt="" width={sizeSmall} height={sizeSmall} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(S=(x=l.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var R,v,I;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeMedium}>
            <img alt="" width={sizeMedium} height={sizeMedium} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(I=(v=d.parameters)==null?void 0:v.docs)==null?void 0:I.source}}};var z,U,y;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeLarge}>
            <img alt="" width={sizeLarge} height={sizeLarge} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(y=(U=c.parameters)==null?void 0:U.docs)==null?void 0:y.source}}};var F,C,T;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeSmall}>
            <img alt="" width={sizeLarge} height={sizeLarge} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(T=(C=h.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var L,j,_;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeSmall}>
            <img alt="" key={1} width={sizeSmall} height={sizeSmall} src={imgUrl} />
            <img alt="" key={2} width={sizeSmall} height={sizeSmall} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(_=(j=m.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var A,W,f;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeLarge} constrainHeight={true}>
            <img alt="" width={sizeLarge} height={sizeLarge} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(f=(W=p.parameters)==null?void 0:W.docs)==null?void 0:f.source}}};var M,E,D;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeMedium} allowFullBleed={true}>
            <img alt="" width={sizeMedium} height={sizeMedium} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(D=(E=u.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};const H=["SmallImageWithSmallContainer","SmallImageWithMediumContainer","LargeImageWithLargeContainer","LargeImageWithSmallerContainer","TwoOverlayedImagesInsteadOneResponsiveContainer","HeightConstrainingAnImage","AllowingFullBleed"];export{u as AllowingFullBleed,p as HeightConstrainingAnImage,c as LargeImageWithLargeContainer,h as LargeImageWithSmallerContainer,d as SmallImageWithMediumContainer,l as SmallImageWithSmallContainer,m as TwoOverlayedImagesInsteadOneResponsiveContainer,H as __namedExportsOrder,B as default};
