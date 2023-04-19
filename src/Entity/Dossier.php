<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * Dossier
 */
class Dossier
{
	/**
	 * @var string
	 *
	 * (name="num_dos", type="string", length=50)
	 */
	private $numDos;
		
	/**
	 * @var string
	 *
	 * (name="cod_ag", type="string", length=20)
	 */
	private $codAg;
	
	/**
	 * @var string
	 *
	 * (name="etat_dos", type="string", length=10)
	 */
	private $etatDos = 'D';
		
	/**
	 * @var string
	 *
	 * (name="cod_client", type="string", length=20)
	 */
	private $codClient;
	
	/**
	 * @var string
	 *
	 * (name="cod_sav_1", type="string", length=10)
	 */
	private $codSav1 = 'Internet';
		
	/**
	 * @var string
	 *
	 * (name="cod_sav_2", type="string", length=10)
	 */
	private $codSav2 = 'Internet';
	
	/**
	 * @var string
	 *
	 * (name="pays", type="string", length=50)
	 */
	private $pays;
	
	/**
	 * @var string
	 *
	 * (name="destination", type="string", length=200)
	 */
	private $destination;
	
	/**
	 * @var string
	 *
	 * (name="typevoyage", type="string", length=50)
	 */
	private $typevoyage;
			
	/**
	 * @var int
	 *
	 * (name="nb_ad", type="integer")
	 */
	private $nbAd;
	
	/**
	 * @var int
	 *
	 * (name="nb_enf", type="integer")
	 */
	private $nbEnf;
	
	/**
	 * @var \DateTime
	 *
	 * (name="dt_dep_europe", type="datetime")
	 */
	private $dtDepEurope;
		
	/**
	 * @var \DateTime
	 *
	 * (name="dt_arr_europe", type="datetime")
	 */
	private $dtArrEurope;
	
	/**
	 * @var string
	 *
	 * (name="num_pas_payeur", type="string", length=20)
	 */
	private $numPasPayeur;
	
	/**
	 * @var string
	 *
	 * (name="Nom1erPax", type="string", length=100)
	 */
	private $nom1erPax;
				
	
	/**
	 * (targetEntity="App\Entity\Passdossier", mappedBy="dossier", cascade={"persist"})
	 * @Assert\Valid()
	 */
	private $passdossiers;

	/**
	 * (targetEntity="App\Entity\Suividos", mappedBy="dossier", cascade={"persist"})
	 * @Assert\Valid()
	 */
	private $suividoss;
	
	/**
	 * Constructor
	 */
	public function __construct()
	{		
		$this->passdossiers = new \Doctrine\Common\Collections\ArrayCollection();
		$this->suividoss = new \Doctrine\Common\Collections\ArrayCollection();
	}
	
    /**
     * Set numDos
     *
     * @param string $numDos
     *
     * @return Dossier
     */
    public function setNumDos($numDos)
    {
        $this->numDos = $numDos;

        return $this;
    }

    /**
     * Get numDos
     *
     * @return string
     */
    public function getNumDos()
    {
        return $this->numDos;
    }

    /**
     * Add passdossier
     *
     * @param \App\Entity\Passdossier $passdossier
     *
     * @return Dossier
     */
    public function addPassdossier(\App\Entity\Passdossier $passdossier)
    {
        $this->passdossiers[] = $passdossier;
        
        $passdossier->setDossier($this);

        return $this;
    }

    /**
     * Remove passdossier
     *
     * @param \App\Entity\Passdossier $passdossier
     */
    public function removePassdossier(\App\Entity\Passdossier $passdossier)
    {
        $this->passdossiers->removeElement($passdossier);
    }

    /**
     * Get passdossiers
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPassdossiers()
    {
        return $this->passdossiers;
    }
    
    /**
     * PostLoad
     */
    public function checkPassdossier()
    {
    	foreach($this->getPassdossiers() as $passdossier)
    	{
    		$passdossier->checkIsChild();
    		if($this->getNumPasPayeur() == $passdossier->getIndividu() ->getNumPas())$passdossier->setLeaderPax(true);
    	}
    }

    /**
     * Add suividos
     *
     * @param \App\Entity\Suividos $suividos
     * @return Dossier
     */
    public function addSuividos(\App\Entity\Suividos $suividos)
    {
        $this->suividoss[] = $suividos;
        
        $suividos->setDossier($this);

        return $this;
    }

    /**
     * Remove suividos
     *
     * @param \App\Entity\Suividos $suividos
     */
    public function removeSuividos(\App\Entity\Suividos $suividos)
    {
        $this->suividoss->removeElement($suividos);
    }

    /**
     * Get suividoss
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getSuividoss()
    {
        return $this->suividoss;
    }


    /**
     * Set etatDos
     *
     * @param string $etatDos
     * @return Dossier
     */
    public function setEtatDos($etatDos)
    {
        $this->etatDos = $etatDos;

        return $this;
    }

    /**
     * Get etatDos
     *
     * @return string 
     */
    public function getEtatDos()
    {
        return $this->etatDos;
    }

