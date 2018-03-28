<?php
/**
 * This file will create Custom General Rest API End Points.
 */
class WP_React_General_Settings_Rest_Route {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {
        register_rest_route( 'wprk/v1', '/general', [
            'methods' => 'GET',
            'callback' => [ $this, 'get_settings' ],
            
        ] );
        register_rest_route( 'wprk/v1', '/general/dall', [
            'methods' => 'POST',
            'callback' => [ $this, 'save_dall_settings' ],
            
        ] );
        register_rest_route( 'wprk/v1', '/general', [
            'methods' => 'POST',
            'callback' => [ $this, 'save_settings' ],
        ] );
        register_rest_route( 'wprk/v1', '/general/auto_delete', [
            'methods' => 'POST',
            'callback' => [ $this, 'save_delete_settings' ],
        ] );
        register_rest_route( 'wprk/v1', '/media', [
            'methods' => 'POST',
            'callback' => [ $this, 'save_media' ],
        ] );

     
    }

    
    public function get_settings() {
        $openai_api = get_option( 'openai_api' );
        $pansophy_api  = get_option( 'pansophy_api' );
        $chatgpt_model     = get_option( 'chatgpt_model' );
        $user_types     = get_option( 'user_types' );
        $chatgpt_popup_position     = get_option( 'chatgpt_popup_position' );
        $fine_tuned_model     = get_option( 'fine_tuned_model' );
        $mode     = get_option( 'mode' );
        $header_description     = get_option( 'header_description' );
        $header_message     = get_option( 'header_message' );
        $branding     = get_option( 'branding' );
        $max_tokens     = get_option( 'max_tokens' );
        $logo     = get_option( 'logo' );
        $content_mode_icon     = get_option( 'content_mode_icon' );
        $assistant_mode_icon     = get_option( 'assistant_mode_icon' );
        $responses_avatar     = get_option( 'responses_avatar' );
        $dall_user_types     = get_option( 'dall_user_types' );
        $dall_popup_position     = get_option( 'dall_popup_position' );
        $dall_logo     = get_option( 'dall_logo' );
        $auto_delete     = get_option( 'auto_delete' );
        $pages     = get_option( 'pages' );
       
        $response = [
            'openai_api'=> $openai_api,
            'pansophy_api'=> $pansophy_api,
            'chatgpt_model'=> $chatgpt_model,
            'user_types'=> $user_types,
            'chatgpt_popup_position'=> $chatgpt_popup_position,
            'fine_tuned_model'=> $fine_tuned_model,
            'mode' => $mode,
            'header_description'  => $header_description,
            'header_message'  => $header_message,
            'max_tokens'     => $max_tokens,
            'logo'     => $logo,
            'content_mode_icon'     => $content_mode_icon,
            'assistant_mode_icon'     => $assistant_mode_icon,
            'responses_avatar'     => $responses_avatar,
            'branding'     => $branding,
            'dall_user_types'     =>  $dall_user_types ,
        'dall_popup_position'     => $dall_popup_position ,
        'dall_logo'     => $dall_logo,
        'auto_delete'     => $auto_delete,
        'pages'     => $pages,

        ];

        return rest_ensure_response( $response );
        
    }

    public function get_settings_permission() {
        return true;
    }

