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
            $('#frame02').removeClass("displayNone");
            $('canvas').remove();
            step02();
            break;
    };
});

step.current = 1;