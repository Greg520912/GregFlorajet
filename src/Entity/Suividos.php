<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * Passdossier
 *
 */
class Suividos
{
	/**
	 * @var int
	 *
	 * (name="id_suividos", type="integer")
	 * (strategy="AUTO")
	 */
	private $idSuividos;

	/**
	 * @var \DateTime
	 *
	 * (name="dt_suividos", type="datetime")
	 * @Assert\DateTime(
	 * 		message = "invalide."
	 * )
	 *
	 */
	private $dtSuividos;
	
	/**
	 * @var string
	 *
	 * (name="cod_sav", type="string", length=10)
	 */
	private $codSav = "Internet";
	
	/**
	 * @var string
	 *
	 * (name="cod_nature", type="string", length=50)
	 */
	private $codNature;
	
	/**
	 * @var string
	 *
	 * (name="type_suivi", type="string", length=50)
	 */
	private $typeSuivi;

	/**
	 * @var string
	 *
	 * (name="importance", type="string", length=25)
	 */
	private $importance = '1';
	
	/**
	 * @var string
	 *
	 * (name="remarque", type="string", length=255)
	 */
	private $remarque;
	
	/**
	 * @var string
	 *
	 * (name="montant", type="string", length=50)
	 */
	private $montant;
	
	/**
	 * @var string
	 *
	 * (name="num_pas", type="string", length=50)
	 */
	private $numPas;

	/**
	 * @var string
	 *
	 * (name="nom_pas", type="string", length=255)
	 */
	private $nomPas;
		
	/**
	 * (targetEntity="App\Entity\Dossier", inversedBy="suividoss", cascade={"persist"})
	 * (name="num_dos", referencedColumnName="num_dos", nullable=false)
	 */
	private $dossier;
	
	
		
	public function __construct()
	{
		// Par défaut, la date de l'annonce est la date d'aujourd'hui
		$this->dtSuividos = new \Datetime();
	}
	
    /**
     * Get idSuividos
     *
     * @return integer 
     */
    public function getIdSuividos()
    {
        return $this->idSuividos;
    }

    /**
     * Set dtSuividos
     *
     * @param \DateTime $dtSuividos
     * @return Suividos
     */
    public function setDtSuividos($dtSuividos)
    {
        $this->dtSuividos = $dtSuividos;

        return $this;
    }

    /**
     * Get dtSuividos
     *
     * @return \DateTime 
     */
    public function getDtSuividos()
    {
        return $this->dtSuividos;
    }

    /**
     * Set codSav
     *
     * @param string $codSav
     * @return Suividos
     */
    public function setCodSav($codSav)
    {
        $this->codSav = $codSav;

        return $this;
    }

    /**
     * Get codSav
     *
     * @return string 
     */
    public function getCodSav()
    {
        return $this->codSav;
    }

    /**
     * Set codNature
     *
     * @param string $codNature
     * @return Suividos
     */
    public function setCodNature($codNature)
    {
        $this->codNature = $codNature;

        return $this;
    }

    /**
     * Get codNature
     *
     * @return string 
     */
    public function getCodNature()
    {
        return $this->codNature;
    }

    /**
     * Set typeSuivi
     *
     * @param string $typeSuivi
     * @return Suividos
     */
    public function setTypeSuivi($typeSuivi)
    {
        $this->typeSuivi = $typeSuivi;

        return $this;
    }

    /**
     * Get typeSuivi
     *
     * @return string 
     */
    public function getTypeSuivi()
    {
        return $this->typeSuivi;
    }

    /**
     * Set importance
     *
     * @param string $importance
     * @return Suividos
     */
    public function setImportance($importance)
    {
        $this->importance = $importance;

        return $this;
    }

    /**
     * Get importance
     *
     * @return string 
     */
    public function getImportance()
    {
        return $this->importance;
    }

    /**
     * Set remarque
     *
     * @param string $remarque
     * @return Suividos
     */
    public function setRemarque($remarque)
    {
        $this->remarque = $remarque;

        return $this;
    }

    /**
     * Get remarque
     *
     * @return string 
     */
    public function getRemarque()
    {
        return $this->remarque;
    }

    /**
     * Set montant
     *
     * @param string $montant
     * @return Suividos
     */
    public function setMontant($montant)
    {
        $this->montant = $montant;

        return $this;
    }

    /**
     * Get montant
     *
     * @return string 
     */
    public function getMontant()
    {
        return $this->montant;
    }

    /**
     * Set numPas
     *
     * @param string $numPas
     * @return Suividos
     */
    public function setNumPas($numPas)
    {
        $this->numPas = $numPas;

        return $this;
    }

    /**
     * Get numPas
     *
     * @return string 
     */
    public function getNumPas()
    {
        return $this->numPas;
    }

    /**
     * Set nomPas
     *
     * @param string $nomPas
     * @return Suividos
     */
    public function setNomPas($nomPas)
    {
        $this->nomPas = $nomPas;

        return $this;
    }

    /**
     * Get nomPas
     *
     * @return string 
     */
    public function getNomPas()
    {
        return $this->nomPas;
    }

    /**
     * Set dossier
     *
     * @param \App\Entity\Dossier $dossier
     * @return Suividos
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
}
