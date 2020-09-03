# readmeta

readmeta is cli package built in nodejs. It helps you to test and preview your meta tags. You can get all your meta tags just by runing a single command.

readmeta also support single page application which change meta tags at run time.

# Install

npm i readmeta -g

**Note:** - You might get permission issue while installing this package. In this case please run command as sudo or with admin priviledge.

### Still not working

try this

```
sudo npm i readmeta -g --unsafe-perm=true
```

# Example 

## Fetch meta

This will show all meta tags in console

```
readmeta --url=google.com
```

OR (with http included)

```
readmeta --url=http://google.com
```

## Preview meta

This will open a browser and show how your app will be previewed in different app like facebook, whatsapp, twitter etc.

```
readmeta --url=http://google.com --preview
```


