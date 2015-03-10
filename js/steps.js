var step = { current: -1 };

//Add Modernizr test
Modernizr.addTest('isiOS', function(){
    return navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false
});

//usage
if (Modernizr.isiOS) {
    $('#frame00 #start video').css("display", "none");
}

watch(step, "current", function() {
    console.log("Changed step to " + step.current);
    switch(step.current) {
        case 0:
            $( "#frame00 #start" ).on('click touchstart', function () {
                $('#frame00').css("opacity", "0");
                setTimeout( function() {
                    $('#frame00').css("display", "none");
                    step.current = 1;
                }, 2000);
            });
            break;
        case 1:
            step01();
            break;
        case 2:
            $('#frame02').css("display", "initial");
            $('#frame02').css("opacity", "1");
            $('canvas').first().remove();
            setTimeout( function() {
                $('#frame01').css("display", "none");
                $('#frame02 .glitch').css("opacity", "1");
            }, 200);
            $( "#frame02 .glitch" ).on('click touchstart', function () {
                step.current = 3;
            });            
            break;
        case 3:
            $('#frame03').css("display", "table");
            step03();
            $('#frame02 .glitch').css("opacity", "0");
            setTimeout( function() {
                $('#frame02').css("display", "none");
                $('#frame03').css("opacity", "1");
            }, 500);
            $( "#frame03 .glitch" ).on('click touchstart', function () {
                step.current = 4;
            });  
            break;
        case 4:
            step04(2);
            $('#sun-container #sun-glow').css("left", "10%");
            $('#frame03 > .glitch-box > .glitch').css("opacity", "0");
            setTimeout( function() {
                $('#frame03 > .glitch-box').css("display", "done");
            }, 250);
            $('#earth').css("left", "32.5%");
            $( "#sun-container #sun-glow .glitch" ).on('click touchstart', function () {
                step.current = 5;
            }); 
            break;
        case 5:
            step04(3);
            $('#sun-container #sun-glow').addClass("sun-fast");
            $('#sun-container #sun-glow').removeClass("sun-slow");
            $('#earth').css("left", "67.5%");
            $('#sun-container #sun-glow').css("left", "-100%");
            setTimeout( function() {
                $('#sun-container2 #sun-glow').css("left", "2.5%");
                $('#sun-container').css("display", "none");
                setTimeout( function() {
                    $('#step05').css("display", "initial");
                    $('#step05 .glitch').css("opacity", "1");
                }, 3500);
            }, 3500);
            break;
    };
});

step.current = 0;