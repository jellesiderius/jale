"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDirectoryExists = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const console_1 = require("./console");
/**
 * Ensure the given path exists, then return a string or false when failed.
 * @param path
 */
function ensureDirectoryExists(path) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!(0, fs_1.existsSync)(path)) {
            try {
                yield (0, fs_1.mkdirSync)(path, { mode: 0o755 });
                return path;
            }
            catch (e) {
                (0, console_1.error)(e.message);
                return false;
            }
        }
        return path;
    });
}
exports.ensureDirectoryExists = ensureDirectoryExists;
//# sourceMappingURL=filesystem.js.map