(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define([], factory);
    else if(typeof exports === 'object')
        exports["hubble"] = factory();
    else
        root["hubble"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};
/******/
/******/    // The require function
/******/    function __webpack_require__(moduleId) {
/******/
/******/        // Check if module is in cache
/******/        if(installedModules[moduleId]) {
/******/            return installedModules[moduleId].exports;
/******/        }
/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            i: moduleId,
/******/            l: false,
/******/            exports: {}
/******/        };
/******/
/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/        // Flag the module as loaded
/******/        module.l = true;
/******/
/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }
/******/
/******/
/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;
/******/
/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;
/******/
/******/    // define getter function for harmony exports
/******/    __webpack_require__.d = function(exports, name, getter) {
/******/        if(!__webpack_require__.o(exports, name)) {
/******/            Object.defineProperty(exports, name, {
/******/                configurable: false,
/******/                enumerable: true,
/******/                get: getter
/******/            });
/******/        }
/******/    };
/******/
/******/    // getDefaultExport function for compatibility with non-harmony modules
/******/    __webpack_require__.n = function(module) {
/******/        var getter = module && module.__esModule ?
/******/            function getDefault() { return module['default']; } :
/******/            function getModuleExports() { return module; };
/******/        __webpack_require__.d(getter, 'a', getter);
/******/        return getter;
/******/    };
/******/
/******/    // Object.prototype.hasOwnProperty.call
/******/    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";
/******/
/******/    // Load entry module and return exports
/******/    return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var isObject = function(obj) {
    return obj === Object(obj);;
}

var merge = function() {
    var obj = {};

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];
        if (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    }

    return obj;
};

var clone = function(obj) {
    if (!isObject(obj)) {
        return obj;
    }

    return Array.isArray(obj) ? obj.slice() : merge(obj);
};

module.exports = { isObject: isObject, merge: merge, clone: clone };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* TODO batch *all* mutations
 * idea: freeze / thaw implementations for all types
 * lens constructor thaws, freeze delegates to type's freeze
 */

var util = __webpack_require__(0);
    var clone = util.clone;
    var isObject = util.isObject;
    var merge = util.merge;

var arr = __webpack_require__(2);
var obj = __webpack_require__(3);
var str = __webpack_require__(4);

// equivalents, without requiring it
// find the implementation to use for a given object
var dispatch = function(x) {
    if (Array.isArray(x)) {
        return arr;
    } else if (isObject(x)) {
        return obj;
    } else if (typeof x === "string") {
        return str;
    }
};

// This is underscore with a different name
var lens = function(obj) {
    if (obj instanceof lens) {
        return obj;
    }

    if (!(this instanceof lens)) {
        return new lens(obj);
    }

    var ops = dispatch(obj);
    this._wrapped = ops.thaw ? ops.thaw(obj) : obj;
};

lens.prototype.freeze = function() {
    var obj = this._wrapped;
    var ops = dispatch(obj);

    return ops.freeze ? ops.freeze(obj) : obj;
};

lens.prototype.zoom = function(lensArr) {
    if (this._zoomStack === undefined) {
        this._zoomStack = [];
    }

    this._zoomStack.push({
        zoom: lensArr,
        wrapped: this._wrapped
    });
    this._wrapped = lens(this._wrapped).get(lensArr);

    return this;
};

lens.prototype.deZoom = function() {
    var frame = this._zoomStack.pop();
    this._wrapped = lens(frame.wrapped)
        .set(frame.zoom, this._wrapped)
        .freeze();

    return this;
};

lens.prototype.get = function(lensArr) {
    var obj = this._wrapped;

    for (var i = 0; i < lensArr.length; i++) {
        obj = dispatch(obj).get(obj, lensArr[i]);
    }

    return obj;
};

