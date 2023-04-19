<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;

use App\Form\IndividuType;

class UserType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
	        ->add('username',	EmailType::class)
	        ->add('password',	RepeatedType::class, array(
	        		'type' => PasswordType::class,
	        		'invalid_message' => 'Les mots de passe doivent être identiques.',
	        		'options' => array(),
	        		'required' => true,
	        		'first_options' => array(),
	        		'second_options' => array()
	        ))
	        ->add('individu',	IndividuType::class)
	        ->add('save',		SubmitType::class)
        ;
    }
}
