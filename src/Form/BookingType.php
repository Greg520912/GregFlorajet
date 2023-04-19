<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

use App\Form\IndividuType;
use App\Form\PassengerType;

use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Validator\Constraints as Assert;

class BookingType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nbAdults', ChoiceType::class, array(
                'choices'  => array(
                    '1' => 1,
                    '2' => 2,
                    '3' => 3,
                    '4' => 4,
                    '5' => 5,
                    '6' => 6,
                    '7' => 7,
                    '8' => 8,
                    '9' => 9
                ),
                'mapped' => false,
                'expanded' => false,
                'data' => 'aucune'
            ))
            ->add('nbChildren', ChoiceType::class, array(
                'choices'  => array(
                    '0' => 0,
                    '1' => 1,
                    '2' => 2,
                    '3' => 3,
                    '4' => 4,
                    '5' => 5,
                    '6' => 6,
                    '7' => 7,
                    '8' => 8,
                    '9' => 9
                ),
                'mapped' => false,
                'expanded' => false
            ))
            ->add('advance', TextType::class)
            ->add('full_price', TextType::class)
            ->add('leaderPas', IndividuType::class)
            ->add('passengers', CollectionType::class, array(
                'entry_type' => PassengerType::class,
                'entry_options' => array('label' => false),
                'allow_add' => true
            ))
            ->add('villeDepart', TextType::class, array(
                'label' => 'villeDepart',
                'mapped' => false,
                'required' => false
            ))
            ->add('commentaire', TextareaType::class, array(
                'label' => 'commentaire',
                'mapped' => false,
                'required' => false
            ))

            ->add('validDEVIS', TextType::class, array(
                'mapped' => false,
                'required' => false
            ))
            ->add('validCDV', TextType::class, array(
                'mapped' => false,
                'required' => false
            ))
            ->add('validPAYS', TextType::class, array(
                'mapped' => false,
                'required' => false
            ))
            ->add('validREGLEMENT', TextType::class, array(
                'mapped' => false,
                'required' => false
            ))

            ->add('advance', TextType::class)
        ;
    }
}
