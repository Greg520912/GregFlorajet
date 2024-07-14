<?php

namespace App\Form;

use App\Entity\Article;
use App\Service\SourceService;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ArticleType extends AbstractType
{

    private $sourceService;

    public function __construct(SourceService $sourceService)
    {
        $this->sourceService = $sourceService;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $sources = $this->sourceService->getAllSources();
        $choices = [];
        foreach ($sources as $source) {
            $choices[$source->getName()] = $source->getId();
        }

        $builder
            ->add('sourceId', ChoiceType::class, [
                'label' => 'Source',
                'choices' => $choices,
                'placeholder' => 'Choisissez une source',
                'attr' => ['class' => 'form-control']
            ])
            ->add('name', TextType::class, [
                'label' => 'Titre',
                'attr' => ['class' => 'form-control']
            ])
            ->add('content', TextareaType::class, [
                'label' => 'Contenu',
                'attr' => ['class' => 'form-control']
            ])
            ->add('publishedAt', TextType::class, [
                'label' => 'Date de publication',
                'attr' => [
                                'class' => 'form-control',
                                'placeholder' => 'DD-MM-YYYY'
                            ]
            ])
            ->add('save', SubmitType::class, [
                'label' => 'Enregistrer',
                'attr' => ['class' => 'btn btn-primary mt-3']
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Article::class,
        ]);
    }
}