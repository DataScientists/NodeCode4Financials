(function(){

    angular.module('nodeCodeApp.Node').service('MonthYearService',MonthYearService);
    
    
    function MonthYearService(){
    	 
    	
    	let months = [
     	    {id: 1, 'name': 'Jan'  },
     	    {id: 2, 'name': 'Feb'  },
     	    {id: 3, 'name': 'Mar'  },
     	    {id: 4, 'name': 'Apr'  },
     	    {id: 5, 'name': 'May'  },
     	    {id: 6, 'name': 'Jun'  },
     	    {id: 7, 'name': 'Jul'  },
     	    {id: 8, 'name': 'Aug'  },
     	    {id: 9, 'name': 'Sep'  },
     	    {id: 10, 'name': 'Oct'  },
     	    {id: 11, 'name': 'Nov'  },
     	    {id: 12, 'name': 'Dec'  }
     	];
    	 prepareDate = function(){
    		    const monthYears = [];
    		    for (let i = 2017; i <= 2020; i++ ) {
    		        this.months.forEach(month => {
    		            const monthName = month.name;
    		            const m = monthName + '-' + i ;
    		            monthYears.push({id:month.id+'1'+i ,m});
    		        });
    		    };
    		    return monthYears;
    		}

    	 filterMonthYear = function() {
    	     const currentDate = new Date();
    	     const checkMonthYear = this.prepareDate().filter(function( monthYear){
    	             return moment(currentDate).format('MMM-YYYY') === monthYear.m;
    	         });
    	         return checkMonthYear[0];
    	   }

    	 setMonthYear= function(monthYear) {
    	     this.monthYear = monthYear;
    	 }

    	 getMonthYear = function(){
    	     if (!this.monthYear) {
    	         this.monthYear = this.filterMonthYear();
    	     }
    	     return this.monthYear;
    	 }

    	 setPeriod = function(period){
    	     this.period = period;
    	 }

    	 getPeriod = function() {
    	     if (!this.period) {
    	         return 1;
    	     } else {
    	         return this.period;
    	     }
    	 }
        return {
        	prepareDate: prepareDate,
        	filterMonthYear: filterMonthYear,
        	setMonthYear : setMonthYear,
        	getMonthYear: getMonthYear,
        	setPeriod: setPeriod,
        	getPeriod : getPeriod,
        	months : months
        	
       
        };

    }
    
    
    
})();