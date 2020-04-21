(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("omi"));
	else if(typeof define === 'function' && define.amd)
		define(["omi"], factory);
	else if(typeof exports === 'object')
		exports["OTabs"] = factory(require("omi"));
	else
		root["OTabs"] = factory(root["Omi"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_omi__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./color.js":
/*!******************!*\
  !*** ./color.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var colorString = __webpack_require__(/*! color-string */ "./node_modules/_color-string@1.5.3@color-string/index.js");
var convert = __webpack_require__(/*! color-convert */ "./node_modules/_color-convert@1.9.3@color-convert/index.js");
var _slice = [].slice;
var skippedModels = [
    // to be honest, I don't really feel like keyword belongs in color convert, but eh.
    'keyword',
    // gray conflicts with some method names, and has its own method defined.
    'gray',
    // shouldn't really be in color-convert either...
    'hex'
];
var hashedModelKeys = {};
Object.keys(convert).forEach(function (model) {
    hashedModelKeys[_slice.call(convert[model].labels).sort().join('')] = model;
});
var limiters = {};
function Color(obj, model) {
    if (!(this instanceof Color)) {
        return new Color(obj, model);
    }
    if (model && model in skippedModels) {
        model = null;
    }
    if (model && !(model in convert)) {
        throw new Error('Unknown model: ' + model);
    }
    var i;
    var channels;
    if (obj == null) { // eslint-disable-line no-eq-null,eqeqeq
        this.model = 'rgb';
        this.color = [0, 0, 0];
        this.valpha = 1;
    }
    else if (obj instanceof Color) {
        this.model = obj.model;
        this.color = obj.color.slice();
        this.valpha = obj.valpha;
    }
    else if (typeof obj === 'string') {
        var result = colorString.get(obj);
        if (result === null) {
            throw new Error('Unable to parse color from string: ' + obj);
        }
        this.model = result.model;
        channels = convert[this.model].channels;
        this.color = result.value.slice(0, channels);
        this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
    }
    else if (obj.length) {
        this.model = model || 'rgb';
        channels = convert[this.model].channels;
        var newArr = _slice.call(obj, 0, channels);
        this.color = zeroArray(newArr, channels);
        this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
    }
    else if (typeof obj === 'number') {
        // this is always RGB - can be converted later on.
        obj &= 0xFFFFFF;
        this.model = 'rgb';
        this.color = [
            (obj >> 16) & 0xFF,
            (obj >> 8) & 0xFF,
            obj & 0xFF
        ];
        this.valpha = 1;
    }
    else {
        this.valpha = 1;
        var keys = Object.keys(obj);
        if ('alpha' in obj) {
            keys.splice(keys.indexOf('alpha'), 1);
            this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
        }
        var hashedKeys = keys.sort().join('');
        if (!(hashedKeys in hashedModelKeys)) {
            throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
        }
        this.model = hashedModelKeys[hashedKeys];
        var labels = convert[this.model].labels;
        var color = [];
        for (i = 0; i < labels.length; i++) {
            color.push(obj[labels[i]]);
        }
        this.color = zeroArray(color);
    }
    // perform limitations (clamping, etc.)
    if (limiters[this.model]) {
        channels = convert[this.model].channels;
        for (i = 0; i < channels; i++) {
            var limit = limiters[this.model][i];
            if (limit) {
                this.color[i] = limit(this.color[i]);
            }
        }
    }
    this.valpha = Math.max(0, Math.min(1, this.valpha));
    if (Object.freeze) {
        Object.freeze(this);
    }
}
Color.prototype = {
    toString: function () {
        return this.string();
    },
    toJSON: function () {
        return this[this.model]();
    },
    string: function (places) {
        var self = this.model in colorString.to ? this : this.rgb();
        self = self.round(typeof places === 'number' ? places : 1);
        var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
        return colorString.to[self.model](args);
    },
    percentString: function (places) {
        var self = this.rgb().round(typeof places === 'number' ? places : 1);
        var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
        return colorString.to.rgb.percent(args);
    },
    array: function () {
        return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
    },
    object: function () {
        var result = {};
        var channels = convert[this.model].channels;
        var labels = convert[this.model].labels;
        for (var i = 0; i < channels; i++) {
            result[labels[i]] = this.color[i];
        }
        if (this.valpha !== 1) {
            result.alpha = this.valpha;
        }
        return result;
    },
    unitArray: function () {
        var rgb = this.rgb().color;
        rgb[0] /= 255;
        rgb[1] /= 255;
        rgb[2] /= 255;
        if (this.valpha !== 1) {
            rgb.push(this.valpha);
        }
        return rgb;
    },
    unitObject: function () {
        var rgb = this.rgb().object();
        rgb.r /= 255;
        rgb.g /= 255;
        rgb.b /= 255;
        if (this.valpha !== 1) {
            rgb.alpha = this.valpha;
        }
        return rgb;
    },
    round: function (places) {
        places = Math.max(places || 0, 0);
        return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
    },
    alpha: function (val) {
        if (arguments.length) {
            return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
        }
        return this.valpha;
    },
    // rgb
    red: getset('rgb', 0, maxfn(255)),
    green: getset('rgb', 1, maxfn(255)),
    blue: getset('rgb', 2, maxfn(255)),
    hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }),
    saturationl: getset('hsl', 1, maxfn(100)),
    lightness: getset('hsl', 2, maxfn(100)),
    saturationv: getset('hsv', 1, maxfn(100)),
    value: getset('hsv', 2, maxfn(100)),
    chroma: getset('hcg', 1, maxfn(100)),
    gray: getset('hcg', 2, maxfn(100)),
    white: getset('hwb', 1, maxfn(100)),
    wblack: getset('hwb', 2, maxfn(100)),
    cyan: getset('cmyk', 0, maxfn(100)),
    magenta: getset('cmyk', 1, maxfn(100)),
    yellow: getset('cmyk', 2, maxfn(100)),
    black: getset('cmyk', 3, maxfn(100)),
    x: getset('xyz', 0, maxfn(100)),
    y: getset('xyz', 1, maxfn(100)),
    z: getset('xyz', 2, maxfn(100)),
    l: getset('lab', 0, maxfn(100)),
    a: getset('lab', 1),
    b: getset('lab', 2),
    keyword: function (val) {
        if (arguments.length) {
            return new Color(val);
        }
        return convert[this.model].keyword(this.color);
    },
    hex: function (val) {
        if (arguments.length) {
            return new Color(val);
        }
        return colorString.to.hex(this.rgb().round().color);
    },
    rgbNumber: function () {
        var rgb = this.rgb().color;
        return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
    },
    luminosity: function () {
        // http://www.w3.org/TR/WCAG20/#relativeluminancedef
        var rgb = this.rgb().color;
        var lum = [];
        for (var i = 0; i < rgb.length; i++) {
            var chan = rgb[i] / 255;
            lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
        }
        return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
    },
    contrast: function (color2) {
        // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
        var lum1 = this.luminosity();
        var lum2 = color2.luminosity();
        if (lum1 > lum2) {
            return (lum1 + 0.05) / (lum2 + 0.05);
        }
        return (lum2 + 0.05) / (lum1 + 0.05);
    },
    level: function (color2) {
        var contrastRatio = this.contrast(color2);
        if (contrastRatio >= 7.1) {
            return 'AAA';
        }
        return (contrastRatio >= 4.5) ? 'AA' : '';
    },
    isDark: function () {
        // YIQ equation from http://24ways.org/2010/calculating-color-contrast
        var rgb = this.rgb().color;
        var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        return yiq < 128;
    },
    isLight: function () {
        return !this.isDark();
    },
    negate: function () {
        var rgb = this.rgb();
        for (var i = 0; i < 3; i++) {
            rgb.color[i] = 255 - rgb.color[i];
        }
        return rgb;
    },
    lighten: function (ratio) {
        var hsl = this.hsl();
        //hsl.color[2] += hsl.color[2] * ratio;
        hsl.color[2] += ratio * 100;
        return hsl;
    },
    darken: function (ratio) {
        var hsl = this.hsl();
        //hsl.color[2] -= hsl.color[2] * ratio;
        hsl.color[2] -= ratio * 100;
        return hsl;
    },
    saturate: function (ratio) {
        var hsl = this.hsl();
        hsl.color[1] += hsl.color[1] * ratio;
        return hsl;
    },
    desaturate: function (ratio) {
        var hsl = this.hsl();
        hsl.color[1] -= hsl.color[1] * ratio;
        return hsl;
    },
    whiten: function (ratio) {
        var hwb = this.hwb();
        hwb.color[1] += hwb.color[1] * ratio;
        return hwb;
    },
    blacken: function (ratio) {
        var hwb = this.hwb();
        hwb.color[2] += hwb.color[2] * ratio;
        return hwb;
    },
    grayscale: function () {
        // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
        var rgb = this.rgb().color;
        var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
        return Color.rgb(val, val, val);
    },
    fade: function (ratio) {
        return this.alpha(this.valpha - (this.valpha * ratio));
    },
    opaquer: function (ratio) {
        return this.alpha(this.valpha + (this.valpha * ratio));
    },
    rotate: function (degrees) {
        var hsl = this.hsl();
        var hue = hsl.color[0];
        hue = (hue + degrees) % 360;
        hue = hue < 0 ? 360 + hue : hue;
        hsl.color[0] = hue;
        return hsl;
    },
    mix: function (mixinColor, weight) {
        // ported from sass implementation in C
        // https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
        if (!mixinColor || !mixinColor.rgb) {
            throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
        }
        var color1 = mixinColor.rgb();
        var color2 = this.rgb();
        var p = weight === undefined ? 0.5 : weight;
        var w = 2 * p - 1;
        var a = color1.alpha() - color2.alpha();
        var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
        var w2 = 1 - w1;
        return Color.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue(), color1.alpha() * p + color2.alpha() * (1 - p));
    }
};
// model conversion methods and static constructors
Object.keys(convert).forEach(function (model) {
    if (skippedModels.indexOf(model) !== -1) {
        return;
    }
    var channels = convert[model].channels;
    // conversion methods
    Color.prototype[model] = function () {
        if (this.model === model) {
            return new Color(this);
        }
        if (arguments.length) {
            return new Color(arguments, model);
        }
        var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
        return new Color(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);
    };
    // 'static' construction methods
    Color[model] = function (color) {
        if (typeof color === 'number') {
            color = zeroArray(_slice.call(arguments), channels);
        }
        return new Color(color, model);
    };
});
function roundTo(num, places) {
    return Number(num.toFixed(places));
}
function roundToPlace(places) {
    return function (num) {
        return roundTo(num, places);
    };
}
function getset(model, channel, modifier) {
    model = Array.isArray(model) ? model : [model];
    model.forEach(function (m) {
        (limiters[m] || (limiters[m] = []))[channel] = modifier;
    });
    model = model[0];
    return function (val) {
        var result;
        if (arguments.length) {
            if (modifier) {
                val = modifier(val);
            }
            result = this[model]();
            result.color[channel] = val;
            return result;
        }
        result = this[model]().color[channel];
        if (modifier) {
            result = modifier(result);
        }
        return result;
    };
}
function maxfn(max) {
    return function (v) {
        return Math.max(0, Math.min(max, v));
    };
}
function assertArray(val) {
    return Array.isArray(val) ? val : [val];
}
function zeroArray(arr, length) {
    for (var i = 0; i < length; i++) {
        if (typeof arr[i] !== 'number') {
            arr[i] = 0;
        }
    }
    return arr;
}
module.exports = Color;


