"use strict";(self.webpackChunkweb_app=self.webpackChunkweb_app||[]).push([[562],{16562:function(e,t,n){n.r(t),n.d(t,{default:function(){return m}});var s=n(74165),a=n(15861),i=n(70885),r=n(72791),c=n(64880),o=n(57337),l=n(91482),u=n(11302),p=n(50228),f=n(4565),d=n(80184),h={difficulty:"Difficulty",extraData:"Extra Data",gasLimit:"Gas Limit",gasUsed:"Gas Used",Hash:"Hash",logsBloom:"Logs Bloom",miner:"Miner",mixHash:"Mix Hash",Nonce:"Nonce",number:"Block Number",parentHash:"Parent Hash",receiptsRoot:"Receipts Root",sha3Uncles:"Sha3Uncles",size:"Size",stateRoot:"State Root",timestamp:"Timestamp",totalDifficulty:"Total Difficulty",transactions:"Transactions",transactionsRoot:"Transactions Root",uncles:"Uncles"};function m(e){var t=(0,r.useState)({}),n=(0,i.Z)(t,2),m=n[0],x=n[1],b=(0,r.useState)(!1),j=(0,i.Z)(b,2),k=j[0],v=j[1],Z=(0,c.UO)(),g=function(){var e=(0,a.Z)((0,s.Z)().mark((function e(){var t,n,a;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v(!0),e.prev=1,e.next=4,(0,o.OQ)(Z.blockNumber);case 4:t=e.sent,n=t.data,a=Object.fromEntries(Object.entries(n).map((function(e){return"timestamp"===e[0]&&(e[1]=(0,l.Z)(new Date(1e3*e[1]),"PPpp")),e}))),x(a),v(!1),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(){return e.apply(this,arguments)}}();return(0,r.useEffect)((function(){null!==Z&&void 0!==Z&&Z.blockNumber&&g()}),[Z]),k?(0,d.jsx)(u.A,{}):(0,d.jsxs)(p.Z,{sx:{overflowX:"hidden"},children:[(0,d.jsxs)(f.Z,{variant:"h4",sx:{paddingInline:"20px",fontSize:25,paddingTop:"20px"},children:["Block details: #",Z.blockNumber]}),(0,d.jsx)(p.Z,{style:{display:"flex",alignItems:"flex-start",flexDirection:"column",padding:20},children:Object.entries(m).map((function(e){return(0,d.jsxs)(p.Z,{children:[(0,d.jsx)("span",{children:(0,d.jsxs)("b",{children:[h[e[0]]||e[0],": "]})}),(0,d.jsx)("span",{children:e[1]})]},e[0])}))})]})}}}]);
//# sourceMappingURL=562.27d763d5.chunk.js.map