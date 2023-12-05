

const INCREASE_NUMBER_ANIMATION_SPEED = 50;
function increaseNumberAnimationStep(i, element, endNumber) {
    if (i <= endNumber) {
        if (i === endNumber) {
          element.innerText = i + '+';
        } else {
          element.innerText = i;
        }
        i++;
          
        
     
       
        setTimeout(func, delay)
            func = function(){
                increaseNumberAnimationStep(i, element, endNumber);
            };

            delay = INCREASE_NUMBER_ANIMATION_SPEED;
        }

    //     setTimeout(increaseNumberAnimationStep(i, element, endNumber), delay);
    //     delay = INCREASE_NUMBER_ANIMATION_SPEED;
    // }
  }


  function initIncreaseNumberAnimation() {                       
    element =  document.querySelector('#features__clients-count');
    // element = <div class="features__clients-count"></div>
    increaseNumberAnimationStep(0,element,5000);
  }

  initIncreaseNumberAnimation();