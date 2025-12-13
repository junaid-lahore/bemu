"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mdast-util-phrasing";
exports.ids = ["vendor-chunks/mdast-util-phrasing"];
exports.modules = {

/***/ "(ssr)/../../../AppData/Local/Yarn/Berry/cache/mdast-util-phrasing-npm-4.0.0-0b0e9b0edd-10c0.zip/node_modules/mdast-util-phrasing/lib/index.js":
/*!***********************************************************************************************************************************************!*\
  !*** ../../../AppData/Local/Yarn/Berry/cache/mdast-util-phrasing-npm-4.0.0-0b0e9b0edd-10c0.zip/node_modules/mdast-util-phrasing/lib/index.js ***!
  \***********************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   phrasing: () => (/* binding */ phrasing)\n/* harmony export */ });\n/* harmony import */ var unist_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unist-util-is */ \"(ssr)/../../../AppData/Local/Yarn/Berry/cache/unist-util-is-npm-6.0.0-2bffa09a51-10c0.zip/node_modules/unist-util-is/lib/index.js\");\n/**\n * @typedef {import('mdast').PhrasingContent} PhrasingContent\n */\n\n\n\n/**\n * Check if the given value is *phrasing content*.\n *\n * > 👉 **Note**: Excludes `html`, which can be both phrasing or flow.\n *\n * @param node\n *   Thing to check, typically `Node`.\n * @returns\n *   Whether `value` is phrasing content.\n */\n\nconst phrasing =\n  /** @type {(node?: unknown) => node is PhrasingContent} */\n  (\n    (0,unist_util_is__WEBPACK_IMPORTED_MODULE_0__.convert)([\n      'break',\n      'delete',\n      'emphasis',\n      'footnote',\n      'footnoteReference',\n      'image',\n      'imageReference',\n      'inlineCode',\n      'link',\n      'linkReference',\n      'strong',\n      'text'\n    ])\n  )\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vLi4vQXBwRGF0YS9Mb2NhbC9ZYXJuL0JlcnJ5L2NhY2hlL21kYXN0LXV0aWwtcGhyYXNpbmctbnBtLTQuMC4wLTBiMGU5YjBlZGQtMTBjMC56aXAvbm9kZV9tb2R1bGVzL21kYXN0LXV0aWwtcGhyYXNpbmcvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQSxhQUFhLGlDQUFpQztBQUM5Qzs7QUFFcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1AsYUFBYSw2Q0FBNkM7QUFDMUQ7QUFDQSxJQUFJLHNEQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JlYW11LXdvcmxkLy4uLy4uLy4uL0FwcERhdGEvTG9jYWwvWWFybi9CZXJyeS9jYWNoZS9tZGFzdC11dGlsLXBocmFzaW5nLW5wbS00LjAuMC0wYjBlOWIwZWRkLTEwYzAuemlwL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLXBocmFzaW5nL2xpYi9pbmRleC5qcz83NDBkIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QnKS5QaHJhc2luZ0NvbnRlbnR9IFBocmFzaW5nQ29udGVudFxuICovXG5cbmltcG9ydCB7Y29udmVydH0gZnJvbSAndW5pc3QtdXRpbC1pcydcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgKnBocmFzaW5nIGNvbnRlbnQqLlxuICpcbiAqID4g8J+RiSAqKk5vdGUqKjogRXhjbHVkZXMgYGh0bWxgLCB3aGljaCBjYW4gYmUgYm90aCBwaHJhc2luZyBvciBmbG93LlxuICpcbiAqIEBwYXJhbSBub2RlXG4gKiAgIFRoaW5nIHRvIGNoZWNrLCB0eXBpY2FsbHkgYE5vZGVgLlxuICogQHJldHVybnNcbiAqICAgV2hldGhlciBgdmFsdWVgIGlzIHBocmFzaW5nIGNvbnRlbnQuXG4gKi9cblxuZXhwb3J0IGNvbnN0IHBocmFzaW5nID1cbiAgLyoqIEB0eXBlIHsobm9kZT86IHVua25vd24pID0+IG5vZGUgaXMgUGhyYXNpbmdDb250ZW50fSAqL1xuICAoXG4gICAgY29udmVydChbXG4gICAgICAnYnJlYWsnLFxuICAgICAgJ2RlbGV0ZScsXG4gICAgICAnZW1waGFzaXMnLFxuICAgICAgJ2Zvb3Rub3RlJyxcbiAgICAgICdmb290bm90ZVJlZmVyZW5jZScsXG4gICAgICAnaW1hZ2UnLFxuICAgICAgJ2ltYWdlUmVmZXJlbmNlJyxcbiAgICAgICdpbmxpbmVDb2RlJyxcbiAgICAgICdsaW5rJyxcbiAgICAgICdsaW5rUmVmZXJlbmNlJyxcbiAgICAgICdzdHJvbmcnLFxuICAgICAgJ3RleHQnXG4gICAgXSlcbiAgKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/../../../AppData/Local/Yarn/Berry/cache/mdast-util-phrasing-npm-4.0.0-0b0e9b0edd-10c0.zip/node_modules/mdast-util-phrasing/lib/index.js\n");

/***/ })

};
;