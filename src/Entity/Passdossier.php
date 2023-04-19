<?php

namespace App\Entity;


use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Context\ExecutionContextInterface;
use DateTime;
use DateTimeInterface;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;

/**
 * Passdossier
 *
 * (repositoryClass="App\Repository\PassdossierRepository")
 */
class Passdossier
{
	/**
	 * @var int
	 *
	 * (name="id_passdos", type="integer")
	 * (strategy="AUTO")
	 */
	private $id;
		
	/**
	 * (targetEntity="App\Entity\Dossier", inversedBy="passdossiers", cascade={"persist"})
	 * (name="num_dos", referencedColumnName="num_dos", nullable=false)
	 */
	private $dossier;
	
	/**
	 * (targetEntity="UserBundle\Entity\Individu", cascade={"persist"})
	 * (name="num_pas", referencedColumnName="num_pas", nullable=false)
	 * @Assert\Valid()
	 */
	private $individu;
	
	/**
	 * @var boolean
	 */
	private $isChild = false;

    private $numPas;
    private $assurance;

	/**
	 * @var boolean
	 */
	private $leaderPax = false;

    private $qualite;
    private $nomPas;
    private $prenomPas;
    private $dtNaissPas;

	public function __construct()
	{
// 		$this->checkIsChild();
	}

    public function getAssurance()
    {
        return $this->assurance;
    }
    public function setAssurance($assurance)
    {
        $this->assurance = $assurance;
    }

    public function getNumpPas()
    {
        return $this->numPas;
    }
    public function setNumpPas($numPass)
    {
        $this->numPas = $numPass;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set dossier
     *
     * @param \App\Entity\Dossier $dossier
     *
     * @return Passdossier
     */
    public function setDossier(\App\Entity\Dossier $dossier)
    {
        $this->dossier = $dossier;

        return $this;
    }

    /**
     * Get dossier
     *
     * @return \App\Entity\Dossier
     */
    public function getDossier()
    {
        return $this->dossier;
    }

    /**
     * Set individu
     *
     * @param \UserBundle\Entity\Individu $individu
     *
     * @return Passdossier
     */
    public function setIndividu(\App\Entity\Individu $individu = null)
    {
        $this->individu = $individu;

        return $this;
    }

    /**
     * Get individu
     *
     * @return \UserBundle\Entity\Individu
     */
    public function getIndividu()
    {
        return $this->individu;
    }
    
    /**
     * 
     * @param boolean $value
     * @return \App\Entity\Passdossier
     */
    public function setIsChild($value)
    {
    	$this->isChild = $value;
    	
    	return $this;
    }
    
    public function isChild()
    {
    	return $this->isChild;
    }
    
    /**
     * 
     */
    public function checkIsChild()
   	{
   		if($this->getIndividu()->getDtNaissPas() != null && !empty($this->getIndividu()->getDtNaissPas())) {
	   		$now = new \dateTime();
	   		$interval = $now->diff($this->getIndividu()->getDtNaissPas());

	   		if($interval->y < 15){
		   		//die();
	   			$this->setIsChild(true);
	   		} 
   		}
    }
    
    public function getAge()
    {
    	$now = new \DateTime();
    	$interval = $now->diff($this->getIndividu()->getDtNaissPas());

    	return $interval->y;
   
    }
    
    public function getAgeAtDateOfDeparture($dateOfDeparture)
    {
    	$birthDate = $this->getIndividu()->getDtNaissPas();
    	$interval = $birthDate->diff($dateOfDeparture);
    	
    	return $interval->y;
    }
    
    /**
     * @Assert\Callback
     */
    public function test(ExecutionContextInterface $context)
    {
    	if(!empty($this->getIndividu()) && !empty($this->getDtNaissPas())){
    		if($this->isChild() && $this->getAge() >= 15){
    			$context
    			->buildViolation("L'âge doit être inférieur à 15 ans")
    			->atPath('individu.dtNaissPas')
    			->addViolation()
    			;
    		}
    		if(!$this->isChild() && $this->getAge() < 15){
    			$context
    			->buildViolation("L'âge doit être supérieur à 15 ans")
    			->atPath('individu.dtNaissPas')
    			->addViolation()
    			;
    		}
    	}
    }
    
    /**
     *
     * @param boolean $value
     * @return \App\Entity\Passdossier
     */
    public function setLeaderPax($value)
    {
    	$this->leaderPax = $value;
    	
    	return $this;
    }
    
    public function isLeaderPax()
    {
    	return $this->leaderPax;
    }

    /**
     * @param \DateTime $dtNaissPas
     */
    public function setDtNaissPas($dtNaissPas)
    {
        $this->dtNaissPas = $dtNaissPas;
//        $this->dtNaissPas = new \DateTime($dtNaissPas);
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


}
