/**
 * isMobile.js v0.4.1
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
 * and any kind of seven inch device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 */
var apple_phone = /iPhone/i,
    apple_ipod = /iPod/i,
    apple_tablet = /iPad/i,
    android_phone = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
    android_tablet = /Android/i,
    amazon_phone = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
    amazon_tablet = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
    windows_phone = /Windows Phone/i,
    windows_tablet = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
    other_blackberry = /BlackBerry/i,
    other_blackberry_10 = /BB10/i,
    other_opera = /Opera Mini/i,
    other_chrome = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
    other_firefox = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
    seven_inch = new RegExp(
        '(?:' + // Non-capturing group

        'Nexus 7' + // Nexus 7

        '|' + // OR

        'BNTV250' + // B&N Nook Tablet 7 inch

        '|' + // OR

        'Kindle Fire' + // Kindle Fire

        '|' + // OR

        'Silk' + // Kindle Fire, Silk Accelerated

        '|' + // OR

        'GT-P1000' + // Galaxy Tab 7 inch

        ')', // End non-capturing group

        'i'); // Case-insensitive matching

var match = function (regex, userAgent) {
    return regex.test(userAgent);
};

var IsMobileClass = function (userAgent) {
    var ua = userAgent || navigator.userAgent;

    // Facebook mobile app's integrated browser adds a bunch of strings that
    // match everything. Strip it out if it exists.
    var tmp = ua.split('[FBAN');
    if (typeof tmp[1] !== 'undefined') {
        ua = tmp[0];
    }

    // Twitter mobile app's integrated browser on iPad adds a "Twitter for
    // iPhone" string. Same probable happens on other tablet platforms.
    // This will confuse detection so strip it out if it exists.
    tmp = ua.split('Twitter');
    if (typeof tmp[1] !== 'undefined') {
        ua = tmp[0];
    }
    let ret = {};
    ret.apple = {
        phone: match(apple_phone, ua),
        ipod: match(apple_ipod, ua),
        tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
        device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
    };
    ret.amazon = {
        phone: match(amazon_phone, ua),
        tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
        device: match(amazon_phone, ua) || match(amazon_tablet, ua)
    };
    ret.android = {
        phone: match(amazon_phone, ua) || match(android_phone, ua),
        tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
        device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
    };
    ret.windows = {
        phone: match(windows_phone, ua),
        tablet: match(windows_tablet, ua),
        device: match(windows_phone, ua) || match(windows_tablet, ua)
    };
    ret.other = {
        blackberry: match(other_blackberry, ua),
        blackberry10: match(other_blackberry_10, ua),
        opera: match(other_opera, ua),
        firefox: match(other_firefox, ua),
        chrome: match(other_chrome, ua),
        device: match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
    };
    ret.seven_inch = match(seven_inch, ua);
    ret.any = ret.apple.device || ret.android.device || ret.windows.device || ret.other.device || ret.seven_inch;

    // excludes 'other' devices and ipods, targeting touchscreen phones
    ret.phone = ret.apple.phone || ret.android.phone || ret.windows.phone;

    // excludes 7 inch devices, classifying as phone or tablet is left to the user
    ret.tablet = ret.apple.tablet || ret.android.tablet || ret.windows.tablet;

    // if (typeof window === 'undefined') {
    return ret;
    // }
};

var instantiate = function () {
    var IM = new IsMobileClass();
    IM.Class = IsMobileClass;
    return IM;
};

export default IsMobileClass;