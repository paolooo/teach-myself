# Laravel - Sentry

Sentry -- https://cartalyst.com/manual/sentry#install-the-dependencies

```bash
$ php artisan serve --host 0.0.0.0 --port 8083
```

## Edit

```
# bootstrap/start.php
'local' => array(..., 'precise64');
```

Where did I get 'precise64'? Simply run `$ php -r "echo gethostname();"`

**Setup database**

```
# edit app/config/local/database.php
...
'database' => 'teach_lara_sentry',
'password' => ''
...
```

```bash
$ mysql -uroot
$ create database teach_lara_sentry;
```


```bash
$ php artisan serve --host 0.0.0.0 --port 8083
```

## Edit

```
# bootstrap/start.php
'local' => array(..., 'precise64');
```

Where did I get 'precise64'? Simply run `$ php -r "echo gethostname();"`

**Setup database**

```
# edit app/config/local/database.php
...
'database' => 'teach_lara_sentry',
'password' => ''
...
```

```bash
$ mysql -uroot
$ create database teach_lara_sentry;
```


