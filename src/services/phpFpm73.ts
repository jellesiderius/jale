import PhpFpm from './phpFpm'

class PhpFpm73 extends PhpFpm {
    isEndOfLife = true
    versionName = '7.3'

    service = `php@${this.versionName}`

    configPath = `${this.configRootPath}/${this.versionName}/php-fpm.d/www.conf`
    iniDirectoryPath = `${this.configRootPath}/${this.versionName}/conf.d`
}

export default PhpFpm73
