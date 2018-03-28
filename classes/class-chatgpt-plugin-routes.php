<?php
/**
 * This file will create Custom Rest API End Points.
 */
class WP_ChatGPT_Plugin_Rest_Route {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {
        register_rest_route( 'wprk/v1', '/plugin', [
            'methods' => 'POST',
            'callback' => [ $this, 'pansophy_chatgpt_content_srch' ],
            
        ] );

        register_rest_route( 'wprk/v1', '/find-image', [
            'methods' => 'POST',
            'callback' => [ $this, 'pansophy_dall_image_srch' ],
            
        ] );
         
        
    }
    /**
     * Delete all chatgpt images
     */
     function delete_all_chatgpt_images(){
        $all_attachments = get_posts( array('fields'=> 'ids', 'post_parent'=> 9999999999, 'posts_per_page' => -1, 'post_type' => 'attachment'));
        foreach ($all_attachments as $key => $post_id) {
           wp_delete_attachment($post_id, true);
        }
    } 
    /**
     * Search text  
     */ 
    function pansophy_chatgpt_content_srch($post){
       
        $openai_api = get_option('openai_api');
        $max_tokens = get_option('max_tokens');
        $chatgpt_model = get_option('chatgpt_model');
        $user_types = (int) get_option('user_types'); // default value 0
        if('' != $user_types){
        //Check user have permission to show popup or not..
        $show_chatgpt_popup=false;
        if($user_types==0){
        $show_chatgpt_popup=true;
        }else if($user_types==1){
        if(is_user_logged_in()){
            $show_chatgpt_popup=true;
        }
        }else{
            if(is_user_logged_in()){
                if ( current_user_can( 'manage_options' ) ) {
                $show_chatgpt_popup=true;
                }
            }
        }
        
        if($show_chatgpt_popup){
            $searchterm= sanitize_text_field($post["question"]);
            
            $endpoint="https://api.openai.com/v1/chat/completions";
    $access_token = $openai_api;
    $model = $chatgpt_model;
    // $model = 'gpt-3.5-turbo';
    $prompt_text = $searchterm;
    $temperature = 0;
    $max_tokens = $max_tokens;
    if($model == "gpt-3.5-turbo"){
        $payload = [
            "model" => $model,
            "temperature" => (int) $temperature,
            "max_tokens" => (int) $max_tokens,
            "messages" => array(
              array(
                  "role" => "user",
                  "content" => $prompt_text
              )
          )
          ];
    }else{
        $payload = [
            "model" => $model,
            "prompt" => $prompt_text,
            "temperature" => (int) $temperature,
            "max_tokens" => (int) $max_tokens,
          ];  
    }
    
        $json_input = json_encode($payload);
    
    $headr = [];
     $headr[] = 'Content-Type: application/json';
     $headr[] = 'Authorization: Bearer ' . $access_token;
    
    $curl = curl_init();
       curl_setopt($curl, CURLOPT_URL, $endpoint);
       curl_setopt($curl, CURLOPT_POST, 1);
       curl_setopt($curl, CURLOPT_POSTFIELDS, $json_input);
       curl_setopt($curl, CURLOPT_HTTPHEADER, $headr);
       curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
       $reply = curl_exec($curl);
    
       
       // Error handling for cURL.
       if ($reply === FALSE) {
     
    
    $jsonresp=array();
            $jsonresp["error"] = "1";
            $jsonresp["desc"] = "Curl error:".curl_error($curl);
            
             wp_send_json($jsonresp);
             exit;
    
       }else{
        
    // cURL ends
       // decoding the json data.
       $decoded_data = json_decode($reply);
    
       if (isset($decoded_data->error)) {
        $jsonresp=array();
            $jsonresp["error"] = "1";
            $jsonresp["desc"] = "Error:".$decoded_data->error->message;
            
             wp_send_json($jsonresp);
             exit;
           
       }
    
       $text = $decoded_data->choices[0]->message->content;
       
    //$text = preg_replace("/[\r\n]+/", "\n", $text);
        $text = preg_replace("/[\r\n]+/", "m2mfixark", $text);
    
        $jsonresp=array();   
     $jsonresp["error"] = "0";
            $jsonresp["desc"] = $text;
            
             wp_send_json($jsonresp);
             exit;
             
       }
       curl_close($curl);
       
        }else{
            //Send error no privillages
            $jsonresp=array();
            $jsonresp["error"] = 1;
    $jsonresp["desc"] = "You are not allowed to use ChatGPT popup!";
    
    
    
    
        }
    }
       
    }

      /**
     * Download image from a server and upload into worpdress media 
     */
    function pansophy_donwload_upload_wp_multiple_media( $image_url ){
        include_once( ABSPATH . '/wp-load.php' );
        include_once( ABSPATH . '/wp-admin/includes/image.php' );

        $imageurl = $image_url;
        // $imagetype = end(explode('/', getimagesize($imageurl)['mime']));
        // $uniq_name = date('dmY').''.(int) microtime(true); 
        // $filename = $uniq_name.'.'.$imagetype;
        $filename = rand(987654321, 123456789).'.png';
        $uploaddir = wp_upload_dir();
        $uploadfile = $uploaddir['path'] . '/' . $filename;
        $contents= file_get_contents($imageurl);
        $savefile = fopen($uploadfile, 'w');
        fwrite($savefile, $contents);
        fclose($savefile);

        $wp_filetype = wp_check_filetype(basename($filename), null );
        $attachment = array(
            'post_mime_type' => $wp_filetype['type'],
            'post_title' => $filename,
            'post_content' => '',
            'post_parent' => 9999999999,
            'post_status' => 'inherit'
        );

        $attach_id = wp_insert_attachment( $attachment, $uploadfile );
        $imagenew = get_post( $attach_id );
        $fullsizepath = get_attached_file( $imagenew->ID );
        $attach_data = wp_generate_attachment_metadata( $attach_id, $fullsizepath );
        wp_update_attachment_metadata( $attach_id, $attach_data ); 

        return $attach_id;
    }
 
