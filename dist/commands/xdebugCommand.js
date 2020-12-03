"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const xdebugController_1 = tslib_1.__importDefault(require("../controllers/xdebugController"));
function installCommand(program) {
    return program
        .command('xdebug <status>')
        .description('Enable or disable the xdebug PHP extension. Use \'on\' or \'off\'.')
        .action((status) => {
        (new xdebugController_1.default()).execute(status).catch(err => console.log(err.message));
    });
}
exports.default = installCommand;
//# sourceMappingURL=xdebugCommand.js.map