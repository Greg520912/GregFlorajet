<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Context\ExecutionContextInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use Symfony\Component\Form\Extension\Core\Type\DateTimeType;

use DateTimeInterface;

use Symfony\Component\Validator\Constraints\DateTime;

/**
 * Individu
 *
 * @UniqueEntity(fields="username", message="Cette adresse email existe déjà.", groups={"registration"})
 */
class Individu 
{
    /**
     * @Assert\Email(
     *     message = "Adresse email invalide.",
     *     checkMX = true,
     *     groups={"registration","quickbooking"}
     * )
     */
    private $username;
    
    /**
     * (name="MotDePasse", type="string", length=50)
     * @Assert\Length(min=6, minMessage="Le mot de passe doit faire au moins {{ limit }} caractères.")
     */
    private $password;
    
    /**
	 * @var string
	 * (name="num_pas", type="string", length=20)
	 */
	private $numPas;

	/**
	 * @var string
	 * (name="nom_pas", type="string", length=50)
	 * @Assert\Length(min=2, groups={"registration","quickbooking"})
     * @Assert\Regex(
     *     pattern     = "/^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{2,60}$/",
     *     message = "Nom invalide.", 
     *     groups={"registration","quickbooking"}
     * )
	 */
	private $nomPas;

	/**
	 * @var string
	 * (name="prenom_pas", type="string", length=50)
	 * @Assert\Length(min=2, groups={"registration","quickbooking"})
     * @Assert\Regex(
     *     pattern     = "/^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{2,60}$/",
     *     message = "Prénom invalide.", 
     *     groups={"registration","quickbooking"}
     * )
	 */
	private $prenomPas;

	/**
     * @var \DateTime
	 * (name="date_naiss_pas", type="datetime")
	 */
	private $dtNaissPas;

	/**
	 * @var \DateTime
	 * (name="date_crea", type="datetime")
	 */
	private $dtCrea;
	
	/**
	 * @var string
	 * (name="qualite", type="string", length=25)
	 */
	private $qualite;

	/**
	 * @var string
	 * (name="nom_foyer", type="string", length=100)
	 */
	private $nomFoyer;
	
	/**
	 * @var string
	 * (name="adresse1", type="string", length=50)
	 */
	private $adresse1;
	
	/**
	 * @var string
	 * (name="adresse2", type="string", length=50)
	 */
	private $adresse2;

    /**
     * @var string
     * (name="houseNumber", type="string", length=50)
     */
    private $houseNumber;

    /**
     * @var string
     * (name="street", type="string", length=50)
     */
    private $street;

    /**
     * @var string
     * (name="county", type="string", length=50)
     */
    private $county;

	/**
	 * @var string
	 * (name="adresse3", type="string", length=50)
	 */
	private $adresse3;

	/**
	 * @var string
	 * (name="ville_fr", type="string", length=50)
	 */
	private $villeFr;

	/**
	 * @var string
	 * (name="Codepostal", type="string", length=20)
	 */
	private $codePostal;

	/**
	 * @var string
	 * (name="cod_pays", type="string", length=50)
	 */
	private $codPays;
	
	/**
	 * @var string
	 * (name="tel_dom", type="string", length=25)
	 */
	private $telDom;
	
	/**
	 * @var string
	 * (name="tel_mobile", type="string", length=25)
     * @Assert\NotBlank(message = "Vous devez renseigner votre n° de téléphone.", groups={"booking","quickbooking"})
     * @Assert\Length(min=10, minMessage="Le numéro saisi est trop court.", groups={"registration","quickbooking"})
	 */
	private $telMobile;
	
	/**
	 * @var string
	 * (name="email_dom", type="string", length=255)
	 */
	private $emailDom;

	/**
	 * @var string
	 * (name="nationalite", type="string", length=255)
	 */
	private $nationalite;

    /**
     * @var int
     * (name="id_nl", type="smallint", nullable=true)
     */
    private $idNl;
    /**
     * @var \DateTime
     * (name="date_abo_nl", type="datetime", nullable=true)
     * @Assert\DateTime(
     * 		message = "invalide."
     * )
     */
    private $dtAboNl;

    /**
     * @var \DateTime
     * (name="date_desabo_nl", type="datetime", nullable=true)
     * @Assert\DateTime(
     * 		message = "invalide."
     * )
     */
    private $dtDesaboNl;

