import{bB as o,j as s}from"./iframe-Bn4eIUvs.js";const m="_demoContainer_1nobv_1",v="_scrollContent_1nobv_8",C="_card_1nobv_14",e={demoContainer:m,scrollContent:v,card:C},p={title:"Components/ScrollableView",component:o,parameters:{docs:{description:{component:"A component that provides scrollable container with navigation buttons for content that overflows its container."}}}},r={render:()=>s.jsx("div",{className:e.demoContainer,children:s.jsx(o,{overflowX:"auto",scrollDescription:"Scroll through cards",children:s.jsxs("div",{className:e.scrollContent,children:[s.jsx("div",{className:e.card,children:"Card 1"}),s.jsx("div",{className:e.card,children:"Card 2"}),s.jsx("div",{className:e.card,children:"Card 3"}),s.jsx("div",{className:e.card,children:"Card 4"}),s.jsx("div",{className:e.card,children:"Card 5"}),s.jsx("div",{className:e.card,children:"Card 6"}),s.jsx("div",{className:e.card,children:"Card 7"}),s.jsx("div",{className:e.card,children:"Card 8"})]})})})},a={render:()=>s.jsx("div",{className:e.demoContainer,children:s.jsx(o,{overflowX:"auto",scrollDescription:"This content doesn't need scrolling",children:s.jsxs("div",{className:e.scrollContent,children:[s.jsx("div",{className:e.card,children:"Card 1"}),s.jsx("div",{className:e.card,children:"Card 2"})]})})}),parameters:{docs:{description:{story:"When content fits within the container, scroll buttons will not appear."}}}};var c,l,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div className={styles.demoContainer}>
            <ScrollableView overflowX="auto" scrollDescription="Scroll through cards">
                <div className={styles.scrollContent}>
                    <div className={styles.card}>Card 1</div>
                    <div className={styles.card}>Card 2</div>
                    <div className={styles.card}>Card 3</div>
                    <div className={styles.card}>Card 4</div>
                    <div className={styles.card}>Card 5</div>
                    <div className={styles.card}>Card 6</div>
                    <div className={styles.card}>Card 7</div>
                    <div className={styles.card}>Card 8</div>
                </div>
            </ScrollableView>
        </div>
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var n,t,i;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => <div className={styles.demoContainer}>
            <ScrollableView overflowX="auto" scrollDescription="This content doesn't need scrolling">
                <div className={styles.scrollContent}>
                    <div className={styles.card}>Card 1</div>
                    <div className={styles.card}>Card 2</div>
                </div>
            </ScrollableView>
        </div>,
  parameters: {
    docs: {
      description: {
        story: "When content fits within the container, scroll buttons will not appear."
      }
    }
  }
}`,...(i=(t=a.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};const N=["HorizontalScroll","NonScrollable"];export{r as HorizontalScroll,a as NonScrollable,N as __namedExportsOrder,p as default};
