import{j as e,a as O}from"./jsx-runtime-5BUNAZ9W.js";import{g as s}from"./dependencies-9B_Bv_mA.js";import{F as r}from"./fixed-to-responsive-xwrcC5GD.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-dnMhQZ-1.js";import"./constants-CTNUT-ej.js";const a="https://www.khanacademy.org/images/ohnoes-concerned.svg",B="https://www.khanacademy.org/images/hand-tree.new.png",t=200,g=600,i=1024,n=1024,J={title:"Perseus/Components/Fixed to Responsive"},l=o=>e(r,{width:n,height:t,children:e("img",{alt:"",width:t,height:t,src:s().staticUrl(a)})}),d=o=>e(r,{width:n,height:g,children:e("img",{alt:"",width:g,height:g,src:s().staticUrl(a)})}),c=o=>e(r,{width:n,height:i,children:e("img",{alt:"",width:i,height:i,src:s().staticUrl(a)})}),m=o=>e(r,{width:n,height:t,children:e("img",{alt:"",width:i,height:i,src:s().staticUrl(a)})}),h=o=>O(r,{width:n,height:t,children:[e("img",{alt:"",width:t,height:t,src:B},1),e("img",{alt:"",width:t,height:t,src:s().staticUrl(a)},2)]}),p=o=>e(r,{width:n,height:i,constrainHeight:!0,children:e("img",{alt:"",width:i,height:i,src:s().staticUrl(a)})}),u=o=>e(r,{width:n,height:g,allowFullBleed:!0,children:e("img",{alt:"",width:g,height:g,src:s().staticUrl(a)})});l.__docgenInfo={description:"",methods:[],displayName:"SmallImageWithSmallContainer"};d.__docgenInfo={description:"",methods:[],displayName:"SmallImageWithMediumContainer"};c.__docgenInfo={description:"",methods:[],displayName:"LargeImageWithLargeContainer"};m.__docgenInfo={description:"",methods:[],displayName:"LargeImageWithSmallerContainer"};h.__docgenInfo={description:"",methods:[],displayName:"TwoOverlayedImagesInsteadOneResponsiveContainer"};p.__docgenInfo={description:"",methods:[],displayName:"HeightConstrainingAnImage"};u.__docgenInfo={description:"",methods:[],displayName:"AllowingFullBleed"};var w,S,R;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeSmall}>
            <img alt="" width={sizeSmall} height={sizeSmall} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(R=(S=l.parameters)==null?void 0:S.docs)==null?void 0:R.source}}};var v,I,z;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeMedium}>
            <img alt="" width={sizeMedium} height={sizeMedium} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(z=(I=d.parameters)==null?void 0:I.docs)==null?void 0:z.source}}};var U,F,x;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeLarge}>
            <img alt="" width={sizeLarge} height={sizeLarge} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(x=(F=c.parameters)==null?void 0:F.docs)==null?void 0:x.source}}};var y,C,T;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeSmall}>
            <img alt="" width={sizeLarge} height={sizeLarge} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(T=(C=m.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var L,_,A;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeSmall}>
            <img alt="" key={1} width={sizeSmall} height={sizeSmall} src={imgUrl} />
            <img alt="" key={2} width={sizeSmall} height={sizeSmall} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(A=(_=h.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};var f,W,M;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeLarge} constrainHeight={true}>
            <img alt="" width={sizeLarge} height={sizeLarge} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(M=(W=p.parameters)==null?void 0:W.docs)==null?void 0:M.source}}};var D,E,N;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`(args: StoryArgs): React.ReactElement => {
  return <FixedToResponsive width={width} height={sizeMedium} allowFullBleed={true}>
            <img alt="" width={sizeMedium} height={sizeMedium} src={getDependencies().staticUrl(svgUrl)} />
        </FixedToResponsive>;
}`,...(N=(E=u.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};const K=["SmallImageWithSmallContainer","SmallImageWithMediumContainer","LargeImageWithLargeContainer","LargeImageWithSmallerContainer","TwoOverlayedImagesInsteadOneResponsiveContainer","HeightConstrainingAnImage","AllowingFullBleed"];export{u as AllowingFullBleed,p as HeightConstrainingAnImage,c as LargeImageWithLargeContainer,m as LargeImageWithSmallerContainer,d as SmallImageWithMediumContainer,l as SmallImageWithSmallContainer,h as TwoOverlayedImagesInsteadOneResponsiveContainer,K as __namedExportsOrder,J as default};
