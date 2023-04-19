<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CountryType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\BirthdayType;

use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Validator\Constraints as Assert;

class PassengerType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('numPas', HiddenType::class)
            ->add('qualite',	ChoiceType::class, array(
                'required' => true,
                'invalid_message' => 'Qualité invalide.',
                'choices'	=>	array(
                    'Civilité' => '',
                    'M.' => 'M.',
                    'Mme' => 'Mme',
                    'Enfant Garçon' => 'Enfant Garçon',
                    'Enfant Fille' => 'Enfant Fille'
                ),
            ))
            ->add('nomPas', TextType::class, array(
                'required' => true,
                'invalid_message' => 'Nom invalide.',
                'label' => 'Nom'))
            ->add('prenomPas',	TextType::class, array(
                'invalid_message' => 'Prénom invalide.',
                'required' => true,
                'label' => 'Prénom'))
            ->add('dtNaissPas', DateType::class, array(
                'label' => 'Date de naissance',
                'required' => true,
                'widget' => 'single_text',
                'format' => 'dd/mm/yyyy',
                'html5' => false,
                'invalid_message' => 'Date de naissance invalide.',
                'attr' => ['class' => 'datetimepicker'],
            ))
            ->add('isChild', HiddenType::class)
            ->add('leaderPax', HiddenType::class)
            ->add('assurance', ChoiceType::class, array(
                'choices'  => array(
                    'multirisque' => 'multirisque',
                    'premium' => 'premium',
                    'multirisque_epidemie' => 'multirisque_epidemie',
                    'premium_epidemie' => 'premium_epidemie',
                    'aucune' => 'aucune'
                ),
                'expanded' => true,
                'data' => 'aucune'
            ))
            ->add('cn', TextType::class, array(
                'mapped' => false,
                'required' => false
            ))
        ;
    }
}
