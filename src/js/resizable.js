/**
 * resizable
 */

var resizable = function(modal, image) {

    var resizableHandleE = $('<div class="resizable-handle resizable-handle-e"></div>'),
        resizableHandleW = $('<div class="resizable-handle resizable-handle-w"></div>'),
        resizableHandleS = $('<div class="resizable-handle resizable-handle-s"></div>'),
        resizableHandleN = $('<div class="resizable-handle resizable-handle-n"></div>'),
        resizableHandleSE = $('<div class="resizable-handle resizable-handle-se"></div>'),
        resizableHandleSW = $('<div class="resizable-handle resizable-handle-sw"></div>'),
        resizableHandleNE = $('<div class="resizable-handle resizable-handle-ne"></div>'),
        resizableHandleNW = $('<div class="resizable-handle resizable-handle-nw"></div>');

    var resizableHandles = {
        'e': resizableHandleE,
        's': resizableHandleS,
        'se': resizableHandleSE,
        'n': resizableHandleN,
        'w': resizableHandleW,
        'nw': resizableHandleNW,
        'ne': resizableHandleNE,
        'sw': resizableHandleSW,
    }
    // console.log(resizableHandles)

    $(modal).append(resizableHandleE, resizableHandleW, resizableHandleS, resizableHandleN,
        resizableHandleSE, resizableHandleSW, resizableHandleNE, resizableHandleNW);

    var isDragging = false;

    var startX = 0,
        startY = 0,

        modalData = {
            w: 0,
            h: 0,
            l: 0,
            t: 0
        },
        imageData = {
            w: 0,
            h: 0,
            t: 0,
            l: 0
        };

    var direction = '';

    // modal CSS options
    var getModalOpts = function(dir, offsetX, offsetY) {

        var opts = {
            'e': {
                width: offsetX + modalData.w + 'px',
            },
            's': {
                height: offsetY + modalData.h + 'px'
            },
            'se': {
                width: offsetX + modalData.w + 'px',
                height: offsetY + modalData.h + 'px'
            },
            'w': {
                width: -offsetX + modalData.w + 'px',
                left: offsetX + modalData.l + 'px'
            },
            'n': {
                height: -offsetY + modalData.h + 'px',
                top: offsetY + modalData.t + 'px'
            },
            'nw': {
                width: -offsetX + modalData.w + 'px',
                height: -offsetY + modalData.h + 'px',
                top: offsetY + modalData.t + 'px',
                left: offsetX + modalData.l + 'px'
            },
            'ne': {
                width: offsetX + modalData.w + 'px',
                height: -offsetY + modalData.h + 'px',
                top: offsetY + modalData.t + 'px'
            },
            'sw': {
                width: -offsetX + modalData.w + 'px',
                height: offsetY + modalData.h + 'px',
                left: offsetX + modalData.l + 'px'
            }
        };

        return opts[dir]
    }
    // image CSS options
    var getImageOpts = function(dir, offsetX, offsetY, widthDiff, heightDiff) {

        var opts = {
            'e': {
                left: widthDiff < 0 ? (offsetX / 2 + imageData.l + 'px') : $(image).position().left
            },
            's': {
                top: heightDiff < 0 ? (offsetY / 2 + imageData.t + 'px') : $(image).position().top
            },
            'se': {
                top: heightDiff < 0 ? (offsetY / 2 + imageData.t + 'px') : $(image).position().top,
                left: widthDiff < 0 ? (offsetX / 2 + imageData.l + 'px') : $(image).position().left
            },
            'w': {
                left: widthDiff < 0 ? (-offsetX / 2 + imageData.l + 'px') : $(image).position().left
            },
            'n': {
                top: heightDiff < 0 ? (-offsetY / 2 + imageData.t + 'px') : $(image).position().top
            },
            'nw': {
                top: heightDiff < 0 ? (-offsetY / 2 + imageData.t + 'px') : $(image).position().top,
                left: widthDiff < 0 ? (-offsetX / 2 + imageData.l + 'px') : $(image).position().left
            },
            'ne': {
                top: heightDiff < 0 ? (-offsetY / 2 + imageData.t + 'px') : $(image).position().top,
                left: widthDiff < 0 ? (offsetX / 2 + imageData.l + 'px') : $(image).position().left
            },
            'sw': {
                top: heightDiff < 0 ? (offsetY / 2 + imageData.t + 'px') : $(image).position().top,
                left: widthDiff < 0 ? (-offsetX / 2 + imageData.l + 'px') : $(image).position().left
            }
        };

        return opts[dir]
    }

    var dragStart = function(dir, e) {

        var e = e || window.event;

        e.preventDefault();

        isDragging = true;
        isResizing = true;

        startX = e.clientX;
        startY = e.clientY;

        // reclac the modal data when mousedown
        modalData = {
            w: $(modal).width(),
            h: $(modal).height(),
            l: $(modal).offset().left,
            t: $(modal).offset().top
        };

        imageData = {
            w: $(image).width(),
            h: $(image).height(),
            l: $(image).position().left,
            t: $(image).position().top
        };

        direction = dir;
    }

    var dragMove = function(e) {

        var e = e || window.event;

        e.preventDefault();

        if (isDragging) {

            var endX = e.clientX,
                endY = e.clientY,

                relativeX = endX - startX,
                relativeY = endY - startY;

            var modalOpts = getModalOpts(direction, relativeX, relativeY);
            var imageOpts = getImageOpts(direction, relativeX, relativeY, (imageData.w - $(modal).width()), (imageData.h - $(modal).height()));

            $(modal).css(modalOpts);

            $(image).css(imageOpts);


            return false;
        }
    }
    var dragEnd = function() {

        isDragging = false;
        isResizing = false;

    }

    // console.log($(modal))
    $.each(resizableHandles, function(dir, handle) {
        handle.on('mousedown', function(e) {
            dragStart(dir, e);
        });
    });

    $D.on('mousemove', dragMove);
    $D.on('mouseup', dragEnd);
}