    /**
     * Set codSav1
     *
     * @param string $codSav1
     * @return Dossier
     */
    public function setCodSav1($codSav1)
    {
        $this->codSav1 = $codSav1;

        return $this;
    }

    /**
     * Get codSav1
     *
     * @return string 
     */
    public function getCodSav1()
    {
        return $this->codSav1;
    }

    /**
     * Set pays
     *
     * @param string $pays
     * @return Dossier
     */
    public function setPays($pays)
    {
        $this->pays = $pays;

        return $this;
    }

    /**
     * Get pays
     *
     * @return string 
     */
    public function getPays()
    {
        return $this->pays;
    }

    /**
     * Set destination
     *
     * @param string $destination
     * @return Dossier
     */
    public function setDestination($destination)
    {
        $this->destination = $destination;

        return $this;
    }

    /**
     * Get destination
     *
     * @return string 
     */
    public function getDestination()
    {
        return $this->destination;
    }

    /**
     * Set typevoyage
     *
     * @param string $typevoyage
     * @return Dossier
     */
    public function setTypevoyage($typevoyage)
    {
        $this->typevoyage = $typevoyage;

        return $this;
    }

    /**
     * Get typevoyage
     *
     * @return string 
     */
    public function getTypevoyage()
    {
        return $this->typevoyage;
    }


    /**
     * Set dtDepEurope
     *
     * @param \DateTime $dtDepEurope
     * @return Dossier
     */
    public function setDtDepEurope($dtDepEurope)
    {
        $this->dtDepEurope = $dtDepEurope;

        return $this;
    }

    /**
     * Get dtDepEurope
     *
     * @return \DateTime 
     */
    public function getDtDepEurope()
    {
        return $this->dtDepEurope;
    }

    /**
     * Set dtArrEurope
     *
     * @param \DateTime $dtArrEurope
     * @return Dossier
     */
    public function setDtArrEurope($dtArrEurope)
    {
        $this->dtArrEurope = $dtArrEurope;

        return $this;
    }

    /**
     * Get dtArrEurope
     *
     * @return \DateTime 
     */
    public function getDtArrEurope()
    {
        return $this->dtArrEurope;
    }

    /**
     * Set numPasPayeur
     *
     * @param string $numPasPayeur
     * @return Dossier
     */
    public function setNumPasPayeur($numPasPayeur)
    {
        $this->numPasPayeur = $numPasPayeur;

        return $this;
    }

    /**
     * Get numPasPayeur
     *
     * @return string 
     */
    public function getNumPasPayeur()
    {
        return $this->numPasPayeur;
    }

    /**
     * Set nom1erPax
     *
     * @param string $nom1erPax
     * @return Dossier
     */
    public function setNom1erPax($nom1erPax)
    {
        $this->nom1erPax = $nom1erPax;

        return $this;
    }

    /**
     * Get nom1erPax
     *
     * @return string 
     */
    public function getNom1erPax()
    {
        return $this->nom1erPax;
    }


    /**
     * Set codAg
     *
     * @param string $codAg
     * @return Dossier
     */
    public function setCodAg($codAg)
    {
        $this->codAg = $codAg;

        return $this;
    }

    /**
     * Get codAg
     *
     * @return string 
     */
    public function getCodAg()
    {
        return $this->codAg;
    }

    /**
     * Set nbAd
     *
     * @param integer $nbAd
     * @return Dossier
     */
    public function setNbAd($nbAd)
    {
        $this->nbAd = $nbAd;

        return $this;
    }

    /**
     * Get nbAd
     *
     * @return integer 
     */
    public function getNbAd()
    {
        return $this->nbAd;
    }

    /**
     * Set nbEnf
     *
     * @param integer $nbEnf
     * @return Dossier
     */
    public function setNbEnf($nbEnf)
    {
        $this->nbEnf = $nbEnf;

        return $this;
    }

    /**
     * Get nbEnf
     *
     * @return integer 
     */
    public function getNbEnf()
    {
        return $this->nbEnf;
    }

    /**
     * Add suividoss
     *
     * @param \App\Entity\Suividos $suividoss
     * @return Dossier
     */
    public function addSuividoss(\App\Entity\Suividos $suividoss)
    {
        $this->suividoss[] = $suividoss;

        return $this;
    }

    /**
     * Remove suividoss
     *
     * @param \App\Entity\Suividos $suividoss
     */
    public function removeSuividoss(\App\Entity\Suividos $suividoss)
    {
        $this->suividoss->removeElement($suividoss);
    }

    /**
     * Set codClient
     *
     * @param string $codClient
     * @return Dossier
     */
    public function setCodClient($codClient)
    {
        $this->codClient = $codClient;

        return $this;
    }

    /**
     * Get codClient
     *
     * @return string 
     */
    public function getCodClient()
    {
        return $this->codClient;
    }

    /**
     * Set codSav2
     *
     * @param string $codSav2
     * @return Dossier
     */
    public function setCodSav2($codSav2)
    {
        $this->codSav2 = $codSav2;

        return $this;
    }

    /**
     * Get codSav2
     *
     * @return string 
     */
    public function getCodSav2()
    {
        return $this->codSav2;
    }
}
