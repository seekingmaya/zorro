var siteColors,
    initOnCPress = 0,
    resetColors,
    resetColorsPartially,
    changeColors,
    changeColorsMobile,
	setColorsMain;
	
	var $taxi = $('#taxi'),
    $box = $('.box'),
    $currentRGB = $('#current-rgb'),
    initOnSpacebar = 1,
    changeTaxi,
    browserIsSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
	transitionEnd = browserIsSafari ? 'webkitTransitionEnd' : 'transitionend',
	spaceBar = false,
	spaceBarHitOneTime = false;
	

	siteColors = {
		animeSpeed : 1
	}

	setTimeout(function(){
		//$('.taxi-logo-text').fadeIn();
		$('.content-text-taxi').animate({'opacity':1});
	}, 300);


$(function(){

  function getHEX(color){
      
      var color = color;
      
          if(/^#/.test(color)){
            
            return color.toUpperCase();
            
          }else{
            
            color = color.replace(/rgb|\(|\)|\s/g,'').match(/^(\d+)\,(\d+)\,(\d+)\,?(\d{0,}\.?\d{0,})$/);
            
            return (((1 << 24) + (parseInt(color[1]) << 16) + (parseInt(color[2]) << 8) + parseInt(color[3])).toString(16).slice(1)).toUpperCase();
          
            }
       
      return false;
      
    }

  function decimalToHex(decimal){

    var hex = decimal.toString(16);
        
        if(hex.length == 1) hex = '0' + hex;
        
        return hex;

      }

  function hexToDecimal(hex){return parseInt(hex,16);}
   
  function returnOpposite(colour){
      
    return decimalToHex(255 - hexToDecimal(colour.substr(0,2))) + decimalToHex(255 - hexToDecimal(colour.substr(2,2))) + decimalToHex(255 - hexToDecimal(colour.substr(4,2)));
      
      }

  function revertColor(rgb){

    var color = returnOpposite(getHEX(rgb));
        return 'rgb(' + (parseInt(color.charAt(0)+''+color.charAt(1),16)+','+parseInt(color.charAt(2)+''+color.charAt(3),16)+','+parseInt(color.charAt(4)+''+color.charAt(5),16)) + ')';

      }

  function invertColor(color) {

    return "#" + ("000000" + (0xFFFFFF ^ parseInt(color.substring(1), 16)).toString(16)).slice(-6);                  

    }

  resetColors = function(){

    var rgb = colorsArray[clicks].last,
        revertedRGB = revertColor(rgb);

        $taxi.css('background-color',revertedRGB);

    }

  changeColors = function(arg){

	var rgb = colorsArray[clicks].last;

	var revertedRGB = revertColor(rgb);

    $taxi.css('background-color',revertedRGB);

    }

  resetColorsPartially = function(){

    var rgb = colorsArray[clicks].first;

        $taxi.css('background-color',rgb);

    }

  changeColorsMobile = function(){

    var rgb = colorsArray[clicks].last,
        revertedRGB = revertColor(rgb);
        
        $taxi.css('background-color',revertedRGB);
 

    }

  
  function setTransitions(bool){

      var addRemoveValue = bool ? 'background-color 1s, color 1s, fill 1s' : 'none';

          $taxi.css('transition',addRemoveValue);

    }

function initiallyZero_(angle){

    for(var i = 0, item; i < initiallyZero.length; i++){

      item = initiallyZero[i];

      item.setAttribute('x1',angle+'%');
      
      item.setAttribute('y2',angle+'%');

      }

  }

function zeroToHundred_(angle){

    for(var i = 0, item, itemID, newAngle; i < zeroToHundred.length; i++){

      item = zeroToHundred[i];
      itemID = item.id;

      newAngle = (itemID == '_115104856' || itemID == '_171897696' || itemID == '_114765880' || itemID == '_114668240' || itemID == '_115104304' || itemID == '_172160248' || itemID == '_114669200' || itemID == '_114764824' || itemID == '_114664352') && angle <= 15 ? '15%' : ((itemID == '_114666320' || itemID == '_114815040') && angle <= 35 ? '35%' : ((itemID == '_115105144') && angle <= 30) ? '30%' : ((itemID == '_115082856') && angle <= 25) ? '25%' : ((itemID == '_115090776' || itemID == '_114760152' || itemID == '_115083432') && angle <= 60) ? '60%' : ((itemID == '_114844264') && angle <= 120) ? '120%' : angle+'%');

      item.setAttribute('x1',newAngle);
           
      item.setAttribute('y2',((itemID == '_114814440' || itemID == '_114669200' || itemID == '_114764824') && angle <= 10) ? '10%' : ((itemID == '_114664352') && angle <= 25) ? '25%' : ((itemID == '_115090776' || itemID == '_115083432') && angle <= 20) ? '20%' : ((itemID == '_114760152') && angle <= 50) ? '50%' : ((itemID == '_115105144') && angle <= 30) ? '30%' : ((itemID == '_114844264') && angle <= 100) ? '100%' : angle+'%');

      }

  }

function unordered_(angle){

  for(var i = 0, item, itemID; i < unordered.length; i++){

    item = unordered[i];
    itemID = item.id;

    item.setAttribute('x1',-angle/1.5+'%');
    
    item.setAttribute('y2',angle*1.65+'%');

    }

  } 

function initMousemove(e){

  var angle = parseInt((e.pageX/windowWidth)*180);
      y = parseInt((e.pageY/windowHeight)*100),
      clicksDefined = colorsArray[clicks];

      initiallyZero_(angle);   
      zeroToHundred_(angle);
      unordered_(angle);

  }

function initMousemoveMobile(event){

  var e = event,
      portrait = windowWidth > windowHeight,
      x = portrait ? e.beta : e.gamma,
      y = parseInt(Math.abs(portrait ? e.gamma : e.beta)),
      clicksDefined = colorsArray[clicks];
      x = Math.abs(x)*2;

  var angle = parseInt(x*2);

      initiallyZero_(angle);   
      zeroToHundred_(angle);
      unordered_(angle);

  }

function addMousemove(){

  isMousedown ? window.addEventListener('mousemove',initMousemove,false) : window.addEventListener('deviceorientation',initMousemoveMobile,false);

  } 

function removeMousemove(){

  isMousedown ? window.removeEventListener('mousemove',initMousemove) : window.removeEventListener('deviceorientation',initMousemoveMobile);

  }

function initColorChanges(changeClicks,dir){

      removeMousemove();

      if(changeClicks){

        typeof dir == 'undefined' ? clicks += 1 : clicks += dir;

        clicks = clicks > maximumChanges ? 0 : (clicks < 0 ? maximumChanges : clicks);

        }

  var clicksDefined = colorsArray[clicks],
      revertedColor = initOnCPress ? revertColor(clicksDefined.last) : clicksDefined.first;

      for(var i = 0, item, firstToLast, stops; i < linearGradients.length; i++){

        item = linearGradients[i];

        firstToLast = /first-to-last$/i.test(item.getAttribute('class'));

        stops = item.getElementsByTagName('stop');

        stops[firstToLast ? 1 : 0].setAttribute('stop-color',revertedColor);
        stops[firstToLast ? 0 : 1].setAttribute('stop-color',clicksDefined.last)

        }

      var transitionTriggered = 0;

      linearGradients[0].addEventListener(transitionEnd,function(){

        addMousemove();

        transitionTriggered = 1;

        },false);

      setTimeout(function(){

        if(!transitionTriggered) addMousemove();

        },siteColors.animeSpeed*1100);

  }

  changeTaxi = function($el,dir){
  
    if($el.id == 'taxi'){

      setTransitions(true);

      initColorChanges(1,dir);    


      }

    }

  var $win = $(window),
      $siteColors = siteColors,
      $elements_ = $('.box'),
      $taxi = $('#taxi'),
      initialColorsArray = [],
      colorsArray = [

                    {'last':'rgb(255,255,255)'},

                    {'last':'rgb(255,0,255)'},

                    {'last':'rgb(58,215,255)'},

                    {'last':'rgb(255,0,137)'},
                    
                    {'last':'rgb(255,255,0)'},
                    
                    {'last':'rgb(232,1,12)'},
                        
                    {'last':'rgb(255,154,50)'},
                    
                    {'last':'rgb(2,550,0)'}

                    ],
      windowWidth = $win.width(),
      windowHeight = $win.height(),
      linearGradients = document.getElementsByTagName('linearGradient'),
      initiallyZero = document.getElementsByClassName('initially-zero'),
      zeroToHundred = document.getElementsByClassName('zero-to-hundred'),
      unordered = document.getElementsByClassName('unordered'),
      clicks = 0,
      maximumChanges = colorsArray.length - 1,
      orientationPortrait_ = windowWidth <= windowHeight,
      isWindowsTouch,
      isTouch,
      edown = 'mousedown',
      emove = 'mousemove',
      eup = 'mouseup'; 

      (function(elm,elm2){

        isWindowsTouch = (function(elm){ return elm.PointerEvent || elm.navigator.msPointerEnabled; })(elm);
        isTouch = (function(elm){ return 'createTouch' in elm.document && "ontouchstart" in elm; })(elm);

          if(isWindowsTouch){

            if(elm.PointerEvent) {
              
              edown = 'pointerdown';
              emove = 'pointermove';
              eup = 'pointerup';
              
              }else{

                edown = 'MSPointerDown';
                  emove = 'MSPointerMove';
                  eup = 'MSPointerUp';
              
                }

            }else if(isTouch){

              edown = 'touchstart';
              emove = 'touchmove';
              eup = 'touchend';

            }

		})(window,document);
		
		function assignFirstColor() {
			for(var v = 0, colorsArrayItem; v < colorsArray.length; v++){

				colorsArrayItem = colorsArray[v];
			
				 if(spaceBar) {
					colorsArrayItem.first = revertColor(colorsArrayItem.last);
				}
				else {
					colorsArrayItem.first = 'rgb(0,0,0)';
				}
			
			}
		}
		assignFirstColor();

  

  $box.mousedown(function(e){

	changeTaxi(this);
	if(spaceBar == true) {
		changeColors();
	}
    
    });

  var isMousedown = 0;

  if(edown == 'mousedown' || edown == 'pointerdown' || edown == 'MSPointerDown'){

    isMousedown = 1;

    window.addEventListener('mousemove',initMousemove,false);

    }

  window.addEventListener('deviceorientation',initMousemoveMobile,false);

  $win.keydown(function(e){

    var key = e.keyCode;

        if(key == 32){
			
			if(!spaceBarHitOneTime) {
				changeColors();
				spaceBar = true;
				spaceBarHitOneTime = true;
				assignFirstColor();

				var clicksDefined = colorsArray[clicks],
				revertedColor = revertColor(clicksDefined.last);

				for(var i = 0, item, firstToLast, stops; i < linearGradients.length; i++){

					item = linearGradients[i];

					firstToLast = /first-to-last$/i.test(item.getAttribute('class'));

					stops = item.getElementsByTagName('stop');

					stops[firstToLast ? 1 : 0].setAttribute('stop-color',revertedColor);
					stops[firstToLast ? 0 : 1].setAttribute('stop-color',clicksDefined.last)

        		}
			}
			else {
				spaceBarHitOneTime = false;
				spaceBar = false;
				assignFirstColor();
				$taxi.css('background-color',"rgb(0,0,0)");
				var clicksDefined = colorsArray[clicks];

				for(var i = 0, item, firstToLast, stops; i < linearGradients.length; i++){

					item = linearGradients[i];

					firstToLast = /first-to-last$/i.test(item.getAttribute('class'));

					stops = item.getElementsByTagName('stop');

					stops[firstToLast ? 1 : 0].setAttribute('stop-color','rgb(0,0,0)');
					stops[firstToLast ? 0 : 1].setAttribute('stop-color',clicksDefined.last)

        		}
			}
			
		}
	});

});

