/***
 * Contains basic SlickGrid formatters.
 * @module Formatters
 * @namespace Slick
 */

(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "Formatters": {
        "PercentComplete": PercentCompleteFormatter,
        "Percent": PercentFormatter,
        "PercentCompleteBar": PercentCompleteBarFormatter,
        "YesNo": YesNoFormatter,
        "YesNoPermissionsRequired": YesNoPermissionsRequiredFormatter,
        "PermissionsRequired": PermissionsRequiredFormatter,
        "Checkmark": CheckmarkFormatter,
        "ShowContextMenuIcon": ShowContextMenuIconFormatter,
        "ThousandSeparateNumber": ThousandSeparateNumberFormatter,
        "ThousandSeparateNumberKeepDecimals": ThousandSeparateNumberFormatterKeepDecimals,
        "ThousandSeparateNumberTwoDecimals" : ThousandSeparateNumberTwoDecimalsFormatter,
        "TimeMillisToDateString" : TimeMillisToDateStringFormatter,
        "TimeMillisToDateTimeString" : TimeMillisToDateTimeStringFormatter,
        "StatusIcon" : StatusIconFormatter,
        "StatusOk" : StatusOkFormatter,
        "AuthorizationRole" : AuthorizationRoleFormatter,
        "DocumentLink" : documentLinkFormatter,
        "DocumentIconLink" : documentIconLinkFormatter,
        "SetDecimal" : SetDecimalFormatter,
        "ProcessStatusSymbol" : SetProcessStatusSymbolFormatter,
        "ProcessNoteSymbol" : SeProcessNoteSymbolFormatter,
        "ProcessChannelSymbol" : SetProcessChannelSymbolFormatter,
        "DateAndInitiator" : SetDateAndInitiatorFormatter,
        "SetWithdrawStatusSymbol" : SetWithdrawStatusSymbolFormatter,
        "NullToDashFormatter" : NullToDashFormatter,
        "TranctionTextFormatter" : TranctionTextFormatter,
        "BindingPeriod" : BindingPeriodFormatter,
        "Payment" : PaymentFormatter,
        "LoanStatus" : LoanStatusFormatter,
        "Borrowers" : BorrowersFormatter,
        "InteresteRate" : InteresteRateFormatter,
        "InteresteRateReduction" : InteresteRateReductionFormatter,
        "LoanNumber" : LoanNumberFormatter,
        "PrivateLoanNumber" : PrivateLoanNumberFormatter,        
        "EstateLoanNumber" : EstateLoanNumberFormatter,
        "loanOverviewInsurance" : LoanOverviewInsuranceFormatter,
        "LoanInsuranceLifeFormatter" : LoanInsuranceLifeFormatter,
        "LoanInsuranceIncomeFormatter" : LoanInsuranceIncomeFormatter,
        "ContractingParty": ContractingPartyFormatter,
        "Name":  NameFormatter,
        "CustomerCardNavigationNameLink": CustomerCardNavigationNameLinkFormatter,
        "DocumentLinkOpenInNewWindow": DocumentLinkOpenInNewWindowFormatter,
        "InteresteRateResteDayFormatter" : InteresteRateResteDayFormatter,
        "PersonSocialSecurityNumber" : PersonSocialSecurityNumberFormatter,
        "UpperCase": UpperCaseFormatter
      }
    }
  });
  function PersonSocialSecurityNumberFormatter(row, cell, value, columnDef, dataContext) {
      var valid = SBAB.iwww.helpers.validate.isValidPersonNumber(value);
      return valid ? SBAB.iwww.helpers.formatters.formatPersonNumber(value) : value;
  }

  function NullToDashFormatter(row, cell, value, columnDef, dataContext) {
    return SBAB.iwww.helpers.formatters.formatNullToDash(value);  
  }

  function TranctionTextFormatter(row, cell, value, columnDef, dataContext) {
        var formattedValue = NullToDashFormatter(row, cell, value, columnDef, dataContext);
        return SBAB.iwww.helpers.formatters.formatName(formattedValue);                                
  }

  function NameFormatter (row, cell, value, columnDef, dataContext) {
    return SBAB.iwww.helpers.formatters.formatName(value);                                
  }

  function UpperCaseFormatter (row, cell, value, columnDef, dataContext) {
      if(value != null) {
          return value.toUpperCase();                
      }
      else {
          return "";
      }
  }

  function PercentCompleteFormatter(row, cell, value, columnDef, dataContext) {
    if (value == null || value === "") {
      return "-";
    } else if (value < 50) {
      return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
    } else {
      return "<span style='color:green'>" + value + "%</span>";
    }
  }
  
  function PercentFormatter(row, cell, value, columnDef, dataContext) {
	    if (value == null || value === "") {
	      return "-";
	    }
	    else {
	      return "<span style='color:black'>" + value + "</span>";
	    }
  }
  

  function PercentCompleteBarFormatter(row, cell, value, columnDef, dataContext) {
    if (value == null || value === "") {
      return "";
    }

    var color;

    if (value < 30) {
      color = "red";
    } else if (value < 70) {
      color = "silver";
    } else {
      color = "green";
    }

    return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'></span>";
  }

  function YesNoFormatter(row, cell, value, columnDef, dataContext) {
    return value ? "Ja" : "Nej";
  }

  function YesNoPermissionsRequiredFormatter(row, cell, value, columnDef, dataContext, permission) {
    if(permission) {
        return YesNoFormatter(row, cell, value, columnDef, dataContext);
    } else {
        return SBAB.iwww.helpers.grids.noPermissionCellData();
    }
  }

  function PermissionsRequiredFormatter(row, cell, value, columnDef, dataContext, permission) {
    if(permission) {
        return value;
    } else {
        return SBAB.iwww.helpers.grids.noPermissionCellData();
    }
  }

  

  function CheckmarkFormatter(row, cell, value, columnDef, dataContext) {
	 return value ? "<img src=" + SBAB.iwww.contextPath() + "/resources/images/Check.png width='16px' height='16px' /> " : "";
  }
  
  function ShowContextMenuIconFormatter(row, cell, value, columnDef, dataContext){
	  return value ? "<img class='actionIcon' src='" + SBAB.iwww.contextPath() + "/resources/images//Meny.png' height='16' width='16' data-grid-unique-rowid='"+ dataContext.id + "' style='display:none' >"  : "";
  }
  
  function ThousandSeparateNumberFormatter(row, cell, value, columnDef, dataContext){
      return SBAB.iwww.helpers.formatters.thousandSeparateNumber(value);
  }
  
  function ThousandSeparateNumberFormatterKeepDecimals(row, cell, value, columnDef, dataContext){
	  return SBAB.iwww.helpers.formatters.thousandSeparateNumberKeepDecimals(value);
  }
  function ThousandSeparateNumberTwoDecimalsFormatter(row, cell, value, columnDef, dataContext){
      var twoDecimalValue = SBAB.iwww.setDecimal(value);
      value = twoDecimalValue.toString().replace(".",",");
	  var result = SBAB.iwww.helpers.formatters.thousandSeparateNumberKeepDecimals(value);
      return result.replace(",",".");
  }
  function SetDecimalFormatter(row, cell, value, columnDef, dataContext){
	  return SBAB.iwww.setDecimal(value);
  }
  
  function TimeMillisToDateStringFormatter(row, cell, value, columnDef, dataContext) {
	var timeMillis = value;
  	if(typeof timeMillis == 'undefined' || timeMillis == null) {
		return "-";
	} else if(!((""+timeMillis).match(/^[0-9]+$/))) {
		return timeMillis; // It's not numeric, so probably a correct string format
	}
	return timeMillisToDateString(timeMillis);	  
  }
  
  function TimeMillisToDateTimeStringFormatter(row, cell, value, columnDef, dataContext) {
		var timeMillis = value;
	  	if(typeof timeMillis == 'undefined' || timeMillis == null) {
			return "-";
		} else if(!((""+timeMillis).match(/^[0-9]+$/))) {
			return timeMillis; // It's not numeric, so probably a correct string format
		}
		return timeMillisToDateTimeString(timeMillis);	  
	  }
  
  function StatusIconFormatter(row, cell, value, columnDef, dataContext) {
	  return value == true ? "ok.png" : "exclamation-warning.png";
  }
  
	function StatusOkFormatter(row, cell, value, columnDef, dataContext) {
	  return value==true ? "<img src=" + SBAB.iwww.contextPath() + "'/resources/images/ok.png' width='20px' height='20px' /> " : "<img src='" + SBAB.iwww.contextPath() + "/resources/images/exclamation-warning.png' width='20px' height='20px' />";
	}
  
  
	function timeMillisToDateString(timeMillis) {
		var date = new Date(parseInt(timeMillis));
		
		var m = date.getMonth()+1;
		if(m < 10) {    
      m = "0" + m;
    }
		var d = date.getDate();
		if(d < 10) {      
			d = "0" + d;
    }
		return date.getFullYear() + "-" + m + "-" + d;
	}
	function timeMillisToDateTimeString(timeMillis) {
		var date = new Date(parseInt(timeMillis));
		
		var m = date.getMonth() + 1;
		if(m < 10) {      
			m = "0" + m;
    }
		var d = date.getDate();
		if(d < 10) {      
			d = "0" + d;
    }
		var s = date.getFullYear() + "-" + m + "-" + d;
    var hrs = date.getHours();
    	if(hrs < 10) {        
    		hrs = "0" + hrs;
      }
    	var mins = date.getMinutes();
    	if(mins < 10) {        
    		mins = "0" + mins;
      }
    	s += " " + hrs + ":" + mins;

		return s;
	}
	
	function AuthorizationRoleFormatter(row, cell, value, columnDef, dataContext){
		// If authorizationRole is "Behörighetsadministratör" eller "Kontoadministratör" show values in grid else empty string
		if(dataContext.authorizationRoleId === 1 || dataContext.authorizationRoleId === 2){
			return value ? "<img src=" + SBAB.iwww.contextPath() + "/resources/images/Check.png width='16px' height='16px' /> " : "";
		}
		else{
			return "-";
		}
	}
	
	function documentLinkFormatter(r, c, document, def, datactx){
    return linkFormatter(document, datactx);
	}

  function documentIconLinkFormatter(r, c, document, def, datactx){
    var iconImg = SBAB.iwww.helpers.formatters.mimeFormatter("application/pdf");
    return linkFormatter(document, datactx, iconImg);
  }

  function linkFormatter(document, datactx, linkContent){
    var options = {
      documentIds : [],
      linkText : "Visa dokument"
    };
        
    if(_.isObject(document)) {
      $.extend(options, document);  
    } else {
      options.documentIds = document;      
    }

    linkContent = linkContent || options.linkText;

    var links = "";
    $.each(options.documentIds, function(idx, docId){
        links += SBAB.iwww.helpers.documents.getDocumentLink(options.documentIds[idx], linkContent) + " ";
    });

    return links;
  }
  
	
	function SetProcessStatusSymbolFormatter(row, cell, value, columnDef, dataContext) {
		if(value == "Pågående"){
			return "<img src=" + SBAB.iwww.contextPath() + "/resources/images/Uppgift_Pagaende.png width='16px' height='16px' /> ";
		}
		else{
			return "";
		}
	  }
	 function SeProcessNoteSymbolFormatter(row, cell, value, columnDef, dataContext) {
		 return value ? "<img id=" + dataContext.id +  " src=" + SBAB.iwww.contextPath() + "/resources/images/Notering.png width='16px' height='16px' /> " : "";
	 }
	 function SetProcessChannelSymbolFormatter(row, cell, value, columnDef, dataContext) {
			if(value == "paff"){
				return "<img src=" + SBAB.iwww.contextPath() + "/resources/images/Kanal_PAFF.png width='16px' height='16px' /> ";
			}
			else if(value == "internetbanken"){
				return "<img src=" + SBAB.iwww.contextPath() + "/resources/images/Kanal_Internetbanken.png width='16px' height='16px' /> ";
			}
			else{
				return "<img src=" + SBAB.iwww.contextPath() + "/resources/images/Kanal_PAFF.png width='16px' height='16px' /> ";
			}
		  }
	  
	 
		  
	  function SetDateAndInitiatorFormatter(row, cell, value, columnDef, dataContext) {
		  var timeMillis = value;
		  	if(typeof timeMillis == 'undefined' || timeMillis == null) {
				return "-";
			} else if(!((""+timeMillis).match(/^[0-9]+$/))) {
				return timeMillis; // It's not numeric, so probably a correct string format
			}
			return timeMillisToDateString(timeMillis) + "<br/>" + dataContext.initiator;
		  }
		  
	  function SetWithdrawStatusSymbolFormatter(row, cell, value, columnDef, dataContext) {
			if(value == "CanCompleteWithdrawal"){
				return "<img  src=" + SBAB.iwww.contextPath() + "/resources/images/Exclamation_alt.png width='16px' height='16px' title='Denna överföring behöver godkännas av inringande kund' /> " +
				" Kan godkännas";	
			}
			else if(value == "CanNotCompleteWithdrawal"){
				return "<img src=" + SBAB.iwww.contextPath() + "/resources/images/Exclamation.png width='16px' height='16px' title='Denna överföring behöver godkännas av en annan kund' /> " + " Godkännande krävs";
				
			}
			else{
				return "";
			}
		  }
		  
		 function BindingPeriodFormatter(row, cell, value, columnDef, dataContext) {
			return SBAB.iwww.helpers.formatters.formatBindingPeriod(value);
          }
          
 		 function PaymentFormatter(row, cell, value, columnDef, dataContext) {
 			 return SBAB.iwww.helpers.formatters.formatPayment(dataContext);
           }
           
   		 function LoanStatusFormatter(row, cell, value, columnDef, dataContext) {
   			var loan = dataContext;
   			return SBAB.iwww.helpers.formatters.formatLoanStatusEnum(loan.status);
           }
           
 		function BorrowersFormatter(row, cell, value, columnDef, dataContext) {
			var loan = dataContext;
		    if (loan.lantagareList && loan.lantagareList.length > 1) {
		        return "<a href='#'>" + loan.lantagareList.length + "</a>";    
		    }
		    return "";
        }
        
 		function InteresteRateFormatter(row, cell, value, columnDef, dataContext) { 
			var loan = dataContext;
			var str = '';
			if(loan.lanevillkor != null) {
			    str = '<span>' + SBAB.iwww.helpers.formatters.formatInterestRate(loan.lanevillkor.rantesats, false);
			}
			
      
      if(loan.laneprisgrund.aktuelltPaslag !== 0) {
        str += '</span><span class="laneprisgrund-cell">&nbsp;' + SBAB.iwww.helpers.formatters.formatLaneprisgrund(loan.laneprisgrund.aktuelltPaslag) + '</span>';
      }
		
      return str;
    }
        
    function InteresteRateReductionFormatter(row, cell, value, columnDef, dataContext) {
        var irr = value ? SBAB.iwww.helpers.formatters.formatInterestRate(value, false) : "";
        return irr;
    }
 		
 	function LoanOverviewInsuranceFormatter(row, cell, value, columnDef, loan) {
 		var loanInsurances = loan.getLoanInsurancesForCustomer(SBAB.iwww.session.getCustomer());

 		var hasIncomeInsurance= _.some(loanInsurances, function(loanInsurance){
 			return (loanInsurance.isIncomeInsurance() && loanInsurance.isActiveInsurance());
 		});

 		var hasLifeInsurance= _.some(loanInsurances, function(loanInsurance){
 			return (loanInsurance.isLifeInsurance() && loanInsurance.isActiveInsurance());
 		});
 		
 		var result = hasIncomeInsurance ? "Inkomst" : "";
 		result += hasIncomeInsurance && hasLifeInsurance ? "/" : "";
 		result += hasLifeInsurance ? "Liv" : "";
 		result = result == "" ? "-" : result; 
 		return result;
    }
    
   function FormatInsuranceCover(cover){
	   return cover == 0 ? "" : cover + "%";
   }
   
    function LoanInsuranceLifeFormatter(row, cell, value, columnDef, dataContext) {
    	var orgnr = SBAB.iwww.helpers.customer.getCurrentCustomerCustomerId();
    	var cover = SBAB.iwww.helpers.loans.calculateLifeInsuranceCover(orgnr, dataContext);
    	return FormatInsuranceCover(cover);
    }
   
   
   function LoanInsuranceIncomeFormatter(row, cell, value, columnDef, dataContext) {
	   var orgnr = SBAB.iwww.helpers.customer.getCurrentCustomerCustomerId();
	   var cover = SBAB.iwww.helpers.loans.calculateIncomeInsuranceCover(orgnr, dataContext);
	   return FormatInsuranceCover(cover);
   }

   function LoanNumberFormatter(row, cell, value, columnDef, dataContext) {
	   var loan = dataContext;

	   switch(loan.type){
	       case SBAB.iwww.model.Loan.LoanType.PRIVATLAN:
	    	   return PrivateLoanNumberFormatter(row, cell, value, columnDef, dataContext);
	    	   break;
	       case SBAB.iwww.model.Loan.LoanType.HANDPENNINGLAN:
	       case SBAB.iwww.model.Loan.LoanType.OVERBRYGGNINGSKREDIT:
	       case SBAB.iwww.model.Loan.LoanType.BOTTENLAN:
	       case SBAB.iwww.model.Loan.LoanType.GARANTILAN:
	       case SBAB.iwww.model.Loan.LoanType.INVESTERINGSLAN:
	       case SBAB.iwww.model.Loan.LoanType.PERSONALLAN:
	       case SBAB.iwww.model.Loan.LoanType.BOSTADSLAN_U_TB:
	       case SBAB.iwww.model.Loan.LoanType.ERSATTNINGSLAN_U_RB:
	       case SBAB.iwww.model.Loan.LoanType.OMFORDELNINGSLAN:
	       case SBAB.iwww.model.Loan.LoanType.OMFORDELNINGSLAN_RSKERS:
	       case SBAB.iwww.model.Loan.LoanType.KONSUMENTKREDIT_U_RB:
	       case SBAB.iwww.model.Loan.LoanType.BOTTENLAN_NAV:
	       case SBAB.iwww.model.Loan.LoanType.KONSUMENTKREDIT_M_RB:
	       case SBAB.iwww.model.Loan.LoanType.BOSTADSLAN_M_TB:
	       case SBAB.iwww.model.Loan.LoanType.ERSATTNINGSLAN_M_RB:
	       case SBAB.iwww.model.Loan.LoanType.BOSTADSLAN_A_M_TB:
	       case SBAB.iwww.model.Loan.LoanType.ENERGISPARLAN_A_M_RB:
	       case SBAB.iwww.model.Loan.LoanType.OVRIGA_LAN_A_M_RB:
	       case SBAB.iwww.model.Loan.LoanType.BYGGNADSKREDITIV:
	       case SBAB.iwww.model.Loan.LoanType.DELLAN:
	       case SBAB.iwww.model.Loan.LoanType.BARNRIKELAN:
	       case SBAB.iwww.model.Loan.LoanType.SAMLINGLOKALLAN:
	       case SBAB.iwww.model.Loan.LoanType.BOSTADSLAN_A_U_RB:
	       case SBAB.iwww.model.Loan.LoanType.ENERGISPARLAN_A_U_RB:
	       case SBAB.iwww.model.Loan.LoanType.OVRIGA_LAN_A_U_RB:
	       case SBAB.iwww.model.Loan.LoanType.TOPPLAN:
	    	   return EstateLoanNumberFormatter(row, cell, value, columnDef, dataContext);
	    	   break;
	       default:
	    	   return value;
	   }
   }
        
	function PrivateLoanNumberFormatter(row, cell, value, columnDef, dataContext) {
		var loan = dataContext;
        return '<span>' +SBAB.iwww.helpers.formatters.formatLoanNumber(loan.lanenummer) + '</span>';
    }
    
	function EstateLoanNumberFormatter(row, cell, value, columnDef, dataContext) {
		var loan = dataContext;
        return '<span>' +SBAB.iwww.helpers.formatters.formatLoanNumber(loan.lanenummer) + 
        '</span><span>&nbsp;'+ SBAB.iwww.helpers.formatters.formatLoanType(loan) + '</span>';
    }
    
	function ContractingPartyFormatter(row, cell, value, columnDef, dataContext) {
		return SBAB.iwww.helpers.formatters.formatContractingParty(value); 
    }

    /*
    * Navigate to customercard, depending on context.orgnbr and context.partId
    * */
    function CustomerCardNavigationNameLinkFormatter(row, cell, value, columnDef, dataContext) {
        var redirect = 'SBAB.iwww.helpers.navigation.openCustomerCardView(' + dataContext.partId + ');';
        return '<a title="Navigera till kunden" onclick=' + redirect + '>' + SBAB.iwww.helpers.formatters.formatFullName(dataContext.name) + '</a>';
    }

    function DocumentLinkOpenInNewWindowFormatter (row, cell, docTitle, columnDef, dataContext) {
        var mimeIcon = SBAB.iwww.helpers.formatters.mimeFormatter(dataContext.mimeType);
        var linkToDoc = mimeIcon+'&nbsp&nbsp<a title="Öppna dokumentet i nytt fönster" target="_blank" href="'+ SBAB.iwww.contextPath() + '/rest/documents/data/' + dataContext.docId + '">'+ docTitle + '</a>';
        return linkToDoc;
    }
	
    function InteresteRateResteDayFormatter(row, cell, docTitle, columnDef, loan){
        if(! loan.lanevillkor || !loan.lanevillkor.rantebindningstid) {
            return "";
        }
       
    	var bindingPeriod = loan.lanevillkor.rantebindningstid;
    	
        bindingPeriod = parseInt(bindingPeriod);
    	
        if(bindingPeriod >=12){
        	return "";
        }
        return TimeMillisToDateStringFormatter(row, cell, docTitle, columnDef, loan);
    }
  
})(jQuery);
