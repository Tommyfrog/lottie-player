/*! For license information please see block.js.LICENSE.txt */
!function(){var e={184:function(e,t){var l;!function(){"use strict";var o={}.hasOwnProperty;function n(){for(var e=[],t=0;t<arguments.length;t++){var l=arguments[t];if(l){var i=typeof l;if("string"===i||"number"===i)e.push(l);else if(Array.isArray(l)){if(l.length){var r=n.apply(null,l);r&&e.push(r)}}else if("object"===i)if(l.toString===Object.prototype.toString)for(var a in l)o.call(l,a)&&l[a]&&e.push(a);else e.push(l.toString())}}return e.join(" ")}e.exports?(n.default=n,e.exports=n):void 0===(l=function(){return n}.apply(t,[]))||(e.exports=l)}()}},t={};function l(o){var n=t[o];if(void 0!==n)return n.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,l),i.exports}!function(){"use strict";var e;(e=l(184))&&e.__esModule,lodash.assign;var t=wp.i18n.__,o=wp.blocks.registerBlockType,n=wp.hooks.addFilter,i=wp.compose,r=i.createHigherOrderComponent,a=(i.withState,wp.element.Fragment),u=wp.blockEditor,p=u.InspectorControls,s=u.PanelColorSettings,c=u.MediaUpload,m=u.MediaUploadCheck,d=wp.components,f=d.PanelBody,g=d.Panel,h=(d.PanelRow,d.Button),w=d.SelectControl,v=(d.TextControl,d.FormToggle,d.ToggleControl),y=d.RangeControl,b=(d.ColorPalette,[{label:t("Normal","tf"),value:"normal"},{label:t("Ping Pong","tf"),value:"bounce"}]),k=["tf-theme/lottie-block"],C=["application/json"];o("tf-theme/lottie-block",{title:t("Lottie-Player","tf"),icon:"player",category:"tf",keywords:[t("lottie","tf"),t("player","tf")],attributes:{mediaId:{type:"number",default:0},lottieJson:{type:"string",default:"https://assets1.lottiefiles.com/packages/lf20_kqfglvmb.json"},lottieAutoplay:{type:"boolean",default:!0},lottieHoverplay:{type:"boolean",default:!1},lottieBackgroundColor:{type:"string",default:"transparent"},lottieHover:{type:"boolean",default:!1},lottieMode:{type:"string",default:b[0].value},lottieSpeed:{type:"number",default:1},lottieWidth:{type:"number",default:320},lottieHeight:{type:"number",default:320}},edit:function(e){var t=e.attributes,l=t.mediaId,o=t.lottieJson,n=t.lottieAutoplay,i=t.lottieHoverplay,r=t.lottieControls,a=t.lottieBackgroundColor,u=t.lottieWidth,p=t.lottieHeight;return e.className,e.setAttributes,wp.element.createElement("lottie-player",{autoplay:n,controls:r,loop:!0,className:1==i?"lottie-hoverEffects":"",mode:"normal","data-media":l,src:o,style:{width:u+"px",height:p+"px",backgroundColor:a}},wp.element.createElement("i",null,"Lottie-JSON will be loaded"))},save:function(e){var t=e.attributes,l=t.mediaId,o=t.lottieJson,n=t.lottieControls,i=t.lottieAutoplay,r=t.lottieHoverplay,a=(t.lottieSpeed,t.lottieMode,t.lottieDirection,t.lottieBackgroundColor),u=t.lottieWidth,p=t.lottieHeight;return e.className,e.setAttributes,wp.element.createElement("lottie-player",{autoplay:i,className:1==r?"lottie-hoverEffects":"",controls:n,loop:!0,mode:"normal","data-media":l,src:o,style:{width:u+"px",height:p+"px",backgroundColor:a}},wp.element.createElement("i",null,"Lottie-JSON will be loaded"))}}),n("editor.BlockEdit","tf/lottie-block",r((function(e){return function(l){if(!k.includes(l.name))return wp.element.createElement(e,l);var o=l.attributes,n=o.mediaId,i=(o.lottieJson,o.lottieControls),r=o.lottieAutoplay,u=o.lottieHoverplay,d=o.lottieSpeed,E=o.lottieMode,x=o.lottieDirection,A=o.lottieBackgroundColor,S=o.lottieWidth,H=o.lottieHeight,J=l.setAttributes,P=wp.element.createElement("p",null,t("To edit Jottiefile, you need permission to upload media.","tf"));return wp.element.createElement(a,null,wp.element.createElement(e,l),wp.element.createElement(p,null,wp.element.createElement(g,null,wp.element.createElement(f,{title:t("Jottiefile","tf"),initialOpen:!0,label:t("Further Infos in Jottiefile","tf")},wp.element.createElement(m,{fallback:P},wp.element.createElement(c,{onSelect:function(e){return J({mediaId:e.id,lottieJson:e.url.replace(/(^\w+:|^)/,"")})},allowedTypes:C,value:n,render:function(e){var l=e.open;return wp.element.createElement(h,{className:0==n?"editor-post-featured-image__toggle":"editor-post-featured-image__preview",onClick:l},t("Choose an jottiefile (JSON)","tf"))}})),0!=n&&wp.element.createElement(m,null,wp.element.createElement(h,{onClick:function(e){return J({mediaId:0,lottieJson:""})},isLink:!0,isDestructive:!0},t("Remove jottiefile","tf"))),wp.element.createElement(v,{label:t("aktiviere Autoplay?","tf"),help:t(r?"Autoplay aktiv":"kein Autoplay","tf"),checked:r,onChange:function(){return J({lottieAutoplay:!r})}}),wp.element.createElement(v,{label:t("Hoverfunktion","tf"),help:t(u?"Play bei Mouseover":"Play Allways","tf"),checked:u,onChange:function(){return J({lottieHoverplay:!u})}}),wp.element.createElement(v,{label:t("Zeige Controls","tf"),help:t(i?"Zeige Controls an":"Zeige Controls verbergen","tf"),checked:i,onChange:function(){return J({lottieControls:!i})}}),wp.element.createElement(v,{label:t("Abspielrichtung","tf"),help:t(x?"Vorwärts":"Rückwärts","tf"),checked:x,onChange:function(){return J({lottieDirection:!x})}}),wp.element.createElement(w,{label:t("Modus","tf"),value:E,options:b,onChange:function(e){return J({lottieMode:e})}}),wp.element.createElement(y,{label:t("Geschwindigkeit in 1x","tf"),allowReset:!0,resetFallbackValue:1,value:d,onChange:function(e){return J({lottieSpeed:e})},min:-1,max:10,step:1}),wp.element.createElement(y,{label:t("Width in px","tf"),allowReset:!0,resetFallbackValue:0,value:S,onChange:function(e){return J({lottieWidth:e})},min:0,max:1e3,step:10}),wp.element.createElement(y,{label:t("Height in px","tf"),allowReset:!0,resetFallbackValue:0,value:H,onChange:function(e){return J({lottieHeight:e})},min:0,max:1e3,step:10}),wp.element.createElement(s,{title:t("Farbeinstellungen","tf"),initialOpen:!1,colorSettings:[{value:A,onChange:function(e){return J({lottieBackgroundColor:e})},label:t("Hintergrundfarbe","tf")}]})))))}}),"withInspectorControl")),document.querySelectorAll(".lottie-hoverEffects").forEach((function(e){e.addEventListener("mouseover",(function(){e.play()})),e.addEventListener("mouseleave",(function(){e.pause()}))}))}()}();