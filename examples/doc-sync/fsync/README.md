# fsync

A command line interface for sharing updates to files in realtime with anyone.

Execute the cmd passing in the path to the file you want to share and get a meeting code to share with other participants in the call.

## Install

```
  > npm install
```

## Run

### Share a doc

```
  > fsync -i /path/to/file --boxid [YOUR_BOX_ID]

Your meeting code is : wfaw-f8qc-fqw1-i2or

```


### Fetch a shared doc and get realtime updates

**@TODO** fetch is not currently implemented

```
  > fsync -o /path/to/output --boxid [YOUR_BOX_ID]

```
