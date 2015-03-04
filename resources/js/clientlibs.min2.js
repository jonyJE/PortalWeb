var adsk=adsk||{};
adsk.s=adsk.s||{};
adsk.education=function(){var b=adsk.education||{};
b.EducationalDownload=function(c,e){this.rootElement=c;
this.versionSelector=c.find(".edu-dl-v");
this.languageSelector=c.find(".edu-dl-la");
this.osSelector=c.find(".edu-dl-os");
this.stepOne=c.find(".step-one");
this.stepTwo=c.find(".step-two");
this.stepThree=c.find(".step-three");
this.loadingSpinner=this.stepThree.find(".loading-spinner");
this.productNameLabel=this.stepThree.find(".product-name");
this.serialNumberLabel=this.stepThree.find(".serial-number");
this.productKeyLabel=this.stepThree.find(".product-key");
this.stepOneIndicator=this.stepOne.find(".check");
this.stepTwoIndicator=this.stepTwo.find(".check");
this.signInButton=this.stepOne.find(".sign-in-btn");
this.createAccountButton=this.stepOne.find(".create-account-btn");
this.logOutButton=this.stepOne.find(".log-out-btn");
this.myAccountButton=this.stepOne.find(".my-acct-btn");
this.disabledButton=this.stepThree.find(".sdk-button-disabled");
this.disabledButtonSdkText=this.stepThree.find("#disabled-anchor-text");
this.enabledButton=this.stepThree.find(".sdk-button-enabled");
this.emailNotificationLabel=this.stepThree.find(".email-sent-notification");
this.languageSelector.attr("disabled",true);
this.osSelector.attr("disabled",true);
this.versionSelector.bind("change",$.proxy(this,"onVersionChanged"));
this.languageSelector.bind("change",$.proxy(this,"onLanguageChanged"));
this.osSelector.bind("change",$.proxy(this,"onOsChanged"));
this.signInButton.bind("click",$.proxy(this,"onSignInClicked"));
this.createAccountButton.bind("click",$.proxy(this,"onCreateAccountClicked"));
this.logOutButton.bind("click",$.proxy(this,"onLogOutClicked"));
this.releases=e.releases||[];
this.i18n=e.i18n||{};
this.isStepOneComplete=false;
this.createEsdArg=adsk.product.trialDownload.ReleaseSelector.prototype.createEsdArg;
this.createDlmArg=adsk.product.trialDownload.ReleaseSelector.prototype.createDlmArg;
b.EducationalDownload.instances.push(this);
var d="Install Now";
if(window.ADSKDLMResourceStrings&&this.i18n.sdkLocale&&ADSKDLMResourceStrings[this.i18n.sdkLocale]){d=ADSKDLMResourceStrings[this.i18n.sdkLocale].splitbtnInstallNow
}this.disabledButtonSdkText.append(d);
if(adsk.hasOwnProperty("oxygen")&&adsk.oxygen.eidmGuid){if(adsk.oxygen.eidmGuid<0||!adsk.oxygen.eduValid){this.stepOne.addClass("part-logged-in")
}else{this.myAccountButton.attr("href","/services/adsk/c/oxygen/tool.do/edit?returnUrl="+window.location.href);
this.stepOne.addClass("logged-in");
this.setStepOneComplete(true)
}}};
b.EducationalDownload.analyticsCallback=undefined;
b.EducationalDownload.stepTwoAnalyticsCallback=undefined;
b.EducationalDownload.instances=[];
b.EducationalDownload.prototype.getRelease=function(d){var c;
for(c=0;
c<this.releases.length;
++c){if(this.releases[c].name===d){return this.releases[c]
}}return undefined
};
b.EducationalDownload.prototype.getReleaseOptions=function(d){var g={};
var c;
var f;
if(d){for(var e=0;
e<d.releases.length;
++e){c=d.releases[e];
if(!g.hasOwnProperty(c.locale)){g[c.locale]=new Array()
}f=g[c.locale];
f.push(c.operatingSystem)
}}return g
};
b.EducationalDownload.prototype.getReleaseData=function(c,g,f){if(c){for(var d=0;
d<c.releases.length;
++d){var e=c.releases[d];
if(e.locale===g&&e.operatingSystem===f){return e
}}}return undefined
};
b.EducationalDownload.prototype.populateLanguageDropDown=function(c){var d=this.getReleaseOptions(c);
var e;
for(var f in d){if(d.hasOwnProperty(f)){e+='<option value="'+f+'">';
e+=(this.i18n["locale-"+f]||f);
e+="</option>"
}}this.languageSelector.html($(e).sort(function(h,g){return h.text===g.text?0:h.text<g.text?-1:1
}));
this.languageSelector.prepend('<option value="" selected="selected">'+(this.i18n["language-label"]||"Language")+"</option>")
};
b.EducationalDownload.prototype.populateOsDropDown=function(c,i){var e=this.getReleaseOptions(c);
var h=e[i];
var f='<option value="" selected="selected">'+(this.i18n["os-label"]||"Operating System")+"</option>";
if(h){for(var d=0;
d<h.length;
++d){var g=h[d];
f+='<option value="'+g+'">';
f+=this.i18n["os-"+g.toLowerCase()];
f+="</option>"
}}this.osSelector.html(f)
};
b.EducationalDownload.prototype.setSelectedRelease=function(c){this.selectedRelease=this.getRelease(c);
this.populateLanguageDropDown(this.selectedRelease);
this.languageSelector.attr("disabled",this.selectedRelease===undefined);
this.osSelector.attr("disabled",true);
this.languageSelector.change()
};
b.EducationalDownload.prototype.setSelectedLanguage=function(c){this.selectedLanguage=c;
this.populateOsDropDown(this.selectedRelease,this.selectedLanguage);
this.osSelector.attr("disabled",!this.selectedLanguage.length);
this.osSelector.change()
};
b.EducationalDownload.prototype.setSelectedOs=function(c){this.selectedOs=c;
this.setStepTwoComplete(c)
};
b.EducationalDownload.prototype.setStepOneComplete=function(c){if(c&&this.isStepOneComplete){return
}else{if(c){adsk.s.ApplicationName="segment";
adsk.s.ApplicationStep="1";
this.stepTwo.removeClass("disabled");
this.versionSelector.attr("disabled",false);
this.isStepOneComplete=true
}else{this.versionSelector.val("");
this.stepTwo.addClass("disabled");
this.versionSelector.attr("disabled",true);
this.isStepOneComplete=false;
this.setStepTwoComplete(false)
}}this.versionSelector.change()
};
b.EducationalDownload.prototype.onWebServicesError=function(){var c='<div class="js-asset" style="width:400px">';
c+="<h4>"+this.i18n.wsErrorSolutionHeader+"</h4>";
c+="<ol><li>"+this.i18n.wsErrorSolution1+"</li>";
c+="<li>"+this.i18n.wsErrorSolution2+"</li></ol>";
c+='<h4><a href="javascript:adsk.tools.closeLightbox();">';
c+=this.i18n.wsErrorClose;
c+="</a></div>";
adsk.tools.doDisplayLightbox(c,this.i18n.wsErrorMessage,"",{className:"edu-error-popup"})
};
b.EducationalDownload.prototype.setStepTwoComplete=function(c){var e;
var d=this;
if(c){this.versionSelector.attr("disabled",true);
this.languageSelector.attr("disabled",true);
this.osSelector.attr("disabled",true);
adsk.s.ApplicationName="segment";
adsk.s.ApplicationStep="2";
e=this.getReleaseData(this.selectedRelease,this.selectedLanguage,this.selectedOs);
e.sku=this.selectedRelease.sku||"";
e.productKey=this.selectedRelease.productKey||"";
this.stepTwoIndicator.show();
this.loadingSpinner.show();
$.ajax("/services/adsk/c/oxygen/webservice",{dataType:"json",data:{productName:e.displayName,productSKU:e.sku,productKey:e.productKey,locale:document.documentElement.lang},error:function(g,f,h){d.onWebServicesError(f)
},timeout:30000,success:function(f){if(f.state!=="Sucess"){d.onWebServicesError(f.state)
}else{d.serialNumber=f.serialNumber;
adsk.product.trialDownload.loadSdk(function(){d.productNameLabel.html(e.displayName);
d.serialNumberLabel.html(d.serialNumber);
d.productKeyLabel.html(e.productKey);
d.emailNotificationLabel.show();
d.stepThree.removeClass("disabled");
if(b.EducationalDownload.stepTwoAnalyticsCallback&&typeof(b.EducationalDownload.stepTwoAnalyticsCallback)==="function"){try{b.EducationalDownload.stepTwoAnalyticsCallback(adsk.oxygen.eidmGuid,d.serialNumber,e.productKey)
}catch(g){}}})
}},complete:function(){d.versionSelector.attr("disabled",false);
d.languageSelector.attr("disabled",false);
d.osSelector.attr("disabled",false);
d.loadingSpinner.hide();
adsk.product.trialDownload.loadSdk(function(){d.setDownloadButtonEnabled(true)
})
}})
}else{this.stepThree.addClass("disabled");
this.setDownloadButtonEnabled(false);
this.stepTwoIndicator.hide();
this.emailNotificationLabel.hide()
}};
b.EducationalDownload.prototype.setDownloadButtonEnabled=function(f){var c;
if(f){adsk.s.ApplicationName="segment";
adsk.s.ApplicationStep="2";
this.disabledButton.hide();
this.enabledButton.show();
c=this.enabledButton.attr("id")+"-inner";
this.enabledButton.html('<div id="'+c+'"></div>');
var d=this.getReleaseData(this.selectedRelease,this.selectedLanguage,this.selectedOs);
var j=this.i18n.sdkLocale||"en-US";
var k=this.createDlmArg(d);
var e=d.installNowUri;
var i=this.createWiParam(d);
var l=this.createEsdArg(d);
var h=adsk.product.trialDownload.browserDownload;
var g=$.proxy(this,"onAnalyticsCallback");
var m=d.eulaId;
fxSplitButton(j,c,k,e,i,l,h,g,m)
}else{this.disabledButton.show();
this.enabledButton.html("");
this.enabledButton.hide()
}};
b.EducationalDownload.prototype.createWiParam=function(d){if(!d.installNowUri){return undefined
}var c='/url "'+d.installNowUri+'"';
if(this.serialNumber){c+=" /SN "+this.serialNumber
}if(d.productKey){c+=" /PK "+d.productKey
}c+=" /student ";
c+=" /akamai";
if(d.eulaId){c+=" /skipEULA"
}c+=" /auth authparam";
c+=" /sid SESSION_ID";
return c
};
b.EducationalDownload.prototype.onHelp=function(c){b.openVirtualAgent(c.data.startContext,c.data.entry);
c.preventDefault()
};
b.EducationalDownload.prototype.onAnalyticsCallback=function(e,c){var d;
if(b.EducationalDownload.analyticsCallback&&typeof(b.EducationalDownload.analyticsCallback)==="function"){switch(c){case cbAnalyticsReturn.IN:d=1;
break;
case cbAnalyticsReturn.DN:d=2;
break;
case cbAnalyticsReturn.BD:d=3;
break;
case cbAnalyticsReturn.HMDIN:d=3.1;
break;
case cbAnalyticsReturn.HMDDN:d=3.2;
break;
case cbAnalyticsReturn.HMDBD:d=3.3;
break;
default:return
}b.EducationalDownload.analyticsCallback(this.selectedRelease.name,this.selectedLanguage,this.selectedOs,d)
}};
function a(d,c,f,e,g){if(g&&typeof(g)==="function"){g(d,c,f,e)
}}b.EducationalDownload.prototype.onVersionChanged=function(c){this.setSelectedRelease(c.target.value)
};
b.EducationalDownload.prototype.onLanguageChanged=function(c){this.setSelectedLanguage(c.target.value)
};
b.EducationalDownload.prototype.onOsChanged=function(c){this.setSelectedOs(c.target.value)
};
b.EducationalDownload.prototype.onSignInClicked=function(c){adsk.oxygen.signInClick();
c.preventDefault()
};
b.EducationalDownload.prototype.onCreateAccountClicked=function(c){try{adsk.oxygen.openIFrame("register","lang="+document.documentElement.lang)
}catch(d){}c.preventDefault()
};
b.EducationalDownload.prototype.onLogOutClicked=function(c){try{adsk.oxygen.logout()
}catch(d){}c.preventDefault()
};
b.openVirtualAgent=function(d,e){var c="http://autodesk.creativevirtual15.com/autodesk/bot.html?isJSEnabled=1&businessArea=Root.Education";
if(d){c+="&startContext="+escape(d)
}if(e){c+="&entry="+escape(e)
}window.open(c,"AutodeskVirtualAssistant","width=581,height=552")
};
return b
}();
window.adsk=window.adsk||{};
adsk.freetrial=adsk.freetrial||{};
adsk.freetrial.trialDownload=function(){var g=adsk.freetrial.trialDownload||{};
var a=false;
var f=null;
var e=[];
var d=null;
var c=null;
var b=4;
g.languageSelector=function(i,l,m,j,h,k){if(h=="false"&&k=="true"){$(m.languageSel+"placeholder").append("Release not configured in the Download Data Component.");
document.getElementById(m.languageSel.replace("#","")+"placeholder").setAttribute("class","adsk-component-placeholder")
}else{if(!g.langSupportedMap){g.langSupportedMap=j
}if(!g.defaultLanguage){g.defaultLanguage=l.sdkLocale
}if(!g.detectedOs){g.detectedOs=g.getAutodetectedOperatingSystem()
}d=i[0];
c=m.languageSel;
g.buildLanguageDisplay()
}};
g.isOsAvailable=function(){var i=g.getReleaseOptions();
var k=false;
for(var h in g.langSupportedMap){if(g.langSupportedMap.hasOwnProperty(h)){var j=i[g.langSupportedMap[h]];
if(j&&j.indexOf(g.detectedOs)>-1){k=true
}}}return k
};
g.buildLanguageDisplay=function(){var i=g.getReleaseOptions();
var k=c+"ul1";
var j=c+"ul2";
var o=0;
var l={};
for(var p in g.langSupportedMap){if(g.langSupportedMap.hasOwnProperty(p)){var h=i[g.langSupportedMap[p]];
if(h&&h.indexOf(g.detectedOs)>-1){l[p]=g.langSupportedMap[p];
o++
}if(g.langSupportedMap[p]==g.defaultLanguage){g.defaultLangAvail=true;
f=g.defaultLanguage
}}}var n=0;
for(var p in l){if(l.hasOwnProperty(p)){var q=c+l[p];
var m='<li class="bt3"> <a href="#" class="phm pvs noDecor';
if(l[p]==g.defaultLanguage||(!g.defaultLangAvail&&l[p]=="en-US")){m=m+" active"
}m=m+'" id="'+q.replace("#","")+'">';
if(l[p]==g.defaultLanguage||(!g.defaultLangAvail&&l[p]=="en-US")){m=m+"<strong>"
}m=m+p;
if(l[p]==g.defaultLanguage||(!g.defaultLangAvail&&l[p]=="en-US")){m=m+"</strong>"
}m=m+"</a></li>";
if(n<b||n<Math.ceil(o/2)){$(k).append(m)
}else{$(j).append(m)
}$(q).bind("click",{id:q,langValue:l[p],langKey:p},g.languageChanged);
n=n+1
}}};
g.getReleaseOptions=function(){var k={};
if(d){for(var i=0;
i<d.releases.length;
++i){var h=d.releases[i];
if(!k.hasOwnProperty(h.locale)){k[h.locale]=new Array()
}var j=k[h.locale];
j.push(h.operatingSystem)
}}return k
};
g.ProductFamilySelector=function(i,l,m,j,h,k){if(h=="false"&&k=="true"){$(m.prodFamilyId+"placeholder").append("Release not configured in the Download Data Component.");
document.getElementById(m.prodFamilyId.replace("#","")+"placeholder").setAttribute("class","adsk-component-placeholder")
}else{if(!g.langSupportedMap){g.langSupportedMap=j
}g.buildProductFamilyDisplay(i,l,m)
}};
g.buildProductFamilyDisplay=function(h,m,n){if(h){var l=n.prodFamilyId+"ul";
if(h.length==1){var k="<li><label>";
k=k+h[0].title;
k=k+"</label></li>";
$(l).append(k);
d=h[0]
}else{for(var j=0;
j<h.length;
++j){var i=n.prodFamilyId+"-release"+j;
var k='<li><label><input type="radio" name="product" value="';
k=k+h[j].name;
k=k+'" id="';
k=k+i.replace("#","")+'"';
if(j==0){k=k+" checked ";
d=h[j]
}k=k+"> ";
k=k+h[j].title;
k=k+"</label></li>";
$(l).append(k);
$(i).bind("click",{id:i,release:h[j],i18n:m},g.releaseChanged)
}}}};
g.releaseChanged=function(h){if(h.data&&h.data.release){d=h.data.release;
if(!g.detectedOs){g.detectedOs=g.getAutodetectedOperatingSystem()
}var m=c+"ul1";
var l=c+"ul2";
$(m+" li").remove();
$(l+" li").remove();
g.buildLanguageDisplay();
if(!g.isOsAvailable()){for(var o=0;
o<g.trialDownloadUnsupportedOsId.length;
o++){if(g.trialDownloadUnsupportedOsId[o]){$(g.trialDownloadUnsupportedOsId[o]).show();
$(g.trialDownloadId[o]).addClass("adsk-inactive")
}}}else{for(var o=0;
o<g.trialDownloadUnsupportedOsId.length;
o++){if(g.trialDownloadUnsupportedOsId[o]){$(g.trialDownloadUnsupportedOsId[o]).hide();
$(g.trialDownloadId[o]).removeClass("adsk-inactive")
}}}if(g.isIe11RunningOnWindows8()&&g.trialDownloadErrorMessageId&&g.isOsAvailable()){for(var o=0;
o<g.trialDownloadErrorMessageId.length;
o++){if(g.trialDownloadErrorMessageId[o]){$(g.trialDownloadErrorMessageId[o]).show()
}}}else{for(var o=0;
o<g.trialDownloadErrorMessageId.length;
o++){if(g.trialDownloadErrorMessageId[o]){$(g.trialDownloadErrorMessageId[o]).hide()
}}}if(g.isFirefoxBrowser()&&g.trialDownloadFirefoxWarningMessageId&&g.isOsAvailable()){for(var o=0;
o<g.trialDownloadFirefoxWarningMessageId.length;
o++){if(g.trialDownloadFirefoxWarningMessageId[o]){$(g.trialDownloadFirefoxWarningMessageId[o]).show()
}}}else{for(var o=0;
o<g.trialDownloadFirefoxWarningMessageId.length;
o++){if(g.trialDownloadFirefoxWarningMessageId[o]){$(g.trialDownloadFirefoxWarningMessageId[o]).hide()
}}}g.defaultLangAvail=g.isDefaultLangAvailable();
if(g.isOsAvailable()&&!g.defaultLangAvail&&g.trialDownloadLangWarnMessageId){for(var o=0;
o<g.trialDownloadLangWarnMessageId.length;
o++){if(g.trialDownloadLangWarnMessageId[o]){$(g.trialDownloadLangWarnMessageId[o]).show()
}}var q=document.getElementsByClassName("tabNavigation");
var k=q[0].childNodes;
for(var o=0;
o<k.length;
o++){if(k[o].tagName=="LI"){tabAElements=k[o].childNodes[0];
if(tabAElements.getAttribute("type")==".tab3"){tabAElements.setAttribute("class","selected")
}else{tabAElements.removeAttribute("class")
}}}var j=document.getElementsByClassName("tab3");
j[0].setAttribute("style","display: block;");
var n=document.getElementsByClassName("tab2");
n[0].setAttribute("style","display: none;");
var p=document.getElementsByClassName("tab1");
p[0].setAttribute("style","display: none;")
}else{for(var o=0;
o<g.trialDownloadLangWarnMessageId.length;
o++){if(g.trialDownloadLangWarnMessageId[o]){$(g.trialDownloadLangWarnMessageId[o]).hide()
}}}}};
g.isDefaultLangAvailable=function(){var h=g.getReleaseOptions();
var i=h[g.defaultLanguage];
if(i&&i.indexOf(g.detectedOs)>-1){return true
}return false
};
g.isEnglishLangAvailable=function(){var h=g.getReleaseOptions();
var i=h["en-US"];
if(i&&i.indexOf(g.detectedOs)>-1){return true
}return false
};
g.ReleaseSelector=function(j,s,l,r,p){this.i18n=s;
this.releases=j;
this.trialDownloadId=null;
this.downloadNowId=null;
this.lightboxUiElements=p;
if(!g.defaultLanguage){g.defaultLanguage=s.sdkLocale
}if(!g.langSupportedMap){g.langSupportedMap=r
}if(!g.detectedOs){g.detectedOs=g.getAutodetectedOperatingSystem()
}if(l.trialDownloadId){this.trialDownloadId=l.trialDownloadId
}if(l.downloadNowId){this.downloadNowId=l.downloadNowId
}if(l.trialDownloadLangWarnMessageId){e.push(l.trialDownloadLangWarnMessageId)
}this.pageLocale=s.sdkLocale;
this.detectedOs=g.getAutodetectedOperatingSystem();
d=this.releases[0];
if(this.trialDownloadId){$(this.trialDownloadId).bind("click",{rs:this},g.initTrialDownload)
}if(this.downloadNowId){$(this.downloadNowId).bind("click",{rs:this},g.initTrialDownload)
}if(!g.isOsAvailable()){$(l.trialDownloadUnsupportedOsId).show();
$(l.trialDownloadId).addClass("adsk-inactive")
}if(g.isIe11RunningOnWindows8()&&l.trialDownloadErrorMessageId&&g.isOsAvailable()){$(l.trialDownloadErrorMessageId).show()
}else{$(l.trialDownloadErrorMessageId).hide()
}if(g.isFirefoxBrowser()&&l.trialDownloadFirefoxWarningMessageId&&g.isOsAvailable()){$(l.trialDownloadFirefoxWarningMessageId).show()
}else{$(l.trialDownloadFirefoxWarningMessageId).hide()
}g.defaultLangAvail=g.isDefaultLangAvailable();
if(g.isOsAvailable()&&!g.defaultLangAvail&&l.trialDownloadLangWarnMessageId){$(l.trialDownloadLangWarnMessageId).show();
if(g.isEnglishLangAvailable()){f="en-US"
}var q=document.getElementsByClassName("tabNavigation");
var k=q[0].childNodes;
for(var n=0;
n<k.length;
n++){if(k[n].tagName=="LI"){tabAElements=k[n].childNodes[0];
if(tabAElements.getAttribute("type")==".tab3"){tabAElements.setAttribute("class","selected")
}else{tabAElements.removeAttribute("class")
}}}var h=document.getElementsByClassName("tab3");
h[0].setAttribute("style","display: block;");
var m=document.getElementsByClassName("tab2");
m[0].setAttribute("style","display: none;");
var o=document.getElementsByClassName("tab1");
o[0].setAttribute("style","display: none;")
}else{$(l.trialDownloadLangWarnMessageId).hide()
}};
g.ReleaseSelector.prototype.getReleaseData=function(k,j){if(d){for(var i=0;
i<d.releases.length;
++i){var h=d.releases[i];
if(h.locale===k&&h.operatingSystem===j){return h
}}}return undefined
};
g.ReleaseSelector.prototype.startDownload=function(h){var l=f||this.pageLocale;
var i=this.getReleaseData(l,this.detectedOs);
var p=i.eulaId;
var j=getEulaPath(this.pageLocale,p);
this.initAnalyticsCallback(l);
if(this.trialDownloadId){var k=i.installNowUri;
var m=this.createWiParam(i);
var o=this.createEsdArg(i);
this.displayLegalLightbox({eulaPath:j,locale:this.pageLocale,downloadLanguage:l,wiLink:k,wiParam:m,eulaId:p,os:this.detectedOs,bdlParam:o})
}else{if(this.downloadNowId){var n=this.createDlmArg(i);
var o=this.createEsdArg(i);
this.displayLegalLightbox({eulaPath:j,locale:this.pageLocale,downloadLanguage:l,wiLink:"",wiParam:"",eulaId:p,os:this.detectedOs,bdlParam:o,dlmArg:n})
}}};
g.ReleaseSelector.prototype.createEsdArg=function(h){if(!h.browserDownloadUris||h.browserDownloadUris.length<=0){return undefined
}return h.browserDownloadUris
};
g.ReleaseSelector.prototype.createDlmArg=function(i){if(!i.downloadNowUris||i.downloadNowUris.length<=0){return undefined
}var h="1.2;";
h+=i.displayName+";";
h+=i.downloadNowUris.join(",")+";";
h+=i.downloadNowCompressedBytes+";";
h+=i.downloadNowBytes+";";
h+="1;";
h+="authparam;";
h+="SESSION_ID";
return h
};
g.ReleaseSelector.prototype.createWiParam=function(i){if(!i.installNowUri){return undefined
}var h='/url "'+i.installNowUri+'"';
h+=" /akamai";
h+=" /trialMode";
if(i.eulaId){h+=" /skipEULA"
}h+=" /auth authparam";
var j="Trial"+new Date().getTime();
h+=" /sid "+j;
return h
};
g.loadSdk=function(h){if(!a){adsk.tools.addScript("https://emsfs.autodesk.com/utility/dlm/prod/SDK/2_23/jquery.tools.min.js",function(){adsk.tools.addStyle("https://emsfs.autodesk.com/utility/dlm/prod/SDK/2_23/adsk.fxsdk.min.css");
adsk.tools.addScript("https://emsfs.autodesk.com/utility/dlm/prod/SDK/2_23/adsk.fxsdk.min.js",function(){a=true;
h()
})
})
}else{h()
}};
g.initTrialDownload=function(h){if(h.data&&h.data.rs){h.preventDefault();
h.data.rs.startDownload(h.target.value)
}};
g.browserDownload=function(h){for(var i=0;
i<h.length;
++i){window.open(h[i],"_blank")
}};
g.getAutodetectedOperatingSystem=function(){var h="";
if(navigator.userAgent.indexOf("Mac")!=-1){h="MacOSX"
}else{if(navigator.userAgent.indexOf("WOW64")!=-1||navigator.userAgent.indexOf("Win64")!=-1){h="Win64"
}else{h="Win32"
}}return h
};
g.isIe11RunningOnWindows8=function(){var h=navigator.userAgent;
return h.indexOf("Windows NT 6.3")!=-1&&h.indexOf("Trident/7.0")!=-1&&h.indexOf("rv:11.0")!=-1
};
g.isFirefoxBrowser=function(){return navigator.userAgent.indexOf("Firefox")>0
};
g.acceptPrivacyPolicy=function(j){var i=null;
if(j.data&&j.data.lightboxUiElements){i=j.data.lightboxUiElements;
if(!$(i.acceptEulaId).is(":checked")||!$(i.acceptPrivacyPolicyId).is(":checked")){$(i.errorMessageId).removeClass("mbxs").addClass("error");
return false
}}if(j.data&&j.data.downloadData){var h=j.data.downloadData;
adsk.freetrial.lightbox.closeTrialLightbox(i);
if(h.os&&h.os==="MacOSX"&&h.bdlParam){g.browserDownload(h.bdlParam)
}else{if(h&&h.dlmArg!=undefined){LaunchApp(h.locale,h.dlmArg)
}else{showThankYouDlg(h.locale,"Install",h.wiLink);
launchInstallNow(h.wiLink,h.wiParam)
}}}};
g.ReleaseSelector.prototype.displayLegalLightbox=function(h){adsk.freetrial.lightbox.trialLightboxContent(this.lightboxUiElements);
if(g.getInternetExplorerVersion()>-1&&g.getInternetExplorerVersion()<=9){var i="<iframe src="+h.eulaPath+' border="0" frameborder="0" scrolling="auto" width="100%"></iframe>';
$(this.lightboxUiElements.sdkEulaId).html(i);
$(this.lightboxUiElements.sdkEulaId).removeClass("ba2 adsk-textArea pam").addClass("ba2 pam")
}else{$(this.lightboxUiElements.sdkEulaId).load(h.eulaPath+" .wrap > *")
}$(this.lightboxUiElements.nextButtonId).bind("click",{downloadData:h,lightboxUiElements:this.lightboxUiElements},g.acceptPrivacyPolicy)
};
g.languageChanged=function(l){if(l.data&&l.data.id){var o=l.data.id;
o=o.replace("#","");
f=l.data.langValue;
var m=l.data.langKey;
var n=document.getElementsByClassName("phm pvs noDecor active");
for(var j=0;
j<n.length;
j++){var h=n[j].firstElementChild.innerHTML;
if(h!=null){n[j].innerHTML=h
}n[j].setAttribute("class","phm pvs noDecor")
}var k;
k="<strong>"+m+"</strong>";
document.getElementById(o).innerHTML=k;
document.getElementById(o).setAttribute("class","phm pvs noDecor active");
for(var j=0;
j<e.length;
j++){if(e[j]&&$(e[j]).show()){$(e[j]).hide()
}}}return false
};
g.ReleaseSelector.prototype.initAnalyticsCallback=function(h){var i;
if(this.downloadNowId){i=2
}else{if(this.trialDownloadId){if(this.detectedOs==="MacOSX"){i=3
}else{i=1
}}}if(adsk.product.trialDownload.ReleaseSelector.analyticsCallback&&typeof(adsk.product.trialDownload.ReleaseSelector.analyticsCallback)==="function"){adsk.product.trialDownload.ReleaseSelector.analyticsCallback(d.name,h,this.detectedOs,i)
}};
g.getInternetExplorerVersion=function(){var j=-1;
if(navigator.appName=="Microsoft Internet Explorer"){var h=navigator.userAgent;
var i=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
if(i.exec(h)!=null){j=parseFloat(RegExp.$1)
}}return j
};
return g
}();
window.adsk=window.adsk||{};
adsk.freetrial=adsk.freetrial||{};
adsk.freetrial.lightbox=function(){var a=adsk.freetrial.lightbox||{};
a.lightboxShell=function(){var b=document.createElement("DIV");
this.box=b.cloneNode(false);
this.box.id="adsk-lightbox";
this.screen=b.cloneNode(false);
$(this.screen).addClass("js-overlay");
this.horizon=b.cloneNode(false);
$(this.horizon).addClass("horizon");
$(this.box).append(this.screen);
$(this.box).append(this.horizon)
};
a.lightboxWrap=function(c,d){var b=new a.lightboxShell();
$(b.horizon).append(c);
$("body").append(b.box);
$(c).find(d.lightboxCloseClass).click(function(f){f.preventDefault();
a.closeTrialLightbox(d)
})
};
a.trialLightboxContent=function(c){$(c.acceptEulaId).prop("checked",false);
$(c.acceptPrivacyPolicyId).prop("checked",false);
$(c.errorMessageId).removeClass("error").addClass("mbxs");
var b=$(c.lightboxContainerId);
$(c.lightboxContainerId).remove();
$(b).removeClass("hide");
a.lightboxWrap(b,c)
};
a.closeTrialLightbox=function(f){var b=$("#adsk-lightbox");
var d=$(f.lightboxContainerId);
if(!b){return true
}$(b).remove();
$(d).addClass("hide");
$("body").append(d)
};
return a
}();
window.adsk=window.adsk||{};
adsk.socialshare=adsk.socialshare||{};
adsk.socialshare.shareUrl=function(){var a=adsk.socialshare.shareUrl||{};
a.socialShareSelector=function(d,c){var b=d.twitterShare;
var e=d.emailShare;
$(b).bind("click",{twitterElement:b},a.tweetShared);
$(e).bind("click",{emailElement:e,emailShareMessage:c},a.emailShared)
};
a.tweetShared=function(f){var i=f.data.twitterElement;
i=i.replace("#","");
document.getElementById(i).setAttribute("href","https://twitter.com/share?url="+window.location.href);
var d=575;
var b=450;
var h=($(window).width()-d)/2;
var g=($(window).height()-b)/2;
var c=document.getElementById(i).getAttribute("href");
var e="status=1,width="+d+",height="+b+",top="+g+",left="+h;
window.open(c,"twitter",e);
return false
};
a.emailShared=function(b){var d=b.data.emailElement;
var c=b.data.emailShareMessage;
d=d.replace("#","");
document.getElementById(d).setAttribute("href","mailto:?subject="+encodeURIComponent(document.title)+"&body="+encodeURIComponent(c)+"%0D%0A%0D%0A"+window.location.href)
};
return a
}();
window.adsk=window.adsk||{};
adsk.navigation=function(){var a=adsk.navigation||{};
a.MegaNav=function(b){var c=this;
c.element=b;
c.topTabContainer=b.find("ul.adsk-util-controls");
c.topTabs=c.topTabContainer.find("li a");
c.topContent=b.find("#adsk-site-groups");
c.topContentPanels=c.topContent.find(".adsk-site-panel");
c.bottomTabContainer=b.find("ul#adsk-topnav");
c.bottomTabs=c.bottomTabContainer.find("li a");
c.bottomContent=b.find("#adsk-meganav");
c.bottomContentPanels=c.bottomContent.find(".adsk-meganav-group");
c.closeButton=b.find("#adsk-close-meganav");
c.closeTopButtons=c.topContent.find(".adsk-site-panel-close");
c.topTabs.each(function(){jQuery(this).bind("click",{megaNav:c},a.topTabClicked)
});
c.bottomTabs.each(function(){jQuery(this).bind("click",{megaNav:c},a.bottomTabClicked)
});
c.closeButton.bind("click",{megaNav:c},a.closeButtonClicked);
c.closeTopButtons.each(function(){jQuery(this).bind("click",{megaNav:c},a.closeButtonClicked)
});
jQuery(document).mouseup(function(f){var d=c.element;
if(d.has(f.target).length===0&&!$("#oxy-lightbox")[0].contains(f.target)){a.closeTabs(c)
}})
};
a.MegaNav.prototype.setActiveTab=function(d){this.deactivateTab();
this.activeTab=d;
var c=this.activeTab.parent().index();
if(this.activeTab.attr("id")==="adsk-search-control"){c=c-2
}this.activeTab.addClass("active");
if(jQuery.contains(this.topTabContainer[0],this.activeTab[0])){this.topContent.addClass("show");
if(this.activeTab.attr("id")!=="adsk-global-control"&&this.activeTab.attr("id")!=="adsk-signout-control"){jQuery(this.topContentPanels[c]).addClass("show")
}}else{if(jQuery.contains(this.bottomTabContainer[0],this.activeTab[0])){this.bottomContent.addClass("show");
jQuery(this.bottomContentPanels[c]).addClass("show")
}}var b=this.activeTab.attr("data-wat-val");
if(b){var e=b.indexOf(":");
if(e>-1){b=b.slice(0,e)
}b=b+":open";
this.activeTab.attr("data-wat-val",b)
}};
a.MegaNav.prototype.deactivateTab=function(){if(this.activeTab){var c=this.activeTab.parent().index();
if(this.activeTab.attr("id")==="adsk-search-control"){c=c-2
}this.activeTab.removeClass("active");
if(jQuery.contains(this.topTabContainer[0],this.activeTab[0])){this.topContent.removeClass("show");
jQuery(this.topContentPanels[c]).removeClass("show")
}else{if(jQuery.contains(this.bottomTabContainer[0],this.activeTab[0])){this.bottomContent.removeClass("show");
jQuery(this.bottomContentPanels[c]).removeClass("show")
}}var b=this.activeTab.attr("data-wat-val");
if(b){var d=b.indexOf(":");
if(d>-1){b=b.slice(0,d)
}b=b+":close";
this.activeTab.attr("data-wat-val",b);
jQuery("#adsk-meganav-control-close").attr("data-wat-val",b)
}this.activeTab=undefined
}};
a.topTabClicked=function(e){var d=jQuery(this);
var b=e.data.megaNav;
if(b.activeTab&&b.activeTab[0]==d[0]){b.deactivateTab()
}else{b.setActiveTab(d)
}e.preventDefault();
if(d.attr("id")==="adsk-global-control"){var c=d.attr("href");
if(c!=="#"){jQuery(location).attr("href",c)
}}};
a.bottomTabClicked=function(d){var c=jQuery(this);
var b=d.data.megaNav;
if(b.activeTab&&b.activeTab[0]==c[0]){b.deactivateTab()
}else{b.setActiveTab(c)
}d.preventDefault()
};
a.closeButtonClicked=function(c){var b=c.data.megaNav;
b.deactivateTab()
};
a.closeTabs=function(b){b.deactivateTab()
};
return a
}();
window.adsk=window.adsk||{};
adsk.search=function(){var a=adsk.search||{};
a.initSiteSearch=function(){var b=$("#site-search-url").val();
var d=$.trim($("#site-search-qt").val());
if(d!=null&&d!=""){var c=b+"&qt="+d;
$(location).attr("href",c);
a.clearSearch()
}};
a.siteSearchOnEnter=function(b){b=(b)?b:((window.event)?window.event:"");
if(b){if(b.keyCode==13||b.which==13){$("#site-search-qt").blur();
adsk.search.initSiteSearch()
}}};
a.clearSearch=function(){$("#site-search-qt").val("")
};
a.focusInSearch=function(b){a.clearSearch();
setTimeout(function(){$("#site-search-qt").focus()
},100)
};
$("#adsk-search-control").bind("click",a.focusInSearch);
$("#site-search-qt").bind("focus",a.clearSearch);
$("#site-search-qt").bind("keypress",a.siteSearchOnEnter);
return a
}();
adsk.global=function(){var a=adsk.global||{};
a.init=function(){};
return a
}();
adsk.product=function(){var a=adsk.product||{};
a.toggleFeatureDesc=function(d,h){if(!d){return
}var b=$(document).find("div.adsk-feature");
if(b){var j=-1;
for(var c=0;
c<b.length;
c++){var g=$(b[c]).find(d);
if(g&&g.length==1){j=c;
break
}}if(j==-1){return
}var f=$(b[j]).find("div.adsk-feature-desc-more"),e=$(b[j]).find("div.adsk-feature-desc");
if(h=="more"){if(f&&f[0]){$(f[0]).show()
}if(e&&e[0]){$(e[0]).hide()
}}else{if(h=="less"){if(e&&e[0]){$(e[0]).show()
}if(f&&f[0]){$(f[0]).hide()
}}}}};
return a
}();
adsk.features=function(){var a=adsk.features||{};
a.toggleFeatureDesc=function(d,h){if(!d){return
}var b=$(document).find("div.adsk-feature");
if(b){var j=-1;
for(var c=0;
c<b.length;
c++){var g=$(b[c]).find(d);
if(g&&g.length==1){j=c;
break
}}if(j==-1){return
}var f=$(b[j]).find("div.adsk-feature-desc-more"),e=$(b[j]).find("div.adsk-feature-desc a.show-more");
if(h=="more"){if(f&&f[0]){$(f[0]).show()
}if(e&&e[0]){$(e[0]).hide()
}}else{if(h=="less"){if(e&&e[0]){$(e[0]).show()
}if(f&&f[0]){$(f[0]).hide()
}}}}};
return a
}();
adsk.tools=function(){var e=adsk.tools||{};
e.addScript=function(f,g){jQuery.ajax({url:f,cache:true,dataType:"script",success:g})
};
e.addStyle=function(f){var g=document.createElement("link");
g.rel="stylesheet";
g.type="text/css";
g.href=f;
document.getElementsByTagName("head")[0].appendChild(g)
};
e.lightbox=function(i,k,j,h,g){if(!document.body){return true
}var f=i.href;
if(!f){return
}f=f.substring(f.indexOf("/content/"));
f="/services/adsk/c/asset-service."+c(f)+".html";
jQuery.ajax({url:f,dataType:"html",success:function(p){b(p,k,j,h,g);
if(CQ_Analytics&&CQ_Analytics.TagCloudMgr){var s=document.getElementById("lightBoxDAMTagsDiv");
var m=s.getAttribute("data").split(",");
var n=CQ_Analytics.TagCloudMgr;
var l=n.getTags();
var r=1;
for(var q=0;
q<m.length;
q++){var o=m[q];
if(l!=null){r=parseInt(l[o])+1||1
}n.setProperty(o,r)
}}}});
return false
};
e.closeLightbox=function(){var f=document.getElementById("adsk-lightbox");
if(!f){return true
}f.parentNode.removeChild(f)
};
e.doDisplayLightbox=function(g,i,h,f){b(g,i,h);
if(f.className){$("#adsk-lightbox").find(".js-modal").addClass(f.className)
}};
function b(k,x,r,f,h){var o=document.createElement("div");
o.setAttribute("id","adsk-lightbox");
o.innerHTML=a(k,x,r);
document.body.appendChild(o);
var m=o.querySelector("img,video");
if(m!=null){if(typeof f!="undefined"&&f.length>0){m.setAttribute("alt",f)
}if(typeof h!="undefined"&&h.length>0){m.setAttribute("title",h)
}}$modal=$(".js-modal");
$displayPort=$(".js-modal .bd");
$asset=$(".js-modal .bd .js-asset");
$hd=$(".hd");
var q=$asset.outerWidth();
var p=$asset.outerHeight();
if(!q){$flashAsset=$(".js-modal .bd .js-flashasset");
q=$flashAsset.outerWidth();
p=$flashAsset.outerHeight()
}var j=$(window).height();
var v=$(window).width();
var t,w,u,i,s,g;
if(q>=v-128){i=v-80;
g=i-80;
w=" scroll"
}else{i=q+80
}i=i<240?240:i;
$modal.css({width:i});
if(w){$displayPort.css({"overflow-x":"scroll",width:g})
}var n=$hd.outerHeight();
if((p+n)>=j-128){u=j-40;
s=u-88-n;
t="scroll"
}else{u=p+n+88
}var l=(u/2)*(-1);
$modal.css({top:l,height:u});
if(t){$displayPort.css({"overflow-y":"scroll",height:s})
}}function a(f,i,g){var h='<div class="js-overlay" onclick="javascript:adsk.tools.closeLightbox();"><!-- do not collapse --></div>';
h+='<div class="horizon">';
h+=' <div class="mod js-modal modal-1">';
h+='<div class="outer">';
h+='  <a href="javascript:adsk.tools.closeLightbox();" class="container js-closeModal">';
h+='<span class="icon adsk-lightbox-close fr"><!-- do not collapse --></span>';
h+="</a>";
h+='<div class="inner">';
h+=d(i,g);
h+='<div class="bd">';
h+=f;
h+="</div>";
h+="</div>";
h+="</div>";
h+="</div>";
h+="</div>";
return h
}function d(h,f){if(!h&&!f){return""
}var g='<div class="hd">';
g+='<div class="grid">';
g+='<div class="col">';
g+='<h3 class="s3">';
g+=h;
g+="</h3>";
g+='<h4 class="s4">';
g+=f;
g+="</h4>";
g+="</div>";
g+="</div></div>";
return g
}function c(f){f=f.replace(/_/g,"|@@|");
f=f.replace(/\//g,"_");
return f
}return e
}();
jQuery(document).ready(function(){adsk.global.init()
});
adsk.general=function(b){var a=adsk.general||{};
a.RadioTabs=function(c){var e={triggers:$(),getTarget:this.getTarget,autoSelectFirstItem:true};
c=$.extend(e,c);
var d;
c.triggers.each(function(){c.getTarget($(this)).hide()
});
c.triggers.on("change",function(){if(d){d.hide()
}d=c.getTarget($(this));
d.show()
});
if(c.autoSelectFirstItem){c.triggers.first().trigger("change").attr("checked",true)
}};
a.RadioTabs.prototype.getTarget=function(c){return $(c.data("target"))
};
return a
}();
adsk.general=function(b){var a=adsk.general||{};
a.PBLAlertOverlay=function(c,f){if(c.length===0||f.length===0){return
}var d=c.outerWidth()-f.outerWidth();
var e=function(){var g=f.offset();
c.css({left:(g.left-d)+"px",top:g.top+f.outerHeight()+"px"})
};
f.addClass("active");
c.find(".close").click(function(){f.removeClass("active");
c.hide();
$(window).off("resize",e);
return false
});
$(window).resize(e);
e();
c.show();
return
};
return a
}();
/*!
Video.js - HTML5 Video Player
Version 3.2.0

LGPL v3 LICENSE INFO
This file is part of Video.js. Copyright 2011 Zencoder, Inc.

Video.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Video.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with Video.js.  If not, see <http://www.gnu.org/licenses/>.
*/
(function(window,undefined){var document=window.document;
document.createElement("video");
document.createElement("audio");
var VideoJS=function(id,addOptions,ready){var tag;
if(typeof id=="string"){if(id.indexOf("#")===0){id=id.slice(1)
}if(_V_.players[id]){return _V_.players[id]
}else{tag=_V_.el(id)
}}else{tag=id
}if(!tag||!tag.nodeName){throw new TypeError("The element or ID supplied is not valid. (VideoJS)")
}return tag.player||new _V_.Player(tag,addOptions,ready)
},_V_=VideoJS,CDN_VERSION="3.2";
VideoJS.players={};
VideoJS.options={techOrder:["html5","flash"],html5:{},flash:{swf:"http://vjs.zencdn.net/c/video-js.swf"},width:"auto",height:"auto",defaultVolume:0,components:{posterImage:{},textTrackDisplay:{},loadingSpinner:{},bigPlayButton:{},controlBar:{}}};
if(CDN_VERSION!="GENERATED_CDN_VSN"){_V_.options.flash.swf="http://vjs.zencdn.net/"+CDN_VERSION+"/video-js.swf"
}_V_.merge=function(obj1,obj2,safe){if(!obj2){obj2={}
}for(var attrname in obj2){if(obj2.hasOwnProperty(attrname)&&(!safe||!obj1.hasOwnProperty(attrname))){obj1[attrname]=obj2[attrname]
}}return obj1
};
_V_.extend=function(obj){this.merge(this,obj,true)
};
_V_.extend({tech:{},controlSets:{},isIE:function(){return !+"\v1"
},isFF:function(){return !!_V_.ua.match("Firefox")
},isIPad:function(){return navigator.userAgent.match(/iPad/i)!==null
},isIPhone:function(){return navigator.userAgent.match(/iPhone/i)!==null
},isIOS:function(){return VideoJS.isIPhone()||VideoJS.isIPad()
},iOSVersion:function(){var match=navigator.userAgent.match(/OS (\d+)_/i);
if(match&&match[1]){return match[1]
}},isAndroid:function(){return navigator.userAgent.match(/Android.*AppleWebKit/i)!==null
},androidVersion:function(){var match=navigator.userAgent.match(/Android (\d+)\./i);
if(match&&match[1]){return match[1]
}},testVid:document.createElement("video"),ua:navigator.userAgent,support:{},each:function(arr,fn){if(!arr||arr.length===0){return
}for(var i=0,j=arr.length;
i<j;
i++){fn.call(this,arr[i],i)
}},eachProp:function(obj,fn){if(!obj){return
}for(var name in obj){if(obj.hasOwnProperty(name)){fn.call(this,name,obj[name])
}}},el:function(id){return document.getElementById(id)
},createElement:function(tagName,attributes){var el=document.createElement(tagName),attrname;
for(attrname in attributes){if(attributes.hasOwnProperty(attrname)){if(attrname.indexOf("-")!==-1){el.setAttribute(attrname,attributes[attrname])
}else{el[attrname]=attributes[attrname]
}}}return el
},insertFirst:function(node,parent){if(parent.firstChild){parent.insertBefore(node,parent.firstChild)
}else{parent.appendChild(node)
}},addClass:function(element,classToAdd){if((" "+element.className+" ").indexOf(" "+classToAdd+" ")==-1){element.className=element.className===""?classToAdd:element.className+" "+classToAdd
}},removeClass:function(element,classToRemove){if(element.className.indexOf(classToRemove)==-1){return
}var classNames=element.className.split(" ");
classNames.splice(classNames.indexOf(classToRemove),1);
element.className=classNames.join(" ")
},remove:function(item,array){if(!array){return
}var i=array.indexOf(item);
if(i!=-1){return array.splice(i,1)
}},blockTextSelection:function(){document.body.focus();
document.onselectstart=function(){return false
}
},unblockTextSelection:function(){document.onselectstart=function(){return true
}
},formatTime:function(seconds,guide){guide=guide||seconds;
var s=Math.floor(seconds%60),m=Math.floor(seconds/60%60),h=Math.floor(seconds/3600),gm=Math.floor(guide/60%60),gh=Math.floor(guide/3600);
h=(h>0||gh>0)?h+":":"";
m=(((h||gm>=10)&&m<10)?"0"+m:m)+":";
s=(s<10)?"0"+s:s;
return h+m+s
},uc:function(string){return string.charAt(0).toUpperCase()+string.slice(1)
},getRelativePosition:function(x,relativeElement){return Math.max(0,Math.min(1,(x-_V_.findPosX(relativeElement))/relativeElement.offsetWidth))
},getComputedStyleValue:function(element,style){return window.getComputedStyle(element,null).getPropertyValue(style)
},trim:function(string){return string.toString().replace(/^\s+/,"").replace(/\s+$/,"")
},round:function(num,dec){if(!dec){dec=0
}return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec)
},isEmpty:function(object){for(var prop in object){return false
}return true
},createTimeRange:function(start,end){return{length:1,start:function(){return start
},end:function(){return end
}}
},cache:{},guid:1,expando:"vdata"+(new Date).getTime(),getData:function(elem){var id=elem[_V_.expando];
if(!id){id=elem[_V_.expando]=_V_.guid++;
_V_.cache[id]={}
}return _V_.cache[id]
},removeData:function(elem){var id=elem[_V_.expando];
if(!id){return
}delete _V_.cache[id];
try{delete elem[_V_.expando]
}catch(e){if(elem.removeAttribute){elem.removeAttribute(_V_.expando)
}else{elem[_V_.expando]=null
}}},proxy:function(context,fn,uid){if(!fn.guid){fn.guid=_V_.guid++
}var ret=function(){return fn.apply(context,arguments)
};
ret.guid=(uid)?uid+"_"+fn.guid:fn.guid;
return ret
},get:function(url,onSuccess,onError){var local=(url.indexOf("file:")==0||(window.location.href.indexOf("file:")==0&&url.indexOf("http:")==-1));
if(typeof XMLHttpRequest=="undefined"){XMLHttpRequest=function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")
}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")
}catch(f){}try{return new ActiveXObject("Msxml2.XMLHTTP")
}catch(g){}throw new Error("This browser does not support XMLHttpRequest.")
}
}var request=new XMLHttpRequest();
try{request.open("GET",url)
}catch(e){_V_.log("VideoJS XMLHttpRequest (open)",e);
return false
}request.onreadystatechange=_V_.proxy(this,function(){if(request.readyState==4){if(request.status==200||local&&request.status==0){onSuccess(request.responseText)
}else{if(onError){onError()
}}}});
try{request.send()
}catch(e){_V_.log("VideoJS XMLHttpRequest (send)",e);
if(onError){onError(e)
}}},setLocalStorage:function(key,value){var localStorage=window.localStorage||false;
if(!localStorage){return
}try{localStorage[key]=value
}catch(e){if(e.code==22||e.code==1014){_V_.log("LocalStorage Full (VideoJS)",e)
}else{_V_.log("LocalStorage Error (VideoJS)",e)
}}},getAbsoluteURL:function(url){if(!url.match(/^https?:\/\//)){url=_V_.createElement("div",{innerHTML:'<a href="'+url+'">x</a>'}).firstChild.href
}return url
}});
_V_.log=function(){_V_.log.history=_V_.log.history||[];
_V_.log.history.push(arguments);
if(window.console){arguments.callee=arguments.callee.caller;
var newarr=[].slice.call(arguments);
(typeof console.log==="object"?_V_.log.apply.call(console.log,console,newarr):console.log.apply(console,newarr))
}};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;
a=d.pop();
){b[a]=b[a]||c
}})((function(){try{console.log();
return window.console
}catch(err){return window.console={}
}})());
if("getBoundingClientRect" in document.documentElement){_V_.findPosX=function(el){var box;
try{box=el.getBoundingClientRect()
}catch(e){}if(!box){return 0
}var docEl=document.documentElement,body=document.body,clientLeft=docEl.clientLeft||body.clientLeft||0,scrollLeft=window.pageXOffset||body.scrollLeft,left=box.left+scrollLeft-clientLeft;
return left
}
}else{_V_.findPosX=function(el){var curleft=el.offsetLeft;
while(el=obj.offsetParent){if(el.className.indexOf("video-js")==-1){}else{}curleft+=el.offsetLeft
}return curleft
}
}(function(){var initializing=false,fnTest=/xyz/.test(function(){xyz
})?/\b_super\b/:/.*/;
_V_.Class=function(){};
_V_.Class.extend=function(prop){var _super=this.prototype;
initializing=true;
var prototype=new this();
initializing=false;
for(var name in prop){prototype[name]=typeof prop[name]=="function"&&typeof _super[name]=="function"&&fnTest.test(prop[name])?(function(name,fn){return function(){var tmp=this._super;
this._super=_super[name];
var ret=fn.apply(this,arguments);
this._super=tmp;
return ret
}
})(name,prop[name]):prop[name]
}function Class(){if(!initializing&&this.init){return this.init.apply(this,arguments)
}else{if(!initializing){return arguments.callee.prototype.init()
}}}Class.prototype=prototype;
Class.constructor=Class;
Class.extend=arguments.callee;
return Class
}
})();
_V_.Component=_V_.Class.extend({init:function(player,options){this.player=player;
options=this.options=_V_.merge(this.options||{},options);
if(options.el){this.el=options.el
}else{this.el=this.createElement()
}this.initComponents()
},destroy:function(){},createElement:function(type,attrs){return _V_.createElement(type||"div",attrs)
},buildCSSClass:function(){return""
},initComponents:function(){var options=this.options;
if(options&&options.components){this.eachProp(options.components,function(name,opts){var tempAdd=this.proxy(function(){this[name]=this.addComponent(name,opts)
});
if(opts.loadEvent){this.one(opts.loadEvent,tempAdd)
}else{tempAdd()
}})
}},addComponent:function(name,options){var component,componentClass;
if(typeof name=="string"){options=options||{};
componentClass=options.componentClass||_V_.uc(name);
component=new _V_[componentClass](this.player||this,options)
}else{component=name
}this.el.appendChild(component.el);
return component
},removeComponent:function(component){this.el.removeChild(component.el)
},show:function(){this.el.style.display="block"
},hide:function(){this.el.style.display="none"
},fadeIn:function(){this.removeClass("vjs-fade-out");
this.addClass("vjs-fade-in")
},fadeOut:function(){this.removeClass("vjs-fade-in");
this.addClass("vjs-fade-out")
},lockShowing:function(){var style=this.el.style;
style.display="block";
style.opacity=1;
style.visiblity="visible"
},unlockShowing:function(){var style=this.el.style;
style.display="";
style.opacity="";
style.visiblity=""
},addClass:function(classToAdd){_V_.addClass(this.el,classToAdd)
},removeClass:function(classToRemove){_V_.removeClass(this.el,classToRemove)
},addEvent:function(type,fn,uid){return _V_.addEvent(this.el,type,_V_.proxy(this,fn))
},removeEvent:function(type,fn){return _V_.removeEvent(this.el,type,fn)
},triggerEvent:function(type,e){return _V_.triggerEvent(this.el,type,e)
},one:function(type,fn){_V_.one(this.el,type,_V_.proxy(this,fn))
},ready:function(fn){if(!fn){return this
}if(this.isReady){fn.call(this)
}else{if(this.readyQueue===undefined){this.readyQueue=[]
}this.readyQueue.push(fn)
}return this
},triggerReady:function(){this.isReady=true;
if(this.readyQueue&&this.readyQueue.length>0){this.each(this.readyQueue,function(fn){fn.call(this)
});
this.readyQueue=[];
this.triggerEvent("ready")
}},each:function(arr,fn){_V_.each.call(this,arr,fn)
},eachProp:function(obj,fn){_V_.eachProp.call(this,obj,fn)
},extend:function(obj){_V_.merge(this,obj)
},proxy:function(fn,uid){return _V_.proxy(this,fn,uid)
}});
_V_.Control=_V_.Component.extend({buildCSSClass:function(){return"vjs-control "+this._super()
}});
_V_.ControlBar=_V_.Component.extend({options:{loadEvent:"play",components:{playToggle:{},fullscreenToggle:{},currentTimeDisplay:{},timeDivider:{},durationDisplay:{},remainingTimeDisplay:{},progressControl:{},volumeControl:{},muteToggle:{}}},init:function(player,options){this._super(player,options);
player.addEvent("play",this.proxy(function(){this.fadeIn();
this.player.addEvent("mouseover",this.proxy(this.fadeIn));
this.player.addEvent("mouseout",this.proxy(this.fadeOut))
}))
},createElement:function(){return _V_.createElement("div",{className:"vjs-controls"})
},fadeIn:function(){this._super();
this.player.triggerEvent("controlsvisible")
},fadeOut:function(){this._super();
this.player.triggerEvent("controlshidden")
},lockShowing:function(){this.el.style.opacity="1"
}});
_V_.Button=_V_.Control.extend({init:function(player,options){this._super(player,options);
this.addEvent("click",this.onClick);
this.addEvent("focus",this.onFocus);
this.addEvent("blur",this.onBlur)
},createElement:function(type,attrs){attrs=_V_.merge({className:this.buildCSSClass(),innerHTML:'<div><span class="vjs-control-text">'+(this.buttonText||"Need Text")+"</span></div>",role:"button",tabIndex:0},attrs);
return this._super(type,attrs)
},onClick:function(){},onFocus:function(){_V_.addEvent(document,"keyup",_V_.proxy(this,this.onKeyPress))
},onKeyPress:function(event){if(event.which==32||event.which==13){event.preventDefault();
this.onClick()
}},onBlur:function(){_V_.removeEvent(document,"keyup",_V_.proxy(this,this.onKeyPress))
}});
_V_.PlayButton=_V_.Button.extend({buttonText:"Play",buildCSSClass:function(){return"vjs-play-button "+this._super()
},onClick:function(){this.player.play()
}});
_V_.PauseButton=_V_.Button.extend({buttonText:"Pause",buildCSSClass:function(){return"vjs-pause-button "+this._super()
},onClick:function(){this.player.pause()
}});
_V_.PlayToggle=_V_.Button.extend({buttonText:"Play",init:function(player,options){this._super(player,options);
player.addEvent("play",_V_.proxy(this,this.onPlay));
player.addEvent("pause",_V_.proxy(this,this.onPause))
},buildCSSClass:function(){return"vjs-play-control "+this._super()
},onClick:function(){if(this.player.paused()){this.player.play()
}else{this.player.pause()
}},onPlay:function(){_V_.removeClass(this.el,"vjs-paused");
_V_.addClass(this.el,"vjs-playing")
},onPause:function(){_V_.removeClass(this.el,"vjs-playing");
_V_.addClass(this.el,"vjs-paused")
}});
_V_.FullscreenToggle=_V_.Button.extend({buttonText:"Fullscreen",buildCSSClass:function(){return"vjs-fullscreen-control "+this._super()
},onClick:function(){if(!this.player.isFullScreen){this.player.requestFullScreen()
}else{this.player.cancelFullScreen()
}}});
_V_.BigPlayButton=_V_.Button.extend({init:function(player,options){this._super(player,options);
player.addEvent("play",_V_.proxy(this,this.hide));
player.addEvent("ended",_V_.proxy(this,this.show))
},createElement:function(){return this._super("div",{className:"vjs-big-play-button",innerHTML:"<span></span>"})
},onClick:function(){if(this.player.currentTime()){this.player.currentTime(0)
}this.player.play()
}});
_V_.LoadingSpinner=_V_.Component.extend({init:function(player,options){this._super(player,options);
player.addEvent("canplay",_V_.proxy(this,this.hide));
player.addEvent("canplaythrough",_V_.proxy(this,this.hide));
player.addEvent("playing",_V_.proxy(this,this.hide));
player.addEvent("seeking",_V_.proxy(this,this.show));
player.addEvent("error",_V_.proxy(this,this.show));
player.addEvent("waiting",_V_.proxy(this,this.show))
},createElement:function(){var classNameSpinner,innerHtmlSpinner;
if(typeof this.player.el.style.WebkitBorderRadius=="string"||typeof this.player.el.style.MozBorderRadius=="string"||typeof this.player.el.style.KhtmlBorderRadius=="string"||typeof this.player.el.style.borderRadius=="string"){classNameSpinner="vjs-loading-spinner";
innerHtmlSpinner="<div class='ball1'></div><div class='ball2'></div><div class='ball3'></div><div class='ball4'></div><div class='ball5'></div><div class='ball6'></div><div class='ball7'></div><div class='ball8'></div>"
}else{classNameSpinner="vjs-loading-spinner-fallback";
innerHtmlSpinner=""
}return this._super("div",{className:classNameSpinner,innerHTML:innerHtmlSpinner})
}});
_V_.CurrentTimeDisplay=_V_.Component.extend({init:function(player,options){this._super(player,options);
player.addEvent("timeupdate",_V_.proxy(this,this.updateContent))
},createElement:function(){var el=this._super("div",{className:"vjs-current-time vjs-time-controls vjs-control"});
this.content=_V_.createElement("div",{className:"vjs-current-time-display",innerHTML:"0:00"});
el.appendChild(_V_.createElement("div").appendChild(this.content));
return el
},updateContent:function(){var time=(this.player.scrubbing)?this.player.values.currentTime:this.player.currentTime();
this.content.innerHTML=_V_.formatTime(time,this.player.duration())
}});
_V_.DurationDisplay=_V_.Component.extend({init:function(player,options){this._super(player,options);
player.addEvent("timeupdate",_V_.proxy(this,this.updateContent))
},createElement:function(){var el=this._super("div",{className:"vjs-duration vjs-time-controls vjs-control"});
this.content=_V_.createElement("div",{className:"vjs-duration-display",innerHTML:"0:00"});
el.appendChild(_V_.createElement("div").appendChild(this.content));
return el
},updateContent:function(){if(this.player.duration()){this.content.innerHTML=_V_.formatTime(this.player.duration())
}}});
_V_.TimeDivider=_V_.Component.extend({createElement:function(){return this._super("div",{className:"vjs-time-divider",innerHTML:"<div><span>/</span></div>"})
}});
_V_.RemainingTimeDisplay=_V_.Component.extend({init:function(player,options){this._super(player,options);
player.addEvent("timeupdate",_V_.proxy(this,this.updateContent))
},createElement:function(){var el=this._super("div",{className:"vjs-remaining-time vjs-time-controls vjs-control"});
this.content=_V_.createElement("div",{className:"vjs-remaining-time-display",innerHTML:"-0:00"});
el.appendChild(_V_.createElement("div").appendChild(this.content));
return el
},updateContent:function(){if(this.player.duration()){this.content.innerHTML="-"+_V_.formatTime(this.player.remainingTime())
}}});
_V_.Slider=_V_.Component.extend({init:function(player,options){this._super(player,options);
player.addEvent(this.playerEvent,_V_.proxy(this,this.update));
this.addEvent("mousedown",this.onMouseDown);
this.addEvent("focus",this.onFocus);
this.addEvent("blur",this.onBlur);
this.player.addEvent("controlsvisible",this.proxy(this.update));
this.update()
},createElement:function(type,attrs){attrs=_V_.merge({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},attrs);
return this._super(type,attrs)
},onMouseDown:function(event){event.preventDefault();
_V_.blockTextSelection();
_V_.addEvent(document,"mousemove",_V_.proxy(this,this.onMouseMove));
_V_.addEvent(document,"mouseup",_V_.proxy(this,this.onMouseUp));
this.onMouseMove(event)
},onMouseUp:function(event){_V_.unblockTextSelection();
_V_.removeEvent(document,"mousemove",this.onMouseMove,false);
_V_.removeEvent(document,"mouseup",this.onMouseUp,false);
this.update()
},update:function(){var barProgress,progress=this.getPercent();
handle=this.handle,bar=this.bar;
if(isNaN(progress)){progress=0
}barProgress=progress;
if(handle){var box=this.el,boxWidth=box.offsetWidth,handleWidth=handle.el.offsetWidth,handlePercent=(handleWidth)?handleWidth/boxWidth:0,boxAdjustedPercent=1-handlePercent;
adjustedProgress=progress*boxAdjustedPercent,barProgress=adjustedProgress+(handlePercent/2);
handle.el.style.left=_V_.round(adjustedProgress*100,2)+"%"
}bar.el.style.width=_V_.round(barProgress*100,2)+"%"
},calculateDistance:function(event){var box=this.el,boxX=_V_.findPosX(box),boxW=box.offsetWidth,handle=this.handle;
if(handle){var handleW=handle.el.offsetWidth;
boxX=boxX+(handleW/2);
boxW=boxW-handleW
}return Math.max(0,Math.min(1,(event.pageX-boxX)/boxW))
},onFocus:function(event){_V_.addEvent(document,"keyup",_V_.proxy(this,this.onKeyPress))
},onKeyPress:function(event){if(event.which==37){event.preventDefault();
this.stepBack()
}else{if(event.which==39){event.preventDefault();
this.stepForward()
}}},onBlur:function(event){_V_.removeEvent(document,"keyup",_V_.proxy(this,this.onKeyPress))
}});
_V_.ProgressControl=_V_.Component.extend({options:{components:{seekBar:{}}},createElement:function(){return this._super("div",{className:"vjs-progress-control vjs-control"})
}});
_V_.SeekBar=_V_.Slider.extend({options:{components:{loadProgressBar:{},bar:{componentClass:"PlayProgressBar"},handle:{componentClass:"SeekHandle"}}},playerEvent:"timeupdate",init:function(player,options){this._super(player,options)
},createElement:function(){return this._super("div",{className:"vjs-progress-holder"})
},getPercent:function(){return this.player.currentTime()/this.player.duration()
},onMouseDown:function(event){this._super(event);
this.player.scrubbing=true;
this.videoWasPlaying=!this.player.paused();
this.player.pause()
},onMouseMove:function(event){var newTime=this.calculateDistance(event)*this.player.duration();
if(newTime==this.player.duration()){newTime=newTime-0.1
}this.player.currentTime(newTime)
},onMouseUp:function(event){this._super(event);
this.player.scrubbing=false;
if(this.videoWasPlaying){this.player.play()
}},stepForward:function(){this.player.currentTime(this.player.currentTime()+1)
},stepBack:function(){this.player.currentTime(this.player.currentTime()-1)
}});
_V_.LoadProgressBar=_V_.Component.extend({init:function(player,options){this._super(player,options);
player.addEvent("progress",_V_.proxy(this,this.update))
},createElement:function(){return this._super("div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text">Loaded: 0%</span>'})
},update:function(){if(this.el.style){this.el.style.width=_V_.round(this.player.bufferedPercent()*100,2)+"%"
}}});
_V_.PlayProgressBar=_V_.Component.extend({createElement:function(){return this._super("div",{className:"vjs-play-progress",innerHTML:'<span class="vjs-control-text">Progress: 0%</span>'})
}});
_V_.SeekHandle=_V_.Component.extend({createElement:function(){return this._super("div",{className:"vjs-seek-handle",innerHTML:'<span class="vjs-control-text">00:00</span>'})
}});
_V_.VolumeControl=_V_.Component.extend({options:{components:{volumeBar:{}}},createElement:function(){return this._super("div",{className:"vjs-volume-control vjs-control"})
}});
_V_.VolumeBar=_V_.Slider.extend({options:{components:{bar:{componentClass:"VolumeLevel"},handle:{componentClass:"VolumeHandle"}}},playerEvent:"volumechange",createElement:function(){return this._super("div",{className:"vjs-volume-bar"})
},onMouseMove:function(event){this.player.volume(this.calculateDistance(event))
},getPercent:function(){return this.player.volume()
},stepForward:function(){this.player.volume(this.player.volume()+0.1)
},stepBack:function(){this.player.volume(this.player.volume()-0.1)
}});
_V_.VolumeLevel=_V_.Component.extend({createElement:function(){return this._super("div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})
}});
_V_.VolumeHandle=_V_.Component.extend({createElement:function(){return this._super("div",{className:"vjs-volume-handle",innerHTML:'<span class="vjs-control-text"></span>'})
}});
_V_.MuteToggle=_V_.Button.extend({init:function(player,options){this._super(player,options);
player.addEvent("volumechange",_V_.proxy(this,this.update))
},createElement:function(){return this._super("div",{className:"vjs-mute-control vjs-control",innerHTML:'<div><span class="vjs-control-text">Mute</span></div>'})
},onClick:function(event){this.player.muted(this.player.muted()?false:true)
},update:function(event){var vol=this.player.volume(),level=3;
if(vol==0||this.player.muted()){level=0
}else{if(vol<0.33){level=1
}else{if(vol<0.67){level=2
}}}_V_.each.call(this,[0,1,2,3],function(i){_V_.removeClass(this.el,"vjs-vol-"+i)
});
_V_.addClass(this.el,"vjs-vol-"+level)
}});
_V_.PosterImage=_V_.Button.extend({init:function(player,options){this._super(player,options);
if(!this.player.options.poster){this.hide()
}player.addEvent("play",_V_.proxy(this,this.hide))
},createElement:function(){return _V_.createElement("img",{className:"vjs-poster",src:this.player.options.poster,tabIndex:-1})
},onClick:function(){this.player.play()
}});
_V_.Menu=_V_.Component.extend({init:function(player,options){this._super(player,options)
},addItem:function(component){this.addComponent(component);
component.addEvent("click",this.proxy(function(){this.unlockShowing()
}))
},createElement:function(){return this._super("ul",{className:"vjs-menu"})
}});
_V_.MenuItem=_V_.Button.extend({init:function(player,options){this._super(player,options);
if(options.selected){this.addClass("vjs-selected")
}},createElement:function(type,attrs){return this._super("li",_V_.merge({className:"vjs-menu-item",innerHTML:this.options.label},attrs))
},onClick:function(){this.selected(true)
},selected:function(selected){if(selected){this.addClass("vjs-selected")
}else{this.removeClass("vjs-selected")
}}});
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(searchElement){if(this===void 0||this===null){throw new TypeError()
}var t=Object(this);
var len=t.length>>>0;
if(len===0){return -1
}var n=0;
if(arguments.length>0){n=Number(arguments[1]);
if(n!==n){n=0
}else{if(n!==0&&n!==(1/0)&&n!==-(1/0)){n=(n>0||-1)*Math.floor(Math.abs(n))
}}}if(n>=len){return -1
}var k=n>=0?n:Math.max(len-Math.abs(n),0);
for(;
k<len;
k++){if(k in t&&t[k]===searchElement){return k
}}return -1
}
}_V_.extend({addEvent:function(elem,type,fn){var data=_V_.getData(elem),handlers;
if(data&&!data.handler){data.handler=function(event){event=_V_.fixEvent(event);
var handlers=_V_.getData(elem).events[event.type];
if(handlers){var handlersCopy=[];
_V_.each(handlers,function(handler,i){handlersCopy[i]=handler
});
for(var i=0,l=handlersCopy.length;
i<l;
i++){handlersCopy[i].call(elem,event)
}}}
}if(!data.events){data.events={}
}handlers=data.events[type];
if(!handlers){handlers=data.events[type]=[];
if(document.addEventListener){elem.addEventListener(type,data.handler,false)
}else{if(document.attachEvent){elem.attachEvent("on"+type,data.handler)
}}}if(!fn.guid){fn.guid=_V_.guid++
}handlers.push(fn)
},removeEvent:function(elem,type,fn){var data=_V_.getData(elem),handlers;
if(!data.events){return
}if(!type){for(type in data.events){_V_.cleanUpEvents(elem,type)
}return
}handlers=data.events[type];
if(!handlers){return
}if(fn&&fn.guid){for(var i=0;
i<handlers.length;
i++){if(handlers[i].guid===fn.guid){handlers.splice(i--,1)
}}}_V_.cleanUpEvents(elem,type)
},cleanUpEvents:function(elem,type){var data=_V_.getData(elem);
if(data.events[type].length===0){delete data.events[type];
if(document.removeEventListener){elem.removeEventListener(type,data.handler,false)
}else{if(document.detachEvent){elem.detachEvent("on"+type,data.handler)
}}}if(_V_.isEmpty(data.events)){delete data.events;
delete data.handler
}if(_V_.isEmpty(data)){_V_.removeData(elem)
}},fixEvent:function(event){if(event[_V_.expando]){return event
}var originalEvent=event;
event=new _V_.Event(originalEvent);
for(var i=_V_.Event.props.length,prop;
i;
){prop=_V_.Event.props[--i];
event[prop]=originalEvent[prop]
}if(!event.target){event.target=event.srcElement||document
}if(event.target.nodeType===3){event.target=event.target.parentNode
}if(!event.relatedTarget&&event.fromElement){event.relatedTarget=event.fromElement===event.target?event.toElement:event.fromElement
}if(event.pageX==null&&event.clientX!=null){var eventDocument=event.target.ownerDocument||document,doc=eventDocument.documentElement,body=eventDocument.body;
event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);
event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0)
}if(event.which==null&&(event.charCode!=null||event.keyCode!=null)){event.which=event.charCode!=null?event.charCode:event.keyCode
}if(!event.metaKey&&event.ctrlKey){event.metaKey=event.ctrlKey
}if(!event.which&&event.button!==undefined){event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)))
}return event
},triggerEvent:function(elem,event){var data=_V_.getData(elem),parent=elem.parentNode||elem.ownerDocument,type=event.type||event,handler;
if(data){handler=data.handler
}event=typeof event==="object"?event[_V_.expando]?event:new _V_.Event(type,event):new _V_.Event(type);
event.type=type;
if(handler){handler.call(elem,event)
}event.result=undefined;
event.target=elem
},one:function(elem,type,fn){_V_.addEvent(elem,type,function(){_V_.removeEvent(elem,type,arguments.callee);
fn.apply(this,arguments)
})
}});
_V_.Event=function(src,props){if(src&&src.type){this.originalEvent=src;
this.type=src.type;
this.isDefaultPrevented=(src.defaultPrevented||src.returnValue===false||src.getPreventDefault&&src.getPreventDefault())?returnTrue:returnFalse
}else{this.type=src
}if(props){_V_.merge(this,props)
}this.timeStamp=(new Date).getTime();
this[_V_.expando]=true
};
_V_.Event.prototype={preventDefault:function(){this.isDefaultPrevented=returnTrue;
var e=this.originalEvent;
if(!e){return
}if(e.preventDefault){e.preventDefault()
}else{e.returnValue=false
}},stopPropagation:function(){this.isPropagationStopped=returnTrue;
var e=this.originalEvent;
if(!e){return
}if(e.stopPropagation){e.stopPropagation()
}e.cancelBubble=true
},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=returnTrue;
this.stopPropagation()
},isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse};
_V_.Event.props="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" ");
function returnTrue(){return true
}function returnFalse(){return false
}var JSON;
if(!JSON){JSON={}
}(function(){var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];
if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v
}else{delete value[k]
}}}}return reviver.call(holder,key,value)
}text=String(text);
cx.lastIndex=0;
if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})
}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j
}throw new SyntaxError("JSON.parse")
}
}}());
_V_.Player=_V_.Component.extend({init:function(tag,addOptions,ready){this.tag=tag;
var el=this.el=_V_.createElement("div"),options=this.options={},width=options.width=tag.getAttribute("width"),height=options.height=tag.getAttribute("height"),initWidth=width||300,initHeight=height||150;
tag.player=el.player=this;
this.ready(ready);
tag.parentNode.insertBefore(el,tag);
el.appendChild(tag);
el.id=this.id=tag.id;
el.className=tag.className;
tag.id+="_html5_api";
tag.className="vjs-tech";
_V_.players[el.id]=this;
el.setAttribute("width",initWidth);
el.setAttribute("height",initHeight);
el.style.width=initWidth+"px";
el.style.height=initHeight+"px";
tag.removeAttribute("width");
tag.removeAttribute("height");
_V_.merge(options,_V_.options);
_V_.merge(options,this.getVideoTagSettings());
_V_.merge(options,addOptions);
tag.removeAttribute("controls");
tag.removeAttribute("poster");
if(tag.hasChildNodes()){for(var i=0,j=tag.childNodes;
i<j.length;
i++){if(j[i].nodeName=="SOURCE"||j[i].nodeName=="TRACK"){tag.removeChild(j[i])
}}}this.values={};
this.addClass("vjs-paused");
this.addEvent("ended",this.onEnded);
this.addEvent("play",this.onPlay);
this.addEvent("pause",this.onPause);
this.addEvent("progress",this.onProgress);
this.addEvent("error",this.onError);
if(options.controls){this.ready(function(){this.initComponents()
})
}this.textTracks=[];
if(options.tracks&&options.tracks.length>0){this.addTextTracks(options.tracks)
}if(!options.sources||options.sources.length==0){for(var i=0,j=options.techOrder;
i<j.length;
i++){var techName=j[i],tech=_V_[techName];
if(tech.isSupported()){this.loadTech(techName);
break
}}}else{this.src(options.sources)
}},values:{},destroy:function(){this.stopTrackingProgress();
this.stopTrackingCurrentTime();
_V_.players[this.id]=null;
delete _V_.players[this.id];
this.tech.destroy();
this.el.parentNode.removeChild(this.el)
},createElement:function(type,options){},getVideoTagSettings:function(){var options={sources:[],tracks:[]};
options.src=this.tag.getAttribute("src");
options.controls=this.tag.getAttribute("controls")!==null;
options.poster=this.tag.getAttribute("poster");
options.preload=this.tag.getAttribute("preload");
options.autoplay=this.tag.getAttribute("autoplay")!==null;
options.loop=this.tag.getAttribute("loop")!==null;
options.muted=this.tag.getAttribute("muted")!==null;
if(this.tag.hasChildNodes()){for(var c,i=0,j=this.tag.childNodes;
i<j.length;
i++){c=j[i];
if(c.nodeName=="SOURCE"){options.sources.push({src:c.getAttribute("src"),type:c.getAttribute("type"),media:c.getAttribute("media"),title:c.getAttribute("title")})
}if(c.nodeName=="TRACK"){options.tracks.push({src:c.getAttribute("src"),kind:c.getAttribute("kind"),srclang:c.getAttribute("srclang"),label:c.getAttribute("label"),"default":c.getAttribute("default")!==null,title:c.getAttribute("title")})
}}}return options
},loadTech:function(techName,source){if(this.tech){this.unloadTech()
}else{if(techName!="html5"&&this.tag){this.el.removeChild(this.tag);
this.tag=false
}}this.techName=techName;
this.isReady=false;
var techReady=function(){this.player.triggerReady();
if(!this.support.progressEvent){this.player.manualProgressOn()
}if(!this.support.timeupdateEvent){this.player.manualTimeUpdatesOn()
}};
var techOptions=_V_.merge({source:source,parentEl:this.el},this.options[techName]);
if(source){if(source.src==this.values.src&&this.values.currentTime>0){techOptions.startTime=this.values.currentTime
}this.values.src=source.src
}this.tech=new _V_[techName](this,techOptions);
this.tech.ready(techReady)
},unloadTech:function(){this.tech.destroy();
if(this.manualProgress){this.manualProgressOff()
}if(this.manualTimeUpdates){this.manualTimeUpdatesOff()
}this.tech=false
},manualProgressOn:function(){this.manualProgress=true;
this.trackProgress();
this.tech.addEvent("progress",function(){this.removeEvent("progress",arguments.callee);
this.support.progressEvent=true;
this.player.manualProgressOff()
})
},manualProgressOff:function(){this.manualProgress=false;
this.stopTrackingProgress()
},trackProgress:function(){this.progressInterval=setInterval(_V_.proxy(this,function(){if(this.values.bufferEnd<this.buffered().end(0)){this.triggerEvent("progress")
}else{if(this.bufferedPercent()==1){this.stopTrackingProgress();
this.triggerEvent("progress")
}}}),500)
},stopTrackingProgress:function(){clearInterval(this.progressInterval)
},manualTimeUpdatesOn:function(){this.manualTimeUpdates=true;
this.addEvent("play",this.trackCurrentTime);
this.addEvent("pause",this.stopTrackingCurrentTime);
this.tech.addEvent("timeupdate",function(){this.removeEvent("timeupdate",arguments.callee);
this.support.timeupdateEvent=true;
this.player.manualTimeUpdatesOff()
})
},manualTimeUpdatesOff:function(){this.manualTimeUpdates=false;
this.stopTrackingCurrentTime();
this.removeEvent("play",this.trackCurrentTime);
this.removeEvent("pause",this.stopTrackingCurrentTime)
},trackCurrentTime:function(){if(this.currentTimeInterval){this.stopTrackingCurrentTime()
}this.currentTimeInterval=setInterval(_V_.proxy(this,function(){this.triggerEvent("timeupdate")
}),250)
},stopTrackingCurrentTime:function(){clearInterval(this.currentTimeInterval)
},onEnded:function(){if(this.options.loop){this.currentTime(0);
this.play()
}else{this.pause();
this.currentTime(0);
this.pause()
}},onPlay:function(){_V_.removeClass(this.el,"vjs-paused");
_V_.addClass(this.el,"vjs-playing")
},onPause:function(){_V_.removeClass(this.el,"vjs-playing");
_V_.addClass(this.el,"vjs-paused")
},onProgress:function(){if(this.bufferedPercent()==1){this.triggerEvent("loadedalldata")
}},onError:function(e){_V_.log("Video Error",e)
},techCall:function(method,arg){if(!this.tech.isReady){this.tech.ready(function(){this[method](arg)
})
}else{try{this.tech[method](arg)
}catch(e){_V_.log(e)
}}},techGet:function(method){if(this.tech.isReady){try{return this.tech[method]()
}catch(e){if(this.tech[method]===undefined){_V_.log("Video.js: "+method+" method not defined for "+this.techName+" playback technology.",e)
}else{if(e.name=="TypeError"){_V_.log("Video.js: "+method+" unavailable on "+this.techName+" playback technology element.",e);
this.tech.isReady=false
}else{_V_.log(e)
}}}}return
},play:function(){this.techCall("play");
return this
},pause:function(){this.techCall("pause");
return this
},paused:function(){return(this.techGet("paused")===false)?false:true
},currentTime:function(seconds){if(seconds!==undefined){this.values.lastSetCurrentTime=seconds;
this.techCall("setCurrentTime",seconds);
if(this.manualTimeUpdates){this.triggerEvent("timeupdate")
}return this
}return this.values.currentTime=(this.techGet("currentTime")||0)
},duration:function(){return parseFloat(this.techGet("duration"))
},remainingTime:function(){return this.duration()-this.currentTime()
},buffered:function(){var buffered=this.techGet("buffered"),start=0,end=this.values.bufferEnd=this.values.bufferEnd||0,timeRange;
if(buffered&&buffered.length>0&&buffered.end(0)!==end){end=buffered.end(0);
this.values.bufferEnd=end
}return _V_.createTimeRange(start,end)
},bufferedPercent:function(){return(this.duration())?this.buffered().end(0)/this.duration():0
},volume:function(percentAsDecimal){var vol;
if(percentAsDecimal!==undefined){vol=Math.max(0,Math.min(1,parseFloat(percentAsDecimal)));
this.values.volume=vol;
this.techCall("setVolume",vol);
_V_.setLocalStorage("volume",vol);
return this
}vol=parseFloat(this.techGet("volume"));
return(isNaN(vol))?1:vol
},muted:function(muted){if(muted!==undefined){this.techCall("setMuted",muted);
return this
}return this.techGet("muted")||false
},width:function(width,skipListeners){if(width!==undefined){this.el.width=width;
this.el.style.width=width+"px";
if(!skipListeners){this.triggerEvent("resize")
}return this
}return parseInt(this.el.getAttribute("width"))
},height:function(height){if(height!==undefined){this.el.height=height;
this.el.style.height=height+"px";
this.triggerEvent("resize");
return this
}return parseInt(this.el.getAttribute("height"))
},size:function(width,height){return this.width(width,true).height(height)
},supportsFullScreen:function(){return this.techGet("supportsFullScreen")||false
},requestFullScreen:function(){var requestFullScreen=_V_.support.requestFullScreen;
this.isFullScreen=true;
if(requestFullScreen){_V_.addEvent(document,requestFullScreen.eventName,this.proxy(function(){this.isFullScreen=document[requestFullScreen.isFullScreen];
if(this.isFullScreen==false){_V_.removeEvent(document,requestFullScreen.eventName,arguments.callee)
}this.triggerEvent("fullscreenchange")
}));
if(this.tech.support.fullscreenResize===false&&this.options.flash.iFrameMode!=true){this.pause();
this.unloadTech();
_V_.addEvent(document,requestFullScreen.eventName,this.proxy(function(){_V_.removeEvent(document,requestFullScreen.eventName,arguments.callee);
this.loadTech(this.techName,{src:this.values.src})
}));
this.el[requestFullScreen.requestFn]()
}else{this.el[requestFullScreen.requestFn]()
}}else{if(this.tech.supportsFullScreen()){this.triggerEvent("fullscreenchange");
this.techCall("enterFullScreen")
}else{this.triggerEvent("fullscreenchange");
this.enterFullWindow()
}}return this
},cancelFullScreen:function(){var requestFullScreen=_V_.support.requestFullScreen;
this.isFullScreen=false;
if(requestFullScreen){if(this.tech.support.fullscreenResize===false&&this.options.flash.iFrameMode!=true){this.pause();
this.unloadTech();
_V_.addEvent(document,requestFullScreen.eventName,this.proxy(function(){_V_.removeEvent(document,requestFullScreen.eventName,arguments.callee);
this.loadTech(this.techName,{src:this.values.src})
}));
document[requestFullScreen.cancelFn]()
}else{document[requestFullScreen.cancelFn]()
}}else{if(this.tech.supportsFullScreen()){this.techCall("exitFullScreen");
this.triggerEvent("fullscreenchange")
}else{this.exitFullWindow();
this.triggerEvent("fullscreenchange")
}}return this
},enterFullWindow:function(){this.isFullWindow=true;
this.docOrigOverflow=document.documentElement.style.overflow;
_V_.addEvent(document,"keydown",_V_.proxy(this,this.fullWindowOnEscKey));
document.documentElement.style.overflow="hidden";
_V_.addClass(document.body,"vjs-full-window");
_V_.addClass(this.el,"vjs-fullscreen");
this.triggerEvent("enterFullWindow")
},fullWindowOnEscKey:function(event){if(event.keyCode==27){if(this.isFullScreen==true){this.cancelFullScreen()
}else{this.exitFullWindow()
}}},exitFullWindow:function(){this.isFullWindow=false;
_V_.removeEvent(document,"keydown",this.fullWindowOnEscKey);
document.documentElement.style.overflow=this.docOrigOverflow;
_V_.removeClass(document.body,"vjs-full-window");
_V_.removeClass(this.el,"vjs-fullscreen");
this.triggerEvent("exitFullWindow")
},selectSource:function(sources){for(var i=0,j=this.options.techOrder;
i<j.length;
i++){var techName=j[i],tech=_V_[techName];
if(tech.isSupported()){for(var a=0,b=sources;
a<b.length;
a++){var source=b[a];
if(tech.canPlaySource.call(this,source)){return{source:source,tech:techName}
}}}}return false
},src:function(source){if(source instanceof Array){var sourceTech=this.selectSource(source),source,techName;
if(sourceTech){source=sourceTech.source;
techName=sourceTech.tech;
if(techName==this.techName){this.src(source)
}else{this.loadTech(techName,source)
}}else{_V_.log("No compatible source and playback technology were found.")
}}else{if(source instanceof Object){if(_V_[this.techName].canPlaySource(source)){this.src(source.src)
}else{this.src([source])
}}else{this.values.src=source;
if(!this.isReady){this.ready(function(){this.src(source)
})
}else{this.techCall("src",source);
if(this.options.preload=="auto"){this.load()
}if(this.options.autoplay){this.play()
}}}}return this
},load:function(){this.techCall("load");
return this
},currentSrc:function(){return this.techGet("currentSrc")||this.values.src||""
},preload:function(value){if(value!==undefined){this.techCall("setPreload",value);
this.options.preload=value;
return this
}return this.techGet("preload")
},autoplay:function(value){if(value!==undefined){this.techCall("setAutoplay",value);
this.options.autoplay=value;
return this
}return this.techGet("autoplay",value)
},loop:function(value){if(value!==undefined){this.techCall("setLoop",value);
this.options.loop=value;
return this
}return this.techGet("loop")
},controls:function(){return this.options.controls
},poster:function(){return this.techGet("poster")
},error:function(){return this.techGet("error")
},ended:function(){return this.techGet("ended")
}});
(function(){var requestFn,cancelFn,eventName,isFullScreen,playerProto=_V_.Player.prototype;
if(document.cancelFullscreen!==undefined){requestFn="requestFullscreen";
cancelFn="exitFullscreen";
eventName="fullscreenchange";
isFullScreen="fullScreen"
}else{_V_.each(["moz","webkit"],function(prefix){if((prefix!="moz"||document.mozFullScreenEnabled)&&document[prefix+"CancelFullScreen"]!==undefined){requestFn=prefix+"RequestFullScreen";
cancelFn=prefix+"CancelFullScreen";
eventName=prefix+"fullscreenchange";
if(prefix=="webkit"){isFullScreen=prefix+"IsFullScreen"
}else{isFullScreen=prefix+"FullScreen"
}}})
}if(requestFn){_V_.support.requestFullScreen={requestFn:requestFn,cancelFn:cancelFn,eventName:eventName,isFullScreen:isFullScreen}
}})();
_V_.PlaybackTech=_V_.Component.extend({init:function(player,options){},onClick:function(){if(this.player.options.controls){_V_.PlayToggle.prototype.onClick.call(this)
}}});
_V_.apiMethods="play,pause,paused,currentTime,setCurrentTime,duration,buffered,volume,setVolume,muted,setMuted,width,height,supportsFullScreen,enterFullScreen,src,load,currentSrc,preload,setPreload,autoplay,setAutoplay,loop,setLoop,error,networkState,readyState,seeking,initialTime,startOffsetTime,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks,defaultPlaybackRate,playbackRate,mediaGroup,controller,controls,defaultMuted".split(",");
_V_.each(_V_.apiMethods,function(methodName){_V_.PlaybackTech.prototype[methodName]=function(){throw new Error("The '"+methodName+"' method is not available on the playback technology's API")
}
});
_V_.html5=_V_.PlaybackTech.extend({init:function(player,options,ready){this.player=player;
this.el=this.createElement();
this.ready(ready);
this.addEvent("click",this.proxy(this.onClick));
var source=options.source;
if(source&&this.el.currentSrc==source.src){player.triggerEvent("loadstart")
}else{if(source){this.el.src=source.src
}}player.ready(function(){if(this.options.autoplay&&this.paused()){this.tag.poster=null;
this.play()
}});
this.setupTriggers();
this.triggerReady()
},destroy:function(){this.player.tag=false;
this.removeTriggers();
this.el.parentNode.removeChild(this.el)
},createElement:function(){var html5=_V_.html5,player=this.player,el=player.tag,newEl;
if(!el||this.support.movingElementInDOM===false){if(el){player.el.removeChild(el)
}newEl=_V_.createElement("video",{id:el.id||player.el.id+"_html5_api",className:el.className||"vjs-tech"});
el=newEl;
_V_.insertFirst(el,player.el)
}_V_.each(["autoplay","preload","loop","muted"],function(attr){if(player.options[attr]!==null){el[attr]=player.options[attr]
}},this);
return el
},setupTriggers:function(){_V_.each.call(this,_V_.html5.events,function(type){_V_.addEvent(this.el,type,_V_.proxy(this.player,this.eventHandler))
})
},removeTriggers:function(){_V_.each.call(this,_V_.html5.events,function(type){_V_.removeEvent(this.el,type,_V_.proxy(this.player,this.eventHandler))
})
},eventHandler:function(e){e.stopPropagation();
this.triggerEvent(e)
},play:function(){this.el.play()
},pause:function(){this.el.pause()
},paused:function(){return this.el.paused
},currentTime:function(){return this.el.currentTime
},setCurrentTime:function(seconds){try{this.el.currentTime=seconds
}catch(e){_V_.log(e,"Video isn't ready. (VideoJS)")
}},duration:function(){return this.el.duration||0
},buffered:function(){return this.el.buffered
},volume:function(){return this.el.volume
},setVolume:function(percentAsDecimal){this.el.volume=percentAsDecimal
},muted:function(){return this.el.muted
},setMuted:function(muted){this.el.muted=muted
},width:function(){return this.el.offsetWidth
},height:function(){return this.el.offsetHeight
},supportsFullScreen:function(){if(typeof this.el.webkitEnterFullScreen=="function"){if(!navigator.userAgent.match("Chrome")&&!navigator.userAgent.match("Mac OS X 10.5")){return true
}}return false
},enterFullScreen:function(){try{this.el.webkitEnterFullScreen()
}catch(e){if(e.code==11){_V_.log("VideoJS: Video not ready.")
}}},src:function(src){this.el.src=src
},load:function(){this.el.load()
},currentSrc:function(){return this.el.currentSrc
},preload:function(){return this.el.preload
},setPreload:function(val){this.el.preload=val
},autoplay:function(){return this.el.autoplay
},setAutoplay:function(val){this.el.autoplay=val
},loop:function(){return this.el.loop
},setLoop:function(val){this.el.loop=val
},error:function(){return this.el.error
},seeking:function(){return this.el.seeking
},ended:function(){return this.el.ended
},controls:function(){return this.player.options.controls
},defaultMuted:function(){return this.el.defaultMuted
}});
_V_.html5.isSupported=function(){return !!document.createElement("video").canPlayType
};
_V_.html5.canPlaySource=function(srcObj){return !!document.createElement("video").canPlayType(srcObj.type)
};
_V_.html5.events="loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange".split(",");
_V_.html5.prototype.support={fullscreen:(typeof _V_.testVid.webkitEnterFullScreen!==undefined)?(!_V_.ua.match("Chrome")&&!_V_.ua.match("Mac OS X 10.5")?true:false):false,movingElementInDOM:!_V_.isIOS()};
if(_V_.isAndroid()){if(_V_.androidVersion()<3){document.createElement("video").constructor.prototype.canPlayType=function(type){return(type&&type.toLowerCase().indexOf("video/mp4")!=-1)?"maybe":""
}
}}_V_.flash=_V_.PlaybackTech.extend({init:function(player,options){this.player=player;
var source=options.source,parentEl=options.parentEl,placeHolder=this.el=_V_.createElement("div",{id:parentEl.id+"_temp_flash"}),objId=player.el.id+"_flash_api",playerOptions=player.options,flashVars=_V_.merge({readyFunction:"_V_.flash.onReady",eventProxyFunction:"_V_.flash.onEvent",errorEventProxyFunction:"_V_.flash.onError",autoplay:playerOptions.autoplay,preload:playerOptions.preload,loop:playerOptions.loop,muted:playerOptions.muted},options.flashVars),params=_V_.merge({wmode:"opaque",bgcolor:"#000000"},options.params),attributes=_V_.merge({id:objId,name:objId,"class":"vjs-tech"},options.attributes);
if(source){flashVars.src=encodeURIComponent(_V_.getAbsoluteURL(source.src))
}_V_.insertFirst(placeHolder,parentEl);
if(options.startTime){this.ready(function(){this.load();
this.play();
this.currentTime(options.startTime)
})
}if(options.iFrameMode==true&&!_V_.isFF){var iFrm=_V_.createElement("iframe",{id:objId+"_iframe",name:objId+"_iframe",className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0});
flashVars.readyFunction="ready";
flashVars.eventProxyFunction="events";
flashVars.errorEventProxyFunction="errors";
_V_.addEvent(iFrm,"load",_V_.proxy(this,function(){var iDoc,objTag,swfLoc,iWin=iFrm.contentWindow,varString="";
iDoc=iFrm.contentDocument?iFrm.contentDocument:iFrm.contentWindow.document;
iDoc.write(_V_.flash.getEmbedCode(options.swf,flashVars,params,attributes));
iWin.player=this.player;
iWin.ready=_V_.proxy(this.player,function(currSwf){var el=iDoc.getElementById(currSwf),player=this,tech=player.tech;
tech.el=el;
_V_.addEvent(el,"click",tech.proxy(tech.onClick));
_V_.flash.checkReady(tech)
});
iWin.events=_V_.proxy(this.player,function(swfID,eventName,other){var player=this;
if(player&&player.techName=="flash"){player.triggerEvent(eventName)
}});
iWin.errors=_V_.proxy(this.player,function(swfID,eventName){_V_.log("Flash Error",eventName)
})
}));
placeHolder.parentNode.replaceChild(iFrm,placeHolder)
}else{_V_.flash.embed(options.swf,placeHolder,flashVars,params,attributes)
}},destroy:function(){this.el.parentNode.removeChild(this.el)
},play:function(){this.el.vjs_play()
},pause:function(){this.el.vjs_pause()
},src:function(src){src=_V_.getAbsoluteURL(src);
this.el.vjs_src(src);
if(this.player.autoplay()){var tech=this;
setTimeout(function(){tech.play()
},0)
}},load:function(){this.el.vjs_load()
},poster:function(){this.el.vjs_getProperty("poster")
},buffered:function(){return _V_.createTimeRange(0,this.el.vjs_getProperty("buffered"))
},supportsFullScreen:function(){return false
},enterFullScreen:function(){return false
}});
(function(){var api=_V_.flash.prototype,readWrite="preload,currentTime,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","),readOnly="error,currentSrc,networkState,readyState,seeking,initialTime,duration,startOffsetTime,paused,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks".split(","),callOnly="load,play,pause".split(",");
createSetter=function(attr){var attrUpper=attr.charAt(0).toUpperCase()+attr.slice(1);
api["set"+attrUpper]=function(val){return this.el.vjs_setProperty(attr,val)
}
},createGetter=function(attr){api[attr]=function(){return this.el.vjs_getProperty(attr)
}
};
_V_.each(readWrite,function(attr){createGetter(attr);
createSetter(attr)
});
_V_.each(readOnly,function(attr){createGetter(attr)
})
})();
_V_.flash.isSupported=function(){return _V_.flash.version()[0]>=10
};
_V_.flash.canPlaySource=function(srcObj){if(srcObj.type in _V_.flash.prototype.support.formats){return"maybe"
}};
_V_.flash.prototype.support={formats:{"video/flv":"FLV","video/x-flv":"FLV","video/mp4":"MP4","video/m4v":"MP4"},progressEvent:false,timeupdateEvent:false,fullscreenResize:false,parentResize:!(_V_.ua.match("Firefox"))};
_V_.flash.onReady=function(currSwf){var el=_V_.el(currSwf);
var player=el.player||el.parentNode.player,tech=player.tech;
el.player=player;
tech.el=el;
tech.addEvent("click",tech.onClick);
_V_.flash.checkReady(tech)
};
_V_.flash.checkReady=function(tech){if(tech.el.vjs_getProperty){tech.triggerReady()
}else{setTimeout(function(){_V_.flash.checkReady(tech)
},50)
}};
_V_.flash.onEvent=function(swfID,eventName){var player=_V_.el(swfID).player;
player.triggerEvent(eventName)
};
_V_.flash.onError=function(swfID,err){var player=_V_.el(swfID).player;
player.triggerEvent("error");
_V_.log("Flash Error",err,swfID)
};
_V_.flash.version=function(){var version="0,0,0";
try{version=new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]
}catch(e){try{if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){version=(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1]
}}catch(e){}}return version.split(",")
};
_V_.flash.embed=function(swf,placeHolder,flashVars,params,attributes){var code=_V_.flash.getEmbedCode(swf,flashVars,params,attributes),obj=_V_.createElement("div",{innerHTML:code}).childNodes[0],par=placeHolder.parentNode;
placeHolder.parentNode.replaceChild(obj,placeHolder);
if(_V_.isIE()){var newObj=par.childNodes[0];
setTimeout(function(){newObj.style.display="block"
},1000)
}return obj
};
_V_.flash.getEmbedCode=function(swf,flashVars,params,attributes){var objTag='<object type="application/x-shockwave-flash"',flashVarsString="",paramsString="";
attrsString="";
if(flashVars){_V_.eachProp(flashVars,function(key,val){flashVarsString+=(key+"="+val+"&amp;")
})
}params=_V_.merge({movie:swf,flashvars:flashVarsString,allowScriptAccess:"always",allowNetworking:"all"},params);
_V_.eachProp(params,function(key,val){paramsString+='<param name="'+key+'" value="'+val+'" />'
});
attributes=_V_.merge({data:swf,width:"100%",height:"100%"},attributes);
_V_.eachProp(attributes,function(key,val){attrsString+=(key+'="'+val+'" ')
});
return objTag+attrsString+">"+paramsString+"</object>"
};
_V_.merge(_V_.Player.prototype,{addTextTracks:function(trackObjects){var tracks=this.textTracks=(this.textTracks)?this.textTracks:[],i=0,j=trackObjects.length,track,Kind;
for(;
i<j;
i++){Kind=_V_.uc(trackObjects[i].kind||"subtitles");
track=new _V_[Kind+"Track"](this,trackObjects[i]);
tracks.push(track);
if(track["default"]){this.ready(_V_.proxy(track,track.show))
}}return this
},showTextTrack:function(id,disableSameKind){var tracks=this.textTracks,i=0,j=tracks.length,track,showTrack,kind;
for(;
i<j;
i++){track=tracks[i];
if(track.id===id){track.show();
showTrack=track
}else{if(disableSameKind&&track.kind==disableSameKind&&track.mode>0){track.disable()
}}}kind=(showTrack)?showTrack.kind:((disableSameKind)?disableSameKind:false);
if(kind){this.triggerEvent(kind+"trackchange")
}return this
}});
_V_.Track=_V_.Component.extend({init:function(player,options){this._super(player,options);
_V_.merge(this,{id:options.id||("vjs_"+options.kind+"_"+options.language+"_"+_V_.guid++),src:options.src,"default":options["default"],title:options.title,language:options.srclang,label:options.label,cues:[],activeCues:[],readyState:0,mode:0})
},createElement:function(){return this._super("div",{className:"vjs-"+this.kind+" vjs-text-track"})
},show:function(){this.activate();
this.mode=2;
this._super()
},hide:function(){this.activate();
this.mode=1;
this._super()
},disable:function(){if(this.mode==2){this.hide()
}this.deactivate();
this.mode=0
},activate:function(){if(this.readyState==0){this.load()
}if(this.mode==0){this.player.addEvent("timeupdate",this.proxy(this.update,this.id));
this.player.addEvent("ended",this.proxy(this.reset,this.id));
if(this.kind=="captions"||this.kind=="subtitles"){this.player.textTrackDisplay.addComponent(this)
}}},deactivate:function(){this.player.removeEvent("timeupdate",this.proxy(this.update,this.id));
this.player.removeEvent("ended",this.proxy(this.reset,this.id));
this.reset();
this.player.textTrackDisplay.removeComponent(this)
},load:function(){if(this.readyState==0){this.readyState=1;
_V_.get(this.src,this.proxy(this.parseCues),this.proxy(this.onError))
}},onError:function(err){this.error=err;
this.readyState=3;
this.triggerEvent("error")
},parseCues:function(srcContent){var cue,time,text,lines=srcContent.split("\n"),line="",id;
for(var i=1,j=lines.length;
i<j;
i++){line=_V_.trim(lines[i]);
if(line){if(line.indexOf("-->")==-1){id=line;
line=_V_.trim(lines[++i])
}else{id=this.cues.length
}cue={id:id,index:this.cues.length};
time=line.split(" --> ");
cue.startTime=this.parseCueTime(time[0]);
cue.endTime=this.parseCueTime(time[1]);
text=[];
while(lines[++i]&&(line=_V_.trim(lines[i]))){text.push(line)
}cue.text=text.join("<br/>");
this.cues.push(cue)
}}this.readyState=2;
this.triggerEvent("loaded")
},parseCueTime:function(timeText){var parts=timeText.split(":"),time=0,hours,minutes,other,seconds,ms,flags;
if(parts.length==3){hours=parts[0];
minutes=parts[1];
other=parts[2]
}else{hours=0;
minutes=parts[0];
other=parts[1]
}other=other.split(/\s+/);
seconds=other.splice(0,1)[0];
seconds=seconds.split(/\.|,/);
ms=parseFloat(seconds[1]);
seconds=seconds[0];
time+=parseFloat(hours)*3600;
time+=parseFloat(minutes)*60;
time+=parseFloat(seconds);
if(ms){time+=ms/1000
}return time
},update:function(){if(this.cues.length>0){var time=this.player.currentTime();
if(this.prevChange===undefined||time<this.prevChange||this.nextChange<=time){var cues=this.cues,newNextChange=this.player.duration(),newPrevChange=0,reverse=false,newCues=[],firstActiveIndex,lastActiveIndex,html="",cue,i,j;
if(time>=this.nextChange||this.nextChange===undefined){i=(this.firstActiveIndex!==undefined)?this.firstActiveIndex:0
}else{reverse=true;
i=(this.lastActiveIndex!==undefined)?this.lastActiveIndex:cues.length-1
}while(true){cue=cues[i];
if(cue.endTime<=time){newPrevChange=Math.max(newPrevChange,cue.endTime);
if(cue.active){cue.active=false
}}else{if(time<cue.startTime){newNextChange=Math.min(newNextChange,cue.startTime);
if(cue.active){cue.active=false
}if(!reverse){break
}}else{if(reverse){newCues.splice(0,0,cue);
if(lastActiveIndex===undefined){lastActiveIndex=i
}firstActiveIndex=i
}else{newCues.push(cue);
if(firstActiveIndex===undefined){firstActiveIndex=i
}lastActiveIndex=i
}newNextChange=Math.min(newNextChange,cue.endTime);
newPrevChange=Math.max(newPrevChange,cue.startTime);
cue.active=true
}}if(reverse){if(i===0){break
}else{i--
}}else{if(i===cues.length-1){break
}else{i++
}}}this.activeCues=newCues;
this.nextChange=newNextChange;
this.prevChange=newPrevChange;
this.firstActiveIndex=firstActiveIndex;
this.lastActiveIndex=lastActiveIndex;
this.updateDisplay();
this.triggerEvent("cuechange")
}}},updateDisplay:function(){var cues=this.activeCues,html="",i=0,j=cues.length;
for(;
i<j;
i++){html+="<span class='vjs-tt-cue'>"+cues[i].text+"</span>"
}this.el.innerHTML=html
},reset:function(){this.nextChange=0;
this.prevChange=this.player.duration();
this.firstActiveIndex=0;
this.lastActiveIndex=0
}});
_V_.CaptionsTrack=_V_.Track.extend({kind:"captions"});
_V_.SubtitlesTrack=_V_.Track.extend({kind:"subtitles"});
_V_.ChaptersTrack=_V_.Track.extend({kind:"chapters"});
_V_.TextTrackDisplay=_V_.Component.extend({createElement:function(){return this._super("div",{className:"vjs-text-track-display"})
}});
_V_.TextTrackMenuItem=_V_.MenuItem.extend({init:function(player,options){var track=this.track=options.track;
options.label=track.label;
options.selected=track["default"];
this._super(player,options);
this.player.addEvent(track.kind+"trackchange",_V_.proxy(this,this.update))
},onClick:function(){this._super();
this.player.showTextTrack(this.track.id,this.track.kind)
},update:function(){if(this.track.mode==2){this.selected(true)
}else{this.selected(false)
}}});
_V_.OffTextTrackMenuItem=_V_.TextTrackMenuItem.extend({init:function(player,options){options.track={kind:options.kind,player:player,label:"Off"};
this._super(player,options)
},onClick:function(){this._super();
this.player.showTextTrack(this.track.id,this.track.kind)
},update:function(){var tracks=this.player.textTracks,i=0,j=tracks.length,track,off=true;
for(;
i<j;
i++){track=tracks[i];
if(track.kind==this.track.kind&&track.mode==2){off=false
}}if(off){this.selected(true)
}else{this.selected(false)
}}});
_V_.TextTrackButton=_V_.Button.extend({init:function(player,options){this._super(player,options);
this.menu=this.createMenu();
if(this.items.length===0){this.hide()
}},createMenu:function(){var menu=new _V_.Menu(this.player);
menu.el.appendChild(_V_.createElement("li",{className:"vjs-menu-title",innerHTML:_V_.uc(this.kind)}));
menu.addItem(new _V_.OffTextTrackMenuItem(this.player,{kind:this.kind}));
this.items=this.createItems();
this.each(this.items,function(item){menu.addItem(item)
});
this.addComponent(menu);
return menu
},createItems:function(){var items=[];
this.each(this.player.textTracks,function(track){if(track.kind===this.kind){items.push(new _V_.TextTrackMenuItem(this.player,{track:track}))
}});
return items
},buildCSSClass:function(){return this.className+" vjs-menu-button "+this._super()
},onFocus:function(){this.menu.lockShowing();
_V_.one(this.menu.el.childNodes[this.menu.el.childNodes.length-1],"blur",this.proxy(function(){this.menu.unlockShowing()
}))
},onBlur:function(){},onClick:function(){this.one("mouseout",this.proxy(function(){this.menu.unlockShowing();
this.el.blur()
}))
}});
_V_.CaptionsButton=_V_.TextTrackButton.extend({kind:"captions",buttonText:"Captions",className:"vjs-captions-button"});
_V_.SubtitlesButton=_V_.TextTrackButton.extend({kind:"subtitles",buttonText:"Subtitles",className:"vjs-subtitles-button"});
_V_.ChaptersButton=_V_.TextTrackButton.extend({kind:"chapters",buttonText:"Chapters",className:"vjs-chapters-button",createItems:function(chaptersTrack){var items=[];
this.each(this.player.textTracks,function(track){if(track.kind===this.kind){items.push(new _V_.TextTrackMenuItem(this.player,{track:track}))
}});
return items
},createMenu:function(){var tracks=this.player.textTracks,i=0,j=tracks.length,track,chaptersTrack,items=this.items=[];
for(;
i<j;
i++){track=tracks[i];
if(track.kind==this.kind&&track["default"]){if(track.readyState<2){this.chaptersTrack=track;
track.addEvent("loaded",this.proxy(this.createMenu));
return
}else{chaptersTrack=track;
break
}}}var menu=this.menu=new _V_.Menu(this.player);
menu.el.appendChild(_V_.createElement("li",{className:"vjs-menu-title",innerHTML:_V_.uc(this.kind)}));
if(chaptersTrack){var cues=chaptersTrack.cues,i=0,j=cues.length,cue,mi;
for(;
i<j;
i++){cue=cues[i];
mi=new _V_.ChaptersTrackMenuItem(this.player,{track:chaptersTrack,cue:cue});
items.push(mi);
menu.addComponent(mi)
}}this.addComponent(menu);
if(this.items.length>0){this.show()
}return menu
}});
_V_.ChaptersTrackMenuItem=_V_.MenuItem.extend({init:function(player,options){var track=this.track=options.track,cue=this.cue=options.cue,currentTime=player.currentTime();
options.label=cue.text;
options.selected=(cue.startTime<=currentTime&&currentTime<cue.endTime);
this._super(player,options);
track.addEvent("cuechange",_V_.proxy(this,this.update))
},onClick:function(){this._super();
this.player.currentTime(this.cue.startTime);
this.update(this.cue.startTime)
},update:function(time){var cue=this.cue,currentTime=this.player.currentTime();
if(cue.startTime<=currentTime&&currentTime<cue.endTime){this.selected(true)
}else{this.selected(false)
}}});
_V_.merge(_V_.ControlBar.prototype.options.components,{subtitlesButton:{},captionsButton:{},chaptersButton:{}});
_V_.autoSetup=function(){var options,vid,player,vids=document.getElementsByTagName("video");
if(vids&&vids.length>0){for(var i=0,j=vids.length;
i<j;
i++){vid=vids[i];
if(vid&&vid.getAttribute){if(vid.player===undefined){options=vid.getAttribute("data-setup");
if(options!==null){options=JSON.parse(options||"{}");
player=_V_(vid,options)
}}}else{_V_.autoSetupTimeout(1);
break
}}}else{if(!_V_.windowLoaded){_V_.autoSetupTimeout(1)
}}};
_V_.autoSetupTimeout=function(wait){setTimeout(_V_.autoSetup,wait)
};
_V_.addEvent(window,"load",function(){_V_.windowLoaded=true
});
_V_.autoSetup();
window.VideoJS=window._V_=VideoJS
})(window);
var adsk=adsk||{};
adsk.banner=(function(c){var b=0;
c.addScrollEvent=function(d){if(d&&d.length){a(d);
$(window).scroll(function(){a(d)
})
}};
function a(e){var f=$('<div id="adsk-open-banner" class="border-brand"><span class="icon adsk-banner-open"></span></div>');
var d=$(window).scrollTop();
if((d>b)&&$(e).hasClass("expand")){$(e).removeClass("expand");
$(e).append(f);
$(f).click(function(){$(e).addClass("expand");
$("#adsk-open-banner").remove()
})
}b=d
}return c
}(adsk.banner||{}));
window.adsk=window.adsk||{};
adsk.product=adsk.product||{};
adsk.product.trialDownload=function(){var d=adsk.product.trialDownload||{};
var a=false;
var c=null;
var b=null;
d.ReleaseSelector=function(e,g,h){this.i18n=g;
this.releases=e;
this.releaseElements=h.releaseElements;
this.languageElement=h.languageElement;
this.osElement=h.osElement;
this.adlmElement=h.adlmElement;
this.acceptElement=h.acceptElement;
var f="Install Now";
if(window.ADSKDLMResourceStrings&&g.sdkLocale&&ADSKDLMResourceStrings[g.sdkLocale]){f=ADSKDLMResourceStrings[g.sdkLocale].splitbtnInstallNow
}this.disabledButton='<button class="adsk-adlm-disabled" disabled>'+f+"</button>";
this.languageElement.attr("disabled",true);
this.osElement.attr("disabled",true);
this.acceptElement.attr("disabled",true);
this.adlmElement.html(this.disabledButton);
this.releaseElements.bind("change",{rs:this},d.productReleaseChanged);
this.languageElement.bind("change",{rs:this},d.languageChanged);
this.osElement.bind("change",{rs:this},d.osChanged);
this.acceptElement.bind("change",{rs:this},d.acceptTermsChanged);
if(this.releases.length>=1){this.setProductRelease(this.releases[0].name)
}};
d.ReleaseSelector.analyticsCallback=undefined;
d.SDKAnalyticsCallback=undefined;
d.ReleaseSelector.prototype.getReleaseOptions=function(){var h={};
if(this.selectedRelease){for(var f=0;
f<this.selectedRelease.releases.length;
++f){var e=this.selectedRelease.releases[f];
if(!h.hasOwnProperty(e.locale)){h[e.locale]=new Array()
}var g=h[e.locale];
g.push(e.operatingSystem)
}}return h
};
d.ReleaseSelector.prototype.setProductRelease=function(h){for(var g=0;
g<this.releases.length;
++g){var e=this.releases[g];
if(e.name===h){this.selectedRelease=e;
break
}}var i=this.getReleaseOptions();
var f="";
for(var j in i){if(i.hasOwnProperty(j)){f+='<option value="'+j+'"';
if(j==="en-US"){f+=" selected"
}f+=">"+this.i18n["locale-"+j]+"</option>"
}}this.languageElement.html(jQuery(f).sort(function(l,k){return l.text===k.text?0:l.text<k.text?-1:1
}));
this.languageElement.attr("disabled",false);
this.languageElement.change()
};
d.ReleaseSelector.prototype.setLanguage=function(e){this.selectedLanguage=e;
var g=this.getReleaseOptions();
var j=g[e];
var h="";
for(var f=0;
f<j.length;
++f){var i=j[f];
h+='<option value="'+i+'"';
if(i==="Win64"){h+=" selected"
}h+=">"+this.i18n["os-"+i.toLowerCase()]+"</option>"
}this.osElement.html(h);
this.osElement.attr("disabled",false);
this.osElement.change()
};
d.ReleaseSelector.prototype.getReleaseData=function(h,g){if(this.selectedRelease){for(var f=0;
f<this.selectedRelease.releases.length;
++f){var e=this.selectedRelease.releases[f];
if(e.locale===h&&e.operatingSystem===g){return e
}}}return undefined
};
d.ReleaseSelector.prototype.setOs=function(e){this.selectedOs=e;
this.acceptElement.attr("disabled",false);
this.acceptElement.change()
};
d.ReleaseSelector.prototype.setAcceptTermsChecked=function(l){if(l){var h=this.adlmElement.attr("id")+"-inner";
this.adlmElement.html('<div id="'+h+'"></div>');
var e=this.getReleaseData(this.selectedLanguage,this.selectedOs);
var k=this.i18n.sdkLocale||"en-US";
var m=this.createDlmArg(e);
var f=e.installNowUri;
var j=this.createWiParam(e);
var n=this.createEsdArg(e);
var i=d.browserDownload;
var g=$.proxy(this,"onAnalyticsCallback");
var o=e.eulaId;
fxSplitButton(k,h,m,f,j,n,i,g,o)
}else{this.adlmElement.html(this.disabledButton)
}};
d.ReleaseSelector.prototype.createEsdArg=function(e){if(!e.browserDownloadUris||e.browserDownloadUris.length<=0){return undefined
}return e.browserDownloadUris
};
d.ReleaseSelector.prototype.createDlmArg=function(f){if(!f.downloadNowUris||f.downloadNowUris.length<=0){return undefined
}var e="1.2;";
e+=f.displayName+";";
e+=f.downloadNowUris.join(",")+";";
e+=f.downloadNowCompressedBytes+";";
e+=f.downloadNowBytes+";";
e+="1;";
e+="authparam;";
e+="SESSION_ID";
return e
};
d.ReleaseSelector.prototype.createWiParam=function(f){if(!f.installNowUri){return undefined
}var e='/url "'+f.installNowUri+'"';
e+=" /akamai";
if(f.eulaId){e+=" /skipEULA"
}e+=" /auth authparam";
e+=" /sid SESSION_ID";
return e
};
d.ReleaseSelector.prototype.onAnalyticsCallback=function(g,e){var f;
if(d.ReleaseSelector.analyticsCallback&&typeof(d.ReleaseSelector.analyticsCallback)==="function"){switch(e){case cbAnalyticsReturn.IN:f=1;
break;
case cbAnalyticsReturn.DN:f=2;
break;
case cbAnalyticsReturn.BD:f=3;
break;
case cbAnalyticsReturn.HMDIN:f=3.1;
break;
case cbAnalyticsReturn.HMDDN:f=3.2;
break;
case cbAnalyticsReturn.HMDBD:f=3.3;
break;
default:return
}d.ReleaseSelector.analyticsCallback(this.selectedRelease.name,this.selectedLanguage,this.selectedOs,f)
}};
d.loadSdk=function(f){if(!a){adsk.tools.addScript("https://emsfs.autodesk.com/utility/dlm/prod/SDK/2_23/jquery.tools.min.js",function(){adsk.tools.addStyle("https://emsfs.autodesk.com/utility/dlm/prod/SDK/2_23/adsk.fxsdk.min.css");
adsk.tools.addScript("https://emsfs.autodesk.com/utility/dlm/prod/SDK/2_23/adsk.fxsdk.min.js",function(){a=true;
f();
d.getStopTime();
e(a,c,b)
})
})
}else{f();
d.getStopTime();
e(a,c,b)
}function e(g,i,h){d.getStopTime();
if(d.SDKAnalyticsCallback&&typeof(d.SDKAnalyticsCallback)==="function"){if(h>i){d.SDKAnalyticsCallback(g,(h-i)/1000)
}else{d.SDKAnalyticsCallback(g,0)
}}}};
d.getStartTime=function(){c=null;
var e=new Date();
c=e.getTime()
};
d.getStopTime=function(){b=null;
var e=new Date();
b=e.getTime()
};
d.languageChanged=function(e){if(e.data&&e.data.rs){e.data.rs.setLanguage(e.target.value)
}};
d.osChanged=function(e){if(e.data&&e.data.rs){e.data.rs.setOs(e.target.value)
}};
d.productReleaseChanged=function(e){if(e.data&&e.data.rs){e.data.rs.setProductRelease(e.target.value)
}};
d.acceptTermsChanged=function(e){if(e.data&&e.data.rs){e.data.rs.setAcceptTermsChecked(e.target.checked)
}};
d.browserDownload=function(e){for(var f=0;
f<e.length;
++f){window.open(e[f],"_blank")
}};
return d
}();
window.adsk=window.adsk||{};
adsk.dynamicFilter=function(){var a=adsk.dynamicFilter||{};
a.rollingIndex=0;
a.FilterSelector=function(b){this.hashId=".dynamic-filter-"+(++a.rollingIndex);
var c=b.find(".wf-filters li a");
this.overviewElement=c.slice(0,1);
this.filterElements=c.slice(1);
this.selectAllElement=b.find(".dynamic-filter-select-all");
this.clearAllElement=b.find(".dynamic-filter-clear-all");
this.filterContent=b.find(".adsk-wf-panel");
this.filterContentSections=b.find(".adsk-workflow-panels > li.adsk-workflow");
this.overviewElement.bind("click",function(d){d.preventDefault()
});
this.filterElements.bind("click",jQuery.proxy(this,"toggleFilter"));
this.selectAllElement.bind("click",jQuery.proxy(this,"selectAll"));
this.clearAllElement.bind("click",jQuery.proxy(this,"clearAll"));
if(location.hash&&location.hash.indexOf(this.hashId)>=0){this.selectAllElement.click()
}};
a.FilterSelector.prototype.toggleFilter=function(c){c.preventDefault();
var d=jQuery(c.target);
d.parent().toggleClass("active");
var b=d.parent().index()-1;
jQuery(this.filterContentSections[b]).toggleClass("show");
if(this.filterContent.find("li.show").length>0){this.filterContent.addClass("show");
this.displayHash(true)
}else{this.filterContent.removeClass("show");
this.displayHash(false)
}};
a.FilterSelector.prototype.selectAll=function(b){b.preventDefault();
this.filterElements.each(function(c,d){jQuery(d).parent().addClass("active")
});
this.filterContentSections.addClass("show");
this.filterContent.addClass("show");
this.displayHash(true)
};
a.FilterSelector.prototype.clearAll=function(b){b.preventDefault();
this.filterElements.each(function(c,d){jQuery(d).parent().removeClass("active")
});
this.filterContentSections.removeClass("show");
this.filterContent.removeClass("show");
this.displayHash(false)
};
a.FilterSelector.prototype.displayHash=function(d){var c=location.hash;
var b=(c.indexOf(this.hashId)>=0);
if(d&&!b){c+=this.hashId;
c=c.replace(".no-filter","");
location.hash=c
}else{if(!d&&b){c=c.replace(this.hashId,"");
if(c==="#"){c="#.no-filter"
}location.hash=c
}}};
return a
}();
window.adsk=window.adsk||{};
adsk.general=function(){var a=adsk.general||{};
a.GarageDoor=function(b){this.garageOpen=false;
this.rootElement=b;
this.outer=b.find(".outer");
this.insideGarage=b.find(".inside-garage");
this.door=b.find(".door-content");
this.doorHandle=b.find(".handle");
this.handleSymbol=this.doorHandle.find(".handle-symbol");
this.doorContent=this.door.find(".door-content-item");
this.pagination=b.find(".pagination");
this.pageControls=this.pagination.find(".page-index");
this.doorHandle.bind("click",jQuery.proxy(this,"toggleGarage"));
this.pageControls.bind("click",jQuery.proxy(this,"onPageControlClick"));
if(a.GarageDoor.instances===undefined){a.GarageDoor.instances=[]
}a.GarageDoor.instances.push(this);
this.setActivePageIndex(0);
this.initializeSize()
};
a.GarageDoor.prototype.initializeSize=function(){this.componentHeight=this.insideGarage.height();
this.handleHeight=this.doorHandle.outerHeight();
this.paginationHeight=this.pagination.length>0?this.pagination.outerHeight():0;
var d=this;
this.doorContent.each(function(e,g){var f=jQuery(g).height()+d.paginationHeight;
if(d.componentHeight<f){d.componentHeight=f
}});
if(a.GarageDoor.commonHeight===undefined||a.GarageDoor.commonHeight<this.componentHeight){a.GarageDoor.commonHeight=this.componentHeight;
for(var c=0;
c<a.GarageDoor.instances.length;
++c){var b=a.GarageDoor.instances[c];
if(b!==this){b.setHeight(a.GarageDoor.commonHeight)
}}}this.setHeight(a.GarageDoor.commonHeight)
};
a.GarageDoor.prototype.setHeight=function(b){this.componentHeight=b;
this.insideGarage.height(this.componentHeight+this.handleHeight);
this.doorContent.height(this.componentHeight-this.paginationHeight)
};
a.GarageDoor.prototype.onPageControlClick=function(b){this.setActivePageIndex(this.pageControls.index(b.target))
};
a.GarageDoor.prototype.toggleGarage=function(){if(this.garageOpen){this.closeGarage()
}else{this.openGarage()
}};
a.GarageDoor.prototype.openGarage=function(){this.setActivePageIndex(0);
this.garageOpen=true;
this.doorHandle.addClass("open");
this.doorHandle.removeClass("closed");
this.handleSymbol.html("&ndash;");
this.door.animate({height:this.componentHeight+this.handleHeight},500)
};
a.GarageDoor.prototype.closeGarage=function(){this.garageOpen=false;
this.doorHandle.addClass("closed");
this.doorHandle.removeClass("open");
this.handleSymbol.html("+");
this.door.animate({height:this.handleHeight},500)
};
a.GarageDoor.prototype.setActivePageIndex=function(b){var c=this.pageControls;
this.activePageIndex=b;
this.doorContent.each(function(d,e){var f=jQuery(c.get(d));
if(d===b){jQuery(e).show();
f.addClass("on");
f.removeClass("off")
}else{jQuery(e).hide();
f.addClass("off");
f.removeClass("on")
}})
};
return a
}();
$(function(){new adsk.general.Tooltip({triggers:$(".tooltip-trigger"),deepestPositionedContainer:$(".main").first(),zIndexOffset:23000,arrowPositioning:{leftMargin:26,rightMargin:26,topMargin:42,bottomMargin:19}})
});
window.adsk=window.adsk||{};
adsk.general=function(){var a=adsk.general||{};
a.Tooltip=function(b){var c={animationTime:250,deepestPositionedContainer:$("body"),zIndexOffset:10000,arrowPositioning:{leftMargin:0,rightMargin:0,topMargin:0,bottomMargin:0}};
b=$.extend(c,b);
this.triggers=b.triggers;
this.container=b.container;
this.options=b;
if(!this.triggers.length){return
}this.triggers.each(function(e){$(this).data("tooltipId",e)
});
this.container=$('<div id="tooltip-container"></div>');
this.options.deepestPositionedContainer.append(this.container);
this.triggers.on("click",jQuery.proxy(this,"displayTooltip"));
var d=this;
this.triggers.each(function(){if($(this).hasClass("tooltip-onhover")){$(this).bind("mouseenter",jQuery.proxy(d,"displayTooltip"));
$(this).bind("mouseleave",jQuery.proxy(d,"onTriggerMouseLeave"))
}});
this.container.on("click",".close",function(e){var f=$(this).closest(".tooltip").attr("id");
d.closeTooltip(f);
e.preventDefault();
e.stopPropagation()
});
this.container.on("click",".tooltip",function(e){d.sendTooltipToTop($(this));
e.preventDefault()
})
};
a.Tooltip.prototype.displayTooltip=function(c){var e=$(c.target);
var j=e.data("tooltipId");
if(j===undefined){e=e.closest("a");
j=e.data("tooltipId")
}var p=$("#tooltip-"+j);
e.addClass("fired-by-"+c.type);
if(!p.length){var o=(e.hasClass("tooltip-left"))?"left":"right";
var l=(e.hasClass("tooltip-bottom"))?"bottom":"top";
var f="tooltip tooltip-"+o+" tooltip-"+l;
var i=e.data("tooltipContent");
var m=this.container.children().length+this.options.zIndexOffset;
var n='<div id="tooltip-'+j+'" class="'+f+'" style="z-index:'+m+'"><div class="wrapper"><a class="close" href="#">Close</a>'+i+"</div></div>";
p=$(n);
p.data("trigger",e);
this.container.append(p);
var b=this.options.arrowPositioning.leftMargin;
var h=this.options.arrowPositioning.rightMargin;
var g=this.options.arrowPositioning.topMargin;
var d=this.options.arrowPositioning.bottomMargin;
var k={left:-this.container.offset().left+e.offset().left,top:-this.container.offset().top+e.offset().top+(e.height()/2)};
if(o=="right"){p.css("left",k.left+h+e.width()+parseInt(e.css("margin-right")))
}else{p.css("left",k.left-b-p.width()-parseInt(e.css("margin-left")))
}if(l=="top"){p.css("top",k.top+g-p.height())
}else{p.css("top",k.top-d)
}p.hide().fadeIn(this.options.animationTime)
}else{p.first().stop(true,false).animate({opacity:1},this.options.animationTime)
}c.preventDefault()
};
a.Tooltip.prototype.onTriggerMouseLeave=function(c){var b=$(c.target);
var d=b.data("tooltipId");
if(d===undefined){b=b.closest("a");
d=b.data("tooltipId")
}if(!b.hasClass("fired-by-click")){this.closeTooltip("tooltip-"+d)
}c.preventDefault()
};
a.Tooltip.prototype.closeTooltip=function(d){var c=$("#"+d);
var b=c.data("trigger");
b.removeClass("fired-by-mouseenter fired-by-click");
var e=this;
c.stop(true).fadeOut(function(){var f=parseInt($(this).css("z-index"));
$(this).remove();
e.resetTooltipDepth(f)
})
};
a.Tooltip.prototype.resetTooltipDepth=function(b){var c=this.container.children();
c.each(function(f){var d=parseInt($(this).css("z-index"));
if(d>b){$(this).css("z-index",d-1)
}})
};
a.Tooltip.prototype.sendTooltipToTop=function(b){var c=this.container.children();
var d=parseInt(b.css("z-index"));
b.css("z-index",c.length-1+this.options.zIndexOffset);
c.each(function(g){var f=parseInt($(this).css("z-index"));
if(!b.is($(this))&&f>d){$(this).css("z-index",f-1)
}})
};
return a
}();
jQuery(document).ready(function(){(function(a){a.fn.extend({disableSelection:function(){return this.each(function(){this.onselectstart=function(){return false
};
this.unselectable="on";
var b=a(this);
b.css("-moz-user-select","none");
b.css("-webkit-user-select","none");
b.css("-khtml-user-select","none")
})
}})
})(jQuery);
jQuery(".button-1").disableSelection();
jQuery(".tabNavigation").disableSelection();
(function(a){a.fn.extend({tabComponent:function(){return this.each(function(){var b=a("> div",this);
var c=a("> ul.tabNavigation a",this);
c.click(function(){b.hide().filter(this.type).show();
c.removeClass("selected");
a(this).addClass("selected");
return false
}).filter(":first").click()
})
}})
})(jQuery);
jQuery(".js-tabs").tabComponent()
});
window.adsk=window.adsk||{};
adsk.general=function(){var a=adsk.general||{};
a.LegalCallToAction=function(b){this.rootElement=jQuery(b);
this.cta=this.rootElement.find(".adsk-cta");
this.acceptTerms=this.rootElement.find(".accept-terms");
this.cta.bind("click",jQuery.proxy(this,"onActionInvoked"));
if(this.acceptTerms.length){this.setAcceptanceValue(this.acceptTerms.is(":checked"));
this.acceptTerms.bind("click",jQuery.proxy(this,"onAcceptanceChange"))
}else{this.setAcceptanceValue(true)
}};
a.LegalCallToAction.prototype.setAcceptanceValue=function(b){this.accepted=b;
if(b){this.cta.removeClass("adsk-inactive")
}else{this.cta.addClass("adsk-inactive")
}};
a.LegalCallToAction.prototype.onAcceptanceChange=function(b){this.setAcceptanceValue(jQuery(b.target).is(":checked"))
};
a.LegalCallToAction.prototype.onActionInvoked=function(b){if(!this.accepted){b.preventDefault()
}};
return a
}();
$(function(){$("a.sign-in-link").click(function(){adsk.oxygen.openByUser=true;
adsk.oxygen.signInClick()
});
$("a.register-link").click(function(){adsk.oxygen.openByUser=true;
adsk.oxygen.openIFrame("register","lang="+document.documentElement.lang)
});
adsk.oxygen.cleanUpCookie();
adsk.oxygen.checkActivationParameter()
});
window.adsk=window.adsk||{};
adsk.oxygen=function(){var f=adsk.oxygen||{};
f.frameOffsetHor=40;
f.frameOffsetVer=44;
f.openIFrame=function(j,m){var k=[350,365];
if(j=="register"){k=[602,830]
}if($(window).height()<k[1]){k[1]=$(window).height()-70;
if(k[1]<60){k[1]=60
}}c("adsk_oxygen_backto",window.location.href);
var i="/services/adsk/c/oxygen/tooledu.do/"+j+"?ts="+new Date().valueOf();
if(m!=undefined){i=i+"&"+m
}var l=document.createElement("iframe");
l.setAttribute("frameBorder","0");
l.setAttribute("hspace","0");
l.setAttribute("scrolling","no");
l.setAttribute("src",i);
l.setAttribute("allowtransparency","true");
l.style.border="none";
l.style.width=k[0]+"px";
l.style.height=k[1]+"px";
var h=$("#oxy-lightbox");
var g=((k[1]+10)/2)*(-1);
h.find(".js-modal").css({top:g,height:(k[1]+(adsk.oxygen.frameOffsetVer*2)),width:(k[0]+(adsk.oxygen.frameOffsetHor*2))});
h.find(".bd").children().remove();
h.find(".bd").append(l);
if(j!="logout"&&j!="immediate"&&j!="seamless"){h.show()
}if(window.addEventListener){window.addEventListener("message",adsk.oxygen.receiveMessage,false)
}else{if(window.attachEvent){window.attachEvent("onmessage",adsk.oxygen.receiveMessage)
}}};
f.getActivationParameter=function(){var h=new RegExp("[\\?&]activate=([^&#]*)"),g=h.exec(location.search);
return g===null?"":decodeURIComponent(g[1].replace(/\+/g," "))
};
f.checkActivationParameter=function(){var g=f.getActivationParameter();
if(g){adsk.oxygen.activateUser(g)
}else{adsk.oxygen.checkState()
}};
f.receiveMessage=function(g){var h;
if(!/(autodesk\.((com)?(\.)?([a-z]{2})?)(:[0-9]*)?)$/.test(g.origin)){return
}if(/^iframe\-resize::(\d+),(\d+)/.test(g.data)){h=g.data.match(/^iframe\-resize::(\d+),(\d+)/);
if(!h){return
}adsk.oxygen.frameResize(h[1],h[2])
}};
f.processRefreshResponse=function(g){var h=e(g);
adsk.oxygen.frameResize(h.width,h.height,h.page)
};
f.processResponse=function(g,h){try{adsk.s.track({PageState:"edu_application_step",ApplicationName:"sign-in",ApplicationStep:"2",ContentDescription:"success"})
}catch(i){}if(g!=null){if(adsk.oxygen.openByUser){a()
}d(g,h,null)
}if(h!=null){adsk.oxygen.eidmGuid=h
}adsk.oxygen.closeIFrame()
};
f.closeIFrame=function(){adsk.oxygen.closeLightbox()
};
f.logout=function(){adsk.oxygen.openIFrame("logout");
if(adsk.education&&adsk.education.EducationalDownload&&adsk.education.EducationalDownload.instances&&adsk.education.EducationalDownload.instances.length>0){for(var h=0;
h<adsk.education.EducationalDownload.instances.length;
h++){var g=adsk.education.EducationalDownload.instances[h];
g.myAccountButton.attr("href","#");
g.stepOne.removeClass("logged-in").removeClass("part-logged-in");
g.setStepOneComplete(false)
}}if($("a.sign-in-link").length>0||$("a.register-link").length>0){var j=$(".flag-oxygen-sign-out");
j.hide();
j.find("h3 span").text("");
j.find(".log-out-btn").click(function(){});
j.find(".my-acct-btn").attr("href","#");
$(".flag-oxygen-sign-in").show()
}var k=$("a.signin-topnav");
if(k.length>0){k.html(adsk.oxygen.topNavText+'<span class="icon adsk-site-control-dArrow"></span>');
var l=$("a#adsk-signout-control");
l.parent().hide();
l.click(function(){});
$(".topnav-oxygen-sign-out").hide();
$(".adsk-myaccount-link").hide();
$(".adsk-myaccount-link").attr("href","#");
$(".topnav-oxygen-sign-in").show()
}if(typeof digitalData!=="undefined"){digitalData.user=digitalData.user||{};
digitalData.user.loginStatus="Not Logged In";
digitalData.user.authSystem="";
digitalData.user.OxygenGUID="";
k.attr("data-wat-val","sign-in")
}};
f.checkState=function(){var k=false;
var m=encodeURIComponent("cqs")+"=";
var h=document.cookie.split(";");
for(var g=0;
g<h.length;
g++){var l=h[g];
while(l.charAt(0)==" "){l=l.trim()
}if(l.indexOf(m)==0){k=true;
break
}}if(k){b()
}else{var j=$("a.signin-topnav");
if(typeof digitalData!=="undefined"){digitalData.user=digitalData.user||{};
digitalData.user.loginStatus="Not Logged In";
digitalData.user.authSystem="";
digitalData.user.OxygenGUID="";
j.attr("data-wat-val","sign-in")
}}};
f.setUser=function(g){if(g&&g.fullname!=null&&g.eidmGuid!=null&&g.eduValid!=null){d(g.fullname,g.eidmGuid,g.eduValid);
adsk.oxygen.eduValid=g.eduValid;
if(g.eidmGuid>0){adsk.oxygen.eidmGuid=g.eidmGuid
}}};
f.checkImmediateUser=function(){adsk.oxygen.openIFrame("seamless")
};
f.frameResize=function(j,k,l){if($(window).height()<k){k=$(window).height()-70;
if(k<60){k=60
}}var i=$(".js-modal");
var g=((parseInt(k)+10)/2)*(-1);
i.css({top:g,height:(parseInt(k)+(adsk.oxygen.frameOffsetVer*2)),width:(parseInt(j)+(adsk.oxygen.frameOffsetHor*2))});
var m=i.find("iframe");
m.width(j).height(parseInt(k)+10);
if(l!=undefined){m.attr("src",l)
}};
f.closeLightbox=function(){var h=document.getElementById("oxy-lightbox");
if(!h){return true
}h.style.display="none";
try{var g=h.querySelectorAll(".bd");
if(!g||g.length==0){return true
}g[0].innerHTML=""
}catch(h){}if(f.lightboxCloseCallback&&typeof(f.lightboxCloseCallback==="function")){f.lightboxCloseCallback();
f.lightboxCloseCallback=undefined
}};
f.activateUser=function(g){jQuery.ajax({url:"/services/adsk/c/oxygen/tooledu.do/activate?code="+g+"&ts="+new Date().valueOf(),dataType:"json",success:function(h){if(h&&h.status==="ok"){try{adsk.s.track({PageState:"edu_application_step",ApplicationName:"create-account",SiteName:"edu:en",ApplicationStep:"3",ContentDescription:"success"})
}catch(i){}adsk.oxygen.lightboxCloseCallback=function(){window.location.href=window.location.href.split("?")[0]
};
adsk.oxygen.openIFrame("activated")
}},error:function(){adsk.oxygen.openIFrame("activation-error")
}})
};
f.signInClick=function(){try{adsk.s.track({PageState:"edu_application_step",ApplicationName:"sign-in",SiteName:"edu:en",ApplicationStep:"1",ContentDescription:""})
}catch(g){}adsk.oxygen.openIFrame("connect","lang="+document.documentElement.lang)
};
f.cleanUpCookie=function(){var g=new Date();
g.setTime(g.getTime()-1*24*60*60*1000);
document.cookie="JSESSIONID=;expires="+g.toUTCString()+";path=/;domain=.autodesk.com"
};
var a=function(){var i=$(".topnav-oxygen-sign-out a")[0];
if(i!=undefined){var h=i.href;
var g=i.getAttribute("data-root");
if(window.location.pathname.indexOf(g)!==0){window.location.href=h
}}};
var e=function(l){var k=(/\?/.test(l)?l.split("?")[1]:l).split("&"),m={},n,h,g;
for(h=0,g=k.length;
h<g;
h++){n=k[h].split("=");
m[n[0]]=decodeURIComponent(n[1])
}return m
};
var c=function(i,j){var h=encodeURIComponent(i)+"=";
if(typeof j!="undefined"){h+=encodeURIComponent(j)
}var g=new Date();
g.setTime(g.getTime()+3*24*60*60*1000);
h+="; expires="+g.toUTCString()+";path=/";
document.cookie=h
};
var d=function(j,g,l){if(adsk.education&&adsk.education.EducationalDownload&&adsk.education.EducationalDownload.instances&&adsk.education.EducationalDownload.instances.length>0){for(var k=0;
k<adsk.education.EducationalDownload.instances.length;
k++){if((g<0&&l==null)||l==false){var h=adsk.education.EducationalDownload.instances[k];
h.stepOne.addClass("part-logged-in")
}else{var h=adsk.education.EducationalDownload.instances[k];
h.myAccountButton.attr("href","/services/adsk/c/oxygen/tool.do/edit?returnUrl="+window.location.href);
h.stepOne.removeClass("part-logged-in");
h.stepOne.addClass("logged-in");
h.setStepOneComplete(true)
}}}if($("a.sign-in-link").length>0||$("a.register-link").length>0){if((g>0&&l==null)||l==true){$(".flag-oxygen-sign-in").hide();
var n=$(".flag-oxygen-sign-out");
n.find("h3 span").text(j);
n.find(".log-out-btn").click(function(){adsk.oxygen.logout()
});
n.find(".my-acct-btn").attr("href","/services/adsk/c/oxygen/tool.do/edit?returnUrl="+window.location.href);
n.show()
}}var m=$("a.signin-topnav");
if(m.length>0){adsk.oxygen.topNavText=m.text();
m.html(j+'<span class="icon adsk-site-control-dArrow"></span>');
var o=$("a#adsk-signout-control");
o.parent().show();
o.click(function(){adsk.oxygen.logout()
});
$(".topnav-oxygen-sign-in").hide();
$(".topnav-oxygen-sign-out").show();
$(".adsk-myaccount-link a").attr("href","/services/adsk/c/oxygen/tool.do/edit?returnUrl="+window.location.href);
$(".adsk-myaccount-link").show()
}if(typeof digitalData!=="undefined"){digitalData.user=digitalData.user||{};
digitalData.user.loginStatus="Logged In";
digitalData.user.authSystem="Oxygen";
digitalData.user.OxygenGUID=g;
m.attr("data-wat-val","sign in id")
}};
var b=function(){jQuery.ajax({url:"/services/adsk/c/oxygen/tooledu.do/profile?ts="+new Date().valueOf(),dataType:"json",success:function(g){if(g&&g.fullname!=null){adsk.oxygen.setUser(g)
}else{adsk.oxygen.checkImmediateUser()
}}})
};
return f
}();
window.adsk=window.adsk||{};
adsk.general=function(){var a=adsk.general||{};
a.ListFilter=function(k){var c={categorySeparator:"|",categoryDataElement:"category",currentFilterClass:"current",onBuildFilter:undefined,onHideItem:undefined,onShowItem:undefined,onSortFilters:undefined,onFilter:undefined,showAllLabel:"all",stripSortKeys:new RegExp("^\\d+\\#")};
k=$.extend(c,k);
this.SHOW_EVERYTHING="all";
this.globalCategories={};
this.globalCategories[this.SHOW_EVERYTHING]={name:k.showAllLabel,displayName:k.showAllLabel.replace(k.stripSortKeys,""),items:$()};
this.currentCategory;
this.verifyFunction=function(i){return(i&&typeof(i)==="function")
};
var e=this;
k.items.each(function(n){var l=$(this).children("."+k.categoryDataElement).children("li");
var m=[];
l.each(function(){m.push($(this).text())
});
for(d=0;
d<m.length;
d++){var i=m[d].toLowerCase().replace(/ /g,"-");
if(e.globalCategories[i]===undefined){e.globalCategories[i]={name:m[d],displayName:m[d].replace(k.stripSortKeys,""),items:$()}
}e.globalCategories[i].items=e.globalCategories[i].items.add($(this))
}e.globalCategories[e.SHOW_EVERYTHING].items=e.globalCategories[e.SHOW_EVERYTHING].items.add($(this))
});
if(this.verifyFunction(k.onSortFilters)){this.globalCategories=k.onSortFilters.call(this,e.globalCategories)
}else{var g=[];
for(var b in this.globalCategories){this.globalCategories[b].slug=b;
g.push(this.globalCategories[b])
}g=g.sort(function(l,i){return l.name>i.name
});
var f={};
for(var d in g){f[g[d].slug]=g[d]
}this.globalCategories=f
}var j="";
if(this.verifyFunction(k.onBuildFilter)){var j=k.onBuildFilter.call(this,this.globalCategories)
}else{for(category in this.globalCategories){var h=this.globalCategories[category];
if(h.name!==""){j+='<li><a href="#" data-'+k.categoryDataElement+'="'+category+'" >'+h.displayName+"<span>"+h.items.length+"</span></a></li>"
}}}k.control.append(j);
k.control.on("click","a",function(l){if(l.target!==this){$(l.target).closest("a").trigger("click");
return false
}if(e.currentCategory){e.currentCategory.removeClass(k.currentFilterClass)
}$(this).addClass(k.currentFilterClass);
e.currentCategory=$(this);
var i=$(l.target).data(k.categoryDataElement);
if(e.verifyFunction(k.onHideItem)){e.globalCategories[e.SHOW_EVERYTHING].items.each(function(m){k.onHideItem.call($(this),m,i)
})
}else{e.globalCategories[e.SHOW_EVERYTHING].items.hide()
}if(e.verifyFunction(k.onShowItem)){e.globalCategories[i].items.each(function(m){k.onShowItem.call($(this),m,i)
})
}else{e.globalCategories[i].items.show()
}if(e.verifyFunction(k.onFilter)){k.onFilter.call($(this),e.globalCategories[i])
}l.preventDefault()
});
k.control.find("a").first().click()
};
return a
}();
window.adsk=window.adsk||{};
adsk.purchase=function(){var a=adsk.purchase||{};
a.PurchaseOptions=function(b){$("input[type=radio][name="+b+"]")[0].checked=true;
$("[type=radio][name="+b+"]:checked").each(function(){a.processValue($(this).val(),b)
});
$("input[type=radio][name="+b+"]").each(function(){$(this).bind("click",a.enablePathToPurchase)
})
};
a.enablePathToPurchase=function(){a.processValue($(this).val(),$(this).attr("name"))
};
a.processValue=function(b,d){var c=b.split("|@@|");
if(c[0]){$("#buy-"+d).attr("href",c[0]);
$("#buy-"+d).removeClass("adsk-cta btn-brand s5 phm adsk-inactive");
$("#buy-"+d).addClass("adsk-cta btn-brand s5 phm")
}else{$("#buy-"+d).attr("href","#");
$("#buy-"+d).removeClass("adsk-cta btn-brand s5 phm");
$("#buy-"+d).addClass("adsk-cta btn-brand s5 phm adsk-inactive")
}if(c[1]){$("#reseller-"+d).attr("href",c[1]);
$("#reseller-"+d).removeClass("adsk-cta btn-brand s5 phm adsk-inactive");
$("#reseller-"+d).addClass("adsk-cta btn-brand s5 phm")
}else{$("#reseller-"+d).attr("href","#");
$("#reseller-"+d).removeClass("adsk-cta btn-brand s5 phm");
$("#reseller-"+d).addClass("adsk-cta btn-brand s5 phm adsk-inactive")
}if(c[2]){$("#buy-"+d).attr("data-wat-buy-online",c[2]);
$("#reseller-"+d).attr("data-wat-buy-reseller",c[2])
}};
return a
}();
window.adsk=window.adsk||{};
adsk.siteSelector=function(){var a=adsk.siteSelector||{};
a.SiteSelector=function(k,e,h,c,g,f){this.countries=k.countries;
this.sites=e.sites;
this.countryFromCookie=h;
this.adskLocale=c;
this.geoCountriesJson=g;
var j=null;
if(f.toUpperCase()==="US"){if(h!=null&&h!==""&&h!=="undefined"){for(var d=0;
d<g.countries.length;
d++){if(h.toUpperCase()===g.countries[d].country.toUpperCase()){geoFlag=true;
break
}}if(geoFlag){j=h.toLowerCase()
}else{j=f.toLowerCase()
}}}else{j=f.toLowerCase()
}var b="";
for(var d=0;
d<this.countries.length;
d++){if(this.countries[d].countryCode===j){b+="<option value='"+this.countries[d].countryCode+"' selected>"+this.countries[d].label+"</option>"
}else{b+="<option value='"+this.countries[d].countryCode+"'>"+this.countries[d].label+"</option>"
}}$("#adsk-site-selector").html($(b).sort(function(l,i){return l.text===i.text?0:l.text<i.text?-1:1
}));
if(j!=null&&j!==""){a.showWebsites(this.sites,j,this.adskLocale)
}$("#adsk-site-selector").bind("change",{sitesData:this},a.countryChanged);
$("#adsk-site-selector-submit-btn").bind("click",a.submitDestinationUrl)
};
a.changeSiteUrl=function(){var c=$(this).val();
var b=c.split("|@@|");
if(b[0]){$("#adsk-site-selector-submit-btn").attr("href",b[0])
}if(b[1]){$("#adsk-site-selector-submit-btn").html(b[1])
}if(b[2]){$("#adsk-site-selector-selected-site").val(b[2])
}};
a.countryChanged=function(b){if(b.data&&b.data.sitesData){a.showWebsites(b.data.sitesData.sites,$("#adsk-site-selector option:selected").val(),b.data.sitesData.adskLocale)
}};
a.submitDestinationUrl=function(e){var c=$(this).attr("href");
e.preventDefault();
var b=pbl.cookie.getClientCookie("userlocation");
var f=$("#adsk-site-selector option:selected").val();
var d=$("#adsk-site-selector-selected-site").val();
if(f!=null&&f!==""){f=f.toUpperCase()
}pbl.cookie.setClientCookie("userlocation",f,365);
$(location).attr("href",c)
};
a.showWebsites=function(l,h,g){var k="";
var b="";
var n="";
var e="|@@|";
var m="";
for(var f=0;
f<l.length;
f++){if(l[f].countryCode==h){var l=l[f].sites;
k="<ul class='adsk-noBullet'>";
for(var d=0;
d<l.length;
d++){k=k+"<li class='mbm grid'>";
var c="adsk-site-selector-radio-btn"+d;
if(l[d].name==g){k=k+"<input name='setLang' value='"+l[d].destination+e+l[d].submitBtnLabel+e+l[d].name+"' id='"+c+"' class='col mrm' checked='checked' type='radio'>";
b=l[d].destination;
n=l[d].submitBtnLabel;
m=l[d].name
}else{if(l[d].name=="en_us"){k=k+"<input name='setLang' value='"+l[d].destination+e+l[d].submitBtnLabel+e+l[d].name+"' id='"+c+"' class='col mrm' checked='checked' type='radio'>";
b=l[d].destination;
n=l[d].submitBtnLabel;
m=l[d].name
}else{k=k+"<input name='setLang' value='"+l[d].destination+e+l[d].submitBtnLabel+e+l[d].name+"' id='"+c+"' class='col mrm' type='radio'>"
}}k=k+"<p class='col ltGrey size74of98'>";
k=k+"<label for='"+c+"' class='s4-b mdGrey'>"+l[d].label+"</label><br>";
if(d==0){k=k+"The most comprehensive worldwide information, in English, with specific purchasing information for your country."
}else{if(d>0&&l[d].label.indexOf("English")>-1){k=k+"Country-specific product information, offers and pricing â in your language (may not be as comprehensive as the worldwide site)."
}else{k=k+l[d].description
}}k=k+"</p></li>"
}k=k+"</ul>";
break
}}$("#adsk-country-sites").html("");
$("#adsk-country-sites").html(k);
if(b!==""){$("#adsk-site-selector-submit-btn").attr("href",b)
}if(n!==""){$("#adsk-site-selector-submit-btn").html(n)
}if(m!==""){$("#adsk-site-selector-selected-site").val(m)
}$("input[type=radio][name=setLang]").each(function(){$(this).live("click",a.changeSiteUrl)
})
};
return a
}();
var adsk=adsk||{};
adsk.tagCloud=(function(a){function b(d){var c;
var e;
if(CQ_Analytics&&CQ_Analytics.TagCloudMgr){for(c=0;
c<d.length;
c++){e=CQ_Analytics.TagCloudMgr.getProperty(d[c]);
CQ_Analytics.TagCloudMgr.setProperty(d[c],e+1)
}}}a.updateTagsForMetaKeywords=function(){var c=$("meta[name=keywords]").attr("content");
if(c){b(c.split(/,\s/))
}};
a.updateTagsForAsset=function(d){var c="/services/adsk/c/asset-tag-service?path="+d;
if(CQ_Analytics&&CQ_Analytics.TagCloudMgr){$.getJSON(c).done(function(g){var f=g["cq:tags"];
var e;
var h;
for(e=0;
e<f.length;
e++){h=CQ_Analytics.TagCloudMgr.getProperty(f[e]);
CQ_Analytics.TagCloudMgr.setProperty(f[e],h+1)
}})
}};
return a
}(adsk.tagCloud||{}));
$(function(){adsk.tagCloud.updateTagsForMetaKeywords();
$('a[href^="/content/dam/"]').filter('a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"]').on("click",function(){adsk.tagCloud.updateTagsForAsset(this.pathname)
})
});