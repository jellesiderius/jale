"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const OS_1 = tslib_1.__importDefault(require("../client/OS"));
const console_1 = require("../utils/console");
const phpFpm_1 = require("../utils/phpFpm");
class UseController {
    constructor() {
        /**
         * Switch the service to the given version.
         */
        this.execute = (service, version) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            switch (service) {
                case 'php':
                    (0, console_1.info)(`Switching to PHP ${version}...`);
                    yield this.switchPhpVersionTo(version);
                    return true;
                default:
                    (0, console_1.error)('Invalid service.');
                    return false;
            }
        });
        /**
         * Switch the active PHP version to the provided phpVersion string.
         * @param phpVersion
         */
        this.switchPhpVersionTo = (phpVersion) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const currentPhpVersion = yield (0, phpFpm_1.getLinkedPhpVersion)();
            if (!phpFpm_1.supportedPhpVersions.includes(phpVersion)) {
                throw Error(`Invalid PHP version. Please pick one of the following version: ${phpFpm_1.supportedPhpVersions.join(', ')}`);
            }
            if (currentPhpVersion.versionName === phpVersion) {
                (0, console_1.warning)(`PHP ${phpVersion} is already active.`);
                return;
            }
            const newPhpVersion = (0, phpFpm_1.getPhpFpmByName)(`php@${phpVersion}`);
            if (newPhpVersion.isEndOfLife) {
                (0, console_1.warning)('This PHP version is End Of Life. Be aware it might contain security flaws.\n   Please check http://php.net/supported-versions.php for more information.');
            }
            // Make sure the PHP version is installed.
            const isVersionInstalled = yield OS_1.default.getInstance().packageManager.packageIsInstalled(newPhpVersion.service);
            if (!isVersionInstalled) {
                (0, console_1.info)(`PHP ${newPhpVersion.versionName} not found, installing now...`);
                const versionNumber = Number(newPhpVersion.versionName);
                let versionService = newPhpVersion.service;
                if (versionNumber < 8.1) {
                    // Install tapped PHP version
                    yield OS_1.default.getInstance().packageManager.tap('shivammathur/php');
                    versionService = 'shivammathur/php/' + versionService;
                }
                yield OS_1.default.getInstance().packageManager.install(versionService, false);
                (0, console_1.info)(`Configuring PHP ${newPhpVersion.versionName}...`);
                yield newPhpVersion.configure();
            }
            yield currentPhpVersion.unLinkPhpVersion();
            // TODO: Relink some libs like libjpeg etc.
            yield newPhpVersion.linkPhpVersion();
            yield currentPhpVersion.stop();
            yield newPhpVersion.start();
            (0, console_1.success)(`Successfully switched to PHP ${newPhpVersion.versionName}.`);
        });
    }
}
exports.default = UseController;
//# sourceMappingURL=useController.js.map