<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CountryType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PassIndividuType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('qualite',	ChoiceType::class,
                array(
                    'choices'	=>	array(
                        'Civilité *' => '',
                        'M.' => 'M.',
                        'Mme' => 'Mme'
                    ),
                    'required' => true,
                    'choices_as_values' => true,
                )
            )
            ->add('nomPas',		TextType::class, array(
                'required' => true,
                'invalid_message' => 'Nom invalide.',
                'label' => 'Nom'))
            ->add('prenomPas',	TextType::class, array(
                'invalid_message' => 'Prénom invalide.',
                'required' => true,
                'label' => 'Prénom'))
            ->add('dtNaissPas',	DateType::class, array(
                'label' => 'Date de naissance',
                'required' => true,
                'widget' => 'single_text',
                'format' => 'dd/mm/yyyy',
                'html5' => false,
                'invalid_message' => 'Date de naissance passager invalide.',
                'attr' => ['class' => 'validation', 'data-validation' => 'required', 'placeholder' => 'jj/mm/aaaa'],
            ))
            ->add('adresse1',	TextType::class)
            ->add('adresse2',	TextType::class, array(
                'required' => false
            ))
            ->add('codePostal',	TextType::class)
            ->add('villeFr',	TextType::class)
            ->add('county',	TextType::class, array(
                'required' => false
            ))
            ->add('codPays',	CountryType::class,
                array('preferred_choices' => array('FR'))
            )
        	->add('emailDom',	EmailType::class)
            ->add('telMobile',	TextType::class)
            ;
    }
}