/***/ }),

/***/ "./node_modules/_color-convert@1.9.3@color-convert/conversions.js":
/*!************************************************************************!*\
  !*** ./node_modules/_color-convert@1.9.3@color-convert/conversions.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var cssKeywords = __webpack_require__(/*! color-name */ "./node_modules/_color-name@1.1.3@color-name/index.js");

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),

/***/ "./node_modules/_color-convert@1.9.3@color-convert/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/_color-convert@1.9.3@color-convert/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(/*! ./conversions */ "./node_modules/_color-convert@1.9.3@color-convert/conversions.js");
var route = __webpack_require__(/*! ./route */ "./node_modules/_color-convert@1.9.3@color-convert/route.js");

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),

/***/ "./node_modules/_color-convert@1.9.3@color-convert/route.js":
/*!******************************************************************!*\
  !*** ./node_modules/_color-convert@1.9.3@color-convert/route.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(/*! ./conversions */ "./node_modules/_color-convert@1.9.3@color-convert/conversions.js");

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),

/***/ "./node_modules/_color-name@1.1.3@color-name/index.js":
/*!************************************************************!*\
  !*** ./node_modules/_color-name@1.1.3@color-name/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ "./node_modules/_color-name@1.1.4@color-name/index.js":
/*!************************************************************!*\
  !*** ./node_modules/_color-name@1.1.4@color-name/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ "./node_modules/_color-string@1.5.3@color-string/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/_color-string@1.5.3@color-string/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var colorNames = __webpack_require__(/*! color-name */ "./node_modules/_color-name@1.1.4@color-name/index.js");