lens.prototype.mod = function(lensArr, f) {
    var obj = this._wrapped;
    var newObj = clone(obj);
    var ops = dispatch(obj);

    if (lensArr.length === 0) {
        this._wrapped = f(this._wrapped);
    } else if (lensArr.length === 1) {
        this._wrapped = ops.mod(newObj, lensArr[0], f);
    } else {
        var monocle = lensArr[0];
        var shortLens = lensArr.slice(1);

        // newObj = ops.mod(obj[monocle], shortLens, f);

        newObj[monocle] = lens(obj[monocle])
            .mod(shortLens, f)
            .freeze();
        this._wrapped = newObj;
    }

    return this;
};

// TODO - move to individual files
lens.prototype.merge = function(lensArr, props) {
    this._wrapped = lens(this._wrapped).mod(lensArr, function(oldProps) {
        return merge(oldProps, props);
    }).freeze();

    return this;
};

// Lens must have length >= 1 or there would be nothing to return
lens.prototype.del = function(lensArr) {
    var obj = this._wrapped;
    var ops = dispatch(obj);

    if (lensArr.length === 1) {
        this._wrapped = ops.del(obj, lensArr[0]);
    } else {
        var monocle = lensArr[0];
        var shortLens = lensArr.slice(1);
        var newObj = clone(obj);

        newObj[monocle] = lens(obj[monocle])
            .del(shortLens)
            .freeze();

        this._wrapped = newObj;
    }

    return this;
};

lens.prototype.set = function(lensArr, set) {
    return this.mod(lensArr, function() { return set; });
};

module.exports = lens;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var get = function(arr, monocle) {
    return arr[monocle];
};

var set = function(arr, monocle, val) {
    var newArr = arr.splice();
    newArr[monocle] = val;
    return newArr;
};

var mod = function(arr, monocle, f) {
    var newArr = arr.slice();
    newArr[monocle] = f(arr[monocle]);
    return newArr;
};

var del = function(arr, monocle) {
    var newArr = arr.slice();
    newArr.splice(monocle, 1);
    return newArr;
};

/*
// Lens must point to a member of an array. We'll insert into that array.
lens.prototype.insertAt = function(lensArr, toInsert) {
    var obj = this._wrapped;

    var arrLens = lensArr.slice(0, -1);
    var arr = lens(obj).get(arrLens).slice(); // slice to copy

    var arrIdx = lensArr[lensArr.length-1];
    arr.splice(arrIdx, 0, toInsert);
    return lens(obj).set(arrLens, arr);
};

lens.prototype.insertBefore = lens.prototype.insertAt;
lens.prototype.insertAfter = function(lensArr, toInsert) {
    var newLens = lensArr.slice();
    newLens[newLens.length-1] += 1;
    return lens(this._wrapped).insertAt(newLens, toInsert);
};
*/

module.exports = { get: get, set: set, mod: mod, del: del };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var clone = __webpack_require__(0).clone;

var get = function(obj, monocle) {
    return obj[monocle];
};

var set = function(obj, monocle, val) {
    var newObj = clone(obj);
    newObj[monocle] = val;
    return newObj;
};

var mod = function(obj, monocle, f) {
    var newObj = clone(obj);
    newObj[monocle] = f(obj[monocle]);
    return newObj;
};

var del = function(obj, monocle) {
    var newObj = clone(obj);
    delete newObj[monocle];
    return newObj;
};

module.exports = { get: get, set: set, mod: mod, del: del };


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var get = function(arr, monocle) {
    return arr[monocle];
};

var set = function(arr, monocle, val) {
    var newArr = arr.splice();
    newArr[monocle] = val;
    return newArr;
};

var mod = function(arr, monocle, f) {
    var newArr = arr.splice();
    newArr[monocle] = f(arr[monocle]);
    return newArr;
};

var del = function(arr, monocle) {
    var newArr = arr.slice();
    newArr.splice(monocle);
    return newArr;
};

module.exports = { get: get, set: set, mod: mod, del: del };


/***/ })
/******/ ]);
});
