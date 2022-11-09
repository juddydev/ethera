"use strict";(self.webpackChunkweb_app=self.webpackChunkweb_app||[]).push([[124],{50988:function(e,n,t){t.r(n),t.d(n,{default:function(){return Y}});var i=t(72791),s=t(16090),r=t(79271),a=t(70885),l=t(57020),o=t(50228),c=t(48928),d=t.p+"static/media/def-ava.3a614f4c231447b5ae52.png",u=t(1413),x=t(60788),h=t(40464),p=t(13811),f=t(29823),m=t(55705),g=t(59911),j=t(39709),Z=t(57337),v=t(72900),y=t(88823),b=t(17205),w=t(98234),N=t.n(w),C=(t(89390),t(80184));function k(e){var n=e.open,t=e.setOpen,r=(0,s.K)((function(e){return e.user})),l=(0,s.K)((function(e){return e.setUser})),c=(0,i.useRef)(null),d=(0,i.useState)(""),m=(0,a.Z)(d,2),g=m[0],j=m[1],v=(0,i.useRef)(null),y=(0,i.useState)(),k=(0,a.Z)(y,2),P=k[0],O=k[1],A=(0,i.useState)(),I=(0,a.Z)(A,2),S=I[0],R=I[1];return(0,C.jsx)(x.Z,{onClose:function(){},open:n,children:(0,C.jsxs)(o.Z,{children:[(0,C.jsxs)(h.Z,{style:{display:"flex",justifyContent:"space-between"},children:["Change Image",(0,C.jsx)(p.Z,{onClick:function(){j(""),t(!1)},children:(0,C.jsx)(f.Z,{})})]}),(0,C.jsx)(o.Z,{sx:{typography:"body1",padding:1},children:(0,C.jsxs)(o.Z,{style:{width:"400px"},children:[!g&&(0,C.jsxs)(o.Z,{style:{height:"200px",display:"flex",justifyContent:"center",alignItems:"center"},children:[(0,C.jsx)("input",{type:"file",ref:c,style:{display:"none"},accept:"image/*",onChange:function(e){if(e.target.files&&e.target.files.length>0){var n=new FileReader;n.addEventListener("load",(function(){var e;return j((null===(e=n.result)||void 0===e?void 0:e.toString())||"")})),n.readAsDataURL(e.target.files[0])}}}),(0,C.jsx)(b.Z,{onClick:function(){return c.current.click()},children:"Upload"})]}),!!g&&(0,C.jsxs)(o.Z,{children:[(0,C.jsx)(N(),{crop:P,onChange:function(e,n){return O(n)},onComplete:function(e){var n=document.createElement("canvas"),t=window.devicePixelRatio,i=v.current.naturalWidth/v.current.width,s=v.current.naturalHeight/v.current.height,r=n.getContext("2d");n.width=e.width*t*i,n.height=e.height*t*s,r.setTransform(t,0,0,t,0,0),r.imageSmoothingQuality="high",r.drawImage(v.current,e.x*i,e.y*s,e.width*i,e.height*s,0,0,e.width*i,e.height*s),n.toBlob((function(e){e?R(e):console.error("Canvas is empty")}),"image/jpeg",1)},minWidth:100,minHeight:100,children:(0,C.jsx)("img",{style:{width:"400px",height:"auto"},ref:v,alt:"Crop me",src:g,onLoad:function(e){var n=e.currentTarget,t=n.width,i=n.height;O(function(e,n,t){return(0,w.centerCrop)((0,w.makeAspectCrop)({unit:"%",width:90},t,e,n),e,n)}(t,i,2))}})}),(0,C.jsx)(o.Z,{style:{display:"flex"},children:(0,C.jsx)(b.Z,{onClick:function(){var e=new FormData;e.append("file",S,"profileImg"),Z.ck(e).then((function(e){l((0,u.Z)((0,u.Z)({},r),{},{profileImage:e.data.user.profileImage})),t(!1)})).catch((function(e){return console.log(e)}))},style:{marginLeft:"auto"},children:"Save"})})]})]})})]})})}function P(e){var n=e.open,t=e.setOpen,r=e.user,l=(0,i.useState)(!1),c=(0,a.Z)(l,2),b=c[0],w=c[1],N=(0,i.useState)(!1),P=(0,a.Z)(N,2),O=P[0],A=P[1],I=(0,s.K)((function(e){return e.setUser})),S=(0,m.TA)({initialValues:{firstName:r.firstName,lastName:r.lastName,description:r.description?r.description:"",isProfileOpen:r.isProfileOpen,isAssetsOpen:r.isAssetsOpen},validate:function(e){var n={};return e.firstName||(n.firstName="Required"),e.lastName||(n.lastName="Required"),n},onSubmit:function(e){var n=new FormData;n.append("firstName",e.firstName),n.append("lastName",e.lastName),e.description&&n.append("description",e.description),n.append("isProfileOpen",e.isProfileOpen),n.append("isAssetsOpen",e.isAssetsOpen),A(!0),(0,Z.Vy)().put("/users",n).then((function(e){var n=e.data.user;I((0,u.Z)((0,u.Z)({},r),{},{firstName:n.firstName,lastName:n.lastName,description:n.description,isProfileOpen:n.isProfileOpen,isAssetsOpen:n.isAssetsOpen})),t(!1)})).finally((function(){return A(!1)}))}});return(0,C.jsxs)(x.Z,{onClose:function(){},open:n,children:[(0,C.jsxs)(o.Z,{children:[(0,C.jsxs)(h.Z,{style:{display:"flex",justifyContent:"space-between"},children:["Edit Profile",(0,C.jsx)(p.Z,{onClick:function(){return t(!1)},children:(0,C.jsx)(f.Z,{})})]}),(0,C.jsx)(o.Z,{sx:{width:"100%",typography:"body1",padding:1},children:(0,C.jsxs)(o.Z,{style:{display:"flex"},children:[(0,C.jsxs)(o.Z,{sx:{marginRight:"10px"},style:{display:"flex",flexDirection:"column"},children:[(0,C.jsx)("img",{style:{width:"150px",borderRadius:"10px"},alt:"",src:r.profileImage?r.profileImage:d}),(0,C.jsx)("a",{href:"/",onClick:function(e){e.preventDefault(),w(!0)},children:"change image"})]}),(0,C.jsx)(o.Z,{children:(0,C.jsxs)("form",{style:{display:"flex",flexDirection:"column"},onSubmit:S.handleSubmit,children:[(0,C.jsx)(g.Z,{margin:"dense",label:"First Name",name:"firstName",variant:"standard",error:!(!S.touched.firstName||!S.errors.firstName),helperText:S.touched.firstName&&S.errors.firstName?S.errors.firstName:"",onChange:S.handleChange,onBlur:S.handleBlur,value:S.values.firstName}),(0,C.jsx)(g.Z,{margin:"dense",label:"Last Name",name:"lastName",variant:"standard",error:!(!S.touched.lastName||!S.errors.lastName),helperText:S.touched.lastName&&S.errors.lastName?S.errors.lastName:"",onChange:S.handleChange,onBlur:S.handleBlur,value:S.values.lastName}),(0,C.jsx)(g.Z,{margin:"dense",label:"Profile Description",name:"description",variant:"standard",onChange:S.handleChange,onBlur:S.handleBlur,value:S.values.description}),(0,C.jsx)(v.Z,{checked:S.values.isProfileOpen,name:"isProfileOpen",control:(0,C.jsx)(y.Z,{onChange:function(e){S.setFieldValue("isProfileOpen",e.target.checked)}}),label:"Is Profile Open",labelPlacement:"end"}),(0,C.jsx)(v.Z,{checked:S.values.isAssetsOpen,name:"isAssetsOpen",control:(0,C.jsx)(y.Z,{onChange:function(e){S.setFieldValue("isAssetsOpen",e.target.checked)}}),label:"Is Assets Open",labelPlacement:"end"}),(0,C.jsx)(j.Z,{type:"submit",loading:O,variant:"contained",children:"Save"})]})})]})})]}),b&&(0,C.jsx)(k,{open:b,setOpen:w})]})}function O(e){var n=e.profile,t=i.useState(!1),r=(0,a.Z)(t,2),l=r[0],u=r[1],x=(0,s.K)((function(e){return e.user}));return n?(0,C.jsx)(o.Z,{style:{marginTop:"10px",marginRight:"10px"},children:(0,C.jsxs)(c.Z,{sx:{display:"flex",padding:"10px",flexDirection:"column",alignItems:"center",width:"100%"},children:[(0,C.jsx)(o.Z,{sx:{marginRight:"10px"},children:!!n.firstName&&(0,C.jsx)("img",{style:{width:"150px",borderRadius:"10px"},alt:"",src:n.profileImage||d})}),(0,C.jsxs)(o.Z,{children:[(0,C.jsxs)(o.Z,{sx:{fontWeight:"bold"},children:[null===n||void 0===n?void 0:n.firstName," ",null===n||void 0===n?void 0:n.lastName]}),(null===n||void 0===n?void 0:n.description)&&(0,C.jsxs)(o.Z,{children:["Description: ",null===n||void 0===n?void 0:n.description]})]})]})}):(0,C.jsxs)(o.Z,{style:{marginTop:"10px",marginRight:"10px"},children:[(0,C.jsxs)(c.Z,{sx:{display:"flex",padding:"10px",flexDirection:"column",alignItems:"center",width:"100%"},children:[(0,C.jsx)(o.Z,{sx:{marginRight:"10px"},children:(0,C.jsx)("img",{style:{width:"150px",borderRadius:"10px"},alt:"",src:x.profileImage||d})}),(0,C.jsx)(o.Z,{children:!!x.firstName&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(o.Z,{sx:{fontWeight:"bold"},children:[null===x||void 0===x?void 0:x.firstName," ",null===x||void 0===x?void 0:x.lastName]}),(null===x||void 0===x?void 0:x.description)&&(0,C.jsxs)(o.Z,{children:["Description: ",null===x||void 0===x?void 0:x.description]})]})}),x.firstName&&(0,C.jsx)("a",{href:"/",onClick:function(e){e.preventDefault(),u(!0)},children:"Edit"})]}),l&&(0,C.jsx)(P,{open:l,setOpen:u,user:x})]})}var A=t(52791),I=t(74142),S=t(76132),R=t(19978),D=t(5682),F=t(73978),K=t(4346),T=t(65209),B=t(45629),E=t(24177),L={Free:{color:"blue"},Silver:{color:"grey"},Gold:{color:"orange"},Bronze:{color:"chocolate"},Rare:{color:"lightgreen"},"Unique!":{color:"black"}},U=function(e){var n=e.item,t=(0,I.Z)();(0,s.K)((function(e){return e.user.walletAddress}));return(0,C.jsx)(S.ZP,{children:(0,C.jsxs)(R.Z,{children:[(0,C.jsx)(D.Z,{children:(0,C.jsx)(F.Z,{style:{backgroundColor:t.palette.primary.main},src:n.imagePreview})}),(0,C.jsx)(K.Z,{primary:n.tokenName}),(0,C.jsx)(A.Z,{sx:{display:"flex",justifyContent:"center",alignItems:"center"},children:(0,C.jsxs)("span",{children:[n.balance,"/",n.total]})})]})},n.nftId)},W=function(e){var n=e.item,t=(0,I.Z)();return(0,C.jsx)(S.ZP,{children:(0,C.jsxs)(R.Z,{children:[(0,C.jsx)(D.Z,{children:(0,C.jsx)(F.Z,{style:{backgroundColor:t.palette.primary.main},src:n.nftFileUrl})}),(0,C.jsx)(K.Z,{primary:n.tokenName}),(0,C.jsxs)(A.Z,{sx:{display:"flex",justifyContent:"flex-start",alignItems:"center"},children:[(0,C.jsx)(A.Z,{sx:{display:"flex",justifyContent:"flex-end",alignItems:"center"},children:n.traits.map((function(e){return(0,C.jsx)(T.Z,{sx:{backgroundColor:L[e].color,marginRight:"5px"},label:e},e)}))}),(0,C.jsxs)("span",{style:{textAlign:"left"},children:[n.balance,"/",n.total]})]})]})},n.nftId)};function V(e){var n=e.balance,t=n.filter((function(e){return"NFT"===e.tokenType})),i=(0,E.Ev)(n);return(0,C.jsxs)(B.Z,{sx:{width:"100%",bgcolor:"background.paper"},children:[t.map((function(e){return(0,C.jsx)(U,{item:e},e.balance)})),i.map((function(e){return(0,C.jsx)(W,{item:e},e.balance)}))]})}var _=t(63186),q=t(4565),H=t(61102),z=t(91482),G=function(e){var n=e.item,t=(0,I.Z)();return(0,C.jsx)(S.ZP,{children:(0,C.jsxs)(R.Z,{children:[(0,C.jsx)(D.Z,{children:(0,C.jsx)(F.Z,{style:{backgroundColor:t.palette.primary.main},src:n.file.locationPreview})}),(0,C.jsx)(K.Z,{primary:n.documentName,secondary:(0,z.Z)(new Date(n.createdAt),"pp PP")}),(0,C.jsx)(A.Z,{sx:{display:"flex",justifyContent:"center",alignItems:"center"},children:(0,C.jsx)(p.Z,{sx:{color:"black"},children:(0,C.jsx)(H.Z,{})})})]})},n._id)};function Q(e){var n=e.documents;return(0,C.jsx)(B.Z,{sx:{width:"100%",bgcolor:"background.paper"},children:n.map((function(e){return(0,C.jsx)(G,{item:e},e._id)}))})}var J=t(11302);function M(){var e=(0,i.useState)(!1),n=(0,a.Z)(e,2),t=n[0],r=n[1],c=(0,i.useState)(),d=(0,a.Z)(c,2),u=d[0],x=d[1],h=(0,s.K)((function(e){return e.user})),p=(0,s.K)((function(e){return e.balance})),f=(0,s.K)((function(e){return e.documents}));return(0,i.useEffect)((function(){r(!0),(0,Z.f1)(h.walletAddress).then((function(e){x(e.data)})).finally((function(){return r(!1)}))}),[]),t?(0,C.jsx)(J.A,{}):(0,C.jsxs)(l.Z,{maxWidth:"xl",style:{height:"calc(100vh - 80px)"},children:[(0,C.jsx)(o.Z,{sx:{margin:"auto",width:"200px"},children:(0,C.jsx)(O,{})}),(0,C.jsx)(q.Z,{variant:"h6",style:{margin:"16px"},children:"Items"}),(0,C.jsx)(V,{balance:p.filter(E.LK)}),!!f.length&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(q.Z,{variant:"h6",style:{margin:"16px"},children:"Documents"}),(0,C.jsx)(Q,{documents:f})]}),!!u&&(0,C.jsxs)(o.Z,{children:[(0,C.jsx)(q.Z,{variant:"h6",style:{margin:"16px"},children:"Transactions"}),(0,C.jsx)(_.P,{transactions:u.items})]})]})}function X(e){var n=(0,i.useState)(!0),t=(0,a.Z)(n,2),s=t[0],r=t[1],c=(0,i.useState)(),d=(0,a.Z)(c,2),u=d[0],x=d[1],h=(0,i.useState)(),p=(0,a.Z)(h,2),f=p[0],m=p[1],g=(0,i.useState)([]),j=(0,a.Z)(g,2),v=j[0],y=j[1];return(0,i.useEffect)((function(){r(!0),(0,Z.k2)(e.walletAddress).then((function(e){console.log("getPublicProfile ",e.data),x(e.data)})),r(!1),(0,Z.f1)(e.walletAddress).then((function(e){m(e.data)})),(0,Z.sb)(e.walletAddress).then((function(e){console.log("balance ",e.data),y(e.data.balance)}))}),[]),s?(0,C.jsx)(J.A,{}):(0,C.jsxs)(l.Z,{maxWidth:"xl",style:{height:"calc(100vh - 80px)"},children:[(0,C.jsxs)(o.Z,{children:[!!u&&(0,C.jsx)(o.Z,{sx:{width:"200px",margin:"auto",padding:"10px"},children:(0,C.jsx)(O,{profile:u})}),(0,C.jsx)(q.Z,{variant:"h6",style:{margin:"16px"},children:"Items"}),(0,C.jsx)(V,{balance:v.filter(E.LK)})]}),!!f&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(q.Z,{variant:"h6",style:{margin:"16px"},children:"Transactions"}),(0,C.jsx)(_.P,{transactions:f.items})]})]})}function Y(){var e=(0,s.K)((function(e){return e.user})),n=(0,r.UO)();return e.walletAddress===n.wallet?(0,C.jsx)(M,{}):(0,C.jsx)(X,{walletAddress:n.wallet})}}}]);
//# sourceMappingURL=124.ec127582.chunk.js.map