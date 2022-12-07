# Jale+
A blazing fast local development environment for MacOS* written in Typescript.<br />

## What is Jale+?
Jale+ is a fork of [Jale](https://github.com/bjarn/jale). Jale has been archived but i wanted to continue the work on this project.

## What is Jale+?
Jale+ (Just Another Local Environment +) allows you to setup a complete local development environment in just a couple of seconds.
Literally the only thing you have to do is run `jale install` and you're done.

Walk through the installation steps, which allow you to select which PHP versions (multiple!) you'd like to run or which kind of database server (i.e. MySQL 5.6 or 8.0, but also MariaDB).

Jale+ is currently still under heavy development and not ready to be used as your daily driver. However, it works but lacks error messages, useful notices and yes, might contain bugs.

Services are using optimized configs (credits to [Valet+](https://github.com/weprovide/valet-plus)) to improve the performance of your local development environment.

## Why Jale?
It has a completely different approach compared to services like Laravel Valet and aims to be both flexible and performant.

Instead of using a single 'server.php' file which proxies every request, we just use Nginx configuration files per site. Don't be afraid though! We made it as easy as possible. It is also possible to select an optimized app template for i.e. Laravel, Magento or Wordpress (and more to come!).

## Included services
The following services are currently installed by Jale+. Services marked with a * are optional, you can uncheck them ;-).
- Nginx
- Dnsmasq
- PHP (7.2 to 7.4, 8.0)
- MySQL (MySQL 5.7, 8.0 and MariaDB)
- Redis*
- Elasticsearch*

### Dev tools
The following development tools are included.
- [Mailhog](https://github.com/mailhog/MailHog)
- [Expose](https://github.com/beyondcode/expose)*
- [wp-cli](https://github.com/wp-cli/wp-cli)*
- [magerun](https://github.com/netz98/n98-magerun)*
- [magerun2](https://github.com/netz98/n98-magerun2)*
- [drush](https://github.com/drush-ops/drush-launcher)*
