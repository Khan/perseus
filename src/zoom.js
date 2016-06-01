/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, max-len, no-var, space-before-function-paren */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

// Derived from the MIT-licensed:
// https://github.com/fat/zoom.js/blob/fd4f3e43153da7596da0bade198e99f98b47791e/js/zoom.js

// NOTE(kevindangoor)
// This version zooms a new, absolutely positioned image element rather than
// scaling the original image element within a new container. The problem that
// I ran into was that we had a grandparent node with a z-index
// which caused the zoomed image to end up behind the overlay. We sidestep all
// of that by simplifying to just use a new image element.

/*global $*/
/*jshint browser:true, node:true */

"use strict";

/* ========================================================================
 * Bootstrap: transition.js v3.3.4
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


// CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
// ============================================================

function transitionEnd() {
    var el = document.createElement('bootstrap');

    var transEndEventNames = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend',
    };

    for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
            return {
                end: transEndEventNames[name]
            };
        }
    }

    return false; // explicit for ie8 (  ._.)
}

// http://blog.alexmaccaw.com/css-transitions
$.fn.emulateTransitionEnd = function(duration) {
    var called = false;
    var $el = this;
    $(this).one('bsTransitionEnd', function() {
        called = true;
    });
    var callback = function() {
        if (!called) {
            $($el).trigger($.support.transition.end);
        }
    };

    setTimeout(callback, duration);
    return this;
};

$(function() {
    $.support.transition = transitionEnd();

    if (!$.support.transition) {
        return;
    }

    $.event.special.bsTransitionEnd = {
        bindType: $.support.transition.end,
        delegateType: $.support.transition.end,
        handle: function(e) {
            if ($(e.target).is(this)) {
                return e.handleObj.handler.apply(this, arguments);
            }
        },
    };
});

/**
 * The zoom service
 */
function ZoomService() {
}

ZoomService.prototype._initialize = function(zoomToFullSize) {
    // Check to see if the service is already initialized
    if (this._$document) {
        return;
    }
    this._activeZoom =
        this._initialScrollPosition =
        this._initialTouchPosition =
        this._touchMoveListener = null;

    this._$document = $(document);
    this._$window = $(window);
    this._$body = $(document.body);

    this._boundClick = $.proxy(this._clickHandler, this);

    this._zoomToFullSize = zoomToFullSize;
};

ZoomService.prototype.handleZoomClick = function(e, zoomToFullSize) {
    this._initialize(zoomToFullSize);
    var target = e.target;

    if (!target || target.tagName !== 'IMG') {
        return;
    }

    if (this._$body.hasClass('zoom-overlay-open')) {
        return;
    }

    if (e.metaKey || e.ctrlKey) {
        return window.open(e.target.src, '_blank');
    }

    if (target.width >= (window.innerWidth - Zoom.OFFSET)) {
        return;
    }

    this._activeZoomClose(true);

    this._activeZoom = new Zoom(target);
    this._activeZoom.zoomImage();

    if (!this._zoomToFullSize) {
        // todo(fat): probably worth throttling this
        this._$window.on('scroll.zoom', $.proxy(this._scrollHandler, this));

        this._$document.on('keyup.zoom', $.proxy(this._keyHandler, this));
        this._$document.on('touchstart.zoom', $.proxy(this._touchStart, this));
    }

    // we use a capturing phase here to prevent unintended js events
    // sadly no useCapture in jquery api (http://bugs.jquery.com/ticket/14953)
    document.addEventListener('click', this._boundClick, true);

    e.stopPropagation();
};

ZoomService.prototype._activeZoomClose = function(forceDispose) {
    if (!this._activeZoom) {
        return;
    }

    if (forceDispose) {
        this._activeZoom.dispose();
    } else {
        this._activeZoom.close();
    }

    this._$window.off('.zoom');
    this._$document.off('.zoom');

    document.removeEventListener('click', this._boundClick, true);

    this._activeZoom = null;
};

ZoomService.prototype._scrollHandler = function(e) {
    if (this._initialScrollPosition === null) {
        this._initialScrollPosition = window.scrollY;
    }
    var deltaY = this._initialScrollPosition - window.scrollY;
    if (Math.abs(deltaY) >= 40) {
        this._activeZoomClose();
    }
};

ZoomService.prototype._keyHandler = function(e) {
    if (e.keyCode === 27) {
        this._activeZoomClose();
    }
};

ZoomService.prototype._clickHandler = function(e) {
    e.stopPropagation();
    e.preventDefault();
    this._activeZoomClose();
};

ZoomService.prototype._touchStart = function(e) {
    // Our jQuery doesn't include `touches` in its event
    // TODO(kevindangoor) Remove `originalEvent` once jQuery is updated
    this._initialTouchPosition = e.originalEvent.touches[0].pageY;
    $(e.target).on('touchmove.zoom', $.proxy(this._touchMove, this));
};

