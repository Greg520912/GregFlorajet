<?php

namespace App\Entity;
use Symfony\Component\Validator\Constraints as Assert;

class Password {
	
	/**
	 * @var string
	 *
	 * @Assert\Email(
	 *     message = "Email invalide",
	 *     checkMX = true
	 * )
	 */
	private $email;
	
	/**
	 * Set email
	 *
	 * @param string $email
	 *
	 * @return Password
	 */
	public function setEmail($email)
	{
		$this->email = $email;
	
		return $this;
	}
	
	/**
	 * Get email
	 *
	 * @return string
	 */
	public function getEmail()
	{
		return $this->email;
	}
	
}
