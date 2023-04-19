<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use UserBundle\Form\IndividuPassdossierType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use UserBundle\Form\HIndividuType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;

class PassdossierType extends AbstractType
{
	/**
	 * {@inheritdoc}
	 */
	public function buildForm(FormBuilderInterface $builder, array $options)
	{		
		$builder
		->add('individu',	HIndividuType::class)
		->add('isChild', HiddenType::class)
		->add('leaderPax', HiddenType::class)
		;
	}

}
