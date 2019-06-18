package net.datascientists.utilities;

import java.util.List;

import org.apache.commons.lang3.SystemUtils;

public class CommonUtil {
	
	public static boolean isListEmpty(List<? extends Object> list) {
		return list == null || list.isEmpty();
	}
	public static boolean isNumeric(String str) {
		try {
			Integer.parseInt(str);
		} catch (NumberFormatException nfe) {
			return false;
		}
		return true;
	}
	public static boolean isInteger(String lastLetter) {
		try {
			Integer.parseInt(lastLetter);
			return true;
		} catch (NumberFormatException exception) {
			return false;
		}
	}
	public static boolean isWindows(){
		if(SystemUtils.IS_OS_WINDOWS){
			return true;
		}
		return false;
	}
}
