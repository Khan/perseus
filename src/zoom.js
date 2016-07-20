/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, max-len, no-var */
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
 * Changes the viewport meta tag to the given contentString. Invokes callback
 * after viewport meta tag changes have taken effect.
 *
 * TODO(david): Return a promise instead of invoking a callback.
 */
function changeViewportTag(contentString, callback) {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const viewport = document.querySelector("meta[name=viewport]");
    if (viewport) {
        viewport.setAttribute('content', contentString);
    } else {
        $('head').append(`<meta name="viewport" content="${contentString}">`);
    }

    // Hacky way to get the page to take the changes
    // From http://stackoverflow.com/a/36894653
    document.body.style.opacity = 0.9999;

    // ... and undo the temporary change.
    setTimeout(() => {
        document.body.style.opacity = 1;

        // ... which involves restoring the scroll position, which may have
        // changed.
        window.scrollTo(scrollX, scrollY);

        // Invoke callback on the next tick to wait for scroll position to have
        // finished resetting.
        callback && setTimeout(callback, 0);
    }, 0);
}

/**
 * The zoom service
 */
function ZoomService() {
}

ZoomService.prototype._initialize = function(enableMobilePinch) {
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

    this._enableMobilePinch = enableMobilePinch;
};

ZoomService.prototype.handleZoomClick = function(e, enableMobilePinch) {
    this._initialize(enableMobilePinch);
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

    if (!enableMobilePinch &&
            target.width >= window.innerWidth - Zoom.getOffset()) {
        return;
    }

    this._activeZoomClose(true);

    // Enable page zooming in (i.e. make sure there's no maximum-scale). Also,
    // disable page zoom out on mobile devices, because the container that the
    // image is placed in becomes bigger than the viewport if the page can be
    // zoomed out. We explored other fixes like fixing the overlay and page
    // size to be the viewport, but thought that might be even worse of a hack.
    // See for more info:
    // http://dbushell.com/2013/09/10/css-fixed-positioning-and-mobile-zoom/
    if (enableMobilePinch) {
        // Disable zoom out by setting minimum scale of 1 on the viewport tag.
        changeViewportTag(
            'width=device-width, initial-scale=1, minimum-scale=1',
            () => this._zoom(target));
    } else {
        this._zoom(target);
    }

    if (!enableMobilePinch) {
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

ZoomService.prototype._zoom = function(target) {
    this._activeZoom = new Zoom(target, this._enableMobilePinch);
    this._activeZoom.zoomImage();
};

ZoomService.prototype._activeZoomClose = function(forceDispose) {
    if (!this._activeZoom) {
        return;
    }

    if (forceDispose) {
        this._activeZoom.dispose();
        this._disposeActiveZoom();
    } else {
        // Reset any underlying page zoom in case the user had pinched to zoom.
        changeViewportTag(
            `width=device-width, initial-scale=1, minimum-scale=1,
            maximum-scale=1`,
            () => {
                this._activeZoom.close();
                this._disposeActiveZoom();
            }
        );
    }
};

ZoomService.prototype._disposeActiveZoom = function() {
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
function Zoom(img, enableMobilePinch) {
    this._fullHeight =
        this._fullWidth =
        this._overlay = null;

    this._targetImage = img;
    this._enableMobilePinch = enableMobilePinch;

    this._$body = $(document.body);
}

/** Margin around the image when in the "zoomed"/lightbox state. */
Zoom._OFFSET = 80;
Zoom._MAX_WIDTH = 2560;
Zoom._MAX_HEIGHT = 4096;

Zoom.getOffset = function(zoomToFitOnMobile) {
    return zoomToFitOnMobile ? 0 : Zoom._OFFSET;
};

Zoom.prototype.getOffset = function() {
    return Zoom.getOffset(this._enableMobilePinch);
};

Zoom.prototype.zoomImage = function() {
    var img = document.createElement('img');
    var $zoomedImage = $(img);

    img.onload = function() {
        // Load the image without specifying height and width so that we can find
        // the true height and width.
        this._fullHeight = Number(img.height);
        this._fullWidth = Number(img.width);

        // Set up our image to mirror the current image on the document.
        var imageOffset = this._imageOffset = $(this._targetImage).offset();

        // Position the image using viewport-fixed coordinates so that it is
        // exactly over the image on the document.
        //
        // Said another way ... get the coordinates of the image relative to
        // the viewport, and use those to position our new image (which is
        // absolutely positioned within a full-bleed fixed-position container).
        var left = this._left = imageOffset.left - $(window).scrollLeft();
        var top = this._top = imageOffset.top - $(window).scrollTop();

        $zoomedImage.css({
            left: left,
            top: top,
            width: this._targetImage.width,
            height: this._targetImage.height,
        });

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

    this._backdrop = document.createElement('div');
    this._backdrop.className = 'zoom-backdrop';
    document.body.appendChild(this._backdrop);

    this._overlay = document.createElement('div');
    this._overlay.className = 'zoom-overlay';

    document.body.appendChild(this._overlay);
    this._overlay.appendChild(this.$zoomedImage[0]);

    this._calculateZoom();
    this._triggerAnimation();
};

Zoom.prototype._calculateZoom = function() {
    const originalFullImageWidth = this._fullWidth;
    const originalFullImageHeight = this._fullHeight;
    const viewportHeight = (window.innerHeight - this.getOffset());
    const viewportWidth = (window.innerWidth - this.getOffset());

    const maxScaleFactor = originalFullImageWidth / this._targetImage.width;

    // Zoom to fit the viewport.
    const imageAspectRatio =
        originalFullImageWidth / originalFullImageHeight;
    const viewportAspectRatio = viewportWidth / viewportHeight;

    if (originalFullImageWidth < viewportWidth &&
            originalFullImageHeight < viewportHeight) {
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
    var viewportY = $(window).scrollTop() + (window.innerHeight / 2);
    var viewportX = $(window).scrollLeft() + (window.innerWidth / 2);

    var scaleFactor = this._imgScaleFactor;

    var imageCenterY = this._imageOffset.top + (this._targetImage.height / 2);
    var imageCenterX = this._imageOffset.left + (this._targetImage.width / 2);

    this._translateY = (viewportY - imageCenterY) / scaleFactor;
    this._translateX = (viewportX - imageCenterX) / scaleFactor;

    // NOTE: This is re-used below.
    this._zoomedInTransformString = `
        scale(${scaleFactor})
        translate3d(${this._translateX}px, ${this._translateY}px, 0)
    `;

    this.$zoomedImage
        .css({
            transform: this._zoomedInTransformString,
        })
        .addClass('zoom-transition')
        .one($.support.transition.end, $.proxy(this._onZoomInFinish, this))
        .emulateTransitionEnd(300);

    this._$body.addClass('zoom-overlay-open');
};

Zoom.prototype._onZoomInFinish = function() {
    // Remove the transform on the image, but make it look exactly the same as
    // the image with the transform -- full-size and centered in the viewport
    // -- using margins + left/top + scroll
    //
    // We need to remove the transform for scrolling to work -- the browser
    // would still calculate the element position/sizing by its pre-transform
    // dimensions.

    const height = this._targetImage.height * this._imgScaleFactor;
    const width = this._targetImage.width * this._imgScaleFactor;
    let left = 0;
    let top = 0;
    let marginLeft = 0;
    let marginTop = 0;
    let scrollLeft = 0;
    let scrollTop = 0;

    // Horizontally center the image within the viewport, either by positioning
    // with CSS or scrolling the viewport.
    if (width < window.innerWidth) {
        left = "50%";
        marginLeft = -width / 2;
    } else {
        scrollLeft = (width - window.innerWidth) / 2;
    }

    // ... and similarly, vertically center the image within the viewport.
    if (height < window.innerHeight) {
        top = "50%";
        marginTop = -height / 2;
    } else {
        scrollTop = (height - window.innerHeight) / 2;
    }

    this.$zoomedImage
        .css({
            height: height,
            left: left,
            marginLeft: marginLeft,
            marginTop: marginTop,
            top: top,
            transform: '',
            width: width,
        })
        .removeClass('zoom-transition');

    $(this._overlay).scrollLeft(scrollLeft).scrollTop(scrollTop);
};

Zoom.prototype.close = function() {
    this._$body
        .removeClass('zoom-overlay-open')
        .addClass('zoom-overlay-transitioning');

    // Upon closing the image, zoom it back out. Do this by first re-applying the
    // zoomed-in transform and resetting the CSS top/left + margins to what it
    // was right after zooming in -- basically undoing what we did in
    // _onZoomInFinish.
    // TODO(david): Adjust this translation of the transform to take into
    //     account the current scroll position of the image (if the user
    //     scrolled the image after it was zoomed).
    this.$zoomedImage
        .css({
            height: this._targetImage.height,
            left: this._left,
            marginLeft: 0,
            marginTop: 0,
            top: this._top,
            transform: this._zoomedInTransformString,
            width: this._targetImage.width,
        })
        .removeClass('zoom-transition');

    $(this._overlay).scrollLeft(0).scrollTop(0);

    // ... now that the image and its container have been set up to be in the
    // same state as right at the end of the zoom-in animation, reset the
    // transform to scale(1) to achieve the zoom-out-into-image-on-document
    // animation.
    setTimeout(() => {
        this.$zoomedImage
            .css({
                transform: 'scale(1)',
            })
            .addClass('zoom-transition')
           .one($.support.transition.end, $.proxy(this.dispose, this))
           .emulateTransitionEnd(300);
    }, 10);
};

Zoom.prototype.dispose = function() {
    if (this.$zoomedImage && this.$zoomedImage[0].parentNode) {
        this.$zoomedImage.remove();
        this.$zoomedImage = null;

        this._overlay.parentNode.removeChild(this._overlay);
        this._backdrop.parentNode.removeChild(this._backdrop);

        this._$body.removeClass('zoom-overlay-transitioning');
    }
    $(this._targetImage).css('visibility', 'visible');
};

exports.ZoomService = new ZoomService();
