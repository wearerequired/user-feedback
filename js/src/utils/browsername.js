/**
 * Detect browser name + version. Example: Chrome 40, Internet Explorer 12.
 *
 * A utility function we need later on.
 *
 * @see http://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
 */
var saysWho = function () {
	var ua = navigator.userAgent, tem,
			M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return 'Internet Explorer ' + (tem[1] || '');
	}
	if (M[1] === 'Chrome') {
		tem = ua.match(/\bOPR\/(\d+)/);
		if (tem != null) {
			return 'Opera ' + tem[1];
		}
	}
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	if ((tem = ua.match(/version\/(\d+)/i)) != null) {
		M.splice(1, 1, tem[1]);
	}
	return M.join(' ');
};

module.exports = saysWho;