var swizzle = __webpack_require__(/*! simple-swizzle */ "./node_modules/_simple-swizzle@0.2.2@simple-swizzle/index.js");

var reverseNames = {};

// create a list of reverse color names
for (var name in colorNames) {
	if (colorNames.hasOwnProperty(name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = module.exports = {
	to: {},
	get: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorNames[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = (parseFloat(match[1]) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}


/***/ }),

/***/ "./node_modules/_css-loader@1.0.1@css-loader/index.js!./node_modules/_resolve-url-loader@3.1.1@resolve-url-loader/index.js!./node_modules/_sass-loader@7.3.1@sass-loader/dist/cjs.js?!./src/index.scss":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_css-loader@1.0.1@css-loader!./node_modules/_resolve-url-loader@3.1.1@resolve-url-loader!./node_modules/_sass-loader@7.3.1@sass-loader/dist/cjs.js??ref--4-3!./src/index.scss ***!
  \****************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/_css-loader@1.0.1@css-loader/lib/css-base.js */ "./node_modules/_css-loader@1.0.1@css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  display: block; }\n\n.o-tabs__header {\n  padding: 0;\n  position: relative;\n  margin: 0 0 15px; }\n\n.o-tabs__active-bar {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 2px;\n  background-color: #07c160;\n  z-index: 1;\n  -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  list-style: none; }\n\n.o-tabs__new-tab {\n  float: right;\n  border: 1px solid #d3dce6;\n  height: 18px;\n  width: 18px;\n  line-height: 18px;\n  margin: 12px 0 9px 10px;\n  border-radius: 3px;\n  text-align: center;\n  font-size: 12px;\n  color: #d3dce6;\n  cursor: pointer;\n  -webkit-transition: all .15s;\n  transition: all .15s; }\n\n.o-tabs__new-tab .o-icon-plus {\n  -webkit-transform: scale(0.8, 0.8);\n  transform: scale(0.8, 0.8); }\n\n.o-tabs__new-tab:hover {\n  color: #07c160; }\n\n.o-tabs__nav-wrap {\n  overflow: hidden;\n  margin-bottom: -1px;\n  position: relative; }\n\n.o-tabs__nav-wrap::after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  height: 2px;\n  background-color: #E4E7ED;\n  z-index: 1; }\n\n.o-tabs--border-card > .o-tabs__header .o-tabs__nav-wrap::after,\n.o-tabs--card > .o-tabs__header .o-tabs__nav-wrap::after {\n  content: none; }\n\n.o-tabs__nav-wrap.is-scrollable {\n  padding: 0 20px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.o-tabs__nav-scroll {\n  overflow: hidden; }\n\n.o-tabs__nav-next,\n.o-tabs__nav-prev {\n  position: absolute;\n  cursor: pointer;\n  line-height: 44px;\n  font-size: 12px;\n  color: #909399; }\n\n.o-tabs__nav-next {\n  right: 0; }\n\n.o-tabs__nav-prev {\n  left: 0; }\n\n.o-tabs__nav {\n  white-space: nowrap;\n  position: relative;\n  -webkit-transition: -webkit-transform .3s;\n  transition: -webkit-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s, -webkit-transform .3s;\n  float: left;\n  z-index: 2; }\n\n.o-tabs__nav.is-stretch {\n  min-width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.o-tabs__nav.is-stretch > * {\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  text-align: center; }\n\n.o-tabs__item {\n  padding: 0 20px;\n  height: 40px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  line-height: 40px;\n  display: inline-block;\n  list-style: none;\n  font-size: 14px;\n  font-weight: 500;\n  color: #303133;\n  position: relative; }\n\n.o-tabs__item:focus,\n.o-tabs__item:focus:active {\n  outline: 0; }\n\n.o-tabs__item:focus.is-active.is-focus:not(:active) {\n  -webkit-box-shadow: 0 0 2px 2px #07c160 inset;\n  box-shadow: 0 0 2px 2px #07c160 inset;\n  border-radius: 3px; }\n\n.o-tabs__item:hover .o-icon-close {\n  visibility: visible; }\n\n.o-tabs__item .o-icon-close {\n  visibility: hidden;\n  border-radius: 50%;\n  text-align: center;\n  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  margin-left: 5px; }\n\n.o-tabs__item .o-icon-close:before {\n  -webkit-transform: scale(0.9);\n  transform: scale(0.9);\n  display: inline-block; }\n\n.o-tabs__item .o-icon-close:hover {\n  background-color: #C0C4CC;\n  color: #FFF; }\n\n.o-tabs__item.is-active {\n  color: #07c160; }\n\n.o-tabs__item:hover {\n  color: #07c160;\n  cursor: pointer; }\n\n.o-tabs__item.is-disabled {\n  color: #C0C4CC;\n  cursor: default; }\n\n.o-tabs__content {\n  overflow: hidden;\n  position: relative; }\n\n.o-tabs--card > .o-tabs__header {\n  border-bottom: 1px solid #E4E7ED; }\n\n.o-tabs--card > .o-tabs__header .o-tabs__nav {\n  border: 1px solid #E4E7ED;\n  border-bottom: none;\n  border-radius: 4px 4px 0 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.o-tabs--card > .o-tabs__header .o-tabs__active-bar {\n  display: none; }\n\n.o-tabs--card > .o-tabs__header .o-tabs__item .o-icon-close {\n  position: relative;\n  font-size: 12px;\n  width: 0;\n  height: 14px;\n  vertical-align: middle;\n  line-height: 15px;\n  overflow: hidden;\n  top: -1px;\n  right: -2px;\n  -webkit-transform-origin: 100% 50%;\n  transform-origin: 100% 50%; }\n\n.o-tabs--card > .o-tabs__header .o-tabs__item.is-active.is-closable .o-icon-close,\n.o-tabs--card > .o-tabs__header .o-tabs__item.is-closable:hover .o-icon-close {\n  width: 14px; }\n\n.o-tabs--card > .o-tabs__header .o-tabs__item {\n  border-bottom: 1px solid transparent;\n  border-left: 1px solid #E4E7ED;\n  -webkit-transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1); }\n\n.o-tabs--card > .o-tabs__header .o-tabs__item:first-child {\n  border-left: none; }\n\n.o-tabs--card > .o-tabs__header .o-tabs__item.is-closable:hover {\n  padding-left: 13px;\n  padding-right: 13px; }\n\n.o-tabs--card > .o-tabs__header .o-tabs__item.is-active {\n  border-bottom-color: #FFF; }\n\n.o-tabs--card > .o-tabs__header .o-tabs__item.is-active.is-closable {\n  padding-left: 20px;\n  padding-right: 20px; }\n\n.o-tabs--border-card {\n  background: #FFF;\n  border: 1px solid #DCDFE6;\n  border-bottom: none; }\n\n.o-tabs--border-card.o-tabs--bottom {\n  border: 1px solid #DCDFE6; }\n\n.o-tabs--border-card > .o-tabs__content {\n  padding: 15px; }\n\n.o-tabs--border-card > .o-tabs__header {\n  background-color: #F5F7FA;\n  border-bottom: 1px solid #E4E7ED;\n  margin: 0; }\n\n.o-tabs--border-card > .o-tabs__header .o-tabs__item {\n  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  border: 1px solid transparent;\n  margin-top: -1px;\n  color: #909399; }\n\n.o-tabs--border-card > .o-tabs__header .o-tabs__item + .o-tabs__item,\n.o-tabs--border-card > .o-tabs__header .o-tabs__item:first-child {\n  margin-left: -1px; }\n\n.o-tabs--border-card > .o-tabs__header .o-tabs__item.is-active {\n  color: #07c160;\n  background-color: #FFF;\n  border-right-color: #DCDFE6;\n  border-left-color: #DCDFE6; }\n\n.o-tabs--border-card > .o-tabs__header .o-tabs__item:not(.is-disabled):hover {\n  color: #07c160; }\n\n.o-tabs--border-card > .o-tabs__header .o-tabs__item.is-disabled {\n  color: #C0C4CC; }\n\n.o-tabs--border-card > .o-tabs__header .is-scrollable .o-tabs__item:first-child {\n  margin-left: 0; }\n\n.o-tabs--bottom .o-tabs__item.is-bottom:nth-child(2),\n.o-tabs--bottom .o-tabs__item.is-top:nth-child(2),\n.o-tabs--top .o-tabs__item.is-bottom:nth-child(2),\n.o-tabs--top .o-tabs__item.is-top:nth-child(2) {\n  padding-left: 0; }\n\n.o-tabs--bottom .o-tabs__item.is-bottom:last-child,\n.o-tabs--bottom .o-tabs__item.is-top:last-child,\n.o-tabs--top .o-tabs__item.is-bottom:last-child,\n.o-tabs--top .o-tabs__item.is-top:last-child {\n  padding-right: 0; }\n\n.o-tabs--bottom .o-tabs--left > .o-tabs__header .o-tabs__item:nth-child(2),\n.o-tabs--bottom .o-tabs--right > .o-tabs__header .o-tabs__item:nth-child(2),\n.o-tabs--bottom.o-tabs--border-card > .o-tabs__header .o-tabs__item:nth-child(2),\n.o-tabs--bottom.o-tabs--card > .o-tabs__header .o-tabs__item:nth-child(2),\n.o-tabs--top .o-tabs--left > .o-tabs__header .o-tabs__item:nth-child(2),\n.o-tabs--top .o-tabs--right > .o-tabs__header .o-tabs__item:nth-child(2),\n.o-tabs--top.o-tabs--border-card > .o-tabs__header .o-tabs__item:nth-child(2),\n.o-tabs--top.o-tabs--card > .o-tabs__header .o-tabs__item:nth-child(2) {\n  padding-left: 20px; }\n\n.o-tabs--bottom .o-tabs--left > .o-tabs__header .o-tabs__item:last-child,\n.o-tabs--bottom .o-tabs--right > .o-tabs__header .o-tabs__item:last-child,\n.o-tabs--bottom.o-tabs--border-card > .o-tabs__header .o-tabs__item:last-child,\n.o-tabs--bottom.o-tabs--card > .o-tabs__header .o-tabs__item:last-child,\n.o-tabs--top .o-tabs--left > .o-tabs__header .o-tabs__item:last-child,\n.o-tabs--top .o-tabs--right > .o-tabs__header .o-tabs__item:last-child,\n.o-tabs--top.o-tabs--border-card > .o-tabs__header .o-tabs__item:last-child,\n.o-tabs--top.o-tabs--card > .o-tabs__header .o-tabs__item:last-child {\n  padding-right: 20px; }\n\n.o-tabs--bottom.o-tabs--border-card {\n  border-top: none; }\n\n.o-tabs--bottom.o-tabs--border-card .o-tabs__header.is-bottom {\n  border-bottom: 0;\n  border-top: 1px solid #DCDFE6; }\n\n.o-tabs--bottom.o-tabs--border-card .o-tabs__nav-wrap.is-bottom {\n  margin-top: -1px;\n  margin-bottom: 0; }\n\n.o-tabs--bottom.o-tabs--border-card .o-tabs__item.is-bottom:not(.is-active) {\n  border: 1px solid transparent; }\n\n.o-tabs--bottom.o-tabs--border-card .o-tabs__item.is-bottom {\n  margin: 0 -1px -1px; }\n\n.o-tabs--left,\n.o-tabs--right {\n  overflow: hidden; }\n\n.o-tabs--left .o-tabs__header.is-left,\n.o-tabs--left .o-tabs__header.is-right,\n.o-tabs--left .o-tabs__nav-scroll,\n.o-tabs--left .o-tabs__nav-wrap.is-left,\n.o-tabs--left .o-tabs__nav-wrap.is-right,\n.o-tabs--right .o-tabs__header.is-left,\n.o-tabs--right .o-tabs__header.is-right,\n.o-tabs--right .o-tabs__nav-scroll,\n.o-tabs--right .o-tabs__nav-wrap.is-left,\n.o-tabs--right .o-tabs__nav-wrap.is-right {\n  height: 100%; }\n\n.o-tabs--left .o-tabs__active-bar.is-left,\n.o-tabs--left .o-tabs__active-bar.is-right,\n.o-tabs--right .o-tabs__active-bar.is-left,\n.o-tabs--right .o-tabs__active-bar.is-right {\n  top: 0;\n  bottom: auto;\n  width: 2px;\n  height: auto; }\n\n.o-tabs--left .o-tabs__nav-wrap.is-left,\n.o-tabs--left .o-tabs__nav-wrap.is-right,\n.o-tabs--right .o-tabs__nav-wrap.is-left,\n.o-tabs--right .o-tabs__nav-wrap.is-right {\n  margin-bottom: 0; }\n\n.o-tabs--left .o-tabs__nav-wrap.is-left > .o-tabs__nav-next,\n.o-tabs--left .o-tabs__nav-wrap.is-left > .o-tabs__nav-prev,\n.o-tabs--left .o-tabs__nav-wrap.is-right > .o-tabs__nav-next,\n.o-tabs--left .o-tabs__nav-wrap.is-right > .o-tabs__nav-prev,\n.o-tabs--right .o-tabs__nav-wrap.is-left > .o-tabs__nav-next,\n.o-tabs--right .o-tabs__nav-wrap.is-left > .o-tabs__nav-prev,\n.o-tabs--right .o-tabs__nav-wrap.is-right > .o-tabs__nav-next,\n.o-tabs--right .o-tabs__nav-wrap.is-right > .o-tabs__nav-prev {\n  height: 30px;\n  line-height: 30px;\n  width: 100%;\n  text-align: center;\n  cursor: pointer; }\n\n.o-tabs--left .o-tabs__nav-wrap.is-left > .o-tabs__nav-next i,\n.o-tabs--left .o-tabs__nav-wrap.is-left > .o-tabs__nav-prev i,\n.o-tabs--left .o-tabs__nav-wrap.is-right > .o-tabs__nav-next i,\n.o-tabs--left .o-tabs__nav-wrap.is-right > .o-tabs__nav-prev i,\n.o-tabs--right .o-tabs__nav-wrap.is-left > .o-tabs__nav-next i,\n.o-tabs--right .o-tabs__nav-wrap.is-left > .o-tabs__nav-prev i,\n.o-tabs--right .o-tabs__nav-wrap.is-right > .o-tabs__nav-next i,\n.o-tabs--right .o-tabs__nav-wrap.is-right > .o-tabs__nav-prev i {\n  -webkit-transform: rotateZ(90deg);\n  transform: rotateZ(90deg); }\n\n.o-tabs--left .o-tabs__nav-wrap.is-left > .o-tabs__nav-prev,\n.o-tabs--left .o-tabs__nav-wrap.is-right > .o-tabs__nav-prev,\n.o-tabs--right .o-tabs__nav-wrap.is-left > .o-tabs__nav-prev,\n.o-tabs--right .o-tabs__nav-wrap.is-right > .o-tabs__nav-prev {\n  left: auto;\n  top: 0; }\n\n.o-tabs--left .o-tabs__nav-wrap.is-left > .o-tabs__nav-next,\n.o-tabs--left .o-tabs__nav-wrap.is-right > .o-tabs__nav-next,\n.o-tabs--right .o-tabs__nav-wrap.is-left > .o-tabs__nav-next,\n.o-tabs--right .o-tabs__nav-wrap.is-right > .o-tabs__nav-next {\n  right: auto;\n  bottom: 0; }\n\n.o-tabs--left .o-tabs__active-bar.is-left,\n.o-tabs--left .o-tabs__nav-wrap.is-left::after {\n  right: 0;\n  left: auto; }\n\n.o-tabs--left .o-tabs__nav-wrap.is-left.is-scrollable,\n.o-tabs--left .o-tabs__nav-wrap.is-right.is-scrollable,\n.o-tabs--right .o-tabs__nav-wrap.is-left.is-scrollable,\n.o-tabs--right .o-tabs__nav-wrap.is-right.is-scrollable {\n  padding: 30px 0; }\n\n.o-tabs--left .o-tabs__nav-wrap.is-left::after,\n.o-tabs--left .o-tabs__nav-wrap.is-right::after,\n.o-tabs--right .o-tabs__nav-wrap.is-left::after,\n.o-tabs--right .o-tabs__nav-wrap.is-right::after {\n  height: 100%;\n  width: 2px;\n  bottom: auto;\n  top: 0; }\n\n.o-tabs--left .o-tabs__nav.is-left,\n.o-tabs--left .o-tabs__nav.is-right,\n.o-tabs--right .o-tabs__nav.is-left,\n.o-tabs--right .o-tabs__nav.is-right {\n  float: none; }\n\n.o-tabs--left .o-tabs__item.is-left,\n.o-tabs--left .o-tabs__item.is-right,\n.o-tabs--right .o-tabs__item.is-left,\n.o-tabs--right .o-tabs__item.is-right {\n  display: block; }\n\n.o-tabs--left.o-tabs--card .o-tabs__active-bar.is-left,\n.o-tabs--right.o-tabs--card .o-tabs__active-bar.is-right {\n  display: none; }\n\n.o-tabs--left .o-tabs__header.is-left {\n  float: left;\n  margin-bottom: 0;\n  margin-right: 10px; }\n\n.o-tabs--left .o-tabs__nav-wrap.is-left {\n  margin-right: -1px; }\n\n.o-tabs--left .o-tabs__item.is-left {\n  text-align: right; }\n\n.o-tabs--left.o-tabs--card .o-tabs__item.is-left {\n  border-left: none;\n  border-right: 1px solid #E4E7ED;\n  border-bottom: none;\n  border-top: 1px solid #E4E7ED;\n  text-align: left; }\n\n.o-tabs--left.o-tabs--card .o-tabs__item.is-left:first-child {\n  border-right: 1px solid #E4E7ED;\n  border-top: none; }\n\n.o-tabs--left.o-tabs--card .o-tabs__item.is-left.is-active {\n  border: 1px solid #E4E7ED;\n  border-right-color: #fff;\n  border-left: none;\n  border-bottom: none; }\n\n.o-tabs--left.o-tabs--card .o-tabs__item.is-left.is-active:first-child {\n  border-top: none; }\n\n.o-tabs--left.o-tabs--card .o-tabs__item.is-left.is-active:last-child {\n  border-bottom: none; }\n\n.o-tabs--left.o-tabs--card .o-tabs__nav {\n  border-radius: 4px 0 0 4px;\n  border-bottom: 1px solid #E4E7ED;\n  border-right: none; }\n\n.o-tabs--left.o-tabs--card .o-tabs__new-tab {\n  float: none; }\n\n.o-tabs--left.o-tabs--border-card .o-tabs__header.is-left {\n  border-right: 1px solid #dfe4ed; }\n\n.o-tabs--left.o-tabs--border-card .o-tabs__item.is-left {\n  border: 1px solid transparent;\n  margin: -1px 0 -1px -1px; }\n\n.o-tabs--left.o-tabs--border-card .o-tabs__item.is-left.is-active {\n  border-color: #d1dbe5 transparent; }\n\n.o-tabs--right .o-tabs__header.is-right {\n  float: right;\n  margin-bottom: 0;\n  margin-left: 10px; }\n\n.o-tabs--right .o-tabs__nav-wrap.is-right {\n  margin-left: -1px; }\n\n.o-tabs--right .o-tabs__nav-wrap.is-right::after {\n  left: 0;\n  right: auto; }\n\n.o-tabs--right .o-tabs__active-bar.is-right {\n  left: 0; }\n\n.o-tabs--right.o-tabs--card .o-tabs__item.is-right {\n  border-bottom: none;\n  border-top: 1px solid #E4E7ED; }\n\n.o-tabs--right.o-tabs--card .o-tabs__item.is-right:first-child {\n  border-left: 1px solid #E4E7ED;\n  border-top: none; }\n\n.o-tabs--right.o-tabs--card .o-tabs__item.is-right.is-active {\n  border: 1px solid #E4E7ED;\n  border-left-color: #fff;\n  border-right: none;\n  border-bottom: none; }\n\n.o-tabs--right.o-tabs--card .o-tabs__item.is-right.is-active:first-child {\n  border-top: none; }\n\n.o-tabs--right.o-tabs--card .o-tabs__item.is-right.is-active:last-child {\n  border-bottom: none; }\n\n.o-tabs--right.o-tabs--card .o-tabs__nav {\n  border-radius: 0 4px 4px 0;\n  border-bottom: 1px solid #E4E7ED;\n  border-left: none; }\n\n.o-tabs--right.o-tabs--border-card .o-tabs__header.is-right {\n  border-left: 1px solid #dfe4ed; }\n\n.o-tabs--right.o-tabs--border-card .o-tabs__item.is-right {\n  border: 1px solid transparent;\n  margin: -1px -1px -1px 0; }\n\n.o-tabs--right.o-tabs--border-card .o-tabs__item.is-right.is-active {\n  border-color: #d1dbe5 transparent; }\n\n.slideInLeft-transition,\n.slideInRight-transition {\n  display: inline-block; }\n\n.slideInRight-enter {\n  -webkit-animation: slideInRight-enter .3s;\n  animation: slideInRight-enter .3s; }\n\n.slideInRight-leave {\n  position: absolute;\n  left: 0;\n  right: 0;\n  -webkit-animation: slideInRight-leave .3s;\n  animation: slideInRight-leave .3s; }\n\n.slideInLeft-enter {\n  -webkit-animation: slideInLeft-enter .3s;\n  animation: slideInLeft-enter .3s; }\n\n.slideInLeft-leave {\n  position: absolute;\n  left: 0;\n  right: 0;\n  -webkit-animation: slideInLeft-leave .3s;\n  animation: slideInLeft-leave .3s; }\n\n@-webkit-keyframes slideInRight-enter {\n  0% {\n    opacity: 0;\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(100%);\n    transform: translateX(100%); }\n  to {\n    opacity: 1;\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(0);\n    transform: translateX(0); } }\n\n@keyframes slideInRight-enter {\n  0% {\n    opacity: 0;\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(100%);\n    transform: translateX(100%); }\n  to {\n    opacity: 1;\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(0);\n    transform: translateX(0); } }\n\n@-webkit-keyframes slideInRight-leave {\n  0% {\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1; }\n  100% {\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(100%);\n    transform: translateX(100%);\n    opacity: 0; } }\n\n@keyframes slideInRight-leave {\n  0% {\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1; }\n  100% {\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(100%);\n    transform: translateX(100%);\n    opacity: 0; } }\n\n@-webkit-keyframes slideInLeft-enter {\n  0% {\n    opacity: 0;\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(-100%);\n    transform: translateX(-100%); }\n  to {\n    opacity: 1;\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(0);\n    transform: translateX(0); } }\n\n@keyframes slideInLeft-enter {\n  0% {\n    opacity: 0;\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(-100%);\n    transform: translateX(-100%); }\n  to {\n    opacity: 1;\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(0);\n    transform: translateX(0); } }\n\n@-webkit-keyframes slideInLeft-leave {\n  0% {\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1; }\n  100% {\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(-100%);\n    transform: translateX(-100%);\n    opacity: 0; } }\n\n@keyframes slideInLeft-leave {\n  0% {\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1; }\n  100% {\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: translateX(-100%);\n    transform: translateX(-100%);\n    opacity: 0; } }\n\n.o-icon-close {\n  display: inline-block;\n  vertical-align: -0.125em; }\n\n.o-icon-add {\n  position: absolute;\n  top: 50%;\n  margin-top: -0.5em;\n  margin-left: 0.5em;\n  cursor: pointer; }\n\n.o-icon-add:hover {\n  color: #07c160; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/_css-loader@1.0.1@css-loader/lib/css-base.js":
/*!*******************************************************************!*\
  !*** ./node_modules/_css-loader@1.0.1@css-loader/lib/css-base.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/_is-arrayish@0.3.2@is-arrayish/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/_is-arrayish@0.3.2@is-arrayish/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};


/***/ }),

/***/ "./node_modules/_simple-swizzle@0.2.2@simple-swizzle/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/_simple-swizzle@0.2.2@simple-swizzle/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayish = __webpack_require__(/*! is-arrayish */ "./node_modules/_is-arrayish@0.3.2@is-arrayish/index.js");

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};


