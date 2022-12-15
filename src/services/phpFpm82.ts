import PhpFpm from './phpFpm'

class PhpFpm82 extends PhpFpm {
    isEndOfLife = false
    versionName = '8.2'

    service = `php@${this.versionName}`

    configPath = `${this.configRootPath}/${this.versionName}/php-fpm.d/www.conf`
    iniDirectoryPath = `${this.configRootPath}/${this.versionName}/conf.d`
}

export default PhpFpm82
