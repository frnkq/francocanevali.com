#!/bin/bash

clear
CURRENT_DATE=`date +"%Y-%m-%d"`
echo "Creating directory $CURRENT_DATE"
POST_DIR="../posts/$CURRENT_DATE"
mkdir $POST_DIR

echo "Copying base to $POST_DIR"
cp base.html $POST_DIR
cd $POST_DIR
mkdir assets

CURRENT_DIRECTORY=`pwd`
echo "Working on $CURRENT_DIRECTORY"


read -p "Enter blog post title: " TITLE

FILENAME="${CURRENT_DATE}__${TITLE//\ /_}.html"
echo $FILENAME;

vim tmp

BASE=`sed "s/{{POST_date}}/$CURRENT_DATE/g" base.html`
echo "$BASE" > "$FILENAME"

BASE=`sed "s/{{POST_title}}/$TITLE/g" $FILENAME`
echo "$BASE" > "$FILENAME"

#CONTENT=`cat tmp`
#changing break lines to html break lines
CONTENT=$(sed ':a;N;$!ba;s/\n/<br>/g' tmp)
FINALCONTENT=$(sed "s|{{POST_content}}|$(echo $CONTENT)|g" "$FILENAME")
echo "$FINALCONTENT" > "$FILENAME"


DEPLOY="n"

while [[ $DEPLOY = ["n"] || $DEPLOY = ["N"] ]]; do
    read -p "Do you want to review your post? y/n: " REVIEW

    if [[ "$REVIEW" == "y" ]] || [[ "$REVIEW" == "Y" ]] ; then
        echo "Opening in firefox"
        firefox "$FILENAME"
    fi

    read -p "Do you want to edit your post? y/n: " EDIT

    if [[ "$EDIT" == "y" ]] || [[ "$EDIT" == "Y" ]] ; then
        echo "Editing file"
        vim "$FILENAME"
    fi

    read -p "Do you want to deploy it? y/n: " DEPLOY
done

cp "$FILENAME" ../../bin/"$FILENAME"
cp -v assets/*.jpg ../../bin/assets/
cp -v assets/*.JPG ../../bin/assets/
cp -v assets/*.jpeg ../../bin/assets/
cp -v assets/*.JPEG ../../bin/assets/
cp -v assets/*.png ../../bin/assets/
cp -v assets/*.PNG ../../bin/assets/
cp -v assets/*.gif ../../bin/assets/
cp -v assets/*.GIF ../../bin/assets/

rm tmp
cd ../../../
pwd
git add -A
git commit -m "Deploying blog post $FILENAME"
git push production

