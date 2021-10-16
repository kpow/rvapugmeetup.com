<?php
	
	$name = trim($_POST['name']);
	$email = $_POST['email'];
	$message = $_POST['message'];
	$subject = $_POST['subject'];
	$site_owners_email = 'rvapugmeetup@gmail.com'; // Replace this with your own email address
	
	if ($name=="") {
		$error['name'] = "Please enter your name";	
	}
	
	if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {
		$error['email'] = "Please enter a valid email address";	
	}
	
	if ($message== "") {
		$error['message'] = "Please leave a comment.";
	}
	if ($subject=="") {
		$error['subject'] = "Please leave a subject.";
	}
	if (!$error) {
	
		$mail = mail($site_owners_email, $subject, $message,
			"From: ".$name." <".$email.">\r\n"
			."Reply-To: ".$email."\r\n"
			."X-Mailer: PHP/" . phpversion());
		echo "<div class='success'>" . $name . ", We've received your email. We'll be in touch with you as soon as possible! </div>";
		
	} # end if no error
	else {

		$response ="";
		
		echo $response;
	} # end if there was an error sending

?>