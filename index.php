<?php
function listPosts()
{
        $files = [];
        foreach(new DirectoryIterator('./blog/bin') as $f)
        {
            if($f->isDot() || strpos($f->getFilename(), "base.html")===0) continue;
            array_push($files, $f->getFilename());
        }
        rsort($files);

        foreach($files as $f)
        {
            $dateTitle = explode("__", $f);
            $date = "[".$dateTitle[0]."]";
            $title = str_replace("_", " ", $dateTitle[1]);
            $title = explode(".html", $title)[0];
            echo 
                "<a href=/blog/bin/"."$f".">"
                .$date." ".$title
                ."</a><br>";
        }
}

function showPostsCount()
{
        $i = 0;
        foreach(new DirectoryIterator('./blog') as $f)
        {
            if($f->isDot()) continue;
            $i++;
        }

        echo $i." post(s)";
}
?>
<!DOCTYPE html>
<html lang="es">
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
    integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
    crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
    integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
    crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <title>Franco Canevali</title>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 text-center asciiart mb-0 pb-0">
     ,                                                     
     Et                                              :     
     E#t                 L.             G:          t#,    
     E##t     j.         EW:        ,ft E#,    :   ;##W.   
     E#W#t    EW,        E##;       t#E E#t  .GE  :#L:WE   
     E#tfL.   E##j       E###t      t#E E#t j#K; .KG  ,#D  
     E#t      E###D.     E#fE#f     t#E E#GK#f   EE    ;#f 
  ,ffW#Dffj.  E#jG#W;    E#t D#G    t#E E##D.   f#.     t#i
   ;LW#ELLLf. E#t t##f   E#t  f#E.  t#E E##Wi   :#G   G.GK 
     E#t      E#t  :K#E: E#t   t#K: t#E E#jL#D:  ;#L  DWW. 
     E#t      E#KDDDD###iE#t    ;#W,t#E E#t ,K#j  t#f j#L  
     E#t      E#f,t#Wi,,,E#t     :K#D#E E#t   jD   f#D#j#. 
     E#t      E#t  ;#W:  E#t      .E##E j#t         G#t .  
     E#t      DWi   ,KK: ..         G#E  ,;          t     
     ;#t                             fE                    
      :;                              ,                    
            </div>
            <div class="col-12 mt-0 pt-0 row">
                <div class="col-6 text-left">
                    @frnkq
                </div>
            </div>
        </div>
            <div class="separator">
            </div>
            <div class="row text-center">
            <div class="col">
                <div id="me"></div>
                <!--<img src="me.png" class="col-12 text-center mt-5">-->
                <small>Cerro Fitz Roy, El Chalten, Argentina. Feb 2020.</small>
            </div>
            <div class="col text-left mt-md-5">
            Franco. Software Developer.
            <br>
            <br>
            em: email[at]francocanevali.com
            <br>
            tw: <a href="https://twitter.com/francocanevali" target="_blank">@francocanevali</a>
            <br>
            ln: <a href="https://www.linkedin.com/in/francocanevali/" target="_blank">Franco Canevali</a>
            <br>
            gh: <a href="https://github.com/frnkq/" target="_blank">frnkq</a>
            <br>
            <a href="/blog" target="_blank">Blog</a>
            <div id="blogPosts">
<div class="col text-right">
            <?php showPostsCount(); ?>
</div>
            <?php listPosts(); ?>
            </div>
            </div>

            </div>
    </div>
</body>

</html>
