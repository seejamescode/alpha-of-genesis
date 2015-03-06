var step = { current: 0};

function step02() {
    console.log("WE MADE IT TO STEP 2");
}

watch(step, "current", function() {
    console.log("Changed step to " + step.current);
    switch(step.current) {
        case 1:
            step01();
            break;
        case 2:
            $('#frame02').css("display", "initial");
            $('#frame02').css("opacity", "1");
            $('canvas').first().remove();
            setTimeout( function() {
                $('#frame02 .glitch').css("opacity", "1");
            }, 200);
            step02();
            $( "#frame02 .glitch" ).click(function() {
                step.current = 3;
            });            
            break;
        case 3:
            $('#frame03').css("display", "table");
            step03();
            $('#frame02 .glitch').css("opacity", "0");
            setTimeout( function() {
                $('#frame03').css("opacity", "1");
            }, 500);
            break;
    };
});

step.current = 0;