    /**
     * @var int
     * (name="id_nl_partenaire", type="smallint", nullable=true)
     */
    private $idNlPartenaire;
    /**
     * @var \DateTime
     * (name="date_abo_nl_partenaire", type="datetime", nullable=true)
     * @Assert\DateTime(
     * 		message = "invalide."
     * )
     */
    private $dtAboNlPartenaire;

    /**
     * @var \DateTime
     * (name="date_desabo_nl_partenaire", type="datetime", nullable=true)
     * @Assert\DateTime(
     * 		message = "invalide."
     * )
     */
    private $dtDesaboNlPartenaire;

		
	private $salt;
	
	private $roles = array('ROLE_USER');
	
	
	public function __construct()
	{
		$this->setDtCrea(new \DateTime());
	}
	
	/**
     * @param string $numPas
     */
    public function setNumPas($numPas)
    {
        $this->numPas = $numPas;
    }

    /**
     * @return string
     */
    public function getNumPas()
    {
        return $this->numPas;
    }

    /**
     * @param string $nomPas
     */
    public function setNomPas($nomPas)
    {
        $this->nomPas = $nomPas;
    }

    /**
     * @return string
     */
    public function getNomPas()
    {
        return $this->nomPas;
    }

    /**
     * @param string $prenomPas
     */
    public function setPrenomPas($prenomPas)
    {
        $this->prenomPas = $prenomPas;
    }

    /**
     * @return string
     */
    public function getPrenomPas()
    {
        return $this->prenomPas;
    }

    /**
     * @param \DateTime $dtNaissPas
     */
    public function setDtNaissPas($dtNaissPas)
    {
//        $this->dtNaissPas = new \DateTime($dtNaissPas);
        $this->dtNaissPas = $dtNaissPas;
    }

    /**
     * @return \DateTime
     */
    public function getDtNaissPas()
    {
        return $this->dtNaissPas;
    }

    /**
     * @param string $qualite
     */
    public function setQualite($qualite)
    {
        $this->qualite = $qualite;
    }

    /**
     * @return string
     */
    public function getQualite()
    {
        return $this->qualite;
    }

    /**
     * @param string $adresse1
     */
    public function setAdresse1($adresse1)
    {
        $this->adresse1 = $adresse1;
    }

    /**
     * @return string
     */
    public function getAdresse1()
    {
        return $this->adresse1;
    }

    /**
 * @param string $adresse2
 * @return Individu
 */
    public function setAdresse2($adresse2)
    {
        $this->adresse2 = $adresse2;
    }

    /**
     * @return string
     */
    public function getAdresse2()
    {
        return $this->adresse2;
    }

    public function sethouseNumber($houseNumber)
    {
        $this->houseNumber = $houseNumber;
    }

    /**
     * @return string
     */
    public function gethouseNumber()
    {
        return $this->houseNumber;
    }

    /**
     * @param string street
     * @return Individu
     */
    public function setstreet($street)
    {
        $this->street = $street;
    }

    /**
     * @return string
     */
    public function getstreet()
    {
        return $this->street;
    }

    /**
     * @param string street
     * @return Individu
     */
    public function setcounty($county)
    {
        $this->county = $county;
    }

    /**
     * @return string
     */
    public function getcounty()
    {
        return $this->county;
    }
    /**
     * @param string $adresse3
     */
    public function setAdresse3($adresse3)
    {
        $this->adresse3 = $adresse3;
    }

    /**
     * @return string
     */
    public function getAdresse3()
    {
        return $this->adresse3;
    }

    /**
     * @param string $villeFr
     */
    public function setVilleFr($villeFr)
    {
        $this->villeFr = $villeFr;
    }

    /**
     * @return string
     */
    public function getVilleFr()
    {
        return $this->villeFr;
    }

    /**
     * @param string $codePostal
     */
    public function setCodePostal($codePostal)
    {
        $this->codePostal = $codePostal;
    }

    /**
     * @return string
     */
    public function getCodePostal()
    {
        return $this->codePostal;
    }

    /**
     * @param string $codPays
     */
    public function setCodPays($codPays)
    {
        $this->codPays = $codPays;
    }

    /**
     * @return string
     */
    public function getCodPays()
    {
        return $this->codPays;
    }

    /**
     * @param string $telDom
     */
    public function setTelDom($telDom)
    {
        $this->telDom = $telDom;
    }

    /**
     * @return string
     */
    public function getTelDom()
    {
        return $this->telDom;
    }

