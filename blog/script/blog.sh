#!/bin/bash


CURRENT_DATE=`date +"%Y-%m-%d"`
echo "Creating directory $CURRENT_DATE"
POST_DIR="../posts/$CURRENT_DATE"
mkdir $POST_DIR

echo "Copying base to $POST_DIR"
cp base.html $POST_DIR
cd $POST_DIR

CURRENT_DIRECTORY=`pwd`
echo "Working on $CURRENT_DIRECTORY"

vim base.html

read -p "Enter blog post title: " TITLE


FILENAME="${CURRENT_DATE}__${TITLE//\ /_}.html"
echo $FILENAME;
mv base.html "$FILENAME"


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
cp -v *.jpg ../../bin/assets/
cp -v *.JPG ../../bin/assets/
cp -v *.jpeg ../../bin/assets/
cp -v *.JPEG ../../bin/assets/
cp -v *.png ../../bin/assets/
cp -v *.PNG ../../bin/assets/
cp -v *.gif ../../bin/assets/
cp -v *.GIF ../../bin/assets/

cd ../../../
git add -A
git commit -m "deploying first blog entry"
git push production
