(function () {

    'use strict';

    angular.module('app.checkout')
        .constant('CountryCodes', ['AX', 'AF', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'PW', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'VG', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'HR', 'CU', 'CW', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IM', 'IL', 'IT', 'CI', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MK', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'KP', 'MP', 'NO', 'OM', 'PK', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'IE', 'RE', 'RO', 'RU', 'RW', 'ST', 'BL', 'SH', 'KN', 'LC', 'SX', 'MF', 'PM', 'VC', 'WS', 'SM', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'KR', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SZ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'VI', 'UY', 'UZ', 'VU', 'VA', 'VE', 'VN', 'WF', 'EH', 'YE', 'ZM', 'ZW'])
        .constant('CountryStateMap', {
            'AR': [{
                'id': 'C',
                'title': 'Ciudad Aut&oacute;noma de Buenos Aires'
            }, {
                'id': 'B',
                'title': 'Buenos Aires'
            }, {
                'id': 'K',
                'title': 'Catamarca'
            }, {
                'id': 'H',
                'title': 'Chaco'
            }, {
                'id': 'U',
                'title': 'Chubut'
            }, {
                'id': 'X',
                'title': 'C&oacute;rdoba'
            }, {
                'id': 'W',
                'title': 'Corrientes'
            }, {
                'id': 'E',
                'title': 'Entre R&iacute;os'
            }, {
                'id': 'P',
                'title': 'Formosa'
            }, {
                'id': 'Y',
                'title': 'Jujuy'
            }, {
                'id': 'L',
                'title': 'La Pampa'
            }, {
                'id': 'F',
                'title': 'La Rioja'
            }, {
                'id': 'M',
                'title': 'Mendoza'
            }, {
                'id': 'N',
                'title': 'Misiones'
            }, {
                'id': 'Q',
                'title': 'Neuqu&eacute;n'
            }, {
                'id': 'R',
                'title': 'R&iacute;o Negro'
            }, {
                'id': 'A',
                'title': 'Salta'
            }, {
                'id': 'J',
                'title': 'San Juan'
            }, {
                'id': 'D',
                'title': 'San Luis'
            }, {
                'id': 'Z',
                'title': 'Santa Cruz'
            }, {
                'id': 'S',
                'title': 'Santa Fe'
            }, {
                'id': 'G',
                'title': 'Santiago del Estero'
            }, {
                'id': 'V',
                'title': 'Tierra del Fuego'
            }, {
                'id': 'T',
                'title': 'Tucum&aacute;n'
            }],
            'AU': [{
                'id': 'ACT',
                'title': 'Australian Capital Territory'
            }, {
                'id': 'NSW',
                'title': 'New South Wales'
            }, {
                'id': 'NT',
                'title': 'Northern Territory'
            }, {
                'id': 'QLD',
                'title': 'Queensland'
            }, {
                'id': 'SA',
                'title': 'South Australia'
            }, {
                'id': 'TAS',
                'title': 'Tasmania'
            }, {
                'id': 'VIC',
                'title': 'Victoria'
            }, {
                'id': 'WA',
                'title': 'Western Australia'
            }],
            'BD': [{
                'id': 'BAG',
                'title': 'Bagerhat'
            }, {
                'id': 'BAN',
                'title': 'Bandarban'
            }, {
                'id': 'BAR',
                'title': 'Barguna'
            }, {
                'id': 'BARI',
                'title': 'Barisal'
            }, {
                'id': 'BHO',
                'title': 'Bhola'
            }, {
                'id': 'BOG',
                'title': 'Bogra'
            }, {
                'id': 'BRA',
                'title': 'Brahmanbaria'
            }, {
                'id': 'CHA',
                'title': 'Chandpur'
            }, {
                'id': 'CHI',
                'title': 'Chittagong'
            }, {
                'id': 'CHU',
                'title': 'Chuadanga'
            }, {
                'id': 'COM',
                'title': 'Comilla'
            }, {
                'id': 'COX',
                'title': 'Cox\'s Bazar'
            }, {
                'id': 'DHA',
                'title': 'Dhaka'
            }, {
                'id': 'DIN',
                'title': 'Dinajpur'
            }, {
                'id': 'FAR',
                'title': 'Faridpur '
            }, {
                'id': 'FEN',
                'title': 'Feni'
            }, {
                'id': 'GAI',
                'title': 'Gaibandha'
            }, {
                'id': 'GAZI',
                'title': 'Gazipur'
            }, {
                'id': 'GOP',
                'title': 'Gopalganj'
            }, {
                'id': 'HAB',
                'title': 'Habiganj'
            }, {
                'id': 'JAM',
                'title': 'Jamalpur'
            }, {
                'id': 'JES',
                'title': 'Jessore'
            }, {
                'id': 'JHA',
                'title': 'Jhalokati'
            }, {
                'id': 'JHE',
                'title': 'Jhenaidah'
            }, {
                'id': 'JOY',
                'title': 'Joypurhat'
            }, {
                'id': 'KHA',
                'title': 'Khagrachhari'
            }, {
                'id': 'KHU',
                'title': 'Khulna'
            }, {
                'id': 'KIS',
                'title': 'Kishoreganj'
            }, {
                'id': 'KUR',
                'title': 'Kurigram'
            }, {
                'id': 'KUS',
                'title': 'Kushtia'
            }, {
                'id': 'LAK',
                'title': 'Lakshmipur'
            }, {
                'id': 'LAL',
                'title': 'Lalmonirhat'
            }, {
                'id': 'MAD',
                'title': 'Madaripur'
            }, {
                'id': 'MAG',
                'title': 'Magura'
            }, {
                'id': 'MAN',
                'title': 'Manikganj '
            }, {
                'id': 'MEH',
                'title': 'Meherpur'
            }, {
                'id': 'MOU',
                'title': 'Moulvibazar'
            }, {
                'id': 'MUN',
                'title': 'Munshiganj'
            }, {
                'id': 'MYM',
                'title': 'Mymensingh'
            }, {
                'id': 'NAO',
                'title': 'Naogaon'
            }, {
                'id': 'NAR',
                'title': 'Narail'
            }, {
                'id': 'NARG',
                'title': 'Narayanganj'
            }, {
                'id': 'NARD',
                'title': 'Narsingdi'
            }, {
                'id': 'NAT',
                'title': 'Natore'
            }, {
                'id': 'NAW',
                'title': 'Nawabganj'
            }, {
                'id': 'NET',
                'title': 'Netrakona'
            }, {
                'id': 'NIL',
                'title': 'Nilphamari'
            }, {
                'id': 'NOA',
                'title': 'Noakhali'
            }, {
                'id': 'PAB',
                'title': 'Pabna'
            }, {
                'id': 'PAN',
                'title': 'Panchagarh'
            }, {
                'id': 'PAT',
                'title': 'Patuakhali'
            }, {
                'id': 'PIR',
                'title': 'Pirojpur'
            }, {
                'id': 'RAJB',
                'title': 'Rajbari'
            }, {
                'id': 'RAJ',
                'title': 'Rajshahi'
            }, {
                'id': 'RAN',
                'title': 'Rangamati'
            }, {
                'id': 'RANP',
                'title': 'Rangpur'
            }, {
                'id': 'SAT',
                'title': 'Satkhira'
            }, {
                'id': 'SHA',
                'title': 'Shariatpur'
            }, {
                'id': 'SHE',
                'title': 'Sherpur'
            }, {
                'id': 'SIR',
                'title': 'Sirajganj'
            }, {
                'id': 'SUN',
                'title': 'Sunamganj'
            }, {
                'id': 'SYL',
                'title': 'Sylhet'
            }, {
                'id': 'TAN',
                'title': 'Tangail'
            }, {
                'id': 'THA',
                'title': 'Thakurgaon'
            }],
            'BG': [{
                'id': 'BG-01',
                'title': 'Blagoevgrad'
            }, {
                'id': 'BG-02',
                'title': 'Burgas'
            }, {
                'id': 'BG-08',
                'title': 'Dobrich'
            }, {
                'id': 'BG-07',
                'title': 'Gabrovo'
            }, {
                'id': 'BG-26',
                'title': 'Haskovo'
            }, {
                'id': 'BG-09',
                'title': 'Kardzhali'
            }, {
                'id': 'BG-10',
                'title': 'Kyustendil'
            }, {
                'id': 'BG-11',
                'title': 'Lovech'
            }, {
                'id': 'BG-12',
                'title': 'Montana'
            }, {
                'id': 'BG-13',
                'title': 'Pazardzhik'
            }, {
                'id': 'BG-14',
                'title': 'Pernik'
            }, {
                'id': 'BG-15',
                'title': 'Pleven'
            }, {
                'id': 'BG-16',
                'title': 'Plovdiv'
            }, {
                'id': 'BG-17',
                'title': 'Razgrad'
            }, {
                'id': 'BG-18',
                'title': 'Ruse'
            }, {
                'id': 'BG-27',
                'title': 'Shumen'
            }, {
                'id': 'BG-19',
                'title': 'Silistra'
            }, {
                'id': 'BG-20',
                'title': 'Sliven'
            }, {
                'id': 'BG-21',
                'title': 'Smolyan'
            }, {
                'id': 'BG-23',
                'title': 'Sofia'
            }, {
                'id': 'BG-22',
                'title': 'Sofia-Grad'
            }, {
                'id': 'BG-24',
                'title': 'Stara Zagora'
            }, {
                'id': 'BG-25',
                'title': 'Targovishte'
            }, {
                'id': 'BG-03',
                'title': 'Varna'
            }, {
                'id': 'BG-04',
                'title': 'Veliko Tarnovo'
            }, {
                'id': 'BG-05',
                'title': 'Vidin'
            }, {
                'id': 'BG-06',
                'title': 'Vratsa'
            }, {
                'id': 'BG-28',
                'title': 'Yambol'
            }],
            'BR': [{
                'id': 'AC',
                'title': 'Acre'
            }, {
                'id': 'AL',
                'title': 'Alagoas'
            }, {
                'id': 'AP',
                'title': 'Amap&aacute;'
            }, {
                'id': 'AM',
                'title': 'Amazonas'
            }, {
                'id': 'BA',
                'title': 'Bahia'
            }, {
                'id': 'CE',
                'title': 'Cear&aacute;'
            }, {
                'id': 'DF',
                'title': 'Distrito Federal'
            }, {
                'id': 'ES',
                'title': 'Esp&iacute;rito Santo'
            }, {
                'id': 'GO',
                'title': 'Goi&aacute;s'
            }, {
                'id': 'MA',
                'title': 'Maranh&atilde;o'
            }, {
                'id': 'MT',
                'title': 'Mato Grosso'
            }, {
                'id': 'MS',
                'title': 'Mato Grosso do Sul'
            }, {
                'id': 'MG',
                'title': 'Minas Gerais'
            }, {
                'id': 'PA',
                'title': 'Par&aacute;'
            }, {
                'id': 'PB',
                'title': 'Para&iacute;ba'
            }, {
                'id': 'PR',
                'title': 'Paran&aacute;'
            }, {
                'id': 'PE',
                'title': 'Pernambuco'
            }, {
                'id': 'PI',
                'title': 'Piau&iacute;'
            }, {
                'id': 'RJ',
                'title': 'Rio de Janeiro'
            }, {
                'id': 'RN',
                'title': 'Rio Grande do Norte'
            }, {
                'id': 'RS',
                'title': 'Rio Grande do Sul'
            }, {
                'id': 'RO',
                'title': 'Rond&ocirc;nia'
            }, {
                'id': 'RR',
                'title': 'Roraima'
            }, {
                'id': 'SC',
                'title': 'Santa Catarina'
            }, {
                'id': 'SP',
                'title': 'S&atilde;o Paulo'
            }, {
                'id': 'SE',
                'title': 'Sergipe'
            }, {
                'id': 'TO',
                'title': 'Tocantins'
            }],
            'CA': [{
                'id': 'AB',
                'title': 'Alberta'
            }, {
                'id': 'BC',
                'title': 'British Columbia'
            }, {
                'id': 'MB',
                'title': 'Manitoba'
            }, {
                'id': 'NB',
                'title': 'New Brunswick'
            }, {
                'id': 'NL',
                'title': 'Newfoundland and Labrador'
            }, {
                'id': 'NT',
                'title': 'Northwest Territories'
            }, {
                'id': 'NS',
                'title': 'Nova Scotia'
            }, {
                'id': 'NU',
                'title': 'Nunavut'
            }, {
                'id': 'ON',
                'title': 'Ontario'
            }, {
                'id': 'PE',
                'title': 'Prince Edward Island'
            }, {
                'id': 'QC',
                'title': 'Quebec'
            }, {
                'id': 'SK',
                'title': 'Saskatchewan'
            }, {
                'id': 'YT',
                'title': 'Yukon Territory'
            }],
            'CN': [{
                'id': 'CN1',
                'title': 'Yunnan / &#20113;&#21335;'
            }, {
                'id': 'CN2',
                'title': 'Beijing / &#21271;&#20140;'
            }, {
                'id': 'CN3',
                'title': 'Tianjin / &#22825;&#27941;'
            }, {
                'id': 'CN4',
                'title': 'Hebei / &#27827;&#21271;'
            }, {
                'id': 'CN5',
                'title': 'Shanxi / &#23665;&#35199;'
            }, {
                'id': 'CN6',
                'title': 'Inner Mongolia / &#20839;&#33945;&#21476;'
            }, {
                'id': 'CN7',
                'title': 'Liaoning / &#36797;&#23425;'
            }, {
                'id': 'CN8',
                'title': 'Jilin / &#21513;&#26519;'
            }, {
                'id': 'CN9',
                'title': 'Heilongjiang / &#40657;&#40857;&#27743;'
            }, {
                'id': 'CN10',
                'title': 'Shanghai / &#19978;&#28023;'
            }, {
                'id': 'CN11',
                'title': 'Jiangsu / &#27743;&#33487;'
            }, {
                'id': 'CN12',
                'title': 'Zhejiang / &#27993;&#27743;'
            }, {
                'id': 'CN13',
                'title': 'Anhui / &#23433;&#24509;'
            }, {
                'id': 'CN14',
                'title': 'Fujian / &#31119;&#24314;'
            }, {
                'id': 'CN15',
                'title': 'Jiangxi / &#27743;&#35199;'
            }, {
                'id': 'CN16',
                'title': 'Shandong / &#23665;&#19996;'
            }, {
                'id': 'CN17',
                'title': 'Henan / &#27827;&#21335;'
            }, {
                'id': 'CN18',
                'title': 'Hubei / &#28246;&#21271;'
            }, {
                'id': 'CN19',
                'title': 'Hunan / &#28246;&#21335;'
            }, {
                'id': 'CN20',
                'title': 'Guangdong / &#24191;&#19996;'
            }, {
                'id': 'CN21',
                'title': 'Guangxi Zhuang / &#24191;&#35199;&#22766;&#26063;'
            }, {
                'id': 'CN22',
                'title': 'Hainan / &#28023;&#21335;'
            }, {
                'id': 'CN23',
                'title': 'Chongqing / &#37325;&#24198;'
            }, {
                'id': 'CN24',
                'title': 'Sichuan / &#22235;&#24029;'
            }, {
                'id': 'CN25',
                'title': 'Guizhou / &#36149;&#24030;'
            }, {
                'id': 'CN26',
                'title': 'Shaanxi / &#38485;&#35199;'
            }, {
                'id': 'CN27',
                'title': 'Gansu / &#29976;&#32899;'
            }, {
                'id': 'CN28',
                'title': 'Qinghai / &#38738;&#28023;'
            }, {
                'id': 'CN29',
                'title': 'Ningxia Hui / &#23425;&#22799;'
            }, {
                'id': 'CN30',
                'title': 'Macau / &#28595;&#38376;'
            }, {
                'id': 'CN31',
                'title': 'Tibet / &#35199;&#34255;'
            }, {
                'id': 'CN32',
                'title': 'Xinjiang / &#26032;&#30086;'
            }],
            'ES': [{
                'id': 'C',
                'title': 'A Coru&ntilde;a'
            }, {
                'id': 'VI',
                'title': 'Araba/&Aacute;lava'
            }, {
                'id': 'AB',
                'title': 'Albacete'
            }, {
                'id': 'A',
                'title': 'Alicante'
            }, {
                'id': 'AL',
                'title': 'Almer&iacute;a'
            }, {
                'id': 'O',
                'title': 'Asturias'
            }, {
                'id': 'AV',
                'title': '&Aacute;vila'
            }, {
                'id': 'BA',
                'title': 'Badajoz'
            }, {
                'id': 'PM',
                'title': 'Baleares'
            }, {
                'id': 'B',
                'title': 'Barcelona'
            }, {
                'id': 'BU',
                'title': 'Burgos'
            }, {
                'id': 'CC',
                'title': 'C&aacute;ceres'
            }, {
                'id': 'CA',
                'title': 'C&aacute;diz'
            }, {
                'id': 'S',
                'title': 'Cantabria'
            }, {
                'id': 'CS',
                'title': 'Castell&oacute;n'
            }, {
                'id': 'CE',
                'title': 'Ceuta'
            }, {
                'id': 'CR',
                'title': 'Ciudad Real'
            }, {
                'id': 'CO',
                'title': 'C&oacute;rdoba'
            }, {
                'id': 'CU',
                'title': 'Cuenca'
            }, {
                'id': 'GI',
                'title': 'Girona'
            }, {
                'id': 'GR',
                'title': 'Granada'
            }, {
                'id': 'GU',
                'title': 'Guadalajara'
            }, {
                'id': 'SS',
                'title': 'Gipuzkoa'
            }, {
                'id': 'H',
                'title': 'Huelva'
            }, {
                'id': 'HU',
                'title': 'Huesca'
            }, {
                'id': 'J',
                'title': 'Ja&eacute;n'
            }, {
                'id': 'LO',
                'title': 'La Rioja'
            }, {
                'id': 'GC',
                'title': 'Las Palmas'
            }, {
                'id': 'LE',
                'title': 'Le&oacute;n'
            }, {
                'id': 'L',
                'title': 'Lleida'
            }, {
                'id': 'LU',
                'title': 'Lugo'
            }, {
                'id': 'M',
                'title': 'Madrid'
            }, {
                'id': 'MA',
                'title': 'M&aacute;laga'
            }, {
                'id': 'ML',
                'title': 'Melilla'
            }, {
                'id': 'MU',
                'title': 'Murcia'
            }, {
                'id': 'NA',
                'title': 'Navarra'
            }, {
                'id': 'OR',
                'title': 'Ourense'
            }, {
                'id': 'P',
                'title': 'Palencia'
            }, {
                'id': 'PO',
                'title': 'Pontevedra'
            }, {
                'id': 'SA',
                'title': 'Salamanca'
            }, {
                'id': 'TF',
                'title': 'Santa Cruz de Tenerife'
            }, {
                'id': 'SG',
                'title': 'Segovia'
            }, {
                'id': 'SE',
                'title': 'Sevilla'
            }, {
                'id': 'SO',
                'title': 'Soria'
            }, {
                'id': 'T',
                'title': 'Tarragona'
            }, {
                'id': 'TE',
                'title': 'Teruel'
            }, {
                'id': 'TO',
                'title': 'Toledo'
            }, {
                'id': 'V',
                'title': 'Valencia'
            }, {
                'id': 'VA',
                'title': 'Valladolid'
            }, {
                'id': 'BI',
                'title': 'Bizkaia'
            }, {
                'id': 'ZA',
                'title': 'Zamora'
            }, {
                'id': 'Z',
                'title': 'Zaragoza'
            }],
            'GR': [{
                'id': 'I',
                'title': 'Αττική'
            }, {
                'id': 'A',
                'title': 'Ανατολική Μακεδονία και Θράκη'
            }, {
                'id': 'B',
                'title': 'Κεντρική Μακεδονία'
            }, {
                'id': 'C',
                'title': 'Δυτική Μακεδονία'
            }, {
                'id': 'D',
                'title': 'Ήπειρος'
            }, {
                'id': 'E',
                'title': 'Θεσσαλία'
            }, {
                'id': 'F',
                'title': 'Ιόνιοι Νήσοι'
            }, {
                'id': 'G',
                'title': 'Δυτική Ελλάδα'
            }, {
                'id': 'H',
                'title': 'Στερεά Ελλάδα'
            }, {
                'id': 'J',
                'title': 'Πελοπόννησος'
            }, {
                'id': 'K',
                'title': 'Βόρειο Αιγαίο'
            }, {
                'id': 'L',
                'title': 'Νότιο Αιγαίο'
            }, {
                'id': 'M',
                'title': 'Κρήτη'
            }],
            'HK': [{
                'id': 'HONG KONG',
                'title': 'Hong Kong Island'
            }, {
                'id': 'KOWLOON',
                'title': 'Kowloon'
            }, {
                'id': 'NEW TERRITORIES',
                'title': 'New Territories'
            }],
            'HU': [{
                'id': 'BK',
                'title': 'Bács-Kiskun'
            }, {
                'id': 'BE',
                'title': 'Békés'
            }, {
                'id': 'BA',
                'title': 'Baranya'
            }, {
                'id': 'BZ',
                'title': 'Borsod-Abaúj-Zemplén'
            }, {
                'id': 'BU',
                'title': 'Budapest'
            }, {
                'id': 'CS',
                'title': 'Csongrád'
            }, {
                'id': 'FE',
                'title': 'Fejér'
            }, {
                'id': 'GS',
                'title': 'Győr-Moson-Sopron'
            }, {
                'id': 'HB',
                'title': 'Hajdú-Bihar'
            }, {
                'id': 'HE',
                'title': 'Heves'
            }, {
                'id': 'JN',
                'title': 'Jász-Nagykun-Szolnok'
            }, {
                'id': 'KE',
                'title': 'Komárom-Esztergom'
            }, {
                'id': 'NO',
                'title': 'Nógrád'
            }, {
                'id': 'PE',
                'title': 'Pest'
            }, {
                'id': 'SO',
                'title': 'Somogy'
            }, {
                'id': 'SZ',
                'title': 'Szabolcs-Szatmár-Bereg'
            }, {
                'id': 'TO',
                'title': 'Tolna'
            }, {
                'id': 'VA',
                'title': 'Vas'
            }, {
                'id': 'VE',
                'title': 'Veszprém'
            }, {
                'id': 'ZA',
                'title': 'Zala'
            }],
            'ID': [{
                'id': 'AC',
                'title': 'Daerah Istimewa Aceh'
            }, {
                'id': 'SU',
                'title': 'Sumatera Utara'
            }, {
                'id': 'SB',
                'title': 'Sumatera Barat'
            }, {
                'id': 'RI',
                'title': 'Riau'
            }, {
                'id': 'KR',
                'title': 'Kepulauan Riau'
            }, {
                'id': 'JA',
                'title': 'Jambi'
            }, {
                'id': 'SS',
                'title': 'Sumatera Selatan'
            }, {
                'id': 'BB',
                'title': 'Bangka Belitung'
            }, {
                'id': 'BE',
                'title': 'Bengkulu'
            }, {
                'id': 'LA',
                'title': 'Lampung'
            }, {
                'id': 'JK',
                'title': 'DKI Jakarta'
            }, {
                'id': 'JB',
                'title': 'Jawa Barat'
            }, {
                'id': 'BT',
                'title': 'Banten'
            }, {
                'id': 'JT',
                'title': 'Jawa Tengah'
            }, {
                'id': 'JI',
                'title': 'Jawa Timur'
            }, {
                'id': 'YO',
                'title': 'Daerah Istimewa Yogyakarta'
            }, {
                'id': 'BA',
                'title': 'Bali'
            }, {
                'id': 'NB',
                'title': 'Nusa Tenggara Barat'
            }, {
                'id': 'NT',
                'title': 'Nusa Tenggara Timur'
            }, {
                'id': 'KB',
                'title': 'Kalimantan Barat'
            }, {
                'id': 'KT',
                'title': 'Kalimantan Tengah'
            }, {
                'id': 'KI',
                'title': 'Kalimantan Timur'
            }, {
                'id': 'KS',
                'title': 'Kalimantan Selatan'
            }, {
                'id': 'KU',
                'title': 'Kalimantan Utara'
            }, {
                'id': 'SA',
                'title': 'Sulawesi Utara'
            }, {
                'id': 'ST',
                'title': 'Sulawesi Tengah'
            }, {
                'id': 'SG',
                'title': 'Sulawesi Tenggara'
            }, {
                'id': 'SR',
                'title': 'Sulawesi Barat'
            }, {
                'id': 'SN',
                'title': 'Sulawesi Selatan'
            }, {
                'id': 'GO',
                'title': 'Gorontalo'
            }, {
                'id': 'MA',
                'title': 'Maluku'
            }, {
                'id': 'MU',
                'title': 'Maluku Utara'
            }, {
                'id': 'PA',
                'title': 'Papua'
            }, {
                'id': 'PB',
                'title': 'Papua Barat'
            }],
            'IN': [{
                'id': 'AP',
                'title': 'Andhra Pradesh'
            }, {
                'id': 'AR',
                'title': 'Arunachal Pradesh'
            }, {
                'id': 'AS',
                'title': 'Assam'
            }, {
                'id': 'BR',
                'title': 'Bihar'
            }, {
                'id': 'CT',
                'title': 'Chhattisgarh'
            }, {
                'id': 'GA',
                'title': 'Goa'
            }, {
                'id': 'GJ',
                'title': 'Gujarat'
            }, {
                'id': 'HR',
                'title': 'Haryana'
            }, {
                'id': 'HP',
                'title': 'Himachal Pradesh'
            }, {
                'id': 'JK',
                'title': 'Jammu and Kashmir'
            }, {
                'id': 'JH',
                'title': 'Jharkhand'
            }, {
                'id': 'KA',
                'title': 'Karnataka'
            }, {
                'id': 'KL',
                'title': 'Kerala'
            }, {
                'id': 'MP',
                'title': 'Madhya Pradesh'
            }, {
                'id': 'MH',
                'title': 'Maharashtra'
            }, {
                'id': 'MN',
                'title': 'Manipur'
            }, {
                'id': 'ML',
                'title': 'Meghalaya'
            }, {
                'id': 'MZ',
                'title': 'Mizoram'
            }, {
                'id': 'NL',
                'title': 'Nagaland'
            }, {
                'id': 'OR',
                'title': 'Orissa'
            }, {
                'id': 'PB',
                'title': 'Punjab'
            }, {
                'id': 'RJ',
                'title': 'Rajasthan'
            }, {
                'id': 'SK',
                'title': 'Sikkim'
            }, {
                'id': 'TN',
                'title': 'Tamil Nadu'
            }, {
                'id': 'TS',
                'title': 'Telangana'
            }, {
                'id': 'TR',
                'title': 'Tripura'
            }, {
                'id': 'UK',
                'title': 'Uttarakhand'
            }, {
                'id': 'UP',
                'title': 'Uttar Pradesh'
            }, {
                'id': 'WB',
                'title': 'West Bengal'
            }, {
                'id': 'AN',
                'title': 'Andaman and Nicobar Islands'
            }, {
                'id': 'CH',
                'title': 'Chandigarh'
            }, {
                'id': 'DN',
                'title': 'Dadar and Nagar Haveli'
            }, {
                'id': 'DD',
                'title': 'Daman and Diu'
            }, {
                'id': 'DL',
                'title': 'Delhi'
            }, {
                'id': 'LD',
                'title': 'Lakshadeep'
            }, {
                'id': 'PY',
                'title': 'Pondicherry (Puducherry)'
            }],
            'IR': [{
                'id': 'KHZ',
                'title': 'Khuzestan  (خوزستان)'
            }, {
                'id': 'THR',
                'title': 'Tehran  (تهران)'
            }, {
                'id': 'ILM',
                'title': 'Ilaam (ایلام)'
            }, {
                'id': 'BHR',
                'title': 'Bushehr (بوشهر)'
            }, {
                'id': 'ADL',
                'title': 'Ardabil (اردبیل)'
            }, {
                'id': 'ESF',
                'title': 'Isfahan (اصفهان)'
            }, {
                'id': 'YZD',
                'title': 'Yazd (یزد)'
            }, {
                'id': 'KRH',
                'title': 'Kermanshah (کرمانشاه)'
            }, {
                'id': 'KRN',
                'title': 'Kerman (کرمان)'
            }, {
                'id': 'HDN',
                'title': 'Hamadan (همدان)'
            }, {
                'id': 'GZN',
                'title': 'Ghazvin (قزوین)'
            }, {
                'id': 'ZJN',
                'title': 'Zanjan (زنجان)'
            }, {
                'id': 'LRS',
                'title': 'Luristan (لرستان)'
            }, {
                'id': 'ABZ',
                'title': 'Alborz (البرز)'
            }, {
                'id': 'EAZ',
                'title': 'East Azarbaijan (آذربایجان شرقی)'
            }, {
                'id': 'WAZ',
                'title': 'West Azarbaijan (آذربایجان غربی)'
            }, {
                'id': 'CHB',
                'title': 'Chaharmahal and Bakhtiari (چهارمحال و بختیاری)'
            }, {
                'id': 'SKH',
                'title': 'South Khorasan (خراسان جنوبی)'
            }, {
                'id': 'RKH',
                'title': 'Razavi Khorasan (خراسان رضوی)'
            }, {
                'id': 'NKH',
                'title': 'North Khorasan (خراسان جنوبی)'
            }, {
                'id': 'SMN',
                'title': 'Semnan (سمنان)'
            }, {
                'id': 'FRS',
                'title': 'Fars (فارس)'
            }, {
                'id': 'QHM',
                'title': 'Qom (قم)'
            }, {
                'id': 'KRD',
                'title': 'Kurdistan / کردستان)'
            }, {
                'id': 'KBD',
                'title': 'Kohgiluyeh and BoyerAhmad (کهگیلوییه و بویراحمد)'
            }, {
                'id': 'GLS',
                'title': 'Golestan (گلستان)'
            }, {
                'id': 'GIL',
                'title': 'Gilan (گیلان)'
            }, {
                'id': 'MZN',
                'title': 'Mazandaran (مازندران)'
            }, {
                'id': 'MKZ',
                'title': 'Markazi (مرکزی)'
            }, {
                'id': 'HRZ',
                'title': 'Hormozgan (هرمزگان)'
            }, {
                'id': 'SBN',
                'title': 'Sistan and Baluchestan (سیستان و بلوچستان)'
            }],
            'IT': [{
                'id': 'AG',
                'title': 'Agrigento'
            }, {
                'id': 'AL',
                'title': 'Alessandria'
            }, {
                'id': 'AN',
                'title': 'Ancona'
            }, {
                'id': 'AO',
                'title': 'Aosta'
            }, {
                'id': 'AR',
                'title': 'Arezzo'
            }, {
                'id': 'AP',
                'title': 'Ascoli Piceno'
            }, {
                'id': 'AT',
                'title': 'Asti'
            }, {
                'id': 'AV',
                'title': 'Avellino'
            }, {
                'id': 'BA',
                'title': 'Bari'
            }, {
                'id': 'BT',
                'title': 'Barletta-Andria-Trani'
            }, {
                'id': 'BL',
                'title': 'Belluno'
            }, {
                'id': 'BN',
                'title': 'Benevento'
            }, {
                'id': 'BG',
                'title': 'Bergamo'
            }, {
                'id': 'BI',
                'title': 'Biella'
            }, {
                'id': 'BO',
                'title': 'Bologna'
            }, {
                'id': 'BZ',
                'title': 'Bolzano'
            }, {
                'id': 'BS',
                'title': 'Brescia'
            }, {
                'id': 'BR',
                'title': 'Brindisi'
            }, {
                'id': 'CA',
                'title': 'Cagliari'
            }, {
                'id': 'CL',
                'title': 'Caltanissetta'
            }, {
                'id': 'CB',
                'title': 'Campobasso'
            }, {
                'id': 'CI',
                'title': 'Carbonia-Iglesias'
            }, {
                'id': 'CE',
                'title': 'Caserta'
            }, {
                'id': 'CT',
                'title': 'Catania'
            }, {
                'id': 'CZ',
                'title': 'Catanzaro'
            }, {
                'id': 'CH',
                'title': 'Chieti'
            }, {
                'id': 'CO',
                'title': 'Como'
            }, {
                'id': 'CS',
                'title': 'Cosenza'
            }, {
                'id': 'CR',
                'title': 'Cremona'
            }, {
                'id': 'KR',
                'title': 'Crotone'
            }, {
                'id': 'CN',
                'title': 'Cuneo'
            }, {
                'id': 'EN',
                'title': 'Enna'
            }, {
                'id': 'FM',
                'title': 'Fermo'
            }, {
                'id': 'FE',
                'title': 'Ferrara'
            }, {
                'id': 'FI',
                'title': 'Firenze'
            }, {
                'id': 'FG',
                'title': 'Foggia'
            }, {
                'id': 'FC',
                'title': 'Forlì-Cesena'
            }, {
                'id': 'FR',
                'title': 'Frosinone'
            }, {
                'id': 'GE',
                'title': 'Genova'
            }, {
                'id': 'GO',
                'title': 'Gorizia'
            }, {
                'id': 'GR',
                'title': 'Grosseto'
            }, {
                'id': 'IM',
                'title': 'Imperia'
            }, {
                'id': 'IS',
                'title': 'Isernia'
            }, {
                'id': 'SP',
                'title': 'La Spezia'
            }, {
                'id': 'AQ',
                'title': 'L&apos;Aquila'
            }, {
                'id': 'LT',
                'title': 'Latina'
            }, {
                'id': 'LE',
                'title': 'Lecce'
            }, {
                'id': 'LC',
                'title': 'Lecco'
            }, {
                'id': 'LI',
                'title': 'Livorno'
            }, {
                'id': 'LO',
                'title': 'Lodi'
            }, {
                'id': 'LU',
                'title': 'Lucca'
            }, {
                'id': 'MC',
                'title': 'Macerata'
            }, {
                'id': 'MN',
                'title': 'Mantova'
            }, {
                'id': 'MS',
                'title': 'Massa-Carrara'
            }, {
                'id': 'MT',
                'title': 'Matera'
            }, {
                'id': 'ME',
                'title': 'Messina'
            }, {
                'id': 'MI',
                'title': 'Milano'
            }, {
                'id': 'MO',
                'title': 'Modena'
            }, {
                'id': 'MB',
                'title': 'Monza e della Brianza'
            }, {
                'id': 'NA',
                'title': 'Napoli'
            }, {
                'id': 'NO',
                'title': 'Novara'
            }, {
                'id': 'NU',
                'title': 'Nuoro'
            }, {
                'id': 'OT',
                'title': 'Olbia-Tempio'
            }, {
                'id': 'OR',
                'title': 'Oristano'
            }, {
                'id': 'PD',
                'title': 'Padova'
            }, {
                'id': 'PA',
                'title': 'Palermo'
            }, {
                'id': 'PR',
                'title': 'Parma'
            }, {
                'id': 'PV',
                'title': 'Pavia'
            }, {
                'id': 'PG',
                'title': 'Perugia'
            }, {
                'id': 'PU',
                'title': 'Pesaro e Urbino'
            }, {
                'id': 'PE',
                'title': 'Pescara'
            }, {
                'id': 'PC',
                'title': 'Piacenza'
            }, {
                'id': 'PI',
                'title': 'Pisa'
            }, {
                'id': 'PT',
                'title': 'Pistoia'
            }, {
                'id': 'PN',
                'title': 'Pordenone'
            }, {
                'id': 'PZ',
                'title': 'Potenza'
            }, {
                'id': 'PO',
                'title': 'Prato'
            }, {
                'id': 'RG',
                'title': 'Ragusa'
            }, {
                'id': 'RA',
                'title': 'Ravenna'
            }, {
                'id': 'RC',
                'title': 'Reggio Calabria'
            }, {
                'id': 'RE',
                'title': 'Reggio Emilia'
            }, {
                'id': 'RI',
                'title': 'Rieti'
            }, {
                'id': 'RN',
                'title': 'Rimini'
            }, {
                'id': 'RM',
                'title': 'Roma'
            }, {
                'id': 'RO',
                'title': 'Rovigo'
            }, {
                'id': 'SA',
                'title': 'Salerno'
            }, {
                'id': 'VS',
                'title': 'Medio Campidano'
            }, {
                'id': 'SS',
                'title': 'Sassari'
            }, {
                'id': 'SV',
                'title': 'Savona'
            }, {
                'id': 'SI',
                'title': 'Siena'
            }, {
                'id': 'SR',
                'title': 'Siracusa'
            }, {
                'id': 'SO',
                'title': 'Sondrio'
            }, {
                'id': 'TA',
                'title': 'Taranto'
            }, {
                'id': 'TE',
                'title': 'Teramo'
            }, {
                'id': 'TR',
                'title': 'Terni'
            }, {
                'id': 'TO',
                'title': 'Torino'
            }, {
                'id': 'OG',
                'title': 'Ogliastra'
            }, {
                'id': 'TP',
                'title': 'Trapani'
            }, {
                'id': 'TN',
                'title': 'Trento'
            }, {
                'id': 'TV',
                'title': 'Treviso'
            }, {
                'id': 'TS',
                'title': 'Trieste'
            }, {
                'id': 'UD',
                'title': 'Udine'
            }, {
                'id': 'VA',
                'title': 'Varese'
            }, {
                'id': 'VE',
                'title': 'Venezia'
            }, {
                'id': 'VB',
                'title': 'Verbano-Cusio-Ossola'
            }, {
                'id': 'VC',
                'title': 'Vercelli'
            }, {
                'id': 'VR',
                'title': 'Verona'
            }, {
                'id': 'VV',
                'title': 'Vibo Valentia'
            }, {
                'id': 'VI',
                'title': 'Vicenza'
            }, {
                'id': 'VT',
                'title': 'Viterbo'
            }],
            'JP': [{
                'id': 'JP01',
                'title': 'Hokkaido'
            }, {
                'id': 'JP02',
                'title': 'Aomori'
            }, {
                'id': 'JP03',
                'title': 'Iwate'
            }, {
                'id': 'JP04',
                'title': 'Miyagi'
            }, {
                'id': 'JP05',
                'title': 'Akita'
            }, {
                'id': 'JP06',
                'title': 'Yamagata'
            }, {
                'id': 'JP07',
                'title': 'Fukushima'
            }, {
                'id': 'JP08',
                'title': 'Ibaraki'
            }, {
                'id': 'JP09',
                'title': 'Tochigi'
            }, {
                'id': 'JP10',
                'title': 'Gunma'
            }, {
                'id': 'JP11',
                'title': 'Saitama'
            }, {
                'id': 'JP12',
                'title': 'Chiba'
            }, {
                'id': 'JP13',
                'title': 'Tokyo'
            }, {
                'id': 'JP14',
                'title': 'Kanagawa'
            }, {
                'id': 'JP15',
                'title': 'Niigata'
            }, {
                'id': 'JP16',
                'title': 'Toyama'
            }, {
                'id': 'JP17',
                'title': 'Ishikawa'
            }, {
                'id': 'JP18',
                'title': 'Fukui'
            }, {
                'id': 'JP19',
                'title': 'Yamanashi'
            }, {
                'id': 'JP20',
                'title': 'Nagano'
            }, {
                'id': 'JP21',
                'title': 'Gifu'
            }, {
                'id': 'JP22',
                'title': 'Shizuoka'
            }, {
                'id': 'JP23',
                'title': 'Aichi'
            }, {
                'id': 'JP24',
                'title': 'Mie'
            }, {
                'id': 'JP25',
                'title': 'Shiga'
            }, {
                'id': 'JP26',
                'title': 'Kyoto'
            }, {
                'id': 'JP27',
                'title': 'Osaka'
            }, {
                'id': 'JP28',
                'title': 'Hyogo'
            }, {
                'id': 'JP29',
                'title': 'Nara'
            }, {
                'id': 'JP30',
                'title': 'Wakayama'
            }, {
                'id': 'JP31',
                'title': 'Tottori'
            }, {
                'id': 'JP32',
                'title': 'Shimane'
            }, {
                'id': 'JP33',
                'title': 'Okayama'
            }, {
                'id': 'JP34',
                'title': 'Hiroshima'
            }, {
                'id': 'JP35',
                'title': 'Yamaguchi'
            }, {
                'id': 'JP36',
                'title': 'Tokushima'
            }, {
                'id': 'JP37',
                'title': 'Kagawa'
            }, {
                'id': 'JP38',
                'title': 'Ehime'
            }, {
                'id': 'JP39',
                'title': 'Kochi'
            }, {
                'id': 'JP40',
                'title': 'Fukuoka'
            }, {
                'id': 'JP41',
                'title': 'Saga'
            }, {
                'id': 'JP42',
                'title': 'Nagasaki'
            }, {
                'id': 'JP43',
                'title': 'Kumamoto'
            }, {
                'id': 'JP44',
                'title': 'Oita'
            }, {
                'id': 'JP45',
                'title': 'Miyazaki'
            }, {
                'id': 'JP46',
                'title': 'Kagoshima'
            }, {
                'id': 'JP47',
                'title': 'Okinawa'
            }],
            'MX': [{
                'id': 'Distrito Federal',
                'title': 'Distrito Federal'
            }, {
                'id': 'Jalisco',
                'title': 'Jalisco'
            }, {
                'id': 'Nuevo Leon',
                'title': 'Nuevo León'
            }, {
                'id': 'Aguascalientes',
                'title': 'Aguascalientes'
            }, {
                'id': 'Baja California',
                'title': 'Baja California'
            }, {
                'id': 'Baja California Sur',
                'title': 'Baja California Sur'
            }, {
                'id': 'Campeche',
                'title': 'Campeche'
            }, {
                'id': 'Chiapas',
                'title': 'Chiapas'
            }, {
                'id': 'Chihuahua',
                'title': 'Chihuahua'
            }, {
                'id': 'Coahuila',
                'title': 'Coahuila'
            }, {
                'id': 'Colima',
                'title': 'Colima'
            }, {
                'id': 'Durango',
                'title': 'Durango'
            }, {
                'id': 'Guanajuato',
                'title': 'Guanajuato'
            }, {
                'id': 'Guerrero',
                'title': 'Guerrero'
            }, {
                'id': 'Hidalgo',
                'title': 'Hidalgo'
            }, {
                'id': 'Estado de Mexico',
                'title': 'Edo. de México'
            }, {
                'id': 'Michoacan',
                'title': 'Michoacán'
            }, {
                'id': 'Morelos',
                'title': 'Morelos'
            }, {
                'id': 'Nayarit',
                'title': 'Nayarit'
            }, {
                'id': 'Oaxaca',
                'title': 'Oaxaca'
            }, {
                'id': 'Puebla',
                'title': 'Puebla'
            }, {
                'id': 'Queretaro',
                'title': 'Querétaro'
            }, {
                'id': 'Quintana Roo',
                'title': 'Quintana Roo'
            }, {
                'id': 'San Luis Potosi',
                'title': 'San Luis Potosí'
            }, {
                'id': 'Sinaloa',
                'title': 'Sinaloa'
            }, {
                'id': 'Sonora',
                'title': 'Sonora'
            }, {
                'id': 'Tabasco',
                'title': 'Tabasco'
            }, {
                'id': 'Tamaulipas',
                'title': 'Tamaulipas'
            }, {
                'id': 'Tlaxcala',
                'title': 'Tlaxcala'
            }, {
                'id': 'Veracruz',
                'title': 'Veracruz'
            }, {
                'id': 'Yucatan',
                'title': 'Yucatán'
            }, {
                'id': 'Zacatecas',
                'title': 'Zacatecas'
            }],
            'MY': [{
                'id': 'JHR',
                'title': 'Johor'
            }, {
                'id': 'KDH',
                'title': 'Kedah'
            }, {
                'id': 'KTN',
                'title': 'Kelantan'
            }, {
                'id': 'LBN',
                'title': 'Labuan'
            }, {
                'id': 'MLK',
                'title': 'Malacca (Melaka)'
            }, {
                'id': 'NSN',
                'title': 'Negeri Sembilan'
            }, {
                'id': 'PHG',
                'title': 'Pahang'
            }, {
                'id': 'PNG',
                'title': 'Penang (Pulau Pinang)'
            }, {
                'id': 'PRK',
                'title': 'Perak'
            }, {
                'id': 'PLS',
                'title': 'Perlis'
            }, {
                'id': 'SBH',
                'title': 'Sabah'
            }, {
                'id': 'SWK',
                'title': 'Sarawak'
            }, {
                'id': 'SGR',
                'title': 'Selangor'
            }, {
                'id': 'TRG',
                'title': 'Terengganu'
            }, {
                'id': 'PJY',
                'title': 'Putrajaya'
            }, {
                'id': 'KUL',
                'title': 'Kuala Lumpur'
            }],
            'NP': [{
                'id': 'BAG',
                'title': 'Bagmati'
            }, {
                'id': 'BHE',
                'title': 'Bheri'
            }, {
                'id': 'DHA',
                'title': 'Dhawalagiri'
            }, {
                'id': 'GAN',
                'title': 'Gandaki'
            }, {
                'id': 'JAN',
                'title': 'Janakpur'
            }, {
                'id': 'KAR',
                'title': 'Karnali'
            }, {
                'id': 'KOS',
                'title': 'Koshi'
            }, {
                'id': 'LUM',
                'title': 'Lumbini'
            }, {
                'id': 'MAH',
                'title': 'Mahakali'
            }, {
                'id': 'MEC',
                'title': 'Mechi'
            }, {
                'id': 'NAR',
                'title': 'Narayani'
            }, {
                'id': 'RAP',
                'title': 'Rapti'
            }, {
                'id': 'SAG',
                'title': 'Sagarmatha'
            }, {
                'id': 'SET',
                'title': 'Seti'
            }],
            'NZ': [{
                'id': 'NL',
                'title': 'Northland'
            }, {
                'id': 'AK',
                'title': 'Auckland'
            }, {
                'id': 'WA',
                'title': 'Waikato'
            }, {
                'id': 'BP',
                'title': 'Bay of Plenty'
            }, {
                'id': 'TK',
                'title': 'Taranaki'
            }, {
                'id': 'GI',
                'title': 'Gisborne'
            }, {
                'id': 'HB',
                'title': 'Hawke&rsquo;s Bay'
            }, {
                'id': 'MW',
                'title': 'Manawatu-Wanganui'
            }, {
                'id': 'WE',
                'title': 'Wellington'
            }, {
                'id': 'NS',
                'title': 'Nelson'
            }, {
                'id': 'MB',
                'title': 'Marlborough'
            }, {
                'id': 'TM',
                'title': 'Tasman'
            }, {
                'id': 'WC',
                'title': 'West Coast'
            }, {
                'id': 'CT',
                'title': 'Canterbury'
            }, {
                'id': 'OT',
                'title': 'Otago'
            }, {
                'id': 'SL',
                'title': 'Southland'
            }],
            'PE': [{
                'id': 'CAL',
                'title': 'El Callao'
            }, {
                'id': 'LMA',
                'title': 'Municipalidad Metropolitana de Lima'
            }, {
                'id': 'AMA',
                'title': 'Amazonas'
            }, {
                'id': 'ANC',
                'title': 'Ancash'
            }, {
                'id': 'APU',
                'title': 'Apur&iacute;mac'
            }, {
                'id': 'ARE',
                'title': 'Arequipa'
            }, {
                'id': 'AYA',
                'title': 'Ayacucho'
            }, {
                'id': 'CAJ',
                'title': 'Cajamarca'
            }, {
                'id': 'CUS',
                'title': 'Cusco'
            }, {
                'id': 'HUV',
                'title': 'Huancavelica'
            }, {
                'id': 'HUC',
                'title': 'Hu&aacute;nuco'
            }, {
                'id': 'ICA',
                'title': 'Ica'
            }, {
                'id': 'JUN',
                'title': 'Jun&iacute;n'
            }, {
                'id': 'LAL',
                'title': 'La Libertad'
            }, {
                'id': 'LAM',
                'title': 'Lambayeque'
            }, {
                'id': 'LIM',
                'title': 'Lima'
            }, {
                'id': 'LOR',
                'title': 'Loreto'
            }, {
                'id': 'MDD',
                'title': 'Madre de Dios'
            }, {
                'id': 'MOQ',
                'title': 'Moquegua'
            }, {
                'id': 'PAS',
                'title': 'Pasco'
            }, {
                'id': 'PIU',
                'title': 'Piura'
            }, {
                'id': 'PUN',
                'title': 'Puno'
            }, {
                'id': 'SAM',
                'title': 'San Mart&iacute;n'
            }, {
                'id': 'TAC',
                'title': 'Tacna'
            }, {
                'id': 'TUM',
                'title': 'Tumbes'
            }, {
                'id': 'UCA',
                'title': 'Ucayali'
            }],
            'PH': [{
                'id': 'ABR',
                'title': 'Abra'
            }, {
                'id': 'AGN',
                'title': 'Agusan del Norte'
            }, {
                'id': 'AGS',
                'title': 'Agusan del Sur'
            }, {
                'id': 'AKL',
                'title': 'Aklan'
            }, {
                'id': 'ALB',
                'title': 'Albay'
            }, {
                'id': 'ANT',
                'title': 'Antique'
            }, {
                'id': 'APA',
                'title': 'Apayao'
            }, {
                'id': 'AUR',
                'title': 'Aurora'
            }, {
                'id': 'BAS',
                'title': 'Basilan'
            }, {
                'id': 'BAN',
                'title': 'Bataan'
            }, {
                'id': 'BTN',
                'title': 'Batanes'
            }, {
                'id': 'BTG',
                'title': 'Batangas'
            }, {
                'id': 'BEN',
                'title': 'Benguet'
            }, {
                'id': 'BIL',
                'title': 'Biliran'
            }, {
                'id': 'BOH',
                'title': 'Bohol'
            }, {
                'id': 'BUK',
                'title': 'Bukidnon'
            }, {
                'id': 'BUL',
                'title': 'Bulacan'
            }, {
                'id': 'CAG',
                'title': 'Cagayan'
            }, {
                'id': 'CAN',
                'title': 'Camarines Norte'
            }, {
                'id': 'CAS',
                'title': 'Camarines Sur'
            }, {
                'id': 'CAM',
                'title': 'Camiguin'
            }, {
                'id': 'CAP',
                'title': 'Capiz'
            }, {
                'id': 'CAT',
                'title': 'Catanduanes'
            }, {
                'id': 'CAV',
                'title': 'Cavite'
            }, {
                'id': 'CEB',
                'title': 'Cebu'
            }, {
                'id': 'COM',
                'title': 'Compostela Valley'
            }, {
                'id': 'NCO',
                'title': 'Cotabato'
            }, {
                'id': 'DAV',
                'title': 'Davao del Norte'
            }, {
                'id': 'DAS',
                'title': 'Davao del Sur'
            }, {
                'id': 'DAC',
                'title': 'Davao Occidental'
            }, {
                'id': 'DAO',
                'title': 'Davao Oriental'
            }, {
                'id': 'DIN',
                'title': 'Dinagat Islands'
            }, {
                'id': 'EAS',
                'title': 'Eastern Samar'
            }, {
                'id': 'GUI',
                'title': 'Guimaras'
            }, {
                'id': 'IFU',
                'title': 'Ifugao'
            }, {
                'id': 'ILN',
                'title': 'Ilocos Norte'
            }, {
                'id': 'ILS',
                'title': 'Ilocos Sur'
            }, {
                'id': 'ILI',
                'title': 'Iloilo'
            }, {
                'id': 'ISA',
                'title': 'Isabela'
            }, {
                'id': 'KAL',
                'title': 'Kalinga'
            }, {
                'id': 'LUN',
                'title': 'La Union'
            }, {
                'id': 'LAG',
                'title': 'Laguna'
            }, {
                'id': 'LAN',
                'title': 'Lanao del Norte'
            }, {
                'id': 'LAS',
                'title': 'Lanao del Sur'
            }, {
                'id': 'LEY',
                'title': 'Leyte'
            }, {
                'id': 'MAG',
                'title': 'Maguindanao'
            }, {
                'id': 'MAD',
                'title': 'Marinduque'
            }, {
                'id': 'MAS',
                'title': 'Masbate'
            }, {
                'id': 'MSC',
                'title': 'Misamis Occidental'
            }, {
                'id': 'MSR',
                'title': 'Misamis Oriental'
            }, {
                'id': 'MOU',
                'title': 'Mountain Province'
            }, {
                'id': 'NEC',
                'title': 'Negros Occidental'
            }, {
                'id': 'NER',
                'title': 'Negros Oriental'
            }, {
                'id': 'NSA',
                'title': 'Northern Samar'
            }, {
                'id': 'NUE',
                'title': 'Nueva Ecija'
            }, {
                'id': 'NUV',
                'title': 'Nueva Vizcaya'
            }, {
                'id': 'MDC',
                'title': 'Occidental Mindoro'
            }, {
                'id': 'MDR',
                'title': 'Oriental Mindoro'
            }, {
                'id': 'PLW',
                'title': 'Palawan'
            }, {
                'id': 'PAM',
                'title': 'Pampanga'
            }, {
                'id': 'PAN',
                'title': 'Pangasinan'
            }, {
                'id': 'QUE',
                'title': 'Quezon'
            }, {
                'id': 'QUI',
                'title': 'Quirino'
            }, {
                'id': 'RIZ',
                'title': 'Rizal'
            }, {
                'id': 'ROM',
                'title': 'Romblon'
            }, {
                'id': 'WSA',
                'title': 'Samar'
            }, {
                'id': 'SAR',
                'title': 'Sarangani'
            }, {
                'id': 'SIQ',
                'title': 'Siquijor'
            }, {
                'id': 'SOR',
                'title': 'Sorsogon'
            }, {
                'id': 'SCO',
                'title': 'South Cotabato'
            }, {
                'id': 'SLE',
                'title': 'Southern Leyte'
            }, {
                'id': 'SUK',
                'title': 'Sultan Kudarat'
            }, {
                'id': 'SLU',
                'title': 'Sulu'
            }, {
                'id': 'SUN',
                'title': 'Surigao del Norte'
            }, {
                'id': 'SUR',
                'title': 'Surigao del Sur'
            }, {
                'id': 'TAR',
                'title': 'Tarlac'
            }, {
                'id': 'TAW',
                'title': 'Tawi-Tawi'
            }, {
                'id': 'ZMB',
                'title': 'Zambales'
            }, {
                'id': 'ZAN',
                'title': 'Zamboanga del Norte'
            }, {
                'id': 'ZAS',
                'title': 'Zamboanga del Sur'
            }, {
                'id': 'ZSI',
                'title': 'Zamboanga Sibugay'
            }, {
                'id': '00',
                'title': 'Metro Manila'
            }],
            'TH': [{
                'id': 'TH-37',
                'title': 'Amnat Charoen (&#3629;&#3635;&#3609;&#3634;&#3592;&#3648;&#3592;&#3619;&#3636;&#3597;)'
            }, {
                'id': 'TH-15',
                'title': 'Ang Thong (&#3629;&#3656;&#3634;&#3591;&#3607;&#3629;&#3591;)'
            }, {
                'id': 'TH-14',
                'title': 'Ayutthaya (&#3614;&#3619;&#3632;&#3609;&#3588;&#3619;&#3624;&#3619;&#3637;&#3629;&#3618;&#3640;&#3608;&#3618;&#3634;)'
            }, {
                'id': 'TH-10',
                'title': 'Bangkok (&#3585;&#3619;&#3640;&#3591;&#3648;&#3607;&#3614;&#3617;&#3627;&#3634;&#3609;&#3588;&#3619;)'
            }, {
                'id': 'TH-38',
                'title': 'Bueng Kan (&#3610;&#3638;&#3591;&#3585;&#3634;&#3628;)'
            }, {
                'id': 'TH-31',
                'title': 'Buri Ram (&#3610;&#3640;&#3619;&#3637;&#3619;&#3633;&#3617;&#3618;&#3660;)'
            }, {
                'id': 'TH-24',
                'title': 'Chachoengsao (&#3593;&#3632;&#3648;&#3594;&#3636;&#3591;&#3648;&#3607;&#3619;&#3634;)'
            }, {
                'id': 'TH-18',
                'title': 'Chai Nat (&#3594;&#3633;&#3618;&#3609;&#3634;&#3607;)'
            }, {
                'id': 'TH-36',
                'title': 'Chaiyaphum (&#3594;&#3633;&#3618;&#3616;&#3641;&#3617;&#3636;)'
            }, {
                'id': 'TH-22',
                'title': 'Chanthaburi (&#3592;&#3633;&#3609;&#3607;&#3610;&#3640;&#3619;&#3637;)'
            }, {
                'id': 'TH-50',
                'title': 'Chiang Mai (&#3648;&#3594;&#3637;&#3618;&#3591;&#3651;&#3627;&#3617;&#3656;)'
            }, {
                'id': 'TH-57',
                'title': 'Chiang Rai (&#3648;&#3594;&#3637;&#3618;&#3591;&#3619;&#3634;&#3618;)'
            }, {
                'id': 'TH-20',
                'title': 'Chonburi (&#3594;&#3621;&#3610;&#3640;&#3619;&#3637;)'
            }, {
                'id': 'TH-86',
                'title': 'Chumphon (&#3594;&#3640;&#3617;&#3614;&#3619;)'
            }, {
                'id': 'TH-46',
                'title': 'Kalasin (&#3585;&#3634;&#3628;&#3626;&#3636;&#3609;&#3608;&#3640;&#3660;)'
            }, {
                'id': 'TH-62',
                'title': 'Kamphaeng Phet (&#3585;&#3635;&#3649;&#3614;&#3591;&#3648;&#3614;&#3594;&#3619;)'
            }, {
                'id': 'TH-71',
                'title': 'Kanchanaburi (&#3585;&#3634;&#3597;&#3592;&#3609;&#3610;&#3640;&#3619;&#3637;)'
            }, {
                'id': 'TH-40',
                'title': 'Khon Kaen (&#3586;&#3629;&#3609;&#3649;&#3585;&#3656;&#3609;)'
            }, {
                'id': 'TH-81',
                'title': 'Krabi (&#3585;&#3619;&#3632;&#3610;&#3637;&#3656;)'
            }, {
                'id': 'TH-52',
                'title': 'Lampang (&#3621;&#3635;&#3611;&#3634;&#3591;)'
            }, {
                'id': 'TH-51',
                'title': 'Lamphun (&#3621;&#3635;&#3614;&#3641;&#3609;)'
            }, {
                'id': 'TH-42',
                'title': 'Loei (&#3648;&#3621;&#3618;)'
            }, {
                'id': 'TH-16',
                'title': 'Lopburi (&#3621;&#3614;&#3610;&#3640;&#3619;&#3637;)'
            }, {
                'id': 'TH-58',
                'title': 'Mae Hong Son (&#3649;&#3617;&#3656;&#3630;&#3656;&#3629;&#3591;&#3626;&#3629;&#3609;)'
            }, {
                'id': 'TH-44',
                'title': 'Maha Sarakham (&#3617;&#3627;&#3634;&#3626;&#3634;&#3619;&#3588;&#3634;&#3617;)'
            }, {
                'id': 'TH-49',
                'title': 'Mukdahan (&#3617;&#3640;&#3585;&#3604;&#3634;&#3627;&#3634;&#3619;)'
            }, {
                'id': 'TH-26',
                'title': 'Nakhon Nayok (&#3609;&#3588;&#3619;&#3609;&#3634;&#3618;&#3585;)'
            }, {
                'id': 'TH-73',
                'title': 'Nakhon Pathom (&#3609;&#3588;&#3619;&#3611;&#3600;&#3617;)'
            }, {
                'id': 'TH-48',
                'title': 'Nakhon Phanom (&#3609;&#3588;&#3619;&#3614;&#3609;&#3617;)'
            }, {
                'id': 'TH-30',
                'title': 'Nakhon Ratchasima (&#3609;&#3588;&#3619;&#3619;&#3634;&#3594;&#3626;&#3637;&#3617;&#3634;)'
            }, {
                'id': 'TH-60',
                'title': 'Nakhon Sawan (&#3609;&#3588;&#3619;&#3626;&#3623;&#3619;&#3619;&#3588;&#3660;)'
            }, {
                'id': 'TH-80',
                'title': 'Nakhon Si Thammarat (&#3609;&#3588;&#3619;&#3624;&#3619;&#3637;&#3608;&#3619;&#3619;&#3617;&#3619;&#3634;&#3594;)'
            }, {
                'id': 'TH-55',
                'title': 'Nan (&#3609;&#3656;&#3634;&#3609;)'
            }, {
                'id': 'TH-96',
                'title': 'Narathiwat (&#3609;&#3619;&#3634;&#3608;&#3636;&#3623;&#3634;&#3626;)'
            }, {
                'id': 'TH-39',
                'title': 'Nong Bua Lam Phu (&#3627;&#3609;&#3629;&#3591;&#3610;&#3633;&#3623;&#3621;&#3635;&#3616;&#3641;)'
            }, {
                'id': 'TH-43',
                'title': 'Nong Khai (&#3627;&#3609;&#3629;&#3591;&#3588;&#3634;&#3618;)'
            }, {
                'id': 'TH-12',
                'title': 'Nonthaburi (&#3609;&#3609;&#3607;&#3610;&#3640;&#3619;&#3637;)'
            }, {
                'id': 'TH-13',
                'title': 'Pathum Thani (&#3611;&#3607;&#3640;&#3617;&#3608;&#3634;&#3609;&#3637;)'
            }, {
                'id': 'TH-94',
                'title': 'Pattani (&#3611;&#3633;&#3605;&#3605;&#3634;&#3609;&#3637;)'
            }, {
                'id': 'TH-82',
                'title': 'Phang Nga (&#3614;&#3633;&#3591;&#3591;&#3634;)'
            }, {
                'id': 'TH-93',
                'title': 'Phatthalung (&#3614;&#3633;&#3607;&#3621;&#3640;&#3591;)'
            }, {
                'id': 'TH-56',
                'title': 'Phayao (&#3614;&#3632;&#3648;&#3618;&#3634;)'
            }, {
                'id': 'TH-67',
                'title': 'Phetchabun (&#3648;&#3614;&#3594;&#3619;&#3610;&#3641;&#3619;&#3603;&#3660;)'
            }, {
                'id': 'TH-76',
                'title': 'Phetchaburi (&#3648;&#3614;&#3594;&#3619;&#3610;&#3640;&#3619;&#3637;)'
            }, {
                'id': 'TH-66',
                'title': 'Phichit (&#3614;&#3636;&#3592;&#3636;&#3605;&#3619;)'
            }, {
                'id': 'TH-65',
                'title': 'Phitsanulok (&#3614;&#3636;&#3625;&#3603;&#3640;&#3650;&#3621;&#3585;)'
            }, {
                'id': 'TH-54',
                'title': 'Phrae (&#3649;&#3614;&#3619;&#3656;)'
            }, {
                'id': 'TH-83',
                'title': 'Phuket (&#3616;&#3641;&#3648;&#3585;&#3655;&#3605;)'
            }, {
                'id': 'TH-25',
                'title': 'Prachin Buri (&#3611;&#3619;&#3634;&#3592;&#3637;&#3609;&#3610;&#3640;&#3619;&#3637;)'
            }, {
                'id': 'TH-77',
                'title': 'Prachuap Khiri Khan (&#3611;&#3619;&#3632;&#3592;&#3623;&#3610;&#3588;&#3637;&#3619;&#3637;&#3586;&#3633;&#3609;&#3608;&#3660;)'
            }, {
                'id': 'TH-85',
                'title': 'Ranong (&#3619;&#3632;&#3609;&#3629;&#3591;)'
            }, {
                'id': 'TH-70',
                'title': 'Ratchaburi (&#3619;&#3634;&#3594;&#3610;&#3640;&#3619;&#3637;)'
            }, {
                'id': 'TH-21',
                'title': 'Rayong (&#3619;&#3632;&#3618;&#3629;&#3591;)'
            }, {
                'id': 'TH-45',
                'title': 'Roi Et (&#3619;&#3657;&#3629;&#3618;&#3648;&#3629;&#3655;&#3604;)'
            }, {
                'id': 'TH-27',
                'title': 'Sa Kaeo (&#3626;&#3619;&#3632;&#3649;&#3585;&#3657;&#3623;)'
            }, {
                'id': 'TH-47',
                'title': 'Sakon Nakhon (&#3626;&#3585;&#3621;&#3609;&#3588;&#3619;)'
            }, {
                'id': 'TH-11',
                'title': 'Samut Prakan (&#3626;&#3617;&#3640;&#3607;&#3619;&#3611;&#3619;&#3634;&#3585;&#3634;&#3619;)'
            }, {
                'id': 'TH-74',
                'title': 'Samut Sakhon (&#3626;&#3617;&#3640;&#3607;&#3619;&#3626;&#3634;&#3588;&#3619;)'
            }, {
                'id': 'TH-75',
                'title': 'Samut Songkhram (&#3626;&#3617;&#3640;&#3607;&#3619;&#3626;&#3591;&#3588;&#3619;&#3634;&#3617;)'
            }, {
                'id': 'TH-19',
                'title': 'Saraburi (&#3626;&#3619;&#3632;&#3610;&#3640;&#3619;&#3637;)'
            }, {
                'id': 'TH-91',
                'title': 'Satun (&#3626;&#3605;&#3641;&#3621;)'
            }, {
                'id': 'TH-17',
                'title': 'Sing Buri (&#3626;&#3636;&#3591;&#3627;&#3660;&#3610;&#3640;&#3619;&#3637;)'
            }, {
                'id': 'TH-33',
                'title': 'Sisaket (&#3624;&#3619;&#3637;&#3626;&#3632;&#3648;&#3585;&#3625;)'
            }, {
                'id': 'TH-90',
                'title': 'Songkhla (&#3626;&#3591;&#3586;&#3621;&#3634;)'
            }, {
                'id': 'TH-64',
                'title': 'Sukhothai (&#3626;&#3640;&#3650;&#3586;&#3607;&#3633;&#3618;)'
            }, {
                'id': 'TH-72',
                'title': 'Suphan Buri (&#3626;&#3640;&#3614;&#3619;&#3619;&#3603;&#3610;&#3640;&#3619;&#3637;)'
            }, {
                'id': 'TH-84',
                'title': 'Surat Thani (&#3626;&#3640;&#3619;&#3634;&#3625;&#3598;&#3619;&#3660;&#3608;&#3634;&#3609;&#3637;)'
            }, {
                'id': 'TH-32',
                'title': 'Surin (&#3626;&#3640;&#3619;&#3636;&#3609;&#3607;&#3619;&#3660;)'
            }, {
                'id': 'TH-63',
                'title': 'Tak (&#3605;&#3634;&#3585;)'
            }, {
                'id': 'TH-92',
                'title': 'Trang (&#3605;&#3619;&#3633;&#3591;)'
            }, {
                'id': 'TH-23',
                'title': 'Trat (&#3605;&#3619;&#3634;&#3604;)'
            }, {
                'id': 'TH-34',
                'title': 'Ubon Ratchathani (&#3629;&#3640;&#3610;&#3621;&#3619;&#3634;&#3594;&#3608;&#3634;&#3609;&#3637;)'
            }, {
                'id': 'TH-41',
                'title': 'Udon Thani (&#3629;&#3640;&#3604;&#3619;&#3608;&#3634;&#3609;&#3637;)'
            }, {
                'id': 'TH-61',
                'title': 'Uthai Thani (&#3629;&#3640;&#3607;&#3633;&#3618;&#3608;&#3634;&#3609;&#3637;)'
            }, {
                'id': 'TH-53',
                'title': 'Uttaradit (&#3629;&#3640;&#3605;&#3619;&#3604;&#3636;&#3605;&#3606;&#3660;)'
            }, {
                'id': 'TH-95',
                'title': 'Yala (&#3618;&#3632;&#3621;&#3634;)'
            }, {
                'id': 'TH-35',
                'title': 'Yasothon (&#3618;&#3650;&#3626;&#3608;&#3619;)'
            }],
            'TR': [{
                'id': 'TR01',
                'title': 'Adana'
            }, {
                'id': 'TR02',
                'title': 'Ad&#305;yaman'
            }, {
                'id': 'TR03',
                'title': 'Afyon'
            }, {
                'id': 'TR04',
                'title': 'A&#287;r&#305;'
            }, {
                'id': 'TR05',
                'title': 'Amasya'
            }, {
                'id': 'TR06',
                'title': 'Ankara'
            }, {
                'id': 'TR07',
                'title': 'Antalya'
            }, {
                'id': 'TR08',
                'title': 'Artvin'
            }, {
                'id': 'TR09',
                'title': 'Ayd&#305;n'
            }, {
                'id': 'TR10',
                'title': 'Bal&#305;kesir'
            }, {
                'id': 'TR11',
                'title': 'Bilecik'
            }, {
                'id': 'TR12',
                'title': 'Bing&#246;l'
            }, {
                'id': 'TR13',
                'title': 'Bitlis'
            }, {
                'id': 'TR14',
                'title': 'Bolu'
            }, {
                'id': 'TR15',
                'title': 'Burdur'
            }, {
                'id': 'TR16',
                'title': 'Bursa'
            }, {
                'id': 'TR17',
                'title': '&#199;anakkale'
            }, {
                'id': 'TR18',
                'title': '&#199;ank&#305;r&#305;'
            }, {
                'id': 'TR19',
                'title': '&#199;orum'
            }, {
                'id': 'TR20',
                'title': 'Denizli'
            }, {
                'id': 'TR21',
                'title': 'Diyarbak&#305;r'
            }, {
                'id': 'TR22',
                'title': 'Edirne'
            }, {
                'id': 'TR23',
                'title': 'Elaz&#305;&#287;'
            }, {
                'id': 'TR24',
                'title': 'Erzincan'
            }, {
                'id': 'TR25',
                'title': 'Erzurum'
            }, {
                'id': 'TR26',
                'title': 'Eski&#351;ehir'
            }, {
                'id': 'TR27',
                'title': 'Gaziantep'
            }, {
                'id': 'TR28',
                'title': 'Giresun'
            }, {
                'id': 'TR29',
                'title': 'G&#252;m&#252;&#351;hane'
            }, {
                'id': 'TR30',
                'title': 'Hakkari'
            }, {
                'id': 'TR31',
                'title': 'Hatay'
            }, {
                'id': 'TR32',
                'title': 'Isparta'
            }, {
                'id': 'TR33',
                'title': '&#304;&#231;el'
            }, {
                'id': 'TR34',
                'title': '&#304;stanbul'
            }, {
                'id': 'TR35',
                'title': '&#304;zmir'
            }, {
                'id': 'TR36',
                'title': 'Kars'
            }, {
                'id': 'TR37',
                'title': 'Kastamonu'
            }, {
                'id': 'TR38',
                'title': 'Kayseri'
            }, {
                'id': 'TR39',
                'title': 'K&#305;rklareli'
            }, {
                'id': 'TR40',
                'title': 'K&#305;r&#351;ehir'
            }, {
                'id': 'TR41',
                'title': 'Kocaeli'
            }, {
                'id': 'TR42',
                'title': 'Konya'
            }, {
                'id': 'TR43',
                'title': 'K&#252;tahya'
            }, {
                'id': 'TR44',
                'title': 'Malatya'
            }, {
                'id': 'TR45',
                'title': 'Manisa'
            }, {
                'id': 'TR46',
                'title': 'Kahramanmara&#351;'
            }, {
                'id': 'TR47',
                'title': 'Mardin'
            }, {
                'id': 'TR48',
                'title': 'Mu&#287;la'
            }, {
                'id': 'TR49',
                'title': 'Mu&#351;'
            }, {
                'id': 'TR50',
                'title': 'Nev&#351;ehir'
            }, {
                'id': 'TR51',
                'title': 'Ni&#287;de'
            }, {
                'id': 'TR52',
                'title': 'Ordu'
            }, {
                'id': 'TR53',
                'title': 'Rize'
            }, {
                'id': 'TR54',
                'title': 'Sakarya'
            }, {
                'id': 'TR55',
                'title': 'Samsun'
            }, {
                'id': 'TR56',
                'title': 'Siirt'
            }, {
                'id': 'TR57',
                'title': 'Sinop'
            }, {
                'id': 'TR58',
                'title': 'Sivas'
            }, {
                'id': 'TR59',
                'title': 'Tekirda&#287;'
            }, {
                'id': 'TR60',
                'title': 'Tokat'
            }, {
                'id': 'TR61',
                'title': 'Trabzon'
            }, {
                'id': 'TR62',
                'title': 'Tunceli'
            }, {
                'id': 'TR63',
                'title': '&#350;anl&#305;urfa'
            }, {
                'id': 'TR64',
                'title': 'U&#351;ak'
            }, {
                'id': 'TR65',
                'title': 'Van'
            }, {
                'id': 'TR66',
                'title': 'Yozgat'
            }, {
                'id': 'TR67',
                'title': 'Zonguldak'
            }, {
                'id': 'TR68',
                'title': 'Aksaray'
            }, {
                'id': 'TR69',
                'title': 'Bayburt'
            }, {
                'id': 'TR70',
                'title': 'Karaman'
            }, {
                'id': 'TR71',
                'title': 'K&#305;r&#305;kkale'
            }, {
                'id': 'TR72',
                'title': 'Batman'
            }, {
                'id': 'TR73',
                'title': '&#350;&#305;rnak'
            }, {
                'id': 'TR74',
                'title': 'Bart&#305;n'
            }, {
                'id': 'TR75',
                'title': 'Ardahan'
            }, {
                'id': 'TR76',
                'title': 'I&#287;d&#305;r'
            }, {
                'id': 'TR77',
                'title': 'Yalova'
            }, {
                'id': 'TR78',
                'title': 'Karab&#252;k'
            }, {
                'id': 'TR79',
                'title': 'Kilis'
            }, {
                'id': 'TR80',
                'title': 'Osmaniye'
            }, {
                'id': 'TR81',
                'title': 'D&#252;zce'
            }],
            'US': [{
                'id': 'AL',
                'title': 'Alabama'
            }, {
                'id': 'AK',
                'title': 'Alaska'
            }, {
                'id': 'AZ',
                'title': 'Arizona'
            }, {
                'id': 'AR',
                'title': 'Arkansas'
            }, {
                'id': 'CA',
                'title': 'California'
            }, {
                'id': 'CO',
                'title': 'Colorado'
            }, {
                'id': 'CT',
                'title': 'Connecticut'
            }, {
                'id': 'DE',
                'title': 'Delaware'
            }, {
                'id': 'DC',
                'title': 'District Of Columbia'
            }, {
                'id': 'FL',
                'title': 'Florida'
            }, {
                'id': 'GA',
                'title': 'Georgia'
            }, {
                'id': 'HI',
                'title': 'Hawaii'
            }, {
                'id': 'ID',
                'title': 'Idaho'
            }, {
                'id': 'IL',
                'title': 'Illinois'
            }, {
                'id': 'IN',
                'title': 'Indiana'
            }, {
                'id': 'IA',
                'title': 'Iowa'
            }, {
                'id': 'KS',
                'title': 'Kansas'
            }, {
                'id': 'KY',
                'title': 'Kentucky'
            }, {
                'id': 'LA',
                'title': 'Louisiana'
            }, {
                'id': 'ME',
                'title': 'Maine'
            }, {
                'id': 'MD',
                'title': 'Maryland'
            }, {
                'id': 'MA',
                'title': 'Massachusetts'
            }, {
                'id': 'MI',
                'title': 'Michigan'
            }, {
                'id': 'MN',
                'title': 'Minnesota'
            }, {
                'id': 'MS',
                'title': 'Mississippi'
            }, {
                'id': 'MO',
                'title': 'Missouri'
            }, {
                'id': 'MT',
                'title': 'Montana'
            }, {
                'id': 'NE',
                'title': 'Nebraska'
            }, {
                'id': 'NV',
                'title': 'Nevada'
            }, {
                'id': 'NH',
                'title': 'New Hampshire'
            }, {
                'id': 'NJ',
                'title': 'New Jersey'
            }, {
                'id': 'NM',
                'title': 'New Mexico'
            }, {
                'id': 'NY',
                'title': 'New York'
            }, {
                'id': 'NC',
                'title': 'North Carolina'
            }, {
                'id': 'ND',
                'title': 'North Dakota'
            }, {
                'id': 'OH',
                'title': 'Ohio'
            }, {
                'id': 'OK',
                'title': 'Oklahoma'
            }, {
                'id': 'OR',
                'title': 'Oregon'
            }, {
                'id': 'PA',
                'title': 'Pennsylvania'
            }, {
                'id': 'RI',
                'title': 'Rhode Island'
            }, {
                'id': 'SC',
                'title': 'South Carolina'
            }, {
                'id': 'SD',
                'title': 'South Dakota'
            }, {
                'id': 'TN',
                'title': 'Tennessee'
            }, {
                'id': 'TX',
                'title': 'Texas'
            }, {
                'id': 'UT',
                'title': 'Utah'
            }, {
                'id': 'VT',
                'title': 'Vermont'
            }, {
                'id': 'VA',
                'title': 'Virginia'
            }, {
                'id': 'WA',
                'title': 'Washington'
            }, {
                'id': 'WV',
                'title': 'West Virginia'
            }, {
                'id': 'WI',
                'title': 'Wisconsin'
            }, {
                'id': 'WY',
                'title': 'Wyoming'
            }, {
                'id': 'AA',
                'title': 'Armed Forces (AA)'
            }, {
                'id': 'AE',
                'title': 'Armed Forces (AE)'
            }, {
                'id': 'AP',
                'title': 'Armed Forces (AP)'
            }],
            'ZA': [{
                'id': 'EC',
                'title': 'Eastern Cape'
            }, {
                'id': 'FS',
                'title': 'Free State'
            }, {
                'id': 'GP',
                'title': 'Gauteng'
            }, {
                'id': 'KZN',
                'title': 'KwaZulu-Natal'
            }, {
                'id': 'LP',
                'title': 'Limpopo'
            }, {
                'id': 'MP',
                'title': 'Mpumalanga'
            }, {
                'id': 'NC',
                'title': 'Northern Cape'
            }, {
                'id': 'NW',
                'title': 'North West'
            }, {
                'id': 'WC',
                'title': 'Western Cape'
            }]
        });
})();