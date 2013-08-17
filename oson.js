
          var osonslider = {
            	 interval : "",
            	 intervalac : 0,
            	 trainactive : "none",
            	 trainframe : 50,
            	 trainstartx : 0,
            	 trainstarty : 0,
            	 trainlastx : 0,
            	 trainlasty : 0,
            	 trainposoutx : 100,
            	 trainposouty : 50,
            	 trainround : 0,
            	 traintimeout : 3,
            	 refreszones : {
            	 
            	 },
            	 minimums : {
            	 },
            	 maximums : {
            	 },
                outcomes : {
                },
            }

            osonslidermake("playerstatusbar", 0, 100, "none");
            function osonslidermake(zone, minnum, maxnum, refreshzone){
            	 var outhtml = "";
            	 var zoneid = document.getElementById(zone);
            	 var zonehouse = "osonslidinghouse"+zone;
                var zonerail = "osonslidingrail"+zone;
                var zonetrain = "osonslidingtrain"+zone;
                var heightt = parseInt(zoneid.offsetHeight);
                var widtht = parseInt(zoneid.offsetWidth);
                if ( refreshzone === 'undefined') {
                    refreshzone = 'none';
                }
                osonslider.outcomes[zone] = minnum;
                if (refreshzone !== 'none'){
                    document.getElementById(refreshzone).value = minnum.toString();
                }
                osonslider.refreszones[zone]=refreshzone;
                osonslider.minimums[zone]=minnum;
                osonslider.maximums[zone]=maxnum;
                outhtml = outhtml+"<div class='osonslidinghouse' id='"+zonehouse+"'>";
                outhtml = outhtml+"<div class='osonslidingrail' id='"+zonerail+"'>";
                outhtml = outhtml+"<div class='osonslidingtrain' id='"+zonetrain+"'";
                outhtml = outhtml+" onmousedown='osonslidertrainclick(";
                outhtml = outhtml+'"'+zone+'")';
                outhtml = outhtml+"' onmouseup='osonslidertrainunclick(";
                outhtml = outhtml+'"'+zone+'"'+")'>";
                outhtml = outhtml+"</div></div></div>";
                zoneid.innerHTML = outhtml; 
                document.getElementById(zonehouse).style.height = heightt.toString()+"px";
                document.getElementById(zonehouse).style.width = widtht.toString()+"px";
                document.getElementById(zonerail).style.top = ((heightt-parseInt(document.getElementById(zonerail).offsetHeight))/2).toString()+'px';
                document.getElementById(zonerail).style.width = widtht.toString()+"px";
                document.getElementById(zonetrain).style.top = (-1*(parseInt(document.getElementById(zonetrain).offsetHeight)-parseInt(document.getElementById(zonerail).offsetHeight))/2).toString()+'px';
            }
            
            function osonslidertrainclick (slidertrain) {
                if (osonslider.trainactive !== slidertrain){
               	  osonslidertrainunclick();
                }
                if (osonslider.intervalac === 0) {
                   osonslider.trainactive = slidertrain;
           	   	 osonslider.intervalac = 1;
           	   	 osonslider.trainstartx = osonpointer.p[0].posx;
           	   	 osonslider.trainstarty = osonpointer.p[0].posy;
           	   	 osonslider.trainlastx = osonpointer.p[0].posx;
           	   	 osonslider.trainlasty = osonpointer.p[0].posy;
                   osonslider.interval=setInterval(function(){osonslidertrainmove()}, osonslider.trainframe);
                }     	
            	
            }
            
            function osonsliderminc(zone, minnum) {
                osonslider.minimums[zone]=minnum;	
                osonslidertrainmove();
            }

            function osonslidermaxc(zone, maxnum) {
                osonslider.maximums[zone]=maxnum;	
                osonslidertrainmove();
            }
            function osonsliderlimitc(zone, minnum, maxnum) {
                osonslider.minimums[zone]=minnum;
                osonslider.maximums[zone]=maxnum;	
                osonslidertrainmove();
            }
            
            function osonslidertrainunclick () {
           	    clearInterval(osonslider.interval);
                osonslider.intervalac = 0;
                osonslider.trainstartx = 0;
           	    osonslider.trainstarty = 0;
          	    osonslider.trainlastx = 0;
                osonslider.trainlasty = 0;
           	    osonslider.trainround = 0;
           	    osonslider.trainactive = "none";
            }            
            
            function osonslidertrainmove() {
                if (osonpointer.p[0].posx === osonslider.trainlastx ) {
                    osonslider.trainround++;
                    if (osonslider.trainround > osonslider.trainframe*osonslider.traintimeout){
                        osonslidertrainunclick();	
                    }
               } else {
                   if (osonpointer.p[0].posy > osonslider.trainstarty+osonslider.trainposouty  || osonslider.trainstarty-osonslider.trainposouty > osonmouse.posy){
               		 osonslidertrainunclick();
               	 } else {
               	    var corid = osonslider.trainactive;
                      var corsid = "osonslidinghouse"+osonslider.trainactive;
                      var corsbid = "osonslidingrail"+osonslider.trainactive;
                      var corspbid = "osonslidingtrain"+osonslider.trainactive;
           	          var pos = {
           	                left : parseInt(document.getElementById(corspbid).offsetLeft),
           	                top : parseInt(document.getElementById(corspbid).offsetTop),
           	          }
           	          pos.left = parseInt(pos.left/osonfit.scale);
//           	          writedebug(parseInt(pos.left).toString()+' , '+parseInt(pos.top).toString()+'<br>');
                      if (0 > pos.left+(osonpointer.p[0].posx-osonslider.trainlastx)) {
                          document.getElementById(corspbid).style.left='0px';
                          osonslider.outcomes[osonslider.trainactive] = osonslider.minimums[osonslider.trainactive];
                          if (osonslider.refreszones[osonslider.trainactive] !== 'none'){
                              document.getElementById(osonslider.refreszones[osonslider.trainactive]).value = osonslider.outcomes[osonslider.trainactive].toString();
                          }
                      	  osonslidertrainunclick();
           	          } else if(pos.left+(osonpointer.p[0].posx-osonslider.trainlastx) > parseInt(document.getElementById(corsbid).offsetwidth)-parseInt(document.getElementById(corspbid).offsetWidth)){
          	          	  document.getElementById(corsbid).style.left = (parseInt(document.getElementById(corsbid).outerWidth)-parseInt(document.getElementById(corspbid).offsetWidth)).toString()+'px';
                          osonslider.outcomes[osonslider.trainactive] = osonslider.maximums[osonslider.trainactive];
                          if (osonslider.refreszones[osonslider.trainactive] !== 'none'){
                              document.getElementById(osonslider.refreszones[osonslider.trainactive]).value = osonslider.outcomes[osonslider.trainactive].toString();
                          }
                          osonslidertrainunclick();
           	          } else {
           	              document.getElementById(corspbid).style.left = ( parseInt(document.getElementById(corspbid).offsetLeft)+(osonpointer.p[0].posx-osonslider.trainlastx)).toString()+'px'; 	
                          pos = {
           	                left : parseInt(document.getElementById(corspbid).offsetLeft),
           	                top : parseInt(document.getElementById(corspbid).offsetTop),
           	              }
                          pos.left = parseInt(pos.left/osonfit.scale);
                          osonslider.outcomes[osonslider.trainactive] = parseInt((osonslider.maximums[osonslider.trainactive]-osonslider.minimums[osonslider.trainactive])*((pos.left)/parseInt(document.getElementById(corsbid).offsetWidth)-parseInt(document.getElementById(corspbid).offsetWidth)))+osonslider.minimums[osonslider.trainactive];
                          if (osonslider.refreszones[osonslider.trainactive] !== 'none'){
                              document.getElementById(osonslider.refreszones[osonslider.trainactive]).value = osonslider.outcomes[osonslider.trainactive].toString();
                          }
           	          }
           	          
           	          osonslider.trainlastx = osonpointer.p[0].posx;

               	 }
               }
            }   
            
            function osonslidergetdata(slider){
          	    var corid = document.getElementById(slider);
                var corsid = document.getElementById("osonslidinghouse"+slider);
                var corsbid = document.getElementById("osonslidingrail"+slider);
                var corspbid = document.getElementById("osonslidingtrain"+slider);            	
    	          pos = parseInt(corspbid.style.left);            	
                var outvar = pos/(corsbid.offsetWidth-corspbid.offsetWidth);
                return outvar;
            }

            function osonsliderchangedata(slider, newdata){
          	    var corid = document.getElementById(slider);
                var corsid = document.getElementById("osonslidinghouse"+slider);
                var corsbid = document.getElementById("osonslidingrail"+slider);
                var corspbid = document.getElementById("osonslidingtrain"+slider);            	
   	          if ((parseInt(newdata)>osonslider.minimums[slider]) && (osonslider.maximums[slider]>parseInt(newdata))){
                    corspbid.style.left = (((parseInt(corsbid.offsetWidth)-parseInt(corspbid.offsetWidth))*((parseInt(newdata)-osonslider.minimums[slider])/(osonslider.maximums[slider]-osonslider.minimums[slider]))).toString()+'px');
                    if(osonslider.refreszones[slider] !== 'none'){
                        document.getElementById(osonslider.refreszones[slider]).value = parseInt(newdata).toString();
                    }
                    osonslider.outcomes[slider] = parseInt(newdata);
                } else {
                    if(osonslider.refreszones[slider] !== 'none'){
                        document.getElementById(osonslider.refreszones[slider]).value = osonslider.outcomes[slider].toString();
                    }               
                }
            }



          var osonfit = {
            	 originalw : 1920,
            	 originalh : 1080,
            	 flip : {
            	 	  onoff : 0,
            	     verticalw : 1080,
            	     verticalh : 1920,
            	     verticalhtml : "<div class='desktopvertical'></div>",
            	     horizontalw : 1920,
            	     horizontalh : 1080,
            	     horizontalhtml : "<div class='desktophorizontal'></div>",
            	 },           	 
            	 interval : "",
            	 intervaltime:1000,
            	 marginleft : 0,
            	 margintop : 0,
            	 currentw : 0,
            	 currenth : 0,
            	 aranyw : 0,
            	 aranyh : 0,
            	 oldw : 0,
            	 oldh : 0,
            	 scale : 1,
            	 rescale : 0,
                resizel = document.getElementsByClassName('desktopbigclass')[0],              	
            }  

            document.onkeydown = function(e) {
                var k = e.keyCode;
                if ((k >= 37 && k <= 40) || (k >= 33 && k <= 34)) {
                    return false;
                }
            }
        
            function osonfitflip() {
                if (osonfit.currentw > osonfit.currenth ){
                    osonfit.resizel.innerHTML=osonfit.flip.horizontalhtml;
                    osonfit.originalw = osonfit.flip.horizontalw;
                    osonfit.originalh = osonfit.flip.horizontalh;
                    osonfit.resizel.style.width = osonfit.originalw.toString()+"px";
                    osonfit.resizel.style.height = osonfit.originalh.toString()+"px"; 
                }	else {
                    osonfit.resizel.innerHTML=osonfit.flip.verticalhtml;
                    osonfit.originalw = osonfit.flip.verticalw;
                    osonfit.originalh = osonfit.flip.verticalh;
                    osonfit.resizel.style.width = osonfit.originalw.toString()+"px";
                    osonfit.resizel.style.height = osonfit.originalh.toString()+"px"; 
                }
            }        
        
            function osonfitscale(){
                osonfit.aranyw=osonfit.currentw/osonfit.originalw;
                osonfit.aranyh=osonfit.currenth/osonfit.originalh;
                if(osonfit.aranyw > osonfit.aranyh){
                    if(1>osonfit.aranyh){
                    	   var testmargoa = osonfit.currentw-(osonfit.aranyh*osonfit.originalw);
                    	   var testmargob = (testmargoa-2)/2;
                    	   var testmargotext = testmargob.toString()+"px";
                        var fitscalebale = "scale("+osonfit.aranyh.toString()+")";
                        var testmargoleft = testmargotext;
                        var testmargotop = "0";
                        osonfit.margintop = 0;
                        osonfit.marginleft = testmargob;
                        osonfit.scale = osonfit.aranyh;
                    }
                }else{
                    if(1>osonfit.aranyw){
                    	   var testmargoa = osonfit.currenth-(osonfit.aranyw*osonfit.originalh);
                    	   var testmargob = (testmargoa-2)/2;
                    	   var testmargotext = testmargob.toString()+"px";
                        var fitscalebale = "scale("+osonfit.aranyw.toString()+")";
                        var testmargoleft = "0";
                        var testmargotop = testmargotext;
                        osonfit.margintop = testmargob;
                        osonfit.marginleft = 0;
                        osonfit.scale = osonfit.aranyw;
                    }
                }

                osonfit.resizel.style.webkitTransform=fitscalebale;
                osonfit.resizel.style.webkitTransformOrigin="0 0";
                osonfit.resizel.style.transform=fitscalebale;
                osonfit.resizel.style.transformOrigin="0 0";
                osonfit.resizel.style.marginLeft=testmargoleft;
                osonfit.resizel.style.marginTop=testmargotop;

            }
            
            function osonfitinterval(){
                if (document.body && document.body.offsetWidth) {
                    osonfit.currentw = document.body.offsetWidth;
                    osonfit.currenth = document.body.offsetHeight;
                }
                if (document.compatMode=='CSS1Compat' &&
                    document.documentElement &&
                    document.documentElement.offsetWidth ) {
                    osonfit.currentw = document.documentElement.offsetWidth;
                    osonfit.currenth = document.documentElement.offsetHeight;
                }
                if (window.innerWidth && window.innerHeight) {
                    osonfit.currentw = window.innerWidth;
                    osonfit.currenth = window.innerHeight;
                }
                if (osonfit.flip.onoff == 1) {
                	  osonfitflip();
                
                }
                if(osonfit.currentw !=osonfit.oldw  || osonfit.currenth!=osonfit.oldh){
                    osonfitscale();
                    osonfit.oldw = osonfit.currentw;
                    osonfit.oldh = osonfit.currenth;
                }
               
            }
            
            function osonfitintervalstart(){
			       osonfit.interval = setInterval("osonfitinterval()", osonfit.intervaltime);
            }
            
            osonfitinterval();
            osonfitintervalstart();  
            
                function osonajaxcomcent(comtag) {
                	   
                }
                function osonajaxnetsend(command, fnam) {
                        var xhReq = new XMLHttpRequest();
                        xhReq.open("POST", "/", false);
                        xhReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xhReq.onreadystatechange  = function(){
                            if (xhReq.readyState == 4){
                                var osonajaObj = JSON.parse(xhReq.responseText);                            
                                for (i=0;osonajaObj.length>i;i++) {
                                     osonajaxcomcent(jsonajaObj[i]);
                                }
                            }
                        }
                        xhReq.send(outda);
                }