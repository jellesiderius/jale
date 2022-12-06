import PhpFpm from './phpFpm'

class PhpFpm80 extends PhpFpm {
    isEndOfLife = false
    versionName = '8.0'

    service = `php@${this.versionName}`

    configPath = `${this.configRootPath}/${this.versionName}/php-fpm.d/www.conf`
    iniDirectoryPath = `${this.configRootPath}/${this.versionName}/conf.d`
}

export default PhpFpm80