/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(/*! !../node_modules/_css-loader@1.0.1@css-loader!../node_modules/_resolve-url-loader@3.1.1@resolve-url-loader!../node_modules/_sass-loader@7.3.1@sass-loader/dist/cjs.js??ref--4-3!./index.scss */ "./node_modules/_css-loader@1.0.1@css-loader/index.js!./node_modules/_resolve-url-loader@3.1.1@resolve-url-loader/index.js!./node_modules/_sass-loader@7.3.1@sass-loader/dist/cjs.js?!./src/index.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var omi_1 = __webpack_require__(/*! omi */ "omi");
var css = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
//@ts-ignore
__webpack_require__(/*! ../theme.ts */ "./theme.ts");
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onTabClick = function (evt, index) {
            _this.setActiveBar(evt.currentTarget, index);
            _this.fire('change', {
                tab: _this.props.list[index],
                index: index
            });
        };
        return _this;
    }
    Tabs.prototype.setActiveBar = function (ele, index) {
        var rect = ele.getBoundingClientRect();
        this._x = rect.left - this.baseRect.left;
        this._width = rect.width;
        if (index === 0) {
            this._x = 0;
            this._width -= 20;
        }
        else if (index === this.props.list.length - 1) {
            this._x += 20;
            this._width -= 20;
        }
        else {
            this._x += 20;
            this._width -= 40;
        }
        this.updateProps({
            activeIndex: index
        });
    };
    Tabs.prototype.installed = function () {
        this.baseRect = this.rootNode.getBoundingClientRect();
        this.setActiveBar(this['$tab' + this.props.activeIndex], this.props.activeIndex);
    };
    Tabs.prototype.removeTab = function (index) {
        var removedTab = this.props.list.splice(index, 1)[0];
        this.forceUpdate();
        this.fire('removed', {
            removedTab: removedTab,
            index: index
        });
    };
    Tabs.prototype.addTab = function (tab) {
        this.props.list.push(tab);
        this.forceUpdate();
    };
    Tabs.prototype.onAddIconClick = function () {
        this.fire('addIconClick');
    };
    Tabs.prototype.render = function (props) {
        var _a, _b, _c, _d, _e;
        var _this = this;
        var activeBarStyle = (props.position === 'left' || props.position === 'right') ? {
            height: "40px",
            transform: "translateY(" + props.activeIndex * 40 + "px)"
        } : {
            width: this._width + "px",
            transform: "translateX(" + this._x + "px)"
        };
        return (omi_1.h("div", __assign({}, omi_1.extractClass(props, 'o-tabs', (_a = {},
            _a["o-tabs--" + props.position] = props.position,
            _a["o-tabs--" + props.type] = props.type,
            _a))),
            omi_1.h("div", { class: omi_1.classNames('o-tabs__header', (_b = {},
                    _b["is-" + props.position] = props.position,
                    _b)) },
                omi_1.h("div", { class: omi_1.classNames('o-tabs__nav-wrap', (_c = {},
                        _c["is-" + props.position] = props.position,
                        _c)) },
                    omi_1.h("div", { class: "o-tabs__nav-scroll" },
                        omi_1.h("div", { role: "tablist", class: omi_1.classNames('o-tabs__nav', (_d = {},
                                _d["is-" + props.position] = props.position,
                                _d)) },
                            !props.type && omi_1.h("div", { class: omi_1.classNames('o-tabs__active-bar', (_e = {},
                                    _e["is-" + props.position] = props.position,
                                    _e)), style: activeBarStyle }),
                            props.list.map(function (tab, index) {
                                var _a;
                                _this._tempTagName = 'o-icon-' + tab.icon;
                                return omi_1.h("div", __assign({ ref: function (e) { _this['$tab' + index] = e; }, role: "tab", onClick: function (evt) { return props.activeIndex !== index && _this.onTabClick(evt, index); }, tabindex: props.active === index ? '0' : -1 }, omi_1.extractClass(props, 'o-tabs__item', (_a = {},
                                    _a["is-" + props.position] = props.position,
                                    _a['is-active'] = props.activeIndex === index,
                                    _a['is-closable'] = props.closable,
                                    _a))),
                                    tab.icon && omi_1.h(_this._tempTagName, null),
                                    tab.label,
                                    props.closable && omi_1.h("svg", { onClick: function (_) { _this.removeTab(index); }, class: "o-icon-close", style: props.activeIndex === index && "visibility: visible;", fill: "currentColor", width: "1em", height: "1em", focusable: "false", viewBox: "0 0 24 24", "aria-hidden": "true" },
                                        omi_1.h("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" })));
                            })),
                        props.addable && omi_1.h("svg", { class: "o-icon-add", fill: "currentColor", width: "1em", height: "1em", focusable: "false", viewBox: "0 0 24 24", "aria-hidden": "true", onClick: this.onAddIconClick },
                            omi_1.h("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" })))))));
    };
    Tabs.css = css;
    Tabs.defaultProps = {
        position: 'top',
        closable: false,
        addable: false
    };
    Tabs.propTypes = {
        list: Array,
        activeIndex: Number,
        type: String,
        position: String,
        closable: Boolean,
        addable: Boolean
    };
    Tabs = __decorate([
        omi_1.tag('o-tabs')
    ], Tabs);
    return Tabs;
}(omi_1.WeElement));
exports.default = Tabs;


