export default {
    /* Site Settings */
    offline: false,
    offline_message: 'This site is down for maintenance.<br> Please check back again soon.',
    display_offline_message: 1,
    offline_image: '',
    sitename: 'Joomla!', // Name of Joomla site
    editor: 'tinymce',
    captcha: '0',
    list_limit: 20,
    access: 1,
    frontediting: 1,

    /* Server Settings */
    secret: '', // Use something very secure. For example on linux the following command `cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w ${1:-16} | head -n 1`
    gzip: false,
    error_reporting: 'default',
    helpurl: 'https://help.joomla.org/proxy?keyref:Help{major}{minor}:{keyref}&lang:{langcode}',
    tmp_path: '/tmp', // This path needs to be writable by Joomla!
    log_path: '/administrator/logs', // This path needs to be writable by Joomla!
    live_site: '', // Optional, full URL to Joomla install eg https://www.example.com
    force_ssl: 0, // Force areas of the site to be SSL ONLY.  0 = None, 1 = Administrator, 2 = Both Site and Administrator

    /* Locale Settings */
    offset: 'UTC',

    /* Session settings */
    lifetime: 15, // Session time
    session_handler: 'database',
    shared_session: false,
    session_filesystem_path: '',
    session_memcached_server_host: 'localhost',
    session_memcached_server_port: 11211,
    session_metadata: true,
    session_redis_persist: 1,
    session_redis_server_auth: '',
    session_redis_server_db: 0,
    session_redis_server_host: 'localhost',
    session_redis_server_port: 6379,

    /* Mail Settings */
    mailonline: true,
    mailer: 'mail',
    mailfrom: '',
    fromname: '',
    massmailoff: false,
    replyto: '',
    replytoname: '',
    sendmail: '/usr/sbin/sendmail',
    smtpauth: false,
    smtpuser: '',
    smtppass: '',
    smtphost: 'localhost',
    smtpsecure: 'none',
    smtpport: 25,

    /* Cache Settings */
    caching: 0,
    cachetime: 15,
    cache_handler: 'file',
    cache_platformprefix: false,
    memcached_persist: true,
    memcached_compress: false,
    memcached_server_host: 'localhost',
    memcached_server_port: 11211,
    redis_persist: true,
    redis_server_host: 'localhost',
    redis_server_port: 6379,
    redis_server_auth: '',
    redis_server_db: 0,

    /* Log Settings */
    log_categories: '',
    log_category_mode: 0,
    log_deprecated: 0,
    log_everything: 0,
    log_priorities: ['all'],

    /* CORS Settings */
    cors: false,
    cors_allow_headers: 'Content-Type,X-Joomla-Token',
    cors_allow_methods: '',
    cors_allow_origin: '*',

    /* Proxy Settings */
    proxy_enable: false,
    proxy_host: '',
    proxy_port: '',
    proxy_user: '',
    proxy_pass: '',

    /* Debug Settings */
    debug: false,
    debug_lang: false,
    debug_lang_const: true,

    /* Meta Settings */
    MetaDesc: 'Joomla! - the dynamic portal engine and content management system',
    MetaAuthor: true,
    MetaVersion: false,
    MetaRights: '',
    robots: '',
    sitename_pagetitles: 0,

    /* SEO Settings */
    sef: true,
    sef_rewrite: false,
    sef_suffix: false,
    unicodeslugs: false,

    /* Feed Settings */
    feed_limit: 10,
    feed_email: 'none',

    /* Cookie Settings */
    cookie_domain: '',
    cookie_path: '',

    /* Miscellaneous Settings */
    asset_id: 1,
    behind_loadbalancer: false,
};
