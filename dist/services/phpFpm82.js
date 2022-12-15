"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const phpFpm_1 = tslib_1.__importDefault(require("./phpFpm"));
class PhpFpm82 extends phpFpm_1.default {
    constructor() {
        super(...arguments);
        this.isEndOfLife = false;
        this.versionName = '8.2';
        this.service = `php@${this.versionName}`;
        this.configPath = `${this.configRootPath}/${this.versionName}/php-fpm.d/www.conf`;
        this.iniDirectoryPath = `${this.configRootPath}/${this.versionName}/conf.d`;
    }
}
exports.default = PhpFpm82;
//# sourceMappingURL=phpFpm82.js.map