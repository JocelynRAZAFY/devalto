<?php

namespace App\Controller;

use App\Manager\CalendarManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CalendarController extends AbstractController
{
    private CalendarManager $calendarManager;

    public function __construct(CalendarManager $calendarManager)
    {
        $this->calendarManager = $calendarManager;
    }

    /**
     * @Route("/api/calendar", name="calendar", methods={"GET"})
     */
    public function getCalendar(): JsonResponse
    {
        return $this->calendarManager->getCalendar();
    }
}
