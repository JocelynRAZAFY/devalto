<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\HttpKernel\KernelInterface;

class XmlCommand extends Command
{
    protected static $defaultName = 'app:xml';
    protected static $defaultDescription = 'Add a short description for your command';

    protected function configure(): void
    {
        $this
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    private KernelInterface $kernel;
    public function __construct(
        string $name = null,
        KernelInterface $kernel)
    {
        $this->kernel = $kernel;
        parent::__construct($name);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $res = $this->parse();
        dump($res);
//        $arg1 = $input->getArgument('arg1');
//
//        if ($arg1) {
//            $io->note(sprintf('You passed an argument: %s', $arg1));
//        }
//
//        if ($input->getOption('option1')) {
//            // ...
//        }

        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');

        return Command::SUCCESS;
    }

    private function parse()
    {
        $filemaneXml = $this->kernel->getProjectDir().'/public/data/data.xml';
        $xml = simpleXML_load_file($filemaneXml, "SimpleXMLElement", LIBXML_NOCDATA);
        $json = json_encode($xml);
        $arrayView = json_decode($json, TRUE);
        $tempDay = [];
        $tempPeriod = [];
        foreach ($arrayView['stationdata'] as $k => $stationdata){
            $year = $stationdata['@attributes']['year'];
            $month = $this->formatNumber((int)$stationdata['@attributes']['month']);
            $day = $stationdata['@attributes']['day'];

            $date = "{$year}-{$month}-{$day}"; //$stationdata['@attributes']['year']."-".$this->formatNumber((int)$stationdata['@attributes']['month'])."-".$stationdata['@attributes']['day'];
            $this->tempByDay($date, (int)$stationdata['temp'], $tempDay);
            $this->tempByPeriod($stationdata, $date, (int)$stationdata['temp'], $tempPeriod);
        }
        $avarageTempDay = $this->avarageTempByDay($tempDay);
        $avarageTempPeriod = $this->avarageTempByPeriod($tempPeriod);

        return [
            "avarageTempDay" => $avarageTempDay,
            "avarageTempPeriod" => $avarageTempPeriod
        ];
    }

    private function avarageTempByPeriod(array $tempPeriod): array
    {
        $avarageTempPeriod = [];
        foreach ($tempPeriod as $day => $period){
            foreach ($period as $label => $item){
                switch ($label){
                    case 'morning':
                        $avarageTempPeriod[$day]['avarageMorning'] = round(array_sum($item)/count($item), 1);
                        break;
                    case 'afterNoon':
                        $avarageTempPeriod[$day]['avarageAfterNoon'] = round(array_sum($item)/count($item), 1);
                        break;
                    case 'evening':
                        $avarageTempPeriod[$day]['avarageEvening'] = round(array_sum($item)/count($item), 1);
                        break;
                    case 'night':
                        $avarageTempPeriod[$day]['avarageNight'] = round(array_sum($item)/count($item), 1);
                        break;
                }
            }
        }
       return $avarageTempPeriod;
    }

    private function avarageTempByDay(array $tempDay)
    {
        $avarageTempDay = [];
        foreach ($tempDay as $day => $itemArr){
            $avarageTempDay[$day] = [
                'max' => round(max($itemArr),1),
                'min' => round(min($itemArr),1),
                'average' => round(array_sum($itemArr)/count($itemArr), 1)
            ];
        }
        return $avarageTempDay;
    }

    private function tempByDay(string $day, int $temp, &$tempDay)
    {
        $tempDay[$day][] = $temp;
    }

    private function tempByPeriod(array $stationdata, string $day, int $temp, &$tempPeriod)
    {
        if($stationdata['@attributes']['hour'] >=0 && $stationdata['@attributes']['hour'] <= 12){
            $tempPeriod[$day]['morning'][] = $temp;
        }
        if($stationdata['@attributes']['hour'] >12 && $stationdata['@attributes']['hour'] <= 17){
            $tempPeriod[$day]['afterNoon'][] = $temp;
        }
        if($stationdata['@attributes']['hour'] >17 && $stationdata['@attributes']['hour'] <= 20){
            $tempPeriod[$day]['evening'][] = $temp;
        }
        if($stationdata['@attributes']['hour'] >20 && $stationdata['@attributes']['hour'] <= 23){
            $tempPeriod[$day]['night'][] = $temp;
        }
    }

    private function formatNumber(int $valMonth): string
    {
        if (preg_match('/^[1-9]*$/', $valMonth)) {
            $res = '0'.$valMonth;
        } else {
            $res = $valMonth;
        }
        return $res;
    }
}
