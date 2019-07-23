
<!DOCTYPE html>
<html>
  <title>GreenTech|Repository</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  
  <style>
    body,h1 {font-family: "Raleway", Arial, sans-serif}
    h1 {letter-spacing: 6px}
    .w3-row-padding img {margin-bottom: 5px}
  </style>
<body>

<!-- !PAGE CONTENT! -->
<div class="w3-content" style="max-width:1500px">

<!-- Header -->
<header class="w3-panel w3-center w3-opacity" style="padding:5px 5px">
  <h1 class="w3-xlarge">Diagnosis repository</h1>
  
  
  <div class="w3-padding-32">
    <div class="w3-bar w3-border">
      <a href="/repos.php" class="w3-bar-item w3-button">Refresh</a>
    </div>
  </div>
</header>

<?php

$dir_path = "plantix/";

$extensions_array = array('jpg','png','jpeg');

if(is_dir($dir_path))
{
    $files = scandir($dir_path);
    
    for($i = 0; $i < count($files); $i++)
    {
        if($files[$i] !='.' && $files[$i] !='..')
        {
            // get file name
             ?> <header class=" w3-center" style="padding:8px 8px;color: white">
           <?
            echo "File Name -> $files[$i]<br>";
            
            // get file extension
            $file = pathinfo($files[$i]);
            $extension = $file['extension'];
            //echo "File Extension-> $extension<br>";
            
           // check file extension
            if(in_array($extension, $extensions_array))
            {
            // show image
           ?> <header class="w3-panel w3-center" style="padding:8px 8px">
           <?
            echo "<img src='$dir_path$files[$i]?=filemtime($i)?>' style='width:500px;height:500px;'><br>";
            
            }
        }
    }
}?>

</body>
</html>