    public function save_settings( $req ) {
        
        $openai_api =  $req['openai_api'] ;
        $pansophy_api  =  $req['pansophy_api'] ;
        $chatgpt_model     =  $req['chatgpt_model'] ;
        $user_types     =  $req['user_types'] ;
        $chatgpt_popup_position     = $req['chatgpt_popup_position'] ;
        $fine_tuned_model     = $req['fine_tuned_model'] ;
        $mode     =  $req['mode'] ;
        $header_message     =  $req['header_message'] ;
        $header_description     =  $req['header_description'] ;
        $header_message     =  $req['header_message'] ;
        $branding     =  $req['branding'] ;
        $max_tokens     = $req['max_tokens'] ;
        $logo     = $req['logo'] ;
        $content_mode_icon     = $req['content_mode_icon'] ;
        $assistant_mode_icon     = $req['assistant_mode_icon'];
        $responses_avatar     = $req['responses_avatar'] ;
        $pages     = $req['pages'] ;
        

        update_option( 'openai_api', $openai_api );
        update_option( 'pansophy_api', $pansophy_api );
        update_option( 'chatgpt_model', $chatgpt_model );
        update_option( 'user_types', $user_types );
        update_option( 'chatgpt_popup_position', $chatgpt_popup_position );
        update_option( 'fine_tuned_model', $fine_tuned_model );
        update_option( 'mode', $mode );
        update_option( 'header_message', $header_message );
        update_option( 'header_description', $header_description );

         update_option( 'branding', $branding );
         update_option( 'max_tokens', $max_tokens );
         update_option( 'logo', $logo );
          update_option( 'content_mode_icon', $content_mode_icon );
          update_option( 'assistant_mode_icon', $assistant_mode_icon );
          update_option( 'responses_avatar', $responses_avatar );
          update_option( 'pages', $pages);
         $clear_status = user_set_wp_cron_time();
        
        return rest_ensure_response( 'success' );
     }
    public function save_dall_settings( $req ) {
        
      
        $dall_user_types     =  $req['dall_user_types'] ;
        $dall_popup_position     = $req['dall_popup_position'] ;
        $dall_logo     = $req['dall_logo'] ;
        update_option( 'dall_user_types', $dall_user_types );
        update_option( 'dall_popup_position', $dall_popup_position );
        update_option( 'dall_logo', $dall_logo );
      
        return rest_ensure_response( 'success' );
     }
    public function save_delete_settings( $req ) {
        
      
        $auto_delete     =  $req['auto_delete'] ;
        update_option( 'auto_delete', $auto_delete );
      
        return rest_ensure_response( 'success' );
     }

     public function import_base64_docs($imageData, $final_path, $changed_name){
        $upload_dir = wp_upload_dir();

        $post_title = $imageData['image_detail'];
        $post_author = $imageData['post_author'];
        $parent_post = $imageData['parent_post'];        
        
        $media_type = $imageData['image']['upload_media']['type'];
         
        $fileName = $imageData['image']['upload_media']['name'];
         
        $temp_name = $imageData['image']['upload_media']['tmp_name'];
         

        //HANDLE UPLOADED FILE
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        // @new
        $file             = array();
        $file['error']    = '';
        $file['tmp_name'] = $final_path;
        $file['name']     = $changed_name;
        $file['type']     = $media_type;
        // $file['size']     = filesize( $upload_path . $hashed_filename );
        $file['size']     = filesize( $final_path);
        // upload file to server
        // @new use $file instead of $image_upload
        $file_return = wp_handle_sideload( $file, array( 'test_form' => false ) );
        // $file_return = media_handle_sideload($file, $parent_post);
 
        
        if( !isset($file_return['file'], $file_return['url'])){
             
            return false;
        }
         
     
        $filename = $file_return['file'];
        
        $attachment = array(
         'post_mime_type' => $file_return['type'],
         'post_title' => sanitize_text_field(preg_replace('/\.[^.]+$/', '', basename($post_title))),
         'post_content' => sanitize_text_field($post_title),
         'post_author' => sanitize_text_field($post_author),
         'post_status' => 'inherit',
         'guid' => $upload_dir['url'] . '/' . basename($filename)
         );
        $attach_id = wp_insert_attachment( $attachment, $filename, $parent_post );
        return  $attach_id;
    }
     public function save_media( $req ) {
        $upload_dir = wp_upload_dir(); 
        $path = $upload_dir['path'];

        $temp_name = $_FILES['upload_media']['tmp_name'];
        $fileName = $_FILES['upload_media']['name'];
        $file_extension = pathinfo($fileName, PATHINFO_EXTENSION);
        $hashed_filename = md5(  microtime() ) . '_' . $file_extension.'.'.$file_extension;
        $final_path = $path.'/'.$hashed_filename;
        $uploadfile = move_uploaded_file($temp_name,$final_path);
        
        if( $uploadfile ){
            $Files = $_FILES; 
            $imageData = array(
                'image' => $Files,
                'image_detail' => $fileName,
                'parent_post' => 0,
                'post_author' => 0,
            );
                        
            $insert_status = $this->import_base64_docs($imageData,$final_path, $hashed_filename);
            if( $insert_status ):
                return rest_ensure_response( array('meida_id' => $insert_status, 'media_url' => wp_get_attachment_url($insert_status))  );
            endif;

        }

         return rest_ensure_response( array( 'meida_id' => 0) );
     }

     
}
new WP_React_General_Settings_Rest_Route();