/***/ }),

/***/ "./theme.ts":
/*!******************!*\
  !*** ./theme.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Color = __webpack_require__(/*! ./color */ "./color.js");
theme();
document.addEventListener('DOMContentLoaded', function () {
    theme();
});
function theme() {
    if (document.body && !document.body.style.getPropertyValue('--o-primary')) {
        setTheme('primary', '#07c160');
        setTheme('danger', '#f5222d');
        setTheme('surface', '#ffffff');
        setTheme('on-primary', '#ffffff');
        setTheme('on-danger', '#ffffff');
        setTheme('on-surface', '#000000');
        setTheme('background', '#ffffff');
        setTheme('small-radius', '4px');
        setTheme('medium-radius', '4px');
        setTheme('large-radius', '0px');
        setTheme('font-family', '-apple-system-font,"Helvetica Neue",sans-serif');
    }
}
function setTheme(key, value) {
    var style = document.body.style;
    style.setProperty('--o-' + key, value);
    switch (key) {
        case 'primary':
            style.setProperty('--o-primary-fade-little', Color(value).fade(0.382));
            style.setProperty('--o-primary-fade-some', Color(value).fade(0.618));
            style.setProperty('--o-primary-fade-lot', Color(value).fade(0.9));
            style.setProperty('--o-primary-active', Color(value).darken(0.1));
            style.setProperty('--o-primary-hover-border', Color(value).fade(0.618));
            style.setProperty('--o-primary-hover-bg', Color(value).fade(0.9));
            break;
        case 'danger':
            style.setProperty('--o-danger-fade-little', Color(value).fade(0.382));
            style.setProperty('--o-danger-fade-some', Color(value).fade(0.618));
            style.setProperty('--o-danger-fade-lot', Color(value).fade(0.9));
            style.setProperty('--o-danger-active', Color(value).darken(0.1));
            break;
    }
}
if (typeof window !== undefined) {
    //@ts-ignore
    window.Omiu = {
        setTheme: setTheme,
        setThemePrimary: function (color) {
            setTheme('primary', color);
        },
        setThemeError: function (color) {
            setTheme('error', color);
        }
    };
}


/***/ }),

/***/ "omi":
/*!******************************************************************************!*\
  !*** external {"commonjs":"omi","commonjs2":"omi","amd":"omi","root":"Omi"} ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_omi__;

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=index.js.map