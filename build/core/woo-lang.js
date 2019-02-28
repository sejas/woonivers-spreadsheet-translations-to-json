"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * WooLang: it manges the translations
 */
var WooLang = /** @class */ (function () {
    function WooLang(langsArray) {
        this.langs = {};
        for (var _i = 0, langsArray_1 = langsArray; _i < langsArray_1.length; _i++) {
            var lang = langsArray_1[_i];
            this.addLang(lang);
        }
    }
    Object.defineProperty(WooLang.prototype, "langKeys", {
        get: function () {
            return Object.keys(this.langs);
        },
        enumerable: true,
        configurable: true
    });
    WooLang.prototype.addLang = function (lang) {
        this.langs[lang] = {};
    };
    WooLang.prototype.addSection = function (section) {
        for (var _i = 0, _a = this.langKeys; _i < _a.length; _i++) {
            var lang = _a[_i];
            this.langs[lang][section] = {};
        }
    };
    WooLang.prototype.addTrasnlationToSection = function (section, _a) {
        var key = _a[0], row = _a.slice(1);
        var _b;
        debugger;
        var index = 0;
        for (var _i = 0, _c = this.langKeys; _i < _c.length; _i++) {
            var lang = _c[_i];
            var _d = key.split('.'), firstKey = _d[0], secondKey = _d[1];
            if (secondKey) {
                this.langs[lang][section][firstKey] = __assign({}, this.langs[lang][section][firstKey], (_b = {}, _b[secondKey] = row[index++], _b));
            }
            else {
                this.langs[lang][section][firstKey] = row[index++];
            }
        }
    };
    return WooLang;
}());
exports.default = WooLang;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29vLWxhbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS93b28tbGFuZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSDtJQUVFLGlCQUFZLFVBQXFCO1FBRGpDLFVBQUssR0FBRyxFQUFFLENBQUE7UUFFUixLQUFtQixVQUFVLEVBQVYseUJBQVUsRUFBVix3QkFBVSxFQUFWLElBQVUsRUFBRTtZQUExQixJQUFNLElBQUksbUJBQUE7WUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ25CO0lBQ0gsQ0FBQztJQUNELHNCQUFJLDZCQUFRO2FBQVo7WUFDRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2hDLENBQUM7OztPQUFBO0lBQ0QseUJBQU8sR0FBUCxVQUFRLElBQUk7UUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUN2QixDQUFDO0lBQ0QsNEJBQVUsR0FBVixVQUFXLE9BQWU7UUFDeEIsS0FBbUIsVUFBYSxFQUFiLEtBQUEsSUFBSSxDQUFDLFFBQVEsRUFBYixjQUFhLEVBQWIsSUFBYSxFQUFFO1lBQTdCLElBQU0sSUFBSSxTQUFBO1lBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUE7U0FDL0I7SUFDSCxDQUFDO0lBQ0QseUNBQXVCLEdBQXZCLFVBQXdCLE9BQWUsRUFBRSxFQUF1QjtZQUF0QixXQUFHLEVBQUUsaUJBQU07O1FBQ25ELFFBQVEsQ0FBQTtRQUNSLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNiLEtBQW1CLFVBQWEsRUFBYixLQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsY0FBYSxFQUFiLElBQWEsRUFBRTtZQUE3QixJQUFNLElBQUksU0FBQTtZQUNQLElBQUEsbUJBQXNDLEVBQXJDLGdCQUFRLEVBQUUsaUJBQTJCLENBQUE7WUFDNUMsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQ3JDLFNBQVMsSUFBRyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsTUFDMUIsQ0FBQTthQUNGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7YUFDbkQ7U0FDRjtJQUNILENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQyJ9