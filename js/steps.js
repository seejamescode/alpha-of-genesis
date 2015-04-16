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
            initSurface('', '#ff0000', '#f7bd00', 0.002, '#ffffff', '#ffffff');
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
                $('#frame03 > .glitch-box').css("display", "none");
            }, 250);
            $('#earth').addClass("earth-step04");
            $( "#sun-container #sun-glow .glitch" ).on('click touchstart', function () {
                $('canvas').first().remove();
                initSurface('', '#555555', '#ffffff', 0.0001, '#00a4ff', '#001eff');
                step.current = 5;
            }); 
            break;
        case 5:
            initSurface(3, '#ffe100', '#ffe100', 0.0004, '#666666', '#cacaca');
            $('#surfaceMagma').css("display", "none");
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
                    $( ".glitch" ).on('click touchstart', function () {
                        step.current = 6;
                    }); 
                }, 3500);
            }, 3500);
            break;
        case 6:
            $('#step05-verses .glitch').css("opacity", "0");
            setTimeout( function() {
                $('#step05-verses').css("display", "none");
                $('#earth').removeClass("earth-step05");
                $('#earth').addClass("earth-step06");
                $('#sun-container2 #sun-glow').addClass("sun-out");
                $('#earth img').addClass("pangea-step06");
                $('#step06-verses').css("display", "initial");
                $('#step06-verses').css("top", "5%");
                setTimeout( function() {
                    $('#sun-container2').css("display", "none");
                    $('#step06-verses .glitch').css("opacity", "1");
                    $( ".glitch" ).on('click touchstart', function () {
                        step.current = 7;
                    }); 
                }, 3500);
            }, 250);
            break;
        case 7:
            $('#step06-verses .glitch').css("opacity", "0");
            setTimeout( function() {
                $('#step06-verses').css("display", "none");
                $('#earth').removeClass("earth-step06");
                $('#earth').addClass("earth-step07");
                $('#frame04').css("display", "initial");
                setTimeout( function() {
                    setTimeout( function() {
                        $('#frame03').css("display", "none");
                    }, 3500);
                    $('#frame04').css("opacity", "1");
                    setTimeout( function() {
                        $('#frame04 .glitch').css("opacity", "1");
                    }, 200);
                    $( "#frame04 .glitch" ).on('click touchstart', function () {
                        step.current = 8;
                    });
                }, 3500);
            }, 250);
            break;
        case 8:
            $('#frame05').css("display", "initial");
            setTimeout( function() {
                $('#frame04').css("opacity", "0");
                $('#frame05').css("opacity", "1");
                setTimeout( function() {
                    $('#frame04').css("display", "none");
                    $('#frame05 > .glitch:first').addClass("verse-up");
                    setTimeout( function() {
                        $('#frame05 > .glitch:first').css("z-index", "2");
                    }, 3000)
                    $('#frame05 > .glitch:first').on('click touchstart', function () {
                        $('#frame05 > .glitch:first').css("z-index", "-1");
                        step.current = 9;
                    });
                }, 2500);
            }, 500);
            break;
        case 9:
            $('#frame05 > .glitch:first').removeClass("verse-up");
            setTimeout( function() {
                $('#frame05 div:nth-child(5)').addClass("verse-up");
                setTimeout( function() {
                    $('#frame05 div:nth-child(5)').css("z-index", "2");
                }, 3000)
                $('#frame05 div:nth-child(5)').on('click touchstart', function () {
                    $('#frame05 div:nth-child(5)').css("z-index", "-1");
                    step.current = 10;
                });
            }, 1000);
            break;
        case 10:
            $('#frame05 #mountainRange').css("bottom", "71%");
            $('#frame05 #land').css("top", "29%");
            $('#frame05 div:nth-child(5)').css("top", "100%");
            $('#frame05 > #land > .glitch:first').css("display", "initial");
            setTimeout( function() {
                $('#frame05 > #land > .glitch:first').css("opacity", "1");
                $('#frame05 > #land > .glitch:first').on('click touchstart', function () {
                    step.current = 11;
                });
            }, 3000);
            break;
        case 11:
            $('#frame05 > #land > .glitch:first').css("opacity", "0");
            $('#frame05 > #land > .glitch:last').css("display", "initial");
            setTimeout( function() {
                $('#frame05 > #land > .glitch:last').css("opacity", "1");
                $('#frame05 > #land > .glitch:first').css("display", "none");
                $('#land').prepend('<img src="./images/tree1.svg" />');
                $('#land').prepend('<img src="./images/tree2.svg" />');
                $('#land').prepend('<img src="./images/tree3.svg" />');
                $('#frame05 > #land > .glitch:last').on('click touchstart', function () {
                    step.current = 12;
                });
            }, 2500);
            break;
        case 12:
            $('#frame05 > #land > .glitch:last').css("opacity", "0");
            $('#frame05 #mountainRange').css("bottom", "0");
            $('#frame05 #land').css("top", "101%");
            $('#frame05 #sky').css("background-color", "#000");   
            setTimeout( function() {
                $('#frame05 div:nth-child(6)').addClass("verse-up");
                $('#frame05 > #land > .glitch:last').css("display", "none");
                $('#frame05 div:nth-child(6)').on('click touchstart', function () {
                    step.current = 13;
                });
            }, 1500);
            break;
        case 13:
            $('#frame05 div:nth-child(6)').removeClass("verse-up");  
            setTimeout( function() {
                $('#frame05 div:nth-child(7)').addClass("verse-up-night");
                $('#frame05 #sky #night').css("opacity", "1");
                $('#frame05 div:nth-child(6)').css("display", "none");
                $('#frame05 div:nth-child(7)').on('click touchstart', function () {
                    step.current = 14;
                });
            }, 2500);
            break;
        case 14:
            $('#frame05 div:nth-child(7)').removeClass("verse-up");  
            setTimeout( function() {
                $('#frame05 div:nth-child(8)').addClass("verse-up");
                $('#frame05 div:nth-child(7)').css("display", "none");
                var curve = new CurveAnimator(
                    [-10,30], [110,30],
                    [25,00], [75,00]
                );

                var o = document.getElementById('moon');
                o.style.position = 'absolute';

                curve.animate(10, function(point,angle){
                    o.style.left = point.x+"%";
                    o.style.top  = point.y+"%";
                    o.style.transform =
                    o.style.webkitTransform =
                    o.style.MozTransform =
                    "rotate("+angle+"deg)";
                });
                $('#frame05 #moon').css("opacity", "1");
                $('#frame05 div:nth-child(8)').on('click touchstart', function () {
                    step.current = 15;
                });
            }, 1500);
            break;
    };
});

step.current = 7;