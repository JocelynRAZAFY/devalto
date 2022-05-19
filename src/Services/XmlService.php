<?php

namespace App\Services;


class XmlService
{
    const DAY_MIN = 9;
    const DAY_MAX = 19;

    public function __construct()
    {

    }

    public function parse(string $filemaneXml): array
    {
        $xml = simpleXML_load_file($filemaneXml, "SimpleXMLElement", LIBXML_NOCDATA);
        $json = json_encode($xml);
        $arrayView = json_decode($json, TRUE);
        $tempDay = [];
        $tempPeriod = [];
        foreach ($arrayView['stationdata'] as $k => $stationdata){
            $year = $stationdata['@attributes']['year'];
            $month = $this->formatNumber((int)$stationdata['@attributes']['month']);
            $day = $stationdata['@attributes']['day'];

            $date = "{$year}-{$month}-{$day}";
            $this->tempByDay($date, (int)$stationdata['temp'], $tempDay);
            $this->tempByPeriod($stationdata, $date, (int)$stationdata['temp'], $tempPeriod);
        }
        $avarageTempDay = $this->avarageTempByDay($tempDay);
        $avarageTempPeriod = $this->avarageTempByPeriod($tempPeriod);

        return [
            "avarageTempDay" => $avarageTempDay,
            "avarageTempPeriod" => $avarageTempPeriod,
            "bestDayFestival" => $this->bestDayFestival($avarageTempDay)
        ];
    }

    private function bestDayFestival(array $avarageTempDay)
    {
        $bestDay = [];
        $filterDay = [];
        $maxMin = 0;

        foreach ($avarageTempDay as $date => $avarage){
            $day = (int)explode('-',$date)[2];

            //$bestDay = $date;
            foreach ($avarage as $label => $value){
                if($day>=self::DAY_MIN and $day<=self::DAY_MAX){
                   /* dump($label);
                    dump($maxMin);
                    dump($value);*/
                    if($label == 'min' && $maxMin < $value){
                      //  dump($value);
                        $maxMin = $value;
                       // $bestDay = $date;
                        $bestDay = [
                            $date => $avarage
                        ];
                    }


                    /*if($value >= max($mins)){
                        dd($value);
                        $bestDay[] = $date;
                    }*/
                }
                //$mins[] = $value;
            }
        }
       // dd($bestDay);

        return $bestDay;
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