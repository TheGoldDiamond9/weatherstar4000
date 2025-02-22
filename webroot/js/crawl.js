var lowerDetailLength = 4000
var lowerDetailOrder = []
function crawlKickOff() {
    cidx = 0
    cnidx = 1
    if (apperanceSettings.marqueeType == "none") {
        $('#lowerline').fadeOut(0)
        $('#lowerbar').fadeOut(0)
    } else if (apperanceSettings.marqueeType == "observations") {
        $('#lowerbar').fadeIn(0)
        $('#lowerline').fadeIn(0)
        lowerDetailOrder = [
            {function:"city"},
            {function:"condition"},
            {function:"temperature"},
            {function:"humidity"},
            {function:"pressure"},
            {function:"wind"},
            {function:"ceiling"},
            {function:"precip"},
        ]
    } else if (apperanceSettings.marqueeType == "ad") {
        $('#lowerbar').fadeIn(0)
        $('#lowerline').fadeIn(0)
        lowerDetailOrder = [
            {function:"onlycrawl"},
            {function:"onlycrawl"},
        ]
    } else {
        $('#lowerbar').fadeIn(0)
        $('#lowerline').fadeIn(0)
        lowerDetailOrder = [
            {function:"city"},
            {function:"condition"},
            {function:"temperature"},
            {function:"humidity"},
            {function:"pressure"},
            {function:"wind"},
            {function:"ceiling"},
            {function:"precip"},
            {function:"city"},
            {function:"condition"},
            {function:"temperature"},
            {function:"humidity"},
            {function:"pressure"},
            {function:"wind"},
            {function:"ceiling"},
            {function:"precip"},
            {function:"crawl"},
        ]
    }
    showCrawls()
    function showCrawls() {
        var crawlDisplays = {
            city() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                $('#lowerinfotext').text('Conditions at ' + locationConfig.mainCity.displayname)
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            condition() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                $('#lowerinfotext').text(weatherData.currentConditions.cond)
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            temperature() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                if (weatherData.currentConditions.feelslike == weatherData.currentConditions.temp) {
                    $('#lowerinfotext').text('Temp:  ' + weatherData.currentConditions.temp + '°F   ')
                } else {
                    $('#lowerinfotext').text('Temp:  ' + weatherData.currentConditions.temp + '°F   ' + weatherData.currentConditions.feelsliketype + weatherData.currentConditions.feelslike + '°F')
                }
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            humidity() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                $('#lowerinfotext').text('Humidity:  ' + weatherData.currentConditions.humidity + '%  ' + 'Dewpoint:  ' + weatherData.currentConditions.dewpoint + '°F')
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            pressure() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                $('#lowerinfotext').text('Barometric Pressure: ' + weatherData.currentConditions.pressure + " " + weatherData.currentConditions.pressureTrend)
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            wind() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                if (weatherData.currentConditions.wind == "Calm") {
                    $('#lowerinfotext').text('Wind: Calm')
                } else {
                    $('#lowerinfotext').text('Wind: ' + windWordSpacing(weatherData.currentConditions.wind) + " " + weatherData.currentConditions.windspeed + ' MPH')
                }
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            ceiling() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                if (weatherData.currentConditions.ceiling != null) {
                    $('#lowerinfotext').text('Visib: ' + weatherData.currentConditions.visibility + ' mi. ' + 'Ceiling: ' + weatherData.currentConditions.ceiling +' ft.')
                } else {
                    $('#lowerinfotext').text('Visib: ' + weatherData.currentConditions.visibility + ' mi. ' + 'Ceiling:Unlimited')
                }
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            precip() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                const cmonth = ["January Precipitation: ","February Precipitation: ","March Precipitation: ","April Precipitation: ","May Precipitation: ","June Precipitation: ","July Precipitation: ","August Precipitation: ","September Precipitation: ","October Precipitation: ","November Precipitation: ","December Precipitation: "];
                const cd = new Date();
                let cmonthname = cmonth[cd.getMonth()];

                $('#lowerinfotext').text(cmonthname + weatherData.currentConditions.monthPrecip)
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            crawl() {
                var crawl = false
                $('#lowerinfotext').fadeOut(0)
                $('#date-time').fadeOut(0)
                $('#marqueeholder').fadeIn(0)
                $('#marqueetext').text(apperanceSettings.marqueeAd[0]);
	            $('#marqueetext').marquee({speed: 150, pauseOnHover: false, delayBeforeStart: 2000, pauseOnCycle: true})
	            $('#marqueetext').on('finished', function cr() {
                    if (crawl == false) {
                        crawlCallBack()
                    }
                    crawl = true
                });
            },
            onlycrawl() {
                $('#lowerinfotext').fadeOut(0)
                $('#date-time').fadeOut(0)
                $('#marqueeholder').fadeIn(0)
                $('#marqueetext').text(apperanceSettings.marqueeAd[0]);
	            $('#marqueetext').marquee({speed: 150, pauseOnHover: false, delayBeforeStart: 2000, pauseOnCycle: true})
	            $('#marqueetext').on('finished', function() {crawlCallBack()});
            }
        }
        if (cidx>=lowerDetailOrder.length) {
			cidx = 0
		}
		if (cnidx>=lowerDetailOrder.length) {
			cnidx = 0
		}
		currentCrawl = crawlDisplays[lowerDetailOrder[cidx].function]
		nextCrawl = crawlDisplays[lowerDetailOrder[cnidx].function]
		currentCrawl();

		function crawlCallBack(){
			cidx++;
			cnidx++;
			showCrawls();
		};
    }
}