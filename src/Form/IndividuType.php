<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\BirthdayType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\CountryType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Type;

use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Validator\Constraints as Assert;

class IndividuType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        	->add('numPas', HiddenType::class)
        	->add('username',	EmailType::class)
        	->add('nomPas',		TextType::class, array('label' => 'Nom', 'required' => true ))
	        ->add('prenomPas',	TextType::class, array('label' => 'Prénom'))
	        ->add('dtNaissPas',	DateType::class, array(
	        		'widget' => 'single_text',
	        		'format' => 'dd/mm/yyyy',
	        		'html5' => false,
	        		'invalid_message' => 'Type de Date de naissance invalide.',
	        		'attr' => ['class' => 'datetimepicker'],
	        ))
	        ->add('qualite',	ChoiceType::class 
	            ,array(
	        		'choices'	=>	array(
	        				'Civilité' => '',
	        				'M.' => 'M.',
	        				'Mme' => 'Mme',
//	        				'Enfant Garçon' => 'Enfant Garçon',
//	        		        'Enfant Fille' => 'Enfant Fille'
	        		),
	           )
	        )
	        ->add('adresse1',	TextType::class, array('required' => true))
	        ->add('adresse2',	TextType::class, array('required' => false))
	        ->add('adresse3',	TextType::class, array('required' => false))
	        ->add('villeFr',	TextType::class, array('required' => true))
	        ->add('codePostal',	TextType::class, array('required' => true))
            ->add('county',		TextType::class, array('required' => false))
	        ->add('codPays',	CountryType::class, array(
	        		'placeholder' => 'Choisissez votre pays',
	        		'preferred_choices' => array('FR'),
                    'required' => true
	        ))
            ->add('emailDom',		TextType::class, array('required' => true))
	        ->add('telDom',		TextType::class, array('required' => false))
	        ->add('telMobile',	TextType::class, array('required' => true))
//	        ->add('nbAdults', ChoiceType::class, array(
//	        		'choices'  => array(
//	        				'1' => 1,
//	        				'2' => 2,
//	        				'3' => 3,
//	        				'4' => 4,
//	        				'5' => 5,
//	        				'6' => 6,
//	        				'7' => 7,
//	        				'8' => 8,
//	        				'9' => 9
//	        		),
//	        		'mapped' => false
//	        ))
//	        ->add('nbChildren', ChoiceType::class, array(
//	        		'choices'  => array(
//	        				'0' => 0,
//	        				'1' => 1,
//	        				'2' => 2,
//	        				'3' => 3,
//	        				'4' => 4,
//	        				'5' => 5,
//	        				'6' => 6,
//	        				'7' => 7,
//	        				'8' => 8,
//	        				'9' => 9
//	        		),
//	        		'mapped' => false
//	        ))
        ;
    }
}
