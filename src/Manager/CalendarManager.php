<?php

namespace App\Manager;

use App\Services\XmlService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class CalendarManager extends BaseManager
{
    private XmlService $xmlService;
    private KernelInterface $kernel;

    public function __construct(
        EntityManagerInterface $em,
        ContainerInterface $container,
        RequestStack $request,
        Security $security,
        NormalizerInterface $normalizer,
        XmlService $xmlService,
        KernelInterface $kernel)
    {
        $this->xmlService = $xmlService;
        $this->kernel = $kernel;
        parent::__construct($em, $container, $request, $security, $normalizer);
    }

    public function getCalendar(): JsonResponse
    {
        $filemaneXml = $this->kernel->getProjectDir().'/public/data/data.xml';
        $events = $this->xmlService->parse($filemaneXml);
        return $this->success(['events' => $events]);
    }
}