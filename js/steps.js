var step = { current: -1 };

//Add Modernizr test
Modernizr.addTest('isiOS', function(){
    return navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false
});

//usage
if (Modernizr.isiOS) {
    $('#frame00 #start video').css("display", "none");
};

if (!Modernizr.smil) {
    $('#frame00 #warning-animations').css("display", "inline-block");
};

watch(step, "current", function() {
    console.log("Changed step to " + step.current);
    switch(step.current) {
        case 0:
            $( "#frame00 #about-button" ).on('click touchstart', function () {
                if (step.current === 0) {
                    $('#frame00 #about-modal').css("display", "block");
                    setTimeout( function() {
                        $('#frame00 #about-modal').css("opacity", "0.9");
                    });
                };
            });
            $( "#frame00 #exit" ).on('click touchstart', function () {
                if (step.current === 0) {
                    $('#frame00 #about-modal').css("opacity", "0");
                    setTimeout( function() {
                        $('#frame00 #about-modal').css("display", "none");
                    }, 2250);
                };
            });
            $( "#frame00 #blueFill" ).on('click touchstart', function () {
                if (step.current === 0) {
                    $('#frame00 video').css("opacity", "0");
                    $('#frame00').css("opacity", "0");
                    setTimeout( function() {
                        $('#frame00').css("display", "none");
                        step.current = 1;
                    }, 2000);
                };
            });
            break;
        case 1:
            initBigBang();
            break;
        case 2:
            $('#frame02').css("display", "inline-block");
            $('#frame02').css("opacity", "1");
            $('canvas').first().remove();
            setTimeout( function() {
                $('#frame01').css("display", "none");
                $('#frame02 .glitch').css("opacity", "1");
            }, 200);
            $( "#frame02 .glitch" ).on('click touchstart', function () {
                if (step.current === 2) {
                    step.current = 3;
                };
            });            
            break;
        case 3:
            $('#frame03').css("display", "table");
            $('#frame02').addClass("frame02-fade");
            $('#frame02').css("opacity", "0");
            initSurface('', '#ff0000', '#f7bd00', 0.002, '#ffffff', '#ffffff');
            $('#frame03 #surfaceMagma').css("display", "block");
            setTimeout( function() {
                $('#frame03').css("opacity", "1");
            });
            setTimeout( function() {
                $('#frame02').css("display", "none");
            }, 2000);
            $( "#frame03 .glitch" ).on('click touchstart', function () {
                if (step.current === 3) {
                    step.current = 4;
                };
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
            setTimeout( function() {
                $('#sun-glow .glitch-box .glitch').css("opacity", "1");
                $( "#sun-container #sun-glow .glitch" ).on('click touchstart', function () {
                    if (step.current === 4) {
                        $('canvas').first().remove();
                        initSurface('', '#555555', '#ffffff', 0.0001, '#00a4ff', '#001eff');
                        $('#frame03 #earth #surfaceWater').css("opacity", "1");
                        step.current = 5;
                    };
                });
            }, 7000)
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
                $('#step05-verses').css("display", "inline-block");
                setTimeout( function() {
                    $('#step05-verses .glitch').css("opacity", "1");
                    $( "#step05-verses .glitch" ).on('click touchstart', function () {
                        if (step.current === 5) {
                            step.current = 6;
                        };
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
                $('#earth #surfacePangea').addClass("pangea-step06");
                $('#step06-verses').css("display", "inline-block");
                $('#step06-verses').css("top", "5%");
                setTimeout( function() {
                    $('#sun-container2').css("display", "none");
                    $('#step06-verses .glitch').css("opacity", "1");
                    $( "#step06-verses .glitch" ).on('click touchstart', function () {
                        if (step.current === 6) {
                            step.current = 7;
                        };
                    }); 
                }, 3500);
            }, 250);
            break;
        case 7:
            $('#frame00').css("display", "none");
            $('#step06-verses .glitch').css("opacity", "0");
            setTimeout( function() {
                $('#step06-verses').css("display", "none");
                $('#earth').removeClass("earth-step06");
                $('#earth').addClass("earth-step07");
                $('#frame04').css("display", "inline-block");
                setTimeout( function() {
                    setTimeout( function() {
                        $('#frame03').css("display", "none");
                    }, 3500);
                    $('#frame04').css("opacity", "1");
                    setTimeout( function() {
                        $('#frame04 .glitch').css("opacity", "1");
                    }, 200);
                    $( "#frame04 .glitch" ).on('click touchstart', function () {
                        if (step.current === 7) {
                            $('#frame05').css("display", "inline-block");
                            step.current = 8;
                        };
                    });
                }, 3500);
            }, 250);
            break;
        case 8:
            $('#frame04').css("opacity", "0");
            $('#frame05').css("opacity", "1");
            setTimeout( function() {
                $('#frame04').css("display", "none");
                $('#frame05 > div:nth-child(5)').addClass("verse-up");
                if ( $(window).width() < 600) { 
                    setTimeout( function() {
                        $('#frame05 > div:nth-child(5)').css("z-index", "2");
                    }, 3000)
                };
                $('#frame05 > .glitch:first').on('click touchstart', function () {
                    if (step.current === 8) {
                        step.current = 9;
                    };
                });
            }, 3500);
            break;
        case 9:
            $('#frame05 > div:nth-child(5)').removeClass("verse-up");
            setTimeout( function() {
                $('#frame05 div:nth-child(6)').addClass("verse-up");
                if ( $(window).width() < 600) {
                    setTimeout( function() {
                        $('#frame05 div:nth-child(6)').css("z-index", "2");
                    }, 3000)
                };
                $('#frame05 div:nth-child(6)').on('click touchstart', function () {
                    if (step.current === 9) {
                        step.current = 10;
                    };
                });
            }, 1000);
            break;
        case 10:
            $('#frame05 #mountainRange').css("bottom", "71%");
            $('#frame05 #land').css("top", "29%");
            $('#frame05 div:nth-child(6)').css("top", "100%");
            $('#frame05 > #land > .glitch:first').css("display", "inline-block");
            setTimeout( function() {
                $('#frame05 #grass').css("opacity", "0.75");
                $('#frame05 > #land > .glitch:first').css("opacity", "1");
                $('#frame05 #grass').css("margin-top", "5%");
                $('#frame05 > #land > .glitch:first').on('click touchstart', function () {
                    if (step.current === 10) {
                        step.current = 11;
                    };
                });
            }, 3000);
            break;
        case 11:
            $('#frame05 > #land > .glitch:first').css("opacity", "0");
            $('#frame05 > #land > .glitch:last').css("display", "inline-block");
            $('#frame05 div:nth-child(6)').css("display", "none");
            setTimeout( function() {
                $('#frame05 > #land > .glitch:last').css("opacity", "1");
                $('#frame05 > #land > .glitch:first').css("display", "none");
                $('#land').prepend('<img src="./images/tree1.svg" />');
                $('#land').prepend('<img src="./images/tree2.svg" />');
                $('#land').prepend('<img src="./images/tree3.svg" />');
                setTimeout( function() {
                    $('#frame05 > #land > .glitch:last').on('click touchstart', function () {
                        if (step.current === 11) {
                            step.current = 12;
                        };
                    });
                }, 1500);
            }, 2500);
            break;
        case 12:
            $('#frame05 > #land > .glitch:last').css("opacity", "0");
            $('#frame05 #mountainRange').css("bottom", "0");
            $('#frame05 #land').addClass("land-move-down");
            $('#frame05 #sky').css("background-color", "#000");
            $('#frame05 #sky #night .clouds').removeClass("inverted-colors");
            setTimeout( function() {
                $('#frame05 div:nth-child(7)').addClass("verse-up-night");
                $('#frame05 > #land > .glitch:last').css("display", "none");
                $('#frame05 div:nth-child(7)').on('click touchstart', function () {
                    if (step.current === 12) {
                        step.current = 13;
                    };
                });
            }, 1500);
            break;
        case 13:
            $('#frame05 div:nth-child(7)').removeClass("verse-up-night");  
            setTimeout( function() {
                $('#frame05 div:nth-child(8)').addClass("verse-up-night");
                $('#frame05 #sky #night .twinkling').css("opacity", "1");
                $('#frame05 #sky #night .stars').css("opacity", "1");
                $('#frame05 div:nth-child(8)').on('click touchstart', function () {
                    if (step.current === 13) {
                        $('#frame05 div:nth-child(7)').css("display", "none");
                        step.current = 14;
                    };
                });
            }, 2500);
            break;
        case 14:
            $('#frame05 div:nth-child(8)').removeClass("verse-up-night");  
            setTimeout( function() {
                setTimeout( function() {
                    $('#frame05 div:nth-child(9)').addClass("verse-up-night");
                }, 1500);
                var curve = new CurveAnimator(
                    [-20,30], [120,30],
                    [25,00], [75,00]
                );

                var o = document.getElementById('moon');
                o.style.position = 'absolute';

                curve.animate(12, function(point,angle){
                    o.style.left = point.x+"%";
                    o.style.top  = point.y+"%";
                    o.style.transform =
                    o.style.webkitTransform =
                    o.style.MozTransform =
                    "rotate("+angle+"deg)";
                });
                $('#frame05 #moon').css("opacity", "1");
                $('#frame05 div:nth-child(9)').on('click touchstart', function () {
                    if (step.current === 14) {
                        $('#frame05 div:nth-child(8)').css("display", "none");
                        step.current = 15;
                    };
                });
            }, 1500);
            break;
        case 15:
            $('#frame05 div:nth-child(9)').removeClass("verse-up-night"); 
            setTimeout( function() {
                initSurface(4, '#ffe100', '#ffe100', 0.0004, '#666666', '#cacaca');
                $('#frame05 #sky').css("background-color", "#00A8C6");
                $('#frame05 #sky #night').animate({ opacity: '0' }, 3000);
                $('#sun-container3 #sun-glow').addClass("sun-slow-2");
                $('#sun-container3').addClass("ready");
                $('#sun-container3 #sun-glow canvas').css("border-radius", "50%");
                $('#frame05 div:nth-child(10)').addClass("verse-up-night");
                setTimeout( function() {
                    $('#frame05 div:nth-child(9)').css("display", "none");
                    $('#sun-container3 #sun-glow .glitch').css("opacity", "1");
                }, 1500);
                $('#sun-container3 span').on('click touchstart', function () {
                    if (step.current === 15) {
                        step.current = 16;
                    };
                });
            }, 1500);
            break;
        case 16:
            $('#frame00').css("display", "none");
            $('#frame06').css("display", "inline-block");
            $('#frame06').css("opacity", "1");
            $('#frame05 #mountainRange').css("bottom", "-100%");
            $('#sun-container3 #sun-glow').addClass("sun-slow-2-out");
            $('#frame05').css("background-color", "transparent");
            $('#frame05 #sky').css("background-color", "transparent");
            $('#verse19').css("display", "table");
            setTimeout ( function() {
                if (Modernizr.smil) {
                    $('#frame06 #water').css("max-height", "calc( 100% - 50px )");
                } else {
                    $('#frame06 #water').css("max-height", "95%");
                };
                setTimeout ( function() {
                    $('#frame05').css("display", "none");
                    $('#verse19 .glitch').css("opacity", "1");
                    $('#verse19 .glitch').on('click touchstart', function () {
                        if (step.current === 16) {
                            step.current = 17;
                        };
                    });
                }, 6000);
            }, 500);
            break;
        case 17:
            $('#verse19 .glitch').css("opacity", "0");
            $('#verse20').css("display", "inline-block");
            if (Modernizr.smil) {
                document.getElementById("fish-1").contentDocument.getElementById("fish1animation").beginElement();
                document.getElementById("fish-1-shadow").contentDocument.getElementById("fish1animation").beginElement();
            };
            setTimeout ( function() {
                $('#verse19').css("display", "none");
                $('#frame06 #fish-1').css("right", "25%");
                $('#frame06 #fish-1-shadow').css("right", "26%");
                $('#verse20').css("opacity", "1");
                $('#verse20').on('click touchstart', function () {
                    if (step.current === 17) {
                        step.current = 18;
                    };
                });
            }, 2000);
            break;
        case 18:
            $('#verse20').css("opacity", "0");
            $('#verse21').css("display", "inline-block");
            $('#fish-1').addClass("fish-2");
            $('#fish-1').removeClass("fish-1");
            $('#fish-1-shadow').addClass("fish-2");
            $('#fish-1-shadow').removeClass("fish-1");
            if (Modernizr.smil) {
                document.getElementById("fish-1").contentDocument.getElementById("fish1animation").endElement();
                document.getElementById("fish-1").contentDocument.getElementById("fish").setAttribute("fill","#5B7C65");
                document.getElementById("fish-1-shadow").contentDocument.getElementById("fish1animation").endElement();
            };
            $('#frame06 #fish-1').css("right", "15%");
            $('#frame06 #fish-1').css("width", "70%");
            $('#frame06 #fish-1-shadow').css("right", "15.5%");
            $('#frame06 #fish-1-shadow').css("width", "70%");
            setTimeout( function() {
                $('#verse21').css("opacity", "1");
                $('#verse20').css("display", "none");
                $('#verse21').on('click touchstart', function () {
                    if (step.current === 18) {
                        step.current = 19;
                    };
                });
            }, 250);
            break;
        case 19:
            $('#verse21').css("opacity", "0");
            setTimeout( function() {
                $(".fish-2:nth-child(15)").css("right", "-100%");
                setTimeout( function() {
                    $(".fish-2:nth-child(13)").css("right", "-100%");
                    setTimeout( function() {
                        $(".fish-2:nth-child(14)").css("right", "-100%");
                        $('#verse22').css("display", "inline-block");
                    }, 1000);
                }, 1000);
            }, 1000);
            setTimeout( function() {
                $('#verse22').css("opacity", "1");
                $('#verse21').css("display", "none");
                $('#verse22').on('click touchstart', function () {
                    if (step.current === 19) {
                        step.current = 20;
                    };
                });
            }, 7000);
            break;
        case 20:
            $('#verse22').css("opacity", "0");
            $('#verse23').css("display", "inline-block");
            $("#beach").css("left", "50%");
            $('#frame06 #water').css("height", "100%");
            setTimeout( function() {
                $("#extra-land").css("left", "75%");
                if (Modernizr.smil) {
                    document.getElementById("fish-1").contentDocument.getElementById("fish2animation").endElement();
                    document.getElementById("fish-1-shadow").contentDocument.getElementById("fish2animation").endElement();
                };
                $('#verse23').css("opacity", "1");
                $('#verse22').css("display", "none");
                $('#verse23').on('click touchstart', function () {
                    if (step.current === 20) {
                        step.current = 21;
                    };
                });
            }, 1000);
            break;
        case 21:
            $('#verse23').css("opacity", "0");
            $('#verse24').css("display", "inline-block");
            if (Modernizr.smil) {
                document.getElementById("fish-1").contentDocument.getElementById("fish2to3animation").beginElement();
                document.getElementById("fish-1-shadow").contentDocument.getElementById("fish2to3animation").beginElement();
                document.getElementById("fish-1").contentDocument.getElementById("fish").setAttribute("fill","#018128");
            };
            setTimeout( function() {
                $('#verse24').css("opacity", "1");
                $('#verse23').css("display", "none");
                $('#verse24').on('click touchstart', function () {
                    if (step.current === 21) {
                        step.current = 22;
                    };
                });
            }, 3000);
            break;
        case 22:
            $('#verse24').css("opacity", "0");
            $('#verse25').css("display", "inline-block");
            $('#beach').addClass("beach-slow");
            $('#beach').removeClass("beach-fast");
            $("#beach").css("left", "-50%");
            $("#extra-land").css("left", "0%");
            $('#frame06 #fish-1-shadow').css("opacity", "0.5");
            if (Modernizr.smil) {
                document.getElementById("fish-1").contentDocument.getElementById("fish3animation").beginElement();
                document.getElementById("fish-1-shadow").contentDocument.getElementById("fish3animation").beginElement();
            };
            setTimeout( function() {
                $('#frame06 #fish-1-shadow').removeClass("shadow-animation-1");
                $('#verse25').css("opacity", "1");
                $('#verse24').css("display", "none");
                $('#verse25').on('click touchstart', function () {
                    if (step.current === 22) {
                        step.current = 23;
                    };
                });
            }, 2000);
            break;
        case 23:
            $('#verse25').css("opacity", "0");
            $('#verse26').css("display", "inline-block");
            $('#frame06 #fish-1').css("top", "100%");
            $('#frame06 #fish-1').css("right", "30%");
            $('#frame06 #fish-1').css("width", "40%");
            $('#frame06 #fish-1-shadow').css("top", "100%");
            $('#frame06 #fish-1-shadow').css("right", "30.5%");
            $('#frame06 #fish-1-shadow').css("width", "40%");
            $('#frame06 #forest').css("top", "0%");
            setTimeout( function() {
                $('#verse26').css("opacity", "1");
                $('#verse25').css("display", "none");
                $('#verse26').on('click touchstart', function () {
                    if (step.current === 23) {
                        step.current = 24;
                    };
                });
            }, 5000);
            break;
        case 24:
            $('#verse26').css("opacity", "0");
            $('#verse27').css("display", "inline-block");
            $('#human').css("opacity", "0.5");
            setTimeout( function() {
                $('#verse27').css("opacity", "1");
                $('#verse26').css("display", "none");
                $('#verse27').on('click touchstart', function () {
                    if (step.current === 24) {
                        step.current = 25;
                    };
                });
            }, 3000);
            break;
        case 25:
            $('#frame00').css("display", "none");
            $('#frame07').css("display", "inline-block");
            $('#verse28').css("display", "table");
            $('#frame07 #kal1').css("display", "inline-block");
            $('#frame07 #kal1').css("opacity", "1");
            setTimeout( function() {
                $('#frame07').css("opacity", "1");
                $('#verse28 .glitch').css("opacity", "1");
                $('#verse28 .glitch').on('click touchstart', function () {
                    if (step.current === 25) {
                        step.current = 26;
                    };
                });
            }, 500);
            break;
        case 26:
            $('#verse28 .glitch').css("opacity", "0");
            $('#verse29').css("display", "table");
            $('#frame06').css("display", "none");
            $('#frame07 #kal2').css("display", "inline-block");
            setTimeout( function() {
                $('#frame07 #kal2').css("opacity", "1");
            });
            setTimeout( function() {
                $('#frame07 #kal1').css("display", "none");
                $('#verse28').css("display", "table");
                $('#verse29 .glitch').css("opacity", "1");
                $('#verse29 .glitch').on('click touchstart', function () {
                    if (step.current === 26) {
                        step.current = 27;
                    };
                });
            }, 2000);
            break;
        case 27:
            $('#verse29 .glitch').css("opacity", "0");
            $('#verse30').css("display", "table");
            $('#frame07 #kal3').css("display", "inline-block");
            setTimeout( function() {
                $('#frame07 #kal3').css("opacity", "1");
            });
            setTimeout( function() {
                $('#frame07 #kal2').css("display", "none");
                $('#verse29').css("display", "table");
                $('#verse30 .glitch').css("opacity", "1");
                $('#verse30 .glitch').on('click touchstart', function () {
                    if (step.current === 27) {
                        step.current = 28;
                    };
                });
            }, 3000);
            break;
        case 28:
            $('#verse30 .glitch').css("opacity", "0");
            $('#verse31').css("display", "table");
            $('#frame07 #kal4').css("display", "inline-block");
            setTimeout( function() {
                $('#frame07 #kal4').css("opacity", "1");
            });
            setTimeout( function() {
                $('#frame07 #kal3').css("display", "none");
                $('#verse30').css("display", "table");
                $('#verse31 .glitch').css("opacity", "1");
                $('#verse31 .glitch').on('click touchstart', function () {
                    if (step.current === 28) {
                        step.current = 29;
                    };
                });
            }, 3000);
            break;
        case 29:
            $('#frame08').css("display", "inline-block");
            setTimeout( function() {
                $('#frame08').css("opacity", "1");
                $('#frame07').css("opacity", "0");
            });
            setTimeout( function() {
                $('#frame07').css("display", "none");
                $('#frame08 .glitch').css("opacity", "1");
            }, 5000);
            break;
    };
});

step.current = 0;