    /**
     * Search with image
     */ 
    function pansophy_dall_image_srch($post){
 
        $openai_api = get_option('openai_api');
        $dall_user_types = (int) get_option('dall_user_types'); // default value 0
        if( '' != $dall_user_types ){

            //Check user have permission to show popup or not..
            $show_dall_popup=false;
            if( $dall_user_types == 0 ){
            $show_dall_popup=true;
            }else if( $dall_user_types == 1 ){
            if(is_user_logged_in()){
                $show_dall_popup=true;
            }
            }else{
                if(is_user_logged_in()){
                    if ( current_user_can( 'manage_options' ) ) {
                    $show_dall_popup=true;
                    }
                }
            }
            $show_dall_popup = true;
            if($show_dall_popup){
                $searchterm = sanitize_text_field( $post["question"] );
                $totalimgs = sanitize_text_field( $post["totalimgs"] );
                $imgSize = sanitize_text_field( $post["imgSize"] );
                $sizeImage="256x256";
            
                if($imgSize==1){
                    $sizeImage="256x256";
                }else if($imgSize==2){
                    $sizeImage="512x512";
                }if($imgSize==3){
                    $sizeImage="1024x1024";
                }
            
          

                $endpoint="https://api.openai.com/v1/images/generations";
                $access_token = $openai_api;
                $prompt_text=$searchterm;
                $temperature=0;

                $payload = [
                    "prompt" => $prompt_text,
                    'n' => (int)$totalimgs,
                    'size' => $sizeImage

                    ];
                $json_input = json_encode($payload);

                $headr = [];
                $headr[] = 'Content-Type: application/json';
                $headr[] = 'Authorization: Bearer ' . $access_token;

                $curl = curl_init();
                curl_setopt($curl, CURLOPT_URL, $endpoint);
                curl_setopt($curl, CURLOPT_POST, 1);
                curl_setopt($curl, CURLOPT_POSTFIELDS, $json_input);
                curl_setopt($curl, CURLOPT_HTTPHEADER, $headr);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
                $reply = curl_exec($curl);

       
               // Error handling for cURL.
               if ($reply === FALSE) {
             
                $jsonresp=array();
                    $jsonresp["error"] = "1";
                    $jsonresp["desc"] = "Curl error:".curl_error($curl);
                    
                     wp_send_json($jsonresp);
                     exit;

               }else{
        
                    // cURL ends
                   // decoding the json data.
                   $decoded_data = json_decode($reply);

                   if (isset($decoded_data->error)) {
                         $jsonresp=array();
                        $jsonresp["error"] = "1";
                        $jsonresp["desc"] = "Error:".$decoded_data->error->message;
                        
                         wp_send_json($jsonresp);
                         exit;
                       
                   }

                $retResp = '';
         
                $decoded_datas=json_decode($reply,true);
               $uploaded_wp_medias = array();
               if(isset($decoded_datas['data']) && count($decoded_datas['data']) > 0){
              
                foreach($decoded_datas['data'] as $res){
                    if(isset($res['url']) && $res['url']){
                           $media_id =  $this->pansophy_donwload_upload_wp_multiple_media($res['url']);
                           if( $media_id ){
                             $img_scr = wp_get_attachment_url( $media_id );
                             array_push( $uploaded_wp_medias, array('media_id' => $media_id, 'img_scr' => $img_scr ) );
                           } 
                           
                       $retResp .='<div class="gpt_img_single"><img src="'.$res['url'].'"/><div class="overlay_img"><div class="overlay_selected"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 19L18 25L28 15M20 38C15.2261 38 10.6477 36.1036 7.27208 32.7279C3.89642 29.3523 2 24.7739 2 20C2 15.2261 3.89642 10.6477 7.27208 7.27208C10.6477 3.89642 15.2261 2 20 2C24.7739 2 29.3523 3.89642 32.7279 7.27208C36.1036 10.6477 38 15.2261 38 20C38 24.7739 36.1036 29.3523 32.7279 32.7279C29.3523 36.1036 24.7739 38 20 38Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div></div>';
                        
                    }
                }
                
            } else {
                $retResp= '<div>No Images Found</div>';
            }
            $jsonresp=array();
            $jsonresp["error"] = "0";
            $jsonresp["desc"] = $retResp;
            $jsonresp['uploaded_wp_medias'] = $uploaded_wp_medias;
            wp_send_json($jsonresp);
            exit;
             
        }
        curl_close($curl);

            

            }else{
                //Send error no privillages
                $jsonresp=array();
                $jsonresp["error"] = 1;
                $jsonresp["desc"] = "You are not allowed to use DALL-E 2 popup!";
                wp_send_json($jsonresp);
                exit;

            }
        }
       
    }     
}
new WP_ChatGPT_Plugin_Rest_Route();