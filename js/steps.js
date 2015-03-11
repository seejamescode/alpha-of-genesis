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
            initBigBang();
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
            initSurface('', '#ff0000', '#ff0000', 0.002, '#000000', '#ffffff');
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
            initSurface(2, '#ffe100', '#ffe100', 0.0004, '#666666', '#cacaca');
            $('#sun-container #sun-glow').addClass("sun-slow");
            $('#frame03 > .glitch-box > .glitch').css("opacity", "0");
            setTimeout( function() {
                $('#frame03 > .glitch-box').css("display", "done");
            }, 250);
            $('#earth').addClass("earth-step04");
            $( "#sun-container #sun-glow .glitch" ).on('click touchstart', function () {
                $('canvas').first().remove();
                initSurface('', '#555555', '#ffffff', 0.0001, '#000000', '#b34d4d');
                step.current = 5;
            }); 
            break;
        case 5:
            initSurface(3, '#ffe100', '#ffe100', 0.0004, '#666666', '#cacaca');
            $('#sun-container #sun-glow').removeClass("sun-slow");
            $('#sun-container #sun-glow').addClass("sun-fast");
            $('#earth').removeClass("earth-step04");
            $('#earth').addClass("earth-step05");
            setTimeout( function() {
                $('#sun-container2 #sun-glow').addClass("sun-fast");
                $('#sun-container').css("display", "none");
                $('#step05-verses').css("display", "initial");
                setTimeout( function() {
                    $('#step05-verses .glitch').css("opacity", "1");
                }, 3500);
            }, 3500);
            break;
    };
});

step.current = 0;