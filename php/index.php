<html>

<head>
    <title>Hello World by champ</title>
</head>

<body>
    <?php
    // https://stackoverflow.com/questions/38062495/how-to-make-a-post-request-with-php-given-the-following-http-json
    echo "Hello, World!";
    //$url = 'http://nestjs-queue:3000/mlworker/add-queue';
    $url = 'http://localhost:3000/mlworker/add-queue';
    // $data = '
    // {
    //   "url": "https://my.server.com/new-callback",
    //   "signaturePassword": "g394g732vhsdfiv34",
    //   "test": true
    // }
    // ';


    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    // curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // curl_setopt($ch, CURLOPT_HTTPHEADER, $additiona  l_headers);

    $server_output = curl_exec($ch);

    echo  $server_output;
    echo "Success";
    ?>

</body>

</html>