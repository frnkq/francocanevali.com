#!/bin/bash

CONTENT=`cat tmp`
CONTENT=$(sed ':a;N;$!ba;s/\n/<br>/g' tmp)
NEW=$(sed "s/{{POST_content}}/$(echo $CONTENT)/g" base.html)
echo "$NEW" > new
