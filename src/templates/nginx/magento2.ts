import {jaleHomeDir} from '../../utils/jale'

const nginxMagento2Conf = `
root $MAGE_ROOT/pub;

index index.php;
autoindex off;
charset off;

add_header 'X-Content-Type-Options' 'nosniff';
add_header 'X-XSS-Protection' '1; mode=block';

location /setup {
    root $MAGE_ROOT;
    location ~ ^/setup/index.php {
        fastcgi_pass unix:${jaleHomeDir}/jale.sock;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }

    location ~ ^/setup/pub/ {
        add_header X-Frame-Options "SAMEORIGIN";
    }
}

location /update {
    root $MAGE_ROOT;

    location ~ ^/update/index.php {
        fastcgi_split_path_info ^(/update/index.php)(/.+)$;
        fastcgi_pass unix:${jaleHomeDir}/jale.sock;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        fastcgi_param  PATH_INFO        $fastcgi_path_info;
        include        fastcgi_params;
    }

    location ~ ^/update/pub/ {
        add_header X-Frame-Options "SAMEORIGIN";
    }
}

location / {
    try_files $uri $uri/ /index.php?$args;
}

location /pub {
    alias $MAGE_ROOT/pub;
    add_header X-Frame-Options "SAMEORIGIN";
}

location /static/ {
    location ~* \\.(ico|jpg|jpeg|png|gif|svg|js|css|swf|eot|ttf|otf|woff|woff2)$ {
        add_header Cache-Control "public";
        add_header X-Frame-Options "SAMEORIGIN";
        expires +1y;

        if (!-f $request_filename) {
            rewrite ^/static/(version\\d*/)?(.*)$ /static.php?resource=$2 last;
        }
    }
    location ~* \\.(zip|gz|gzip|bz2|csv|xml)$ {
        add_header Cache-Control "no-store";
        add_header X-Frame-Options "SAMEORIGIN";
        expires    off;

        if (!-f $request_filename) {
           rewrite ^/static/(version\\d*/)?(.*)$ /static.php?resource=$2 last;
        }
    }
    if (!-f $request_filename) {
        rewrite ^/static/(version\\d*/)?(.*)$ /static.php?resource=$2 last;
    }
    add_header X-Frame-Options "SAMEORIGIN";
}

location /media/ {
    try_files $uri $uri/ /get.php?$args;

    location ~* \\.(ico|jpg|jpeg|png|gif|svg|js|css|swf|eot|ttf|otf|woff|woff2)$ {
        add_header Cache-Control "public";
        add_header X-Frame-Options "SAMEORIGIN";
        expires +1y;
        try_files $uri $uri/ /get.php?$args;
    }
    location ~* \\.(zip|gz|gzip|bz2|csv|xml)$ {
        add_header Cache-Control "no-store";
        add_header X-Frame-Options "SAMEORIGIN";
        expires    off;
        try_files $uri $uri/ /get.php?$args;
    }
    add_header X-Frame-Options "SAMEORIGIN";
}

location ~ (index|get|static|report|404|503)\\.php$ {
    try_files $uri =404;
    fastcgi_split_path_info ^(.+\\.php)(/.+)$;
    fastcgi_read_timeout 3600;
    fastcgi_pass unix:${jaleHomeDir}/jale.sock;

    fastcgi_param MAGE_MODE $MAGE_MODE;

    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    include fastcgi_params;
}

location ~ ^/wp/ {
    add_header X-Frame-Options "SAMEORIGIN";
    index index.php index.html index.htm;
    root $MAGE_ROOT;
    try_files $uri $uri/ @wphandler;
    expires 30d;

    location ~* \\.(ico|jpg|jpeg|png|gif|svg|js|css|swf|eot|ttf|otf|woff|woff2)$ {
        add_header Cache-Control "public";
        add_header X-Frame-Options "SAMEORIGIN";
        expires +1y;
        try_files $uri $uri/ /get.php?$args;
    }

    location ~* \\.php$ {
        add_header X-Frame-Options "SAMEORIGIN";
        try_files $uri $uri/ =404;
        fastcgi_pass unix:${jaleHomeDir}/jale.sock;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}

location @wphandler {
    rewrite / /wp/index.php?q=$1;
}`

export default nginxMagento2Conf
