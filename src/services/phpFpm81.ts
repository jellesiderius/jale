import PhpFpm from './phpFpm'

class PhpFpm81 extends PhpFpm {
    isEndOfLife = false
    versionName = '8.1'

    service = `php@${this.versionName}`

    configPath = `${this.configRootPath}/8.1/php-fpm.d/www.conf`
    iniDirectoryPath = `${this.configRootPath}/8.1/conf.d`
}

export default PhpFpm81
