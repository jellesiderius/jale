"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const phpFpm_1 = tslib_1.__importDefault(require("./phpFpm"));
class PhpFpm81 extends phpFpm_1.default {
    constructor() {
        super(...arguments);
        this.isEndOfLife = false;
        this.versionName = '8.1';
        this.service = `php@${this.versionName}`;
        this.configPath = `${this.configRootPath}/8.1/php-fpm.d/www.conf`;
        this.iniDirectoryPath = `${this.configRootPath}/8.1/conf.d`;
    }
}
exports.default = PhpFpm81;
//# sourceMappingURL=phpFpm81.js.map