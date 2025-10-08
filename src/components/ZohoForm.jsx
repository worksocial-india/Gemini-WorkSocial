import React, { useEffect } from 'react';

const ZohoForm = () => {
  useEffect(() => {
    // Add the CSS styles
    const style = document.createElement('style');
    style.textContent = `
      .zf_lB_Dimmer_390340{ 
          position: fixed;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          background: rgb(0, 0, 0);
          opacity: 0.8;
          z-index: 10000000;
      }

      .zf_lB_Container_390340{
        position: fixed;
        background-color: white;
        margin: 0;
        margin-right: 0px;
        padding: 0;
        height: auto;
        min-height: 400px;
        max-height: 90vh;
        width: 90vw;
        max-width: 800px;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        border: 7px solid #2F78D0;
        border-radius: 12px;
        z-index: 999999;
        transition: all 0.3s ease;
        outline: none;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      }

      .zf_form_p{
        margin-bottom: 10px;
      }

      .zf_lB_Wrapper_390340{
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: 0;
        margin-top: 0;
        transform: translate(-50%, -50%);
        z-index: 10000001;
        width: auto;
        height: auto;
      }

      .zf_main_id_390340{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: inherit;
      }

      .zf_lb_closeform_390340 {
          position: absolute;
          right: -15px;
          background: #2f2e2e;
          padding: 0;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          top: -15px;
          cursor: pointer;
          border: 2px solid #d9d9d9;
          transition: all 0.2s ease;
          z-index: 1000;
      }
      .zf_lb_closeform_390340:hover {
          background: #1a1a1a;
          transform: scale(1.1);
      }
      .zf_lb_closeform_390340:before, .zf_lb_closeform_390340:after {
          position: absolute;
          left: 13px;
          content: ' ';
          height: 16px;
          width: 2px;
          top: 6px;
          background-color: #f7f7f7;
      }

      .zf_lb_closeform_390340:before {
        transform: rotate(45deg);
      }
      .zf_lb_closeform_390340:after {
        transform: rotate(-45deg);
      } 

      .fadeIn {
        -webkit-animation-name: fadeIn;
        animation-name: fadeIn;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        display: block !important;
      }
      @-webkit-keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
      }
      @keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
      } 

      @media screen and (max-width: 480px) {  
         .zf_lB_Container_390340 {
          width: 95vw !important;
          max-width: none !important;
          height: auto !important;
          min-height: 350px !important;
          max-height: 85vh !important;
          border-width: 4px !important;
          margin: 0 !important;
        } 
        .zf_lB_Wrapper_390340{
          margin-top: 0 !important;
        }
      }

      @media screen and (min-width: 481px) and (max-width: 768px) {  
         .zf_lB_Container_390340 {
          width: 85vw !important;
          max-width: 600px !important;
          height: auto !important;
          min-height: 400px !important;
          max-height: 80vh !important;
        } 
        .zf_lB_Wrapper_390340{
          margin-top: -100px !important;
        }
      }

      @media screen and (min-width: 769px) and (max-width: 1024px) {  
         .zf_lB_Container_390340 {
          width: 75vw !important;
          max-width: 700px !important;
          height: auto !important;
          min-height: 450px !important;
          max-height: 85vh !important;
        } 
      }

      @media screen and (min-width: 1025px) {  
         .zf_lB_Container_390340 {
          width: 60vw !important;
          max-width: 800px !important;
          height: auto !important;
          min-height: 500px !important;
          max-height: 90vh !important;
        } 
      }
    `;
    document.head.appendChild(style);

    // Initialize the form script
    const initZohoForm = () => {
      try {
        if (document.readyState === "complete") { 
          onloadActions_390340();
        } else {
          window.addEventListener('load', function (){
            onloadActions_390340();
          }, false);
        }

        function onloadActions_390340(){
          constructDiv_390340();
        }

        function constructDiv_390340(){
          // Check if form already exists
          if (document.getElementById('formsLightBox_390340')) {
            return;
          }

          var iframeDiv = document.createElement("div");
          iframeDiv.setAttribute('id','e3gJZqZ66wGw1tzNbgvwiH3C5vv6r9noYo9aVXgZjD0_390340');
          iframeDiv.setAttribute('class','zf_main_id_390340');

          var closeFormDiv = document.createElement("div");
          closeFormDiv.setAttribute('id','deleteform_390340');
          closeFormDiv.setAttribute('class','zf_lb_closeform_390340');
          closeFormDiv.setAttribute('tabindex', 0);

          var containerDiv = document.createElement("div");
          containerDiv.setAttribute('id','containerDiv_390340');
          containerDiv.setAttribute('class','zf_lB_Container_390340 fadeIn');
          containerDiv.appendChild(iframeDiv);
          containerDiv.appendChild(closeFormDiv);
          
          var wrapperDiv = document.createElement("div");
          wrapperDiv.setAttribute('class','zf_lB_Wrapper_390340');
          wrapperDiv.appendChild(containerDiv);

          var dimmerDiv = document.createElement("div");
          dimmerDiv.setAttribute('class','zf_lB_Dimmer_390340');
          dimmerDiv.setAttribute('elname','popup_box');

          var mainDiv = document.createElement("div");
          mainDiv.setAttribute('id','formsLightBox_390340');
          mainDiv.style.display = "none";
          mainDiv.appendChild(wrapperDiv);
          mainDiv.appendChild(dimmerDiv);

          document.body.appendChild(mainDiv);
        }

        window.showZForm_390340 = function(){
          var iframe = document.getElementById("e3gJZqZ66wGw1tzNbgvwiH3C5vv6r9noYo9aVXgZjD0_390340")?.getElementsByTagName("iframe")[0];
          if(iframe == undefined || iframe.length == 0){
            loadZForm_390340();
          } 
          document.getElementById("formsLightBox_390340").style.display = "block"; 
          document.body.style.overflow = "hidden";
          setTimeout(function() {
              var containerDiv = document.getElementById("containerDiv_390340");
              containerDiv.setAttribute('tabindex', '-1');
              containerDiv.focus();
          }, 100);
        }

        window.deleteZForm_390340 = function() {
          var divCont = document.getElementById("formsLightBox_390340");
          if (divCont) {
            divCont.style.display="none";
            document.body.style.overflow = "";

            var iframe = document.getElementById("e3gJZqZ66wGw1tzNbgvwiH3C5vv6r9noYo9aVXgZjD0_390340")?.getElementsByTagName("iframe")[0];
            if (iframe) {
              iframe.remove();
            }
          }
        }

        function loadZForm_390340() {
          var iframe = document.getElementById("e3gJZqZ66wGw1tzNbgvwiH3C5vv6r9noYo9aVXgZjD0_390340")?.getElementsByTagName("iframe")[0];
          if(iframe == undefined || iframe.length == 0){
            var f = document.createElement("iframe");
            f.src = getsrcurlZForm_390340('https://forms.worksocial.in/WorkSocialIndia/form/SubscriberForm/formperma/e3gJZqZ66wGw1tzNbgvwiH3C5vv6r9noYo9aVXgZjD0?zf_rszfm=1&referrername=ref-');
            
            f.style.border="none";
            f.style.minWidth="100%";
            f.style.overflow="hidden";
            var d = document.getElementById("e3gJZqZ66wGw1tzNbgvwiH3C5vv6r9noYo9aVXgZjD0_390340");
            d.appendChild(f);

            var deleteForm = document.getElementById("deleteform_390340");
            deleteForm.onclick = window.deleteZForm_390340;
            deleteForm.addEventListener("keydown", function (event) {
              if (event.key === "Enter" || event.keyCode === 13 || event.key === " " || event.keyCode === 32) {
                event.preventDefault();
                window.deleteZForm_390340();
              }
            });

            window.addEventListener('message', function (event){
              var evntData = event.data;
              if( evntData && evntData.constructor == String ){
                var zf_ifrm_data = evntData.split("|");
                if ( zf_ifrm_data.length == 2 || zf_ifrm_data.length == 3 ) {
                  var zf_perma = zf_ifrm_data[0];
                  var zf_ifrm_ht_nw = ( parseInt(zf_ifrm_data[1], 10) + 15 ) + "px";
                  var iframe = document.getElementById("e3gJZqZ66wGw1tzNbgvwiH3C5vv6r9noYo9aVXgZjD0_390340")?.getElementsByTagName("iframe")[0];
                  if ( iframe && (iframe.src).indexOf('formperma') > 0 && (iframe.src).indexOf(zf_perma) > 0 ) {
                    var prevIframeHeight = iframe.style.height;

                    var zf_tout = false;
                    if( zf_ifrm_data.length == 3 ) {
                        iframe.scrollIntoView();
                        zf_tout = true;
                    }

                    if ( prevIframeHeight != zf_ifrm_ht_nw ) {
                      if( zf_tout ) {
                        setTimeout(function(){
                            iframe.style.minHeight = zf_ifrm_ht_nw;
                          var containerDiv = document.getElementById("containerDiv_390340");
                          containerDiv.style.height=zf_ifrm_ht_nw;
                            },500);
                      } else {
                          iframe.style.minHeight = zf_ifrm_ht_nw;
                        var containerDiv = document.getElementById("containerDiv_390340");
                        containerDiv.style.height=zf_ifrm_ht_nw;
                      }
                    }
                  }
                }
              }
            }, false);
          }
        }

        function getsrcurlZForm_390340(zf_src) {
          try {
            if ( typeof window.ZFAdvLead !== "undefined" && typeof window.zfutm_zfAdvLead !== "undefined" ) {
              for( var prmIdx = 0 ; prmIdx < window.ZFAdvLead.utmPNameArr.length ; prmIdx ++ ) {
                      var utmPm = window.ZFAdvLead.utmPNameArr[ prmIdx ];
                      var utmVal = window.zfutm_zfAdvLead.zfautm_gC_enc( window.ZFAdvLead.utmPNameArr[ prmIdx ] );
                    if ( typeof utmVal !== "undefined" ) {
                      if ( utmVal != "" ){
                        if(zf_src.indexOf('?') > 0){
                          zf_src = zf_src+'&'+utmPm+'='+utmVal;
                        }else{
                          zf_src = zf_src+'?'+utmPm+'='+utmVal;
                        }
                      }
                    }
                    }
            }

            if ( typeof window.ZFLead !== "undefined" && typeof window.zfutm_zfLead !== "undefined" ) {
              for( var prmIdx = 0 ; prmIdx < window.ZFLead.utmPNameArr.length ; prmIdx ++ ) {
                      var utmPm = window.ZFLead.utmPNameArr[ prmIdx ];
                      var utmVal = window.zfutm_zfLead.zfutm_gC_enc( window.ZFLead.utmPNameArr[ prmIdx ] );
                    if ( typeof utmVal !== "undefined" ) {
                      if ( utmVal != "" ){
                        if(zf_src.indexOf('?') > 0){
                          zf_src = zf_src+'&'+utmPm+'='+utmVal;
                        }else{
                          zf_src = zf_src+'?'+utmPm+'='+utmVal;
                        }
                      }
                    }
                    }
            }
          }catch(e){}
          return zf_src;
        }

        // Show form after 10 seconds - DISABLED
        // setTimeout(function (){
        //   if (window.showZForm_390340) {
        //     window.showZForm_390340();
        //   }
        // }, 10*1000);

      }catch(e){
        console.error('Zoho Form Error:', e);
      }
    };

    initZohoForm();

    // Cleanup function
    return () => {
      // Remove form elements when component unmounts
      const formElement = document.getElementById('formsLightBox_390340');
      if (formElement) {
        formElement.remove();
      }
    };
  }, []);

  return (
    <>
      {/* Hidden button for manual form trigger */}
      <button 
        id="zf_button_390340" 
        style={{ display: 'none' }} 
        onClick={() => window.showZForm_390340?.()}
      >
        Form
      </button>
    </>
  );
};

export default ZohoForm;