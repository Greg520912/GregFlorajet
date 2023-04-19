<?php
namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormInterface;

/**
 * Class AbstractEntityType
 */
abstract class AbstractEntityType extends AbstractType
{
	/**
	 * @param FormBuilderInterface $builder
	 * @param array                $options
	 */
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$builder->addEventListener(FormEvents::PRE_SUBMIT, array($this, 'onPreSubmit'));
	}
	
	/**
	 * @param FormEvent $event
	 */
	public function onPreSubmit(FormEvent $event)
	{
		$form = $event->getForm();
		$data = $event->getData();
		$object = $event->getForm()->getData();
		
		// Loop on form fields
		foreach ($event->getForm()->all() as $field) {
			/** @var FormInterface $field */
			$fieldName = $field->getName();
			if ($field->getConfig()->getType()->getName() == 'collection') {
				if (isset($data[$fieldName]) && $object) {
					$collection = $data[$fieldName];
					$data[$fieldName] = array();
					$k = 0;
					// Reorder submitted data
					foreach ($object->{'get'.ucfirst(strtolower($fieldName))}() as $k => $item) {
						// Search
						foreach ($collection as $i => $c) {
							$cId = is_array($c) && isset($c['id']) ? $c['id'] : $c;
							if ($item->getId() == $cId) {
								$data[$fieldName][$k] = $c;
								unset($collection[$i]);
								break;
							}
						}
					}
					// Added items
					foreach ($collection as $c) {
						$data[$fieldName][++$k] = $c;
					}
				}
			}
		}
		
		$event->setData($data);
	}
}