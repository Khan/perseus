import{a as n,j as i}from"./jsx-runtime-5BUNAZ9W.js";import{V as r}from"./index-e4P84RkC.js";import{T as p,H as t,V as h}from"./tooltip-vkx2pUmk.js";import"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-awljIyHI.js";import"./index-jmm5gWkb.js";const H={title:"Perseus/Components/Tooltip"},o=()=>n(r,{style:{margin:"20px"},children:["Hover over"," ",n(p,{show:!0,horizontalPosition:t.Left,horizontalAlign:t.Left,verticalPosition:h.Bottom,children:[i("span",{children:"this"}),i(r,{style:{backgroundColor:"white"},children:"You can read so much more if you want..."})]})," ","to see more information"]}),e=()=>n(r,{style:{margin:"20px"},children:["Hover over"," ",n(p,{show:!1,horizontalPosition:t.Left,horizontalAlign:t.Left,verticalPosition:h.Bottom,children:[i("span",{children:"this"}),i(r,{style:{backgroundColor:"white"},children:"You can read so much more if you want..."})]})," ","to see more information"]});o.__docgenInfo={description:"",methods:[],displayName:"Shown"};e.__docgenInfo={description:"",methods:[],displayName:"Hidden"};var a,s,l;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  return <View style={{
    margin: "20px"
  }}>
            Hover over{" "}
            <Tooltip show={true} horizontalPosition={HorizontalDirection.Left} horizontalAlign={HorizontalDirection.Left} verticalPosition={VerticalDirection.Bottom}>
                <span>this</span>
                <View style={{
        backgroundColor: "white"
      }}>
                    You can read so much more if you want...
                </View>
            </Tooltip>{" "}
            to see more information
        </View>;
}`,...(l=(s=o.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};var c,m,d;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  return <View style={{
    margin: "20px"
  }}>
            Hover over{" "}
            <Tooltip show={false} horizontalPosition={HorizontalDirection.Left} horizontalAlign={HorizontalDirection.Left} verticalPosition={VerticalDirection.Bottom}>
                <span>this</span>
                <View style={{
        backgroundColor: "white"
      }}>
                    You can read so much more if you want...
                </View>
            </Tooltip>{" "}
            to see more information
        </View>;
}`,...(d=(m=e.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const v=["Shown","Hidden"];export{e as Hidden,o as Shown,v as __namedExportsOrder,H as default};