ZoomService.prototype._touchMove = function(e) {
    // Our jQuery doesn't include `touches` in its event
    // TODO(kevindangoor) Remove `originalEvent` once jQuery is updated
    if (Math.abs(e.originalEvent.touches[0].pageY - this._initialTouchPosition) > 10) {
        this._activeZoomClose();
        $(e.target).off('touchmove.zoom');
    }
};


/**
 * The zoom object
 */
function Zoom(img) {
    this._fullHeight =
        this._fullWidth =
        this._overlay = null;

    this._targetImage = img;

    this._$body = $(document.body);
}

Zoom.OFFSET = 80;
Zoom._MAX_WIDTH = 2560;
Zoom._MAX_HEIGHT = 4096;

Zoom.prototype.zoomImage = function() {
    var img = document.createElement('img');
    var $zoomedImage = $(img);

    img.onload = function() {
        // Load the image without specifying height and width so that we can find
        // the true height and width.
        this._fullHeight = Number(img.height);
        this._fullWidth = Number(img.width);

        // Set up our image to mirror the current image
        img.height = this._targetImage.height;
        img.width = this._targetImage.width;
        var imageOffset = this._imageOffset = $(this._targetImage).offset();
        $zoomedImage.css("position", "absolute")
            .css("top", imageOffset.top + "px")
            .css("left", imageOffset.left + "px");
        this._zoomOriginal();
    }.bind(this);

    img.src = this._targetImage.src;

    this.$zoomedImage = $zoomedImage;
};

Zoom.prototype._zoomOriginal = function() {
    this.$zoomedImage
        .addClass('zoom-img')
        .attr('data-action', 'zoom-out');
    $(this._targetImage).css("visibility", "hidden");

    this._overlay = document.createElement('div');
    this._overlay.className = 'zoom-overlay';

    document.body.appendChild(this._overlay);
    document.body.appendChild(this.$zoomedImage[0]);

    this._calculateZoom();
    this._triggerAnimation();
};

Zoom.prototype._calculateZoom = function() {
    var originalFullImageWidth = this._fullWidth;
    var originalFullImageHeight = this._fullHeight;

    var maxScaleFactor = originalFullImageWidth / this._targetImage.width;

    var viewportHeight = (window.innerHeight - Zoom.OFFSET);
    var viewportWidth = (window.innerWidth - Zoom.OFFSET);

    var imageAspectRatio = originalFullImageWidth / originalFullImageHeight;
    var viewportAspectRatio = viewportWidth / viewportHeight;

    if (originalFullImageWidth < viewportWidth && originalFullImageHeight <
        viewportHeight) {
        this._imgScaleFactor = maxScaleFactor;

    } else if (imageAspectRatio < viewportAspectRatio) {
        this._imgScaleFactor = (viewportHeight / originalFullImageHeight) *
            maxScaleFactor;

    } else {
        this._imgScaleFactor = (viewportWidth / originalFullImageWidth) *
            maxScaleFactor;
    }
};

Zoom.prototype._triggerAnimation = function() {
    var scrollTop = $(window).scrollTop();

    var viewportY = scrollTop + (window.innerHeight / 2);
    var viewportX = (window.innerWidth / 2);

    var scaleFactor = this._imgScaleFactor;

    var imageCenterY = this._imageOffset.top + (this._targetImage.height / 2);
    var imageCenterX = this._imageOffset.left + (this._targetImage.width / 2);

    this._translateY = (viewportY - imageCenterY) / scaleFactor;
    this._translateX = (viewportX - imageCenterX) / scaleFactor;

    this.$zoomedImage.css('transform', 'scale(' + this._imgScaleFactor +
        ') translate(' + this._translateX + 'px, ' + this._translateY +
        'px) translateZ(0)');

    this._$body.addClass('zoom-overlay-open');
};

Zoom.prototype.close = function() {
    this._$body
        .removeClass('zoom-overlay-open')
        .addClass('zoom-overlay-transitioning');

    this.$zoomedImage.css('transform', '');

    this.$zoomedImage
        .one($.support.transition.end, $.proxy(this.dispose, this))
        .emulateTransitionEnd(300);

};

Zoom.prototype.dispose = function() {
    if (this.$zoomedImage && this.$zoomedImage[0].parentNode) {
        this.$zoomedImage.remove();
        this.$zoomedImage = null;

        this._overlay.parentNode.removeChild(this._overlay);

        this._$body.removeClass('zoom-overlay-transitioning');
    }
    $(this._targetImage).css('visibility', 'visible');
};

exports.ZoomService = new ZoomService();
