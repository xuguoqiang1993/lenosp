package com.len.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;



public class DateUtil {


	public static String nowDate() {
		String result = "20180101";
		DateFormat format = new SimpleDateFormat("yyyyMMdd");
		result = format.format(new Date());
		return result;
	}
	
	
	public static String alldate(Date date){
		String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
		//Date date = new Date();
		System.out.println(date);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int index = calendar.get(Calendar.DAY_OF_WEEK)-1;
		
		  if (index < 0){
			  index = 0;
		  }
         System.out.println(weekDays[index]);
        DateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	    String datestr = format.format(date);
	    System.out.println(datestr);
	    return weekDays[index]+"   "+datestr;
	}
	public static String getTime(Date date){
		SimpleDateFormat si = new SimpleDateFormat("HH:mm:ss");
		String time = si.format(date);
		return time ;
	}

	public static void main(String[] args) {
		String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
		Date date = new Date();
		System.out.println(date);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int index = calendar.get(Calendar.DAY_OF_WEEK)-1;
		System.out.println(index);
		  if (index < 0){
			  index = 0;
		  }
         System.out.println(weekDays[index]);
        DateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	    String datestr = format.format(date);
	    System.out.println(datestr);
		//System.out.println(DateUtil.nowDate());
	}
}
