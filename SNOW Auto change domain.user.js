// ==UserScript==
// @name         SNOW Auto change domain
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  With the implementation of domains within SNOW, this aims to automatically change it.
// @updateURL    https://github.com/techslogi/SNOWAutoChangeDomain/raw/master/SNOW%20Auto%20change%20domain.user.js
// @downloadURL	 https://github.com/techslogi/SNOWAutoChangeDomain/raw/master/SNOW%20Auto%20change%20domain.user.js
// @author       Gabriel Vicente & Luan Purceno
// @grant        GM_notification
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @match        *://itsmgbpeu.service-now.com/*
// @run-at       document-idle
// ==/UserScript==

(function() {

    var currentURL = location.href.toString();
    if(currentURL.includes("incident.do") && !currentURL.includes("nav_to.do")){
        try{
            var userDomain;
            var currentDomain;
            var domainPicker;

            if(document.getElementById("incident.sys_domain_label")){
                userDomain = document.getElementById("incident.sys_domain_label").value;
            }

            if(window.top.document.getElementById("domain_picker_select_header")){
                domainPicker = window.top.document.getElementById("domain_picker_select_header");
                currentDomain = domainPicker.value;
            }

            if((userDomain == "ITSM/TOP/GBP/iGBP/Volvo") && (currentDomain == "string:8eff173ddb422300b4c2fd651d961914")){
                GM_notification ( {title: 'Domain modified.', text: 'User is internal but domain was external. Updating.', image: 'https://itsmgbpeu.service-now.com/favicon.ico?v=4'} );
                $(domainPicker, window.parent.document).val("string:93945d24134362006f37b6d96144b076");
                window.parent.angular.element('#domain_picker_select_header').triggerHandler('change');
            }

            if((userDomain == "ITSM/TOP/GBP/iGBP/Volvo/Volvo DBS") && (currentDomain == "string:93945d24134362006f37b6d96144b076")){
                GM_notification ( {title: 'Domain modified.', text: 'User is external but domain was internal. Updating.', image: 'https://itsmgbpeu.service-now.com/favicon.ico?v=4'} );
                $(domainPicker, window.parent.document).val("string:8eff173ddb422300b4c2fd651d961914");
                window.parent.angular.element('#domain_picker_select_header').triggerHandler('change');
            }
        }catch(e){
            alert("error: " + e.message);
        }
    }

})();