    /**
     * @param string $telMobile
     */
    public function setTelMobile($telMobile)
    {
        $this->telMobile = $telMobile;
    }

    /**
     * @return string
     */
    public function getTelMobile()
    {
        return $this->telMobile;
    }

    /**
     * @param string $emailDom
     */
    public function setEmailDom($emailDom)
    {
        $this->emailDom = $emailDom;
    }

    /**
     * @return string
     */
    public function getEmailDom()
    {
        return $this->emailDom;
    }

    
    /* @Assert\Callback : to reactivate when solution founded for passdossier individu submission */
    /**
     * @Assert\Callback()
     */
    public function isSubmittedPhoneNumber(ExecutionContextInterface $context)
    {
    	 if(empty($this->getTelDom()) && empty($this->getTelMobile())){
    	 	$context
    	 		->buildViolation('Vous devez renseigner au moins un n° de téléphone')
    	 		->atPath('telMobile')
    	 		->addViolation()
    	 	;
    	 }
    }
    

    /**
     * @param string $nomFoyer
     */
    public function setNomFoyer($nomFoyer)
    {
        $this->nomFoyer = $nomFoyer;
    }

    /**
     * @return string 
     */
    public function getNomFoyer()
    {
        return $this->nomFoyer;
    }

    /**
     * @param \DateTime $dtCrea
     */
    public function setDtCrea($dtCrea)
    {
        $this->dtCrea = $dtCrea;
    }

    /**
     * @return \DateTime 
     */
    public function getDtCrea()
    {
        return $this->dtCrea;
    }
 
    public function eraseCredentials()
    {}

    /**
     * @param string $username
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }
    
    /**
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }
    
    /**
     * @param string $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }
    
    /**
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param string $nationalite
     */
    public function setNationalite($nationalite)
    {
        $this->nationalite = $nationalite;
    }

    /**
     * @return string
     */
    public function getNationalite()
    {
        return $this->nationalite;
    }

    /**
     * @return int
     */
    public function getIdNl()
    {
        return $this->idNl;
    }

    /**
     * @param int $idNl
     */
    public function setIdNl($idNl)
    {
        $this->idNl = $idNl;
    }

    /**
     * @return \DateTime
     */
    public function getDtAboNl()
    {
        return $this->dtAboNl;
    }

    /**
     * @param \DateTime $dtAboNl
     */
    public function setDtAboNl($dtAboNl)
    {
        $this->dtAboNl = $dtAboNl;
    }

    /**
     * @return \DateTime
     */
    public function getDtDesaboNl()
    {
        return $this->dtDesaboNl;
    }

    /**
     * @param \DateTime $dtDesaboNl
     */
    public function setDtDesaboNl($dtDesaboNl)
    {
        $this->dtDesaboNl = $dtDesaboNl;
    }

    /**
     * @return int
     */
    public function getIdNlPartenaire()
    {
        return $this->idNlPartenaire;
    }

    /**
     * @param int $idNlPartenaire
     */
    public function setIdNlPartenaire($idNlPartenaire)
    {
        $this->idNlPartenaire = $idNlPartenaire;
    }

    /**
     * @return \DateTime
     */
    public function getDtAboNlPartenaire()
    {
        return $this->dtAboNlPartenaire;
    }

    /**
     * @param \DateTime $dtAboNlPartenaire
     */
    public function setDtAboNlPartenaire($dtAboNlPartenaire)
    {
        $this->dtAboNlPartenaire = $dtAboNlPartenaire;
    }

    /**
     * @return \DateTime
     */
    public function getDtDesaboNlPartenaire()
    {
        return $this->dtDesaboNlPartenaire;
    }

    /**
     * @param \DateTime $dtDesaboNlPartenaire
     */
    public function setDtDesaboNlPartenaire($dtDesaboNlPartenaire)
    {
        $this->dtDesaboNlPartenaire = $dtDesaboNlPartenaire;
    }
    
    /**
     * @param string $salt
     */
    public function setSalt($salt)
    {
        $this->salt = $salt;
    }
    
    /**
     * @return string
     */
    public function getSalt()
    {
        return $this->salt;
    }
    
    /**
     * @param array $roles
     */
    public function setRoles($roles)
    {
        $this->roles = $roles;
    }
    
    /**
     * @return array
     */
    public function getRoles()
    {
        return $this->roles;
    }